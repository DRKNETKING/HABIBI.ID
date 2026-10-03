"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* ========================================================
       LOADER
    ======================================================== */

    const loader = document.getElementById("pageLoader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {
                loader.classList.add("loaded");
            }

        }, 500);

    });


    /* ========================================================
       THEME
    ======================================================== */

    const themeSwitch = document.getElementById("themeSwitch");
    const html = document.documentElement;

    function applyTheme(theme) {

        html.setAttribute("data-theme", theme);

        localStorage.setItem("habibi-theme", theme);

        if (!themeSwitch) return;

        const icon = themeSwitch.querySelector(".theme-icon");
        const label = themeSwitch.querySelector(".theme-label");

        if (theme === "white") {

            if (icon) icon.textContent = "☀";
            if (label) label.textContent = "WHITE";

        } else {

            if (icon) icon.textContent = "☾";
            if (label) label.textContent = "BLACK";

        }

    }

    const savedTheme =
        localStorage.getItem("habibi-theme") || "black";

    applyTheme(savedTheme);

    themeSwitch?.addEventListener("click", () => {

        const current =
            html.getAttribute("data-theme") || "black";

        applyTheme(
            current === "black" ? "white" : "black"
        );

    });


    /* ========================================================
       LANGUAGE
    ======================================================== */

    const translations = {

        id: {

            navHome: "Beranda",
            navAbout: "Tentang",
            navServices: "Layanan",
            navProjects: "Portfolio",
            navTestimonials: "Testimoni",
            navContact: "Kontak",
            navStart: "Mulai Project",

            heroTitle:
                "Website Profesional<br>untuk Bisnis yang<br><span>Ingin Tumbuh.</span>",

            heroDescription:
                "Bangun identitas digital yang modern, cepat, responsive, dan profesional untuk membuat bisnis kamu terlihat lebih terpercaya.",

            heroButton:
                "Konsultasi Gratis",

            heroPortfolio:
                "Lihat Portfolio",

            aboutTitle:
                "Bukan sekadar website.<br><span>Kami membangun pengalaman digital.</span>",

            aboutDescription:
                "HABIBI.ID membantu bisnis, personal brand, toko, dan organisasi membangun website yang terlihat profesional dan mudah digunakan.",

            servicesTitle:
                "Solusi digital<br>untuk kebutuhanmu.",

            servicesDescription:
                "Pilih layanan yang sesuai dengan kebutuhan bisnis dan project kamu."

        },

        en: {

            navHome: "Home",
            navAbout: "About",
            navServices: "Services",
            navProjects: "Portfolio",
            navTestimonials: "Testimonials",
            navContact: "Contact",
            navStart: "Start Project",

            heroTitle:
                "Professional Website<br>for Businesses That<br><span>Want to Grow.</span>",

            heroDescription:
                "Build a modern, fast, responsive and professional digital identity that makes your business more trusted online.",

            heroButton:
                "Free Consultation",

            heroPortfolio:
                "View Portfolio",

            aboutTitle:
                "More than a website.<br><span>We build digital experiences.</span>",

            aboutDescription:
                "HABIBI.ID helps businesses, personal brands, stores and organizations build professional and easy-to-use websites.",

            servicesTitle:
                "Digital solutions<br>for your needs.",

            servicesDescription:
                "Choose the service that fits your business and project needs."

        }

    };


    let currentLanguage =
        localStorage.getItem("habibi-language") || "id";


    function applyLanguage(language) {

        currentLanguage = language;

        localStorage.setItem(
            "habibi-language",
            language
        );

        document.documentElement.lang = language;

        document
            .querySelectorAll("[data-i18n]")
            .forEach(element => {

                const key =
                    element.getAttribute("data-i18n");

                if (
                    translations[language] &&
                    translations[language][key]
                ) {

                    element.innerHTML =
                        translations[language][key];

                }

            });

        const languageSwitch =
            document.getElementById("languageSwitch");

        if (languageSwitch) {

            languageSwitch.textContent =
                language === "id" ? "EN" : "ID";

        }

    }


    applyLanguage(currentLanguage);


    document
        .getElementById("languageSwitch")
        ?.addEventListener("click", () => {

            applyLanguage(
                currentLanguage === "id"
                    ? "en"
                    : "id"
            );

        });


    /* ========================================================
       MOBILE MENU
    ======================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.getElementById("navMenu");


    menuToggle?.addEventListener("click", () => {

        navMenu?.classList.toggle("open");

    });


    document
        .querySelectorAll(".nav-link")
        .forEach(link => {

            link.addEventListener("click", () => {

                navMenu?.classList.remove("open");

            });

        });


    /* ========================================================
       NAVBAR SCROLL
    ======================================================== */

    const navbar =
        document.getElementById("navbar");


    function handleNavbar() {

        if (!navbar) return;

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );

    }


    window.addEventListener(
        "scroll",
        handleNavbar,
        { passive: true }
    );

    handleNavbar();


    /* ========================================================
       ACTIVE NAV
    ======================================================== */

    const sections =
        document.querySelectorAll("main section[id]");

    const navLinks =
        document.querySelectorAll(".nav-link");


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const id =
                        entry.target.getAttribute("id");

                    navLinks.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${id}`
                        );

                    });

                });

            },
            {
                threshold: .35
            }
        );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });


    /* ========================================================
       REVEAL ANIMATION
    ======================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* ========================================================
       FAQ
    ======================================================== */

    document
        .querySelectorAll(".faq-question")
        .forEach(button => {

            button.addEventListener("click", () => {

                const item =
                    button.closest(".faq-item");

                document
                    .querySelectorAll(".faq-item.open")
                    .forEach(openItem => {

                        if (openItem !== item) {

                            openItem.classList.remove(
                                "open"
                            );

                        }

                    });

                item?.classList.toggle("open");

            });

        });


    /* ========================================================
       SMOOTH INTERNAL LINKS
    ======================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });


    /* ========================================================
       EXTERNAL AAN PROTECTION
       ======================================================== */

    document
        .querySelectorAll(
            'a[href="https://website-kulkas-aan.vercel.app/"]'
        )
        .forEach(link => {

            link.addEventListener("click", () => {

                console.log(
                    "Membuka Website AAN secara eksternal."
                );

                console.log(
                    "HABIBI.ID tidak mengubah website AAN."
                );

            });

        });


    console.log(
        "%cHABIBI.ID",
        "font-size:22px;font-weight:900;"
    );

    console.log(
        "Digital Solution • 2026"
    );

});


/* ============================================================
   HABIBI.ID 2026
   LANGUAGE SWITCH - NAVBAR ONLY
   Only these 6 navbar items change:
   Home / About / Services / Portfolio / Testimonials / Contact
   ============================================================ */

(function initNavbarOnlyLanguage() {
    const navbarTranslations = {
        id: {
            home: "Beranda",
            about: "Tentang",
            services: "Layanan",
            portfolio: "Portofolio",
            testimonials: "Testimoni",
            contact: "Kontak"
        },
        en: {
            home: "Home",
            about: "About",
            services: "Services",
            portfolio: "Portfolio",
            testimonials: "Testimonials",
            contact: "Contact"
        }
    };

    const selectors = {
        home: 'a[href="#home"]',
        about: 'a[href="#about"]',
        services: 'a[href="#services"]',
        portfolio: 'a[href="#projects"]',
        testimonials: 'a[href="#testimonials"]',
        contact: 'a[href="#contact"]'
    };

    function getCurrentNavLanguage() {
        return localStorage.getItem("habibi-language") || "id";
    }

    function setNavbarLanguage(language) {
        const lang = language === "en" ? "en" : "id";
        const labels = navbarTranslations[lang];

        Object.keys(selectors).forEach(function(key) {
            const elements = document.querySelectorAll(selectors[key]);

            elements.forEach(function(element) {
                const span = element.querySelector("span");

                if (span) {
                    const iconText = span.textContent;
                    element.childNodes.forEach(function(node) {
                        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                            node.textContent = " " + labels[key] + " ";
                        }
                    });
                } else {
                    element.textContent = labels[key];
                }
            });
        });
    }

    function restoreNonNavbarContent() {
        /*
         * Do NOT translate the rest of the website.
         * Navbar is the only bilingual section.
         */
        const protectedSelectors = [
            '[data-i18n]:not(.nav-links a)',
            '.hero [data-i18n]',
            '#about [data-i18n]',
            '#services [data-i18n]',
            '#projects [data-i18n]',
            '#testimonials [data-i18n]',
            '#contact [data-i18n]'
        ];

        protectedSelectors.forEach(function(selector) {
            document.querySelectorAll(selector).forEach(function(element) {
                if (element.dataset.habibiOriginalText) {
                    element.textContent = element.dataset.habibiOriginalText;
                }
            });
        });
    }

    function saveOriginalContent() {
        document.querySelectorAll("[data-i18n]").forEach(function(element) {
            if (
                !element.matches('.nav-links a') &&
                !element.dataset.habibiOriginalText
            ) {
                element.dataset.habibiOriginalText = element.textContent;
            }
        });
    }

    function applyNavbarOnly() {
        saveOriginalContent();
        restoreNonNavbarContent();
        setNavbarLanguage(getCurrentNavLanguage());
    }

    function connectLanguageButton() {
        const languageButton =
            document.querySelector("#languageSwitch") ||
            document.querySelector(".language-switch") ||
            document.querySelector(".lang-switch") ||
            document.querySelector("[data-language-switch]");

        if (!languageButton) {
            applyNavbarOnly();
            return;
        }

        /*
         * After the existing language system runs,
         * immediately restore every section except navbar.
         */
        languageButton.addEventListener("click", function() {
            setTimeout(function() {
                const current = localStorage.getItem("habibi-language") || "id";
                saveOriginalContent();
                restoreNonNavbarContent();
                setNavbarLanguage(current);
            }, 20);

            setTimeout(function() {
                const current = localStorage.getItem("habibi-language") || "id";
                restoreNonNavbarContent();
                setNavbarLanguage(current);
            }, 150);
        });

        applyNavbarOnly();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", connectLanguageButton);
    } else {
        connectLanguageButton();
    }

    /*
     * Keep navbar language correct if another script changes the DOM.
     */
    const observer = new MutationObserver(function() {
        const current = getCurrentNavLanguage();

        requestAnimationFrame(function() {
            restoreNonNavbarContent();
            setNavbarLanguage(current);
        });
    });

    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    } else {
        document.addEventListener("DOMContentLoaded", function() {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }
})();
