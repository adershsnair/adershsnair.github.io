document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       Set Current Year in Footer
       ========================================================================== */
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* ==========================================================================
       Mobile Navigation Toggle
       ========================================================================== */
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.getElementById('primary-navigation');
    const navIcon = mobileToggle?.querySelector('i');
    
    if (mobileToggle && primaryNav) {
        mobileToggle.addEventListener('click', () => {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            primaryNav.classList.toggle('active');
            
            // Toggle icon between list and x
            if (navIcon) {
                if (isExpanded) {
                    navIcon.classList.replace('ph-x', 'ph-list');
                } else {
                    navIcon.classList.replace('ph-list', 'ph-x');
                }
            }
        });
    }

    // Close mobile nav when clicking a link
    const navLinksList = document.querySelectorAll('.nav-link');
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            if (primaryNav?.classList.contains('active')) {
                mobileToggle?.click();
            }
        });
    });

    /* ==========================================================================
       Navbar Scroll Effect & Active Link Highlight
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Add scrolled class to navbar
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        // Highlight active link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id') || '';
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       Dark/Light Theme Toggle
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn?.querySelector('i');
    const htmlElement = document.documentElement;
    
    // Check local storage for theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        htmlElement.setAttribute('data-theme', 'dark');
        themeIcon?.classList.replace('ph-moon', 'ph-sun');
    }

    themeToggleBtn?.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        let newTheme = 'light';
        
        if (currentTheme === 'light') {
            newTheme = 'dark';
            themeIcon?.classList.replace('ph-moon', 'ph-sun');
        } else {
            themeIcon?.classList.replace('ph-sun', 'ph-moon');
        }
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    /* ==========================================================================
       Scroll Reveal Animations using Intersection Observer
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* ==========================================================================
       Contact Form Submission Mock
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending... <i class="ph ph-spinner ph-spin"></i>';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
                formStatus.style.color = 'var(--accent-color)';
                contactForm.reset();
                
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Clear success message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            }, 1500);
        });
    }
});
