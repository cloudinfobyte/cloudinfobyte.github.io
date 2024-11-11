let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlide() {
    slides.forEach((slide, index) => {
        slide.style.display = index === slideIndex ? "block" : "none";
    });
    slideIndex = (slideIndex + 1) % slides.length;
}

setInterval(showSlide, 3000);

