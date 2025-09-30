// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Read More functionality
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    // Function to toggle read more content
    window.toggleReadMore = function(id) {
        const content = document.getElementById(id);
        const button = content.previousElementSibling;
        
        if (content.style.display === 'block') {
            content.style.display = 'none';
            button.textContent = 'Read More';
        } else {
            content.style.display = 'block';
            button.textContent = 'Read Less';
        }
    };
    
    // Scroll reveal animation
    const faders = document.querySelectorAll('.about-content, .dish-card, .team-member');
    
    // Add fade-in class to elements
    faders.forEach(fader => {
        fader.classList.add('fade-in');
    });
    
    // Intersection Observer for scroll animations
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
    
    // Navbar scroll effect
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }
    });
    
    // Dish card hover effects
    const dishCards = document.querySelectorAll('.dish-card');
    
    dishCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.dish-image').style.overflow = 'hidden';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.dish-image').style.overflow = 'hidden';
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a, .footer-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for internal links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add a subtle animation to the hero section
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            const opacity = 1 - (scrollPosition / (window.innerHeight * 0.8));
            heroContent.style.opacity = opacity > 0 ? opacity : 0;
            heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        }
    });
    
    // Add a subtle parallax effect to the hero background
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            hero.style.backgroundPosition = `center ${50 + (scrollPosition * 0.05)}%`;
        }
    });
    
    // Add a subtle animation to the section titles
    const sectionTitles = document.querySelectorAll('section h2');
    
    sectionTitles.forEach(title => {
        title.classList.add('fade-in');
        appearOnScroll.observe(title);
    });
    
    // Add a subtle animation to the dish facts
    const dishFacts = document.querySelectorAll('.dish-facts');
    
    dishFacts.forEach(fact => {
        fact.classList.add('fade-in');
        appearOnScroll.observe(fact);
    });
});