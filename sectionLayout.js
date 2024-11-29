const headers = document.querySelectorAll(".section header");
const fixedHeader = document.getElementById("current-header");
const observerOptions = {
    root: null, // viewport
    rootMargin: "0px",
    threshold: 0.5, // Trigger when 50% of the section is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            fixedHeader.textContent = entry.target.textContent;
        }
    });
}, observerOptions);

headers.forEach((header) => {
    observer.observe(header);
});
