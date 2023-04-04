window.addEventListener("load", () => {
    const carousels = document.querySelectorAll(".slider-circle");
    for (let i = 0; i < carousels.length; i++) {
        carousel(carousels[i]);
    }
});

function carousel(root) {
    const figure = root.querySelector("figure");
    const nav = root.querySelector("nav");
    const images = figure.children;
    const n = images.length;
    const gap = root.dataset.gap || 0;
    const bfc = "bfc" in root.dataset;
    const theta = 2 * Math.PI / n;
    let currImage = 0;

    setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));

    window.addEventListener("resize", () => {
        setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
    });
    setupNavigation();

    function setupCarousel(n, s) {
        const apothem = s / (2 * Math.tan(Math.PI / n));
        figure.style.transformOrigin = `50% 50% ${-apothem}px`;
        for (let i = 0; i < n; i++) {
            images[i].style.padding = `0 ${gap}px`;
            images[i].style.transformOrigin = `50% 50% ${-apothem}px`;
            images[i].style.transform = `rotateY(${i * theta}rad)`;
            if (bfc) {
                images[i].style.backfaceVisibility = "hidden";
            }
        }
        rotateCarousel(currImage);
    }

    function setupNavigation() {
        nav.addEventListener("click", onClick, true);
        function onClick(e) {
            e.stopPropagation();
            const t = e.target;
            if (t.tagName.toUpperCase() !== "BUTTON") {
                return;
            }
            if (t.classList.contains("next")) {
                currImage++;
            } else {
                currImage--;
            }
            rotateCarousel(currImage);
        }
    }

    function rotateCarousel(imageIndex) {
        figure.style.transform = `rotateY(${imageIndex * -theta}rad)`;
    }
}