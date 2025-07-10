document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling for Navigation
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Get navbar height to offset scroll position
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile nav if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    document.querySelector('.hamburger-menu').classList.remove('open');
                }
            }
        });
    });

    // Hamburger Menu Toggle for Mobile
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburgerMenu.classList.toggle('open'); // Optional: for animating hamburger icon
    });

    // Skill Card Pop-up
    const skillCards = document.querySelectorAll('.skill-card');
    const skillPopup = document.getElementById('skill-popup');
    const popupSkillTitle = document.getElementById('popup-skill-title');
    const popupSkillDescription = document.getElementById('popup-skill-description');
    const closeButton = document.querySelector('.close-button');

    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const description = card.dataset.description; // Get description from data-description attribute

            popupSkillTitle.textContent = title;
            popupSkillDescription.textContent = description;
            skillPopup.classList.add('active'); // Show popup
        });
    });

    closeButton.addEventListener('click', () => {
        skillPopup.classList.remove('active'); // Hide popup
    });

    // Close popup if clicked outside
    skillPopup.addEventListener('click', (e) => {
        if (e.target === skillPopup) {
            skillPopup.classList.remove('active');
        }
    });

    // Scroll Reveal Animation (using IntersectionObserver)
    const sections = document.querySelectorAll('.resume-section, .profile-card');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the section must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Optional: Simple name animation on load
    const heroName = document.querySelector('.hero-section h1');
    if (heroName) {
        heroName.style.opacity = 0;
        heroName.style.transform = 'translateY(20px)';
        setTimeout(() => {
            heroName.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            heroName.style.opacity = 1;
            heroName.style.transform = 'translateY(0)';
        }, 500); // Delay for better effect after initial page load
    }
});