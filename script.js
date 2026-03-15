document.addEventListener('DOMContentLoaded', () => {
    // -------------------------
    // Mobile Menu Toggle
    // -------------------------
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // -------------------------
    // Navbar Scroll Effect
    // -------------------------
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // -------------------------
    // Typing Effect Logic
    // -------------------------
    const typeEffectEl = document.querySelector('.type-effect');
    const words = ["Digital Experiences", "Web Applications", "Mobile Solutions", "Custom Software", "Future Platforms"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typeEffectEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typeEffectEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        // If word is completely typed
        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before next word starts
        }

        setTimeout(typeEffect, typingSpeed);
    }
    
    // Initialize Typing Effect
    if (typeEffectEl) setTimeout(typeEffect, 1000);

    // -------------------------
    // Accordion Logic
    // -------------------------
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Close other items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // -------------------------
    // Scroll Reveal / Intersect Observer
    // -------------------------
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a class that we can hook into via CSS, or just mutate styles direct here
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply initial styles for elements to be revealed
    const revealElements = document.querySelectorAll('.service-card, .portfolio-card, .section-top, .why-content, .stats-row');
    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)";
        observer.observe(el);
    });
    
    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    
// -------------------------
// Team Modal Logic
// -------------------------
const teamModal = document.getElementById('team-modal');

window.openTeamModal = function(card) {
    const data = card.dataset;
    
    // Fill Modal Data
    document.getElementById('m-photo').src = data.photo;
    document.getElementById('m-name').textContent = data.name;
    document.getElementById('m-role').textContent = data.role;
    
    // Social Links Logic (Hide LinkedIn if it's just "#")
    const linkedinBtn = document.getElementById('m-linkedin');
    if (data.linkedin === "#" || !data.linkedin) {
        linkedinBtn.style.display = 'none';
    } else {
        linkedinBtn.style.display = 'flex';
        linkedinBtn.href = data.linkedin;
    }

    document.getElementById('m-instagram').href = data.instagram;
    document.getElementById('m-vision').textContent = data.vision;
    document.getElementById('m-goal1').textContent = data.goal1;
    document.getElementById('m-goal2').textContent = data.goal2;
    document.getElementById('m-goal3').textContent = data.goal3;

    // Show Modal
    teamModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Stop background scrolling
}

window.closeTeamModal = function() {
    teamModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
    if (e.target === teamModal) closeTeamModal();
});

});
