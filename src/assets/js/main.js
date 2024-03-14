document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById("mode-toggle");
    let isSun = true;

    // Function to create SVG element
    function createSVG(iconName) {
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        const use = document.createElementNS(svgNS, "use");
        use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", `#${iconName}`);
        svg.appendChild(use);
        return svg;
    }

    darkModeToggle.addEventListener('click', () => {
        document.documentElement.toggleAttribute('dark');

        // Toggle icon between sun and moon
        // if (isSun) {
        //     darkModeToggle.innerHTML = `{% raw %}{% lucide "moon" %}{% endraw %}`;
        // } else {
        //     darkModeToggle.innerHTML = '{% raw %}{% lucide "sun" %}{% endraw %}';
        // }
        // isSun = !isSun;

        if (document.documentElement.hasAttribute('dark')) {
            localStorage.setItem('darkMode', 'dark');
        } else {
            localStorage.setItem('darkMode', '');
        }
    });

    const currentMode = localStorage.getItem('darkMode');

    if (currentMode === 'dark') {
        document.documentElement.setAttribute('dark', '');
        // darkModeToggle.innerHTML = '{% raw %}{% lucide "sun", { "size": "24" } %}{% endraw %}';
        // isSun = false; // Set isSun to false to indicate moon icon is currently displayed
    }
});