document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById("mode-toggle");
  
    // Load saved preference from localStorage
    const preferredMode = localStorage.getItem('darkMode');
  
    // Set initial state based on saved preference
    if (preferredMode === 'enabled') {
      isDarkOn = true; // Set the variable for clarity
      enableDarkMode(); // Apply dark styles
      darkModeToggle.checked = true; // Set visual state of toggle
    } else {
      isDarkOn = false; // Set the variable for clarity
      disableDarkMode(); // Apply light styles
    }
  
    // Function to enable dark mode
    function enableDarkMode() {
      document.documentElement.setAttribute('dark', '');
      localStorage.setItem('darkMode', 'enabled'); // Save preference
    }
  
    // Function to disable dark mode
    function disableDarkMode() {
      document.documentElement.removeAttribute('dark');
      localStorage.removeItem('darkMode'); // Clear preference
    }
  
    // Function to toggle dark mode based on checkbox state
    function toggleDarkMode() {
      isDarkOn = !isDarkOn;
      if (isDarkOn) {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    }
  
    // Event listener for toggle switch change
    darkModeToggle.addEventListener('click', toggleDarkMode);
  });