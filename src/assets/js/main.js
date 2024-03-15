document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById("mode-toggle");

    // Load saved preference from localStorage
    const preferredMode = localStorage.getItem('darkMode');

    // Set initial state based on saved preference
    if (preferredMode === 'enabled') {
        enableDarkMode();
        darkModeToggle.checked = true;  // <-- Add this line
    }

    // Function to enable dark mode
    function enableDarkMode() {
        document.documentElement.setAttribute('dark', '');
        localStorage.setItem('darkMode', 'enabled');
    }

    // Function to disable dark mode
    function disableDarkMode() {
        document.documentElement.removeAttribute('dark');
        localStorage.removeItem('darkMode');
    }

    // Function to toggle dark mode based on checkbox state
    function toggleDarkMode() {
        if (darkModeToggle.checked) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    }

    // Event listener for toggle switch change
    darkModeToggle.addEventListener('change', toggleDarkMode);
});