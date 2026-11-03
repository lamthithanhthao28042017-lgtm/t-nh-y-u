
const keys = document.querySelectorAll(".key");
const passwordDisplay = document.querySelector("#password-display");
const message = document.querySelector("#message");
const unlockButton = document.querySelector("#unlock-button");

const correctPassword = "4112023";
let enteredPassword = "";

// ===== MẬT KHẨU =====

function updateDisplay() {
    const dots = passwordDisplay.querySelectorAll("span");

    dots.forEach((dot, index) => {
        dot.textContent =
            index < enteredPassword.length ? "●" : "○";
    });
}

keys.forEach(key => {
    key.addEventListener("click", function () {
        const number = key.getAttribute("data-number");
        const action = key.getAttribute("data-action");

        if (action === "clear") {
            enteredPassword = "";
        } else if (action === "delete") {
            enteredPassword = enteredPassword.slice(0, -1);
        } else if (number !== null && enteredPassword.length < 7) {
            enteredPassword += number;
        }

        message.textContent = "";
        updateDisplay();
    });
});

// ===== TRÁI TIM 3D =====

function createHeart() {
    const heart = document.createElement("div");

    heart.className = "floating-heart";
    heart.innerHTML = `<div class="heart-3d">♥</div>`;

    const size = 20 + Math.random() * 30;
    heart.style.fontSize = size + "px";
    heart.style.left = Math.random() * 100 + "vw";

    const duration = 6 + Math.random() * 5;
    heart.style.animationDuration = duration + "s";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

let heartInterval = null;

// ===== HIỆU ỨNG CHỮ =====

function typeWriter(element, speed = 65) {
    const text = element.textContent;
    element.textContent = "";

    let index = 0;

    function write() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(write, speed);
        }
    }

    write();
}

// ===== TRÌNH CHIẾU 6 ẢNH =====

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const memoryCount = document.querySelector("#memory-count");

let currentSlide = 0;
let slideTimer = null;

function showSlide(index) {
    if (!slides.length) return;

    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === currentSlide);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentSlide);
    });

    if (memoryCount) {
        memoryCount.textContent =
            `${currentSlide + 1} / ${slides.length}`;
    }
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startSlideshow() {
    if (slideTimer || !slides.length) return;

    slideTimer = setInterval(nextSlide, 5000);
}

document.querySelector("#next-slide")?.addEventListener("click", nextSlide);

document.querySelector("#prev-slide")?.addEventListener("click", prevSlide);

dots.forEach(dot => {
    dot.addEventListener("click", function () {
        showSlide(Number(dot.dataset.index));
    });
});

// ===== MỞ MÀN HÌNH KỶ NIỆM =====

unlockButton.addEventListener("click", function () {
    if (enteredPassword === correctPassword) {

        document.querySelector("#login-screen").style.display = "none";

        const memories = document.querySelector("#memories-screen");
        memories.style.display = "block";

        showSlide(0);
        startSlideshow();

    } else {
        message.textContent = "Mật khẩu không đúng, thử lại nhé!";
        message.style.color = "red";
    }
});

// ===== MỞ LÁ THƯ =====

document.querySelector("#open-letter-button").addEventListener("click", function () {

    clearInterval(slideTimer);
    slideTimer = null;

    document.querySelector("#memories-screen").style.display = "none";

    const letter = document.querySelector("#love-letter");

    letter.style.display = "block";
    letter.classList.add("show");

    // Bắt đầu trái tim khi mở thư
    if (!heartInterval) {
        createHeart();
        heartInterval = setInterval(createHeart, 700);
    }

    // Chạy chữ từng đoạn
    const paragraphs = letter.querySelectorAll("p");

    paragraphs.forEach((paragraph, index) => {
        setTimeout(() => {
            typeWriter(paragraph, 65);
        }, 1500 + index * 2500);
    });

});

// Khởi tạo màn hình
updateDisplay();
