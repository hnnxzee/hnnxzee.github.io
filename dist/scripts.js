function toggleDarkMode() {
    let e = document.querySelector(".container");
    e.classList.toggle("dark-mode");
    let t = document.querySelector(".body");
    t.classList.toggle("dark-mode");
    let o = t.classList.contains("dark-mode");
    localStorage.setItem("darkModePreference", o);
}
function startSlideshow() {
    let e = 0,
        t = document.querySelectorAll(".slideshow img"),
        o = t.length;
    function r(e) {
        t.forEach((t, o) => {
            t.classList.toggle("active", o === e);
        });
    }
    r(e),
        setInterval(function t() {
            r((e = (e + 1) % o));
        }, 5e3);
}
window.addEventListener("load", function () {
    let e = localStorage.getItem("darkModePreference");
    if ("true" === e) {
        let t = document.querySelector(".container"),
            o = document.querySelector(".body");
        t.classList.add("dark-mode"), o.classList.add("dark-mode");
    }
}),
    startSlideshow();
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
lazyImages.forEach((e) => {
    e.addEventListener("load", () => {
        e.removeAttribute("loading");
    });
});
