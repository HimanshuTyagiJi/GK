document.addEventListener("DOMContentLoaded", () => {
    // --- DOM Elements ---
    const themeSwitcher = document.getElementById('themeSwitcher');
    const html = document.documentElement;
    const burger = document.getElementById("burger");
    const menu = document.getElementById("menu");
    const menuInner = menu?.querySelector(".menu-inner");
    const header = document.getElementById("header");
    const searchBtn = document.getElementById("searchBtn");
    const backBtn = document.getElementById("backBtn");
    const searchInput = document.getElementById("searchInput");
    const suggestionsList = document.getElementById("suggestions-list");
    const overlay = document.querySelector(".overlay");
    const leftArrow = document.getElementById('menuLeft');
    const rightArrow = document.getElementById('menuRight');
    const closeMenuBtn = document.getElementById('closeMenuBtn');

    // --- Theme Switcher Logic ---
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    html.setAttribute('data-theme', savedTheme);
    themeSwitcher.addEventListener('click', () => {
        const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --- Mobile Burger Menu Logic ---
    const toggleMenu = (isActive) => {
        menu?.classList.toggle("is-active", isActive);
        overlay?.classList.toggle("is-active", isActive);
    };
    burger?.addEventListener("click", () => toggleMenu(!menu.classList.contains("is-active")));
    closeMenuBtn?.addEventListener('click', () => toggleMenu(false));

    // --- Search Bar Logic ---
    const openSearch = (e) => {
        e.stopPropagation();
        const isMobile = window.innerWidth <= 850;
        if (isMobile) {
            header.classList.add('search-active');
        } else {
            header.classList.add('search-active-desktop');
            overlay.classList.add('is-active');
        }
        searchInput.focus();
    };

    const closeSearch = () => {
        header.classList.remove('search-active', 'search-active-desktop');
        overlay.classList.remove('is-active');
        searchInput.value = '';
        suggestionsList.style.display = 'none';
    };

    searchBtn.addEventListener('click', openSearch);
    backBtn.addEventListener('click', closeSearch);

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        // Assuming searchdata.js has populated window.GKApp
        const searchData = window.GKApp?.searchData || [];
        const fuzzySearch = window.GKApp?.fuzzySearch;
        const generateSVG = window.GKApp?.generatePlaceholderSVG;

        if (!fuzzySearch || !generateSVG || query.length === 0) {
            suggestionsList.style.display = 'none';
            return;
        }
        const filteredData = fuzzySearch(query, searchData);
        suggestionsList.innerHTML = '';
        if (filteredData.length > 0) {
            filteredData.slice(0, 10).forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${item.url}" class="result-card">
                        <div class="result-icon">${item.svg || generateSVG(item.title)}</div>
                        <div class="result-text">
                            <div class="result-title">${item.title}</div>
                            <div class="result-description">${item.paragraph}</div>
                        </div>
                        <svg class="result-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"></polyline></svg>
                        </a>`;
                suggestionsList.appendChild(li);
            });
        } else {
            suggestionsList.innerHTML = `<li class="no-results">No results found</li>`;
        }
        suggestionsList.style.display = 'block';
    });

    // --- Global Click/Key Listeners ---
    overlay?.addEventListener("click", () => {
        toggleMenu(false);
        closeSearch();
    });
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && !suggestionsList.contains(e.target)) {
            closeSearch();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            closeSearch();
            toggleMenu(false);
        }
    });

    // --- Arrow Scroll Logic ---
    const updateArrows = () => {
        if (!leftArrow || !rightArrow || !menuInner) return;
        const isDesktop = window.innerWidth > 850;
        if (!isDesktop) {
            leftArrow.style.display = "none";
            rightArrow.style.display = "none";
            return;
        }
        const hasOverflow = menuInner.scrollWidth > menuInner.clientWidth;
        if (!hasOverflow) {
            leftArrow.style.display = 'none';
            rightArrow.style.display = 'none';
            return;
        }
        const scrollLeft = menuInner.scrollLeft;
        const maxScroll = menuInner.scrollWidth - menuInner.clientWidth;
        leftArrow.style.display = scrollLeft > 1 ? "flex" : "none";
        rightArrow.style.display = scrollLeft < maxScroll - 1 ? "flex" : "none";
    };
    leftArrow?.addEventListener("click", () => menuInner.scrollBy({ left: -300, behavior: "smooth" }));
    rightArrow?.addEventListener("click", () => menuInner.scrollBy({ left: 300, behavior: "smooth" }));
    
    // --- INITIALIZATION ---
    menuInner?.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);
    updateArrows(); // Initial check
});
