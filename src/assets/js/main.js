const darkModeToggle = document.getElementById("mode-toggle");

const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

const enableDarkMode = () => {
    document.body.classList.add('dark');
    localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => {
    colorMode.classList.remove('dark');
}