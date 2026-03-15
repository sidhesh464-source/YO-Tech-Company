document.addEventListener('DOMContentLoaded', () => {
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
    // Unique Interaction: Bento Spotlight
    // -------------------------
    const bentoGrid = document.querySelector('.bento-services');
    if (bentoGrid) {
        bentoGrid.addEventListener('mousemove', (e) => {
            const cards = bentoGrid.querySelectorAll('.bento-card');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    // -------------------------
    // Unique Interaction: Magnetic Buttons
    // -------------------------
    const magneticBtns = document.querySelectorAll('.btn-primary, .logo');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0, 0)`;
        });
    });

    // -------------------------
    // Scroll Reveal / Intersect Observer
    // -------------------------
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.bento-card, .portfolio-card, .section-top, .why-content, .stats-row, .about-grid');
    revealElements.forEach(el => {
        el.classList.add('reveal-init');
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
                const headerOffset = 100;
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

        teamModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    window.closeTeamModal = function() {
        teamModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    window.addEventListener('click', (e) => {
        if (e.target === teamModal) closeTeamModal();
    });
});
