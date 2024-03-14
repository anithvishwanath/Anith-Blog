document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById("mode-toggle");
    let isSun = true;

    darkModeToggle.addEventListener('click', () => {
        document.documentElement.toggleAttribute('dark');

        if (document.documentElement.hasAttribute('dark')) {
            localStorage.setItem('darkMode', 'dark');
        } else {
            localStorage.setItem('darkMode', '');
        }
    });

    const currentMode = localStorage.getItem('darkMode');

    if (currentMode === 'dark') {
        document.documentElement.setAttribute('dark', '');
        toggleIcon();
    }
});