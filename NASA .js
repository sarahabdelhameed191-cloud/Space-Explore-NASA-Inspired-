const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let mouseX = 0, mouseY = 0;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.onresize = resize;

const stars = Array.from({ length: 180 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5
}));

let shootingStar = { x: 0, y: 0, len: 0, speed: 0, active: false };

function createShootingStar() {
    shootingStar.x = Math.random() * canvas.width;
    shootingStar.y = Math.random() * (canvas.height / 2);
    shootingStar.len = Math.random() * 80 + 50;
    shootingStar.speed = Math.random() * 10 + 5;
    shootingStar.active = true;
    setTimeout(createShootingStar, Math.random() * 4000 + 3000);
}
createShootingStar();

window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / 50;
    mouseY = (e.clientY - window.innerHeight / 2) / 50;

    document.querySelectorAll('.hud-corner').forEach(corner => {
        corner.style.transform = `translate(${mouseX * 0.5}px, ${mouseY * 0.5}px)`;
    });
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x + mouseX, star.y + mouseY, star.r, 0, Math.PI * 2);
        ctx.fill();
        star.y += 0.2;
        if (star.y > canvas.height) star.y = 0;
    });

    if (shootingStar.active) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(shootingStar.x - shootingStar.len, shootingStar.y + shootingStar.len);
        ctx.stroke();
        shootingStar.x += shootingStar.speed;
        shootingStar.y += shootingStar.speed;
        if (shootingStar.x > canvas.width || shootingStar.y > canvas.height) shootingStar.active = false;
    }
    requestAnimationFrame(animate);
}
animate();

const planets = [
    { name: "Mercury", img: "images/mercury.jpg", info: "Mercury is the smallest planet and closest to the Sun." },
    { name: "Venus", img: "images/venus.jpg", info: "Venus is the hottest planet with a thick atmosphere." },
    { name: "Earth", img: "images/earth.jpg", info: "Earth is the only planet known to support life." },
    { name: "Mars", img: "images/mars.jpg", info: "Mars is the Red Planet and may have had water." },
    { name: "Jupiter", img: "images/jupiter.jpg", info: "Jupiter is the largest planet in the solar system." },
    { name: "Saturn", img: "images/saturn.jpg", info: "Saturn is famous for its beautiful rings." },
    { name: "Uranus", img: "images/uranus.jpg", info: "Uranus rotates on its side." },
    { name: "Neptune", img: "images/neptune.jpg", info: "Neptune has the strongest winds ever recorded." }
];

