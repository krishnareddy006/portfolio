document.addEventListener('DOMContentLoaded', function() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error('GSAP or ScrollTrigger not loaded');
        return;
    }
    gsap.registerPlugin(ScrollTrigger);

    // Existing animations (unchanged)
    gsap.from('.navbar', { y: -100, opacity: 0, duration: 1, ease: 'power2.out', delay: 0.5 });
    gsap.from('.nav-item', { y: -50, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out', delay: 1 });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                gsap.to(window, {
                    scrollTo: { y: targetPosition, autoKill: false },
                    duration: 1,
                    ease: 'power2.out',
                    onComplete: () => {
                        navLinks.forEach(nav => nav.classList.remove('active'));
                        this.classList.add('active');
                    }
                });
            }
        });
    });

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(nav => {
                    nav.classList.remove('active');
                    if (nav.getAttribute('href') === `#${sectionId}`) {
                        nav.classList.add('active');
                    }
                });
            }
        });
    });

    gsap.from('.maine h3', { x: -100, opacity: 0, duration: 1, ease: 'power2.out', delay: 1.5 });

    const pythonText = document.querySelector('.maine h6');
    if (pythonText) {
        const text = "PYTHON DEVELOPER";
        let charIndex = 0;
        function typeEffect() {
            pythonText.textContent = text.substring(0, charIndex);
            charIndex++;
            if (charIndex <= text.length) {
                setTimeout(typeEffect, 100);
            } else {
                setTimeout(() => { charIndex = 0; typeEffect(); }, 1000);
            }
        }
        gsap.from(pythonText, { opacity: 0, duration: 1, delay: 2, onComplete: typeEffect });
    }

    gsap.from('.maine input[type="button"]', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.3,
        ease: 'power2.out',
        delay: 2.5,
        onStart: () => {
            document.querySelectorAll('.maine input[type="button"]').forEach(btn => {
                btn.style.display = 'inline-block';
                btn.style.visibility = 'visible';
            });
        },
        onComplete: () => {
            document.querySelectorAll('.maine input[type="button"]').forEach(btn => {
                btn.style.opacity = '1';
            });
        }
    });

    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section.children, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 20%', toggleActions: 'play none none reverse' }
        });
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        let animation;
        switch(index % 3) {
            case 0: animation = gsap.from(card, { opacity: 0, rotationX: 90, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 90%', end: 'top 40%', toggleActions: 'play none none reverse' } }); break;
            case 1: animation = gsap.from(card, { opacity: 0, y: 100, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: card, start: 'top 90%', end: 'top 40%', toggleActions: 'play none none reverse' } }); break;
            case 2: animation = gsap.from(card, { opacity: 0, scale: 0.3, rotation: 5, duration: 0.8, ease: 'circ.out', scrollTrigger: { trigger: card, start: 'top 90%', end: 'top 40%', toggleActions: 'play none none reverse' } }); break;
        }
    });

    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach((card, index) => {
        let animation;
        switch(index % 3) {
            case 0: animation = gsap.from(card, { opacity: 0, y: -100, duration: 0.8, ease: 'bounce.out', scrollTrigger: { trigger: card, start: 'top 90%', end: 'top 40%', toggleActions: 'play none none reverse' } }); break;
            case 1: animation = gsap.from(card, { opacity: 0, x: -150, duration: 0.9, ease: 'power4.out', scrollTrigger: { trigger: card, start: 'top 90%', end: 'top 40%', toggleActions: 'play none none reverse' } }); break;
            case 2: animation = gsap.from(card, { opacity: 0, scale: 0.8, rotation: -10, duration: 0.7, ease: 'elastic.out(1, 0.5)', scrollTrigger: { trigger: card, start: 'top 90%', end: 'top 40%', toggleActions: 'play none none reverse' } }); break;
        }
    });

    gsap.from('.about-image img, .about-text, .about ul li', {
        opacity: 0,
        x: (index, target) => target.classList.contains('about-image') ? -100 : 100,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.about', start: 'top 80%', end: 'top 20%', toggleActions: 'play none none reverse' }
    });

    gsap.from('.contact-form .form-group, .contact-icon', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.contact', start: 'top 80%', end: 'top 20%', toggleActions: 'play none none reverse' }
    });

    gsap.from('footer', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: { 
            trigger: 'footer', 
            start: 'top 100%',
            end: 'top 50%', 
            toggleActions: 'play none none none',
            onEnter: () => {
                const footer = document.querySelector('footer');
                footer.style.display = 'block';
                footer.style.visibility = 'visible';
                footer.style.opacity = '1';
            }
        }
    });

    setTimeout(() => {
        const footer = document.querySelector('footer');
        if (footer) {
            footer.style.display = 'block';
            footer.style.visibility = 'visible';
            footer.style.opacity = '1';
        }
    }, 2000);

    // New Infinite Slide-Up and Sink Animation for Portfolio Title
    const portfolioTitle = document.querySelector('.navbar-brand.portfolio-title');
    if (portfolioTitle) {
        const text = "Portfolio";

        function slideAndSink() {
            // Split text into individual spans for each letter
            portfolioTitle.innerHTML = text.split('').map(char => `<span class="title-char">${char}</span>`).join('');
            const chars = portfolioTitle.querySelectorAll('.title-char');

            // Slide up all letters one by one
            gsap.from(chars, {
                y: 20,            
                opacity: 0,       
                duration: .5,    // Duration per letter
                stagger: 0.5,     // Stagger each letter by 0.2s
                delay:1,
                ease: 'power2.out',
                onComplete: () => {
    
                    
                    // After sliding up, sink down from left to right
                    gsap.to(chars, {
                        y: 20,        
                        opacity: 0,  
                        duration: 0.5, 
                        stagger: .5,  
                        ease: 'power2.in',
                        delay: 5,
                        onComplete: () => {
                            setTimeout(slideAndSink, 4000);
                        }
                    });
                }
            });
        }

        // Start the animation with initial fade-in
        gsap.from(portfolioTitle, {
            opacity: 0,
            duration: 1,
            delay: 0.5,
            onComplete: slideAndSink 
        });
    }
});

// Separate Nav Hover Effects (unchanged)
const navHoverScript = document.createElement('script');
navHoverScript.textContent = `
    document.addEventListener('DOMContentLoaded', function() {
        const navItems = document.querySelectorAll('.nav-item a');
        navItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                gsap.to(this, { scale: 1.1, color: '#007bff', duration: 0.3, ease: 'power2.out' });
            });
            item.addEventListener('mouseleave', function() {
                gsap.to(this, { scale: 1, color: 'inherit', duration: 0.3, ease: 'power2.out' });
            });
        });
    });
`;
document.head.appendChild(navHoverScript);