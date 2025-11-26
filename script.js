// Carousel
let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-inner img');
const totalSlides = slides.length;

function showSlide(index) {
    if (index >= totalSlides) slideIndex = 0;
    if (index < 0) slideIndex = totalSlides - 1;
    document.querySelector('.carousel-inner').style.transform = `translateX(${-slideIndex * 100}%)`;
}

document.querySelector('.next').addEventListener('click', () => {
    slideIndex++;
    showSlide(slideIndex);
});

document.querySelector('.prev').addEventListener('click', () => {
    slideIndex--;
    showSlide(slideIndex);
});

// Auto-slide every 3 seconds
setInterval(() => {
    slideIndex++;
    showSlide(slideIndex);
}, 3000);

// Search Filter
document.getElementById('search').addEventListener('input', (e) => {
    const filter = e.target.value.toLowerCase();
    document.querySelectorAll('.recipe-card').forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = title.includes(filter) ? 'block' : 'none';
    });
});

// Theme Toggle
document.getElementById('theme-btn').addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// Contact Form (basic validation and alert)
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message!');
    e.target.reset();
});
