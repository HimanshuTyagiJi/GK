
document.addEventListener("DOMContentLoaded", () => {
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

    // --- Dynamic Content Injection ---
    function initMenuItems() {
        if (!menuInner) return;
        const menuItems = [
            { href: "index.html", text: "Home" },
            { href: "education.html", text: "Education" },
            { href: "all-formulas.html", text: "All Formula" },
            { href: "computer.html", text: "Computer" },
            { href: "how-to.html", text: "How to" },
            { href: "gk-quiz.html", text: "GK Quiz" },
            { href: "test.html", text: "Test" },
        ];
        menuInner.innerHTML = menuItems.map(item => `<a href="${item.href}">${item.text}</a>`).join('');
        
        // Make the link active based on the current page URL
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const activeLink = menuInner.querySelector(`a[href="${currentPage}"]`);
        
        if (activeLink) {
            activeLink.classList.add('active');
        } else {
            // Fallback to the first link if no match is found
            const firstLink = menuInner.querySelector('a');
            if (firstLink) {
                firstLink.classList.add('active');
            }
        }


        // Add click handler for active state (useful for single-page apps, but good practice)
        menuInner.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                const currentActive = menuInner.querySelector('a.active');
                if (currentActive) {
                    currentActive.classList.remove('active');
                }
                e.target.classList.add('active');
            }
        });
    }

    function initFooterContent() {
        const footerContent = document.querySelector('.app-footer .footer-content');
        if (!footerContent) return;
        
        const footerData = {
            about: {
                title: "About GK Learn Study",
                text: "Your one-stop destination for knowledge, tools, and tutorials on a wide range of subjects. We aim to make learning easy and accessible for everyone."
            },
            company: {
                title: "About Us",
                links: [
                    { href: "/about.html", text: "About Us" },
                    { href: "/contact.html", text: "Contact Us" },
                    { href: "/privacy-policy.html", text: "Privacy Policy" },
                    { href: "/terms.html", text: "Terms of Service" }
                ]
            },
            foryou: {
                title: "For you",
                links: [
                     { href: "https://gklearnstudy.in/gk-quiz/ancient-indian-history", text: "Ancient Indian History" },
                     { href: "https://gklearnstudy.in/gk-quiz/medieval-indian-history", text: "Medieval Indian History" },
                     { href: "https://gklearnstudy.in/gk-quiz/modern-indian-history", text: "Modern Indian History" },
                     { href: "https://gklearnstudy.in/gk-quiz/indian-geography-mcq-quiz", text: "Indian Geography" },
                     { href: "https://gklearnstudy.in/gk-quiz/world-geography-mcq-quiz", text: "World Geography" },
                     { href: "https://gklearnstudy.in/gk-quiz/physics-mcq-quiz", text: "Physics" },
                     { href: "https://gklearnstudy.in/gk-quiz/chemistry-mcq-quiz", text: "Chemistry" },
                     { href: "https://gklearnstudy.in/gk-quiz/biology-mcq-quiz", text: "Biology" },
                     { href: "https://gklearnstudy.in/gk-quiz/computer-mcq-quiz", text: "Computer" },
                     { href: "https://gklearnstudy.in/gk-quiz/sports-general-knowledge-mcq-quiz", text: "Sports GK" },
                ]
            },
            science: {
                 title: "Science & Computer",
                 links: [
                    { href: "conversion.html", text: "Conversion" },
                    { href: "all-formulas.html", text: "All formulas" }
                ]
            },
            socials: {
                title: "Follow Us",
                links: [
                    { href: "https://www.youtube.com/@GKLearnStudy", label: "YouTube", svg: '<svg viewBox="0 0 24 24" style="width:28px; fill:currentColor;"><path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/></svg>' }
                ]
            }
        };

        const createLinks = (links) => links.map(l => `<li><a href="${l.href}">${l.text}</a></li>`).join('');
        const createSocials = (links) => links.map(l => `<li><a href="${l.href}" aria-label="${l.label}" target="_blank" rel="noopener noreferrer">${l.svg}</a></li>`).join('');

        footerContent.innerHTML = `
            <div class="footer-section footer-about"><h3>${footerData.about.title}</h3><p>${footerData.about.text}</p></div>
            <div class="footer-section"><h4>${footerData.company.title}</h4><ul>${createLinks(footerData.company.links)}</ul></div>
            <div class="footer-section"><h4>${footerData.foryou.title}</h4><ul>${createLinks(footerData.foryou.links)}</ul></div>
            <div class="footer-section"><h4>${footerData.science.title}</h4><ul>${createLinks(footerData.science.links)}</ul></div>
            <div class="footer-section"><h4>${footerData.socials.title}</h4><ul class="footer-socials">${createSocials(footerData.socials.links)}</ul></div>
        `;
    }

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
        if (suggestionsList) {
            suggestionsList.style.display = 'none';
        }
    };

    searchBtn?.addEventListener('click', openSearch);
    backBtn?.addEventListener('click', closeSearch);

    searchInput?.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        // Assuming main.js has populated window.GKApp
        const searchData = window.GKApp?.searchData || [];
        const fuzzySearch = window.GKApp?.fuzzySearch;
        const generateSVG = window.GKApp?.generatePlaceholderSVG;

        if (!fuzzySearch || !generateSVG || !suggestionsList || query.length === 0) {
            if (suggestionsList) suggestionsList.style.display = 'none';
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
        if (header && suggestionsList && !header.contains(e.target) && !suggestionsList.contains(e.target)) {
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
    initMenuItems();
    initFooterContent();

    menuInner?.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);
    // Use a timeout to ensure layout is stable before checking arrows
    setTimeout(updateArrows, 100);
});
