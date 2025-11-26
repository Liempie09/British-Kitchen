// Theme Toggle (werkt op alle pagina's)
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark');
        });
    }
});

// Carousel (alleen op index.html)
if (document.querySelector('.carousel')) {
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

    // Auto-slide
    setInterval(() => {
        slideIndex++;
        showSlide(slideIndex);
    }, 3000);
}

// Search Filter (op recipes.html)
if (document.getElementById('search')) {
    document.getElementById('search').addEventListener('input', (e) => {
        const filter = e.target.value.toLowerCase();
        document.querySelectorAll('.recipe-card').forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            card.style.display = title.includes(filter) ? 'block' : 'none';
        });
    });
}

// Contact Form (op contact.html)
if (document.getElementById('contact-form')) {
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message!');
        e.target.reset();
    });
}