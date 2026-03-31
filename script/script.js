document.addEventListener('DOMContentLoaded', () => {
    // Navbar Entrance Animation
    const navItems = document.querySelectorAll('.nav-item');
    const logo = document.querySelector('.navbar-brand');
    const button = document.querySelector('.btn-get-in-touch');

    // Reset initial states
    if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'translateX(-20px)';
    }
    
    navItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-10px)';
    });

    if (button) {
        button.style.opacity = '0';
        button.style.transform = 'scale(0.9)';
    }

    // Trigger animations with stagger
    setTimeout(() => {
        if (logo) {
            logo.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
            logo.style.opacity = '1';
            logo.style.transform = 'translateX(0)';
        }

        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });

        if (button) {
            setTimeout(() => {
                button.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                button.style.opacity = '1';
                button.style.transform = 'scale(1)';
            }, navItems.length * 100 + 200);
        }
    }, 100);

    // Mobile Menu Logic
    const openMenuBtn = document.getElementById('openMobileMenu');
    const closeMenuBtn = document.getElementById('closeMobileMenu');
    const closeMenuOverlay = document.getElementById('closeMobileMenuOverlay');
    const mobileMenu = document.getElementById('mobileMenu');
    const dropdownToggle = document.querySelector('.dropdown-toggle-btn');
    const mobileDropdown = document.querySelector('.mobile-dropdown');

    if (openMenuBtn && mobileMenu) {
        openMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });
    }

    const closeMenu = () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
    };

    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
    if (closeMenuOverlay) closeMenuOverlay.addEventListener('click', closeMenu);

    // Mobile Dropdown Toggle
    if (dropdownToggle && mobileDropdown) {
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            mobileDropdown.classList.toggle('active');
        });
    }

    // Dropdown Item Hover Stagger (CSS handles display, JS for extra punch)

    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach((item, index) => {
        item.style.setProperty('--delay', `${index * 0.05}s`);
        // Hero Section Entrance Animation
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroBtns = document.querySelector('.hero-btns');
    const heroBanner = document.querySelector('.hero-bottom-banner');

    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
    }
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(20px)';
    }
    if (heroBtns) {
        heroBtns.style.opacity = '0';
        heroBtns.style.transform = 'translateY(20px)';
    }
    if (heroBanner) {
        heroBanner.style.opacity = '0';
    }

    // Trigger hero animations with delay after navbar
    setTimeout(() => {
        if (heroTitle) {
            heroTitle.style.transition = 'all 1s cubic-bezier(0.23, 1, 0.32, 1)';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }
        
        setTimeout(() => {
            if (heroSubtitle) {
                heroSubtitle.style.transition = 'all 1s cubic-bezier(0.23, 1, 0.32, 1)';
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
            }
        }, 200);

        setTimeout(() => {
            if (heroBtns) {
                heroBtns.style.transition = 'all 1s cubic-bezier(0.23, 1, 0.32, 1)';
                heroBtns.style.opacity = '1';
                heroBtns.style.transform = 'translateY(0)';
            }
        }, 400);

        setTimeout(() => {
            if (heroBanner) {
                heroBanner.style.transition = 'all 1.2s ease-out';
                heroBanner.style.opacity = '1';
            }
        }, 600);
    }, 800);
});
});