const container = document.getElementById("planetCards");
planets.forEach(planet => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-face card-front">
                <img src="${planet.img}" alt="${planet.name}">
                <h3>${planet.name}</h3>
            </div>
            <div class="card-face card-back">
                <img src="${planet.img}" class="planet-back-img">
                <div class="scanner-line"></div>
                <p style="position:relative; z-index:10">${planet.info}</p>
            </div>
        </div>`;
    
    card.onclick = () => {
        card.classList.toggle("flipped");
        document.getElementById("planetInfo").innerText = card.classList.contains("flipped") ? planet.info : "Select a planet to see details";
    };
    container.appendChild(card);
});

const spaceAlerts = ["WARNING: Solar storm detected! ⚡", "FACT: One day on Venus > one year on Earth. 🤯", "ALERT: Asteroid field ahead. 💥", "OBSERVATION: The universe is still expanding. ✨"];
let currentAlertIndex = 0;

function showSpaceAlert() {
    if (document.getElementById("mission-page").classList.contains("hidden-page")) return;
    const alertBox = document.getElementById("space-alert");
    alertBox.classList.remove('show');
    
    setTimeout(() => {
        if (document.getElementById("mission-page").classList.contains("hidden-page")) return;
        document.getElementById("alert-message").innerText = spaceAlerts[currentAlertIndex];
        alertBox.classList.add('show');
        currentAlertIndex = (currentAlertIndex + 1) % spaceAlerts.length;
        setTimeout(() => {
            alertBox.classList.remove('show');
            setTimeout(showSpaceAlert, 12000);
        }, 5000);
    }, 1000);
}

function startMission() {
    document.getElementById("home-page").classList.add("hidden-page");
    setTimeout(() => {
        document.getElementById("mission-page").classList.remove("hidden-page");
    }, 300);

    if (!window.alertsStarted) {
        setTimeout(showSpaceAlert, 4000);
        window.alertsStarted = true;
    }
}

function goHome() {
    document.getElementById("mission-page").classList.add("hidden-page");
    setTimeout(() => {
        document.getElementById("home-page").classList.remove("hidden-page");
    }, 300);
    document.getElementById("space-alert").classList.remove('show');
}

function askAI() {
    const inputField = document.getElementById("question");
    const q = inputField.value.toLowerCase().trim(); 
    const responseElement = document.getElementById("aiResponse");
    let response = "";

    // قاعدة بيانات الكواكب والأجرام
    if (q.includes("sun") || q.includes("شمس")) {
        response = "The Sun is the heart of our solar system. It's a yellow dwarf star that holds 99.8% of the total mass of the system. Temperature at its core: 15 million°C! ☀️";
    } 
    else if (q.includes("moon") || q.includes("قمر")) {
        response = "The Moon is Earth's only natural satellite. It's the fifth-largest moon in the solar system and it's drifting away from Earth by 3.8 cm every year! 🌙";
    }
    else if (q.includes("mercury") || q.includes("عطارد")) {
        response = "Mercury is the smallest planet and the closest to the Sun. It has no atmosphere, so it's freezing at night and boiling during the day! 🌡️";
    }
    else if (q.includes("venus") || q.includes("زهره") || q.includes("زهرة")) {
        response = "Venus is the hottest planet (465°C) due to its thick greenhouse atmosphere. It also rotates backwards compared to other planets! ☁️";
    }
    else if (q.includes("earth") || q.includes("أرض") || q.includes("الارض")) {
        response = "Earth is our home! It's the only planet known to have liquid water on its surface and support life. 70% of it is covered by oceans. 🌍";
    }
    else if (q.includes("mars") || q.includes("مريخ")) {
        response = "Mars is the Red Planet. It's home to Olympus Mons, the tallest volcano in the solar system, which is 3 times higher than Mount Everest! 🌋";
    }
    else if (q.includes("jupiter") || q.includes("مشترى")) {
        response = "Jupiter is the gas giant king. It's so big that all other planets could fit inside it twice! Its Great Red Spot is a storm that has lasted for 300 years. 🌀";
    }
    else if (q.includes("saturn") || q.includes("زحل")) {
        response = "Saturn is famous for its stunning rings made of ice and rock. It's so light that if you had a giant bathtub, Saturn would float in water! 🪐";
    }
    else if (q.includes("uranus") || q.includes("أورانوس")) {
        response = "Uranus is an ice giant that rotates on its side. It's the coldest planet in the solar system, with temperatures reaching -224°C. ❄️";
    }
    else if (q.includes("neptune") || q.includes("نبتون")) {
        response = "Neptune is the windiest planet! Winds there can reach speeds of 2,100 km/h. It's 30 times farther from the Sun than Earth. 💨";
    }
    else if (q.includes("pluto") || q.includes("بلوتو")) {
        response = "Pluto was once the 9th planet but is now a 'Dwarf Planet'. It's smaller than the Moon and has a heart-shaped glacier! 🧊";
    }
    else if (q.includes("black hole") || q.includes("ثقب")) {
        response = "A black hole is a region where gravity is so strong that even light cannot escape. If you fell into one, you would experience 'Spaghettification'! 🕳️";
    }
    else if (q === "") {
        response = "System standby... Please enter a cosmic query. 📡";
    }
    else {
        response = "I'm still scanning the cosmos for that! Try asking about the Sun, any planet, or Black Holes. 🌌";
    }

    // تأثير الكتابة (Typing Effect)
    responseElement.textContent = ""; 
    let i = 0;
    if (window.typeInterval) clearInterval(window.typeInterval);

    window.typeInterval = setInterval(() => {
        if (i < response.length) {
            responseElement.textContent += response[i]; 
            i++;
        } else {
            clearInterval(window.typeInterval);
        }
    }, 30);
}

document.getElementById("question").addEventListener("keypress", (e) => { if (e.key === "Enter") askAI(); });