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
    });

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

    // Slider Logic
    const sliderTrack = document.getElementById('sliderTrack');
    const slidePrev = document.getElementById('slidePrev');
    const slideNext = document.getElementById('slideNext');
    const progressBar = document.getElementById('progressBar');

    if (sliderTrack && slidePrev && slideNext && progressBar) {
        const cardWidth = sliderTrack.querySelector('.slider-card').offsetWidth + 30; // card + gap

        slideNext.addEventListener('click', () => {
            sliderTrack.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });

        slidePrev.addEventListener('click', () => {
            sliderTrack.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });

        // Update Progress Bar
        sliderTrack.addEventListener('scroll', () => {
            const maxScroll = sliderTrack.scrollWidth - sliderTrack.clientWidth;
            if (maxScroll > 0) {
                const scrollPercent = (sliderTrack.scrollLeft / maxScroll) * 100;
                progressBar.style.width = `${Math.max(25, scrollPercent)}%`;
            }
        });
    }

    // ============================================================
    //  HOW IT WORKS — Auto-moving Carousel with Swipe Support
    // ============================================================
    const hwTrack       = document.getElementById('howWorksTrack');
    const hwOuter       = document.getElementById('howWorksOuter');
    const hwProgressEl  = document.getElementById('howWorksProgress');

    if (hwTrack && hwOuter) {
        const hwCards       = Array.from(hwTrack.querySelectorAll('.how-works-card'));
        const totalCards    = hwCards.length;
        let currentIndex    = 0;
        let autoPlayTimer   = null;
        let isDragging      = false;
        let dragStartX      = 0;
        let dragStartScroll = 0;
        let isScrolling     = false;

        // --- Calculate card width + gap dynamically ---
        function getCardStep() {
            const style = getComputedStyle(hwTrack);
            const gap   = parseFloat(style.gap) || 20;
            return hwCards[0].offsetWidth + gap;
        }

        // --- Scroll position to bring card[index] into view from left offset ---
        function getScrollForIndex(index) {
            const outerW    = hwOuter.offsetWidth;
            const cardMid   = hwCards[index].offsetLeft + hwCards[index].offsetWidth / 2;
            return cardMid - outerW / 2;
        }

        // --- Navigate to index ---
        function goToIndex(index, animated = true) {
            currentIndex = Math.max(0, Math.min(index, totalCards - 1));
            const scrollTarget = getScrollForIndex(currentIndex);
            if (animated) {
                hwOuter.scrollTo({ left: scrollTarget, behavior: 'smooth' });
            } else {
                hwOuter.scrollLeft = scrollTarget;
            }
            updateProgress();
        }

        // --- Update progress bar width ---
        function updateProgress() {
            if (!hwProgressEl) return;
            // progress = currentIndex / (totalCards - 1) but min 8% for visibility
            const pct = totalCards > 1
                ? Math.round((currentIndex / (totalCards - 1)) * 100)
                : 100;
            hwProgressEl.style.width = Math.max(8, pct) + '%';
        }

        // --- Detect closest card to centre when user scrolls ---
        function updateIndexFromScroll() {
            const outerW    = hwOuter.offsetWidth;
            const scrollMid = hwOuter.scrollLeft + outerW / 2;
            let closestIdx  = 0;
            let closestDist = Infinity;
            hwCards.forEach((card, i) => {
                const cardMid = card.offsetLeft + card.offsetWidth / 2;
                const dist    = Math.abs(cardMid - scrollMid);
                if (dist < closestDist) { closestDist = dist; closestIdx = i; }
            });
            if (closestIdx !== currentIndex) {
                currentIndex = closestIdx;
                updateProgress();
            }
        }

        // --- Auto-play ---
        function startAutoPlay() {
            stopAutoPlay();
            autoPlayTimer = setInterval(() => {
                const next = (currentIndex + 1) % totalCards;
                goToIndex(next);
            }, 3000);
        }

        function stopAutoPlay() {
            if (autoPlayTimer) { clearInterval(autoPlayTimer); autoPlayTimer = null; }
        }

        function resetAutoPlay() {
            stopAutoPlay();
            setTimeout(() => startAutoPlay(), 4000);
        }

        // --- Scroll listener ---
        hwOuter.addEventListener('scroll', () => {
            updateIndexFromScroll();
            clearTimeout(hwOuter._scrollEnd);
            hwOuter._scrollEnd = setTimeout(() => {
                goToIndex(currentIndex);
            }, 120);
        }, { passive: true });

        // --- Mouse drag ---
        hwOuter.addEventListener('mousedown', (e) => {
            isDragging      = true;
            dragStartX      = e.pageX;
            dragStartScroll = hwOuter.scrollLeft;
            hwOuter.style.scrollBehavior = 'auto';
            stopAutoPlay();
        });
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            hwOuter.scrollLeft = dragStartScroll - (e.pageX - dragStartX);
        });
        window.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            hwOuter.style.scrollBehavior = '';
            goToIndex(currentIndex);
            resetAutoPlay();
        });

        // --- Touch swipe ---
        hwOuter.addEventListener('touchstart', (e) => {
            dragStartX      = e.touches[0].pageX;
            dragStartScroll = hwOuter.scrollLeft;
            hwOuter.style.scrollBehavior = 'auto';
            stopAutoPlay();
        }, { passive: true });
        hwOuter.addEventListener('touchmove', (e) => {
            hwOuter.scrollLeft = dragStartScroll - (e.touches[0].pageX - dragStartX);
        }, { passive: true });
        hwOuter.addEventListener('touchend', () => {
            hwOuter.style.scrollBehavior = '';
            goToIndex(currentIndex);
            resetAutoPlay();
        });

        // Pause on hover
        hwOuter.addEventListener('mouseenter', stopAutoPlay);
        hwOuter.addEventListener('mouseleave', startAutoPlay);

        // Init
        setTimeout(() => {
            goToIndex(0, false);
            startAutoPlay();
        }, 150);
    }

    // ============================================================
    //  SERVICES ACCORDION — Tab Switching
    // ============================================================
    const accorBtns = document.querySelectorAll('.accor-btn');
    const accorPanes = document.querySelectorAll('.accor-content-pane');

    if (accorBtns.length > 0) {
        accorBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-content');
                const targetPane = document.getElementById(targetId);

                if (targetPane) {
                    // Remove active classes
                    accorBtns.forEach(b => b.classList.remove('active'));
                    accorPanes.forEach(p => p.classList.remove('active'));

                    // Add active class to current
                    btn.classList.add('active');
                    targetPane.classList.add('active');
                }
            });
        });
    }

});

