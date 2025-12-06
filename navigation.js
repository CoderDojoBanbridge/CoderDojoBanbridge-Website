// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Create hamburger menu if it doesn't exist
    const navContainer = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');
    
    // Check if toggle button already exists
    if (!document.querySelector('.nav-toggle')) {
        const navToggle = document.createElement('button');
        navToggle.className = 'nav-toggle';
        navToggle.setAttribute('aria-label', 'Toggle navigation');
        navToggle.innerHTML = '<span></span><span></span><span></span>';
        
        // Insert after nav-logo
        const navLogo = document.querySelector('.nav-logo');
        navLogo.insertAdjacentElement('afterend', navToggle);
    }
    
    const navToggle = document.querySelector('.nav-toggle');
    
    // Toggle menu on click
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navContainer.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});
