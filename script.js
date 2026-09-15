document.addEventListener('DOMContentLoaded', () => {
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 1) {
        let activeSlide = 0;

        setInterval(() => {
            heroSlides[activeSlide].classList.remove('is-active');
            activeSlide = (activeSlide + 1) % heroSlides.length;
            heroSlides[activeSlide].classList.add('is-active');
        }, 5000);
    }

    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    if (navbar && navLinks) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.type = 'button';
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
        navbar.insertBefore(menuToggle, navLinks);

        const closeMenu = () => {
            navbar.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
        };

        menuToggle.addEventListener('click', () => {
            const isOpen = navbar.classList.toggle('menu-open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            menuToggle.innerHTML = `<i class="fas fa-${isOpen ? 'times' : 'bars'}" aria-hidden="true"></i>`;
        });

        navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    }

    // Video tour interaction placeholder
    const playVideoBtn = document.getElementById('playVideoBtn');
    if (playVideoBtn) {
        playVideoBtn.addEventListener('click', () => {
            alert('Opening school video tour modal...');
        });
    }

    // Search courses action
    const searchCoursesBtn = document.getElementById('searchCoursesBtn');
    if (searchCoursesBtn) {
        searchCoursesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Executing course search filters...');
        });
    }

    // Newsletter subscription handling
    const subscribeBtn = document.getElementById('subscribeBtn');
    const newsletterEmail = document.getElementById('newsletterEmail');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (newsletterEmail.value.trim() === '') {
                alert('Please enter a valid email address.');
            } else {
                alert(`Thank you for subscribing, ${newsletterEmail.value}!`);
                newsletterEmail.value = '';
            }
        });
    }
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        const searchOverlay = document.createElement('div');
        searchOverlay.className = 'search-overlay';
        searchOverlay.setAttribute('aria-hidden', 'true');
        searchOverlay.innerHTML = `
            <div class="search-overlay-content" role="dialog" aria-modal="true" aria-label="Site search">
                <form class="site-search-form">
                    <label class="sr-only" for="siteSearchInput">Search this site</label>
                    <i class="fas fa-search search-overlay-icon" aria-hidden="true"></i>
                    <input id="siteSearchInput" type="search" placeholder="Search..." autocomplete="off">
                    <button type="button" class="search-overlay-close" aria-label="Close search">
                        <i class="fas fa-times" aria-hidden="true"></i>
                    </button>
                </form>
            </div>`;
        document.body.appendChild(searchOverlay);

        const closeSearch = () => {
            searchOverlay.classList.remove('is-open');
            searchOverlay.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('search-is-open');
            searchIcon.setAttribute('aria-expanded', 'false');
            searchIcon.focus();
        };

        searchIcon.addEventListener('mousedown', (e) => e.preventDefault());
        searchIcon.addEventListener('click', (e) => {
            e.preventDefault();
            searchOverlay.classList.add('is-open');
            searchOverlay.setAttribute('aria-hidden', 'false');
            document.body.classList.add('search-is-open');
            searchIcon.setAttribute('aria-expanded', 'true');
            setTimeout(() => searchOverlay.querySelector('input').focus(), 0);
        });

        searchOverlay.querySelector('.site-search-form').addEventListener('submit', (e) => e.preventDefault());
        searchOverlay.querySelector('.search-overlay-close').addEventListener('click', closeSearch);
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                closeSearch();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('is-open')) {
                closeSearch();
            }
        });
    }
});