/**
 * ==========================================================================
 * theme.js - Unified Dark / Light Theme Switcher for PDFNetizen
 * Executed in <head> for zero-flicker immediate theming + reactive controls
 * ==========================================================================
 */

(function () {
  'use strict';

  // Instant inline SVGs to avoid any rendering delay or icon flash
  var SUN_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
  var MOON_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';

  /**
   * Determine the active theme:
   * 1. Check localStorage for 'theme' ('dark' | 'light')
   * 2. Fallback to OS system preference via matchMedia
   * 3. Fallback to 'dark' by default
   */
  function getPreferredTheme() {
    try {
      var saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
    } catch (err) {
      // Ignore localStorage access restrictions
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  /**
   * Apply theme attribute and CSS classes to document root and body
   */
  function applyTheme(theme) {
    var root = document.documentElement;
    root.setAttribute('data-theme', theme);

    if (theme === 'dark') {
      root.classList.add('theme-dark');
      root.classList.remove('theme-light');
    } else {
      root.classList.add('theme-light');
      root.classList.remove('theme-dark');
    }

    if (document.body) {
      if (theme === 'dark') {
        document.body.classList.add('theme-dark');
        document.body.classList.remove('theme-light');
      } else {
        document.body.classList.add('theme-light');
        document.body.classList.remove('theme-dark');
      }
    }

    updateToggleButtons(theme);
  }

  /**
   * Update all theme toggle buttons on the page with appropriate icon and label
   */
  function updateToggleButtons(theme) {
    var buttons = document.querySelectorAll('#theme-toggle, .theme-toggle-btn');
    buttons.forEach(function (btn) {
      if (theme === 'dark') {
        // Dark mode: show Sun icon to switch to light mode
        btn.innerHTML = SUN_ICON_SVG;
        btn.setAttribute('title', 'Switch to Light Mode / التبديل إلى الوضع الفاتح');
        btn.setAttribute('aria-label', 'Switch to light theme');
      } else {
        // Light mode: show Moon icon to switch to dark mode
        btn.innerHTML = MOON_ICON_SVG;
        btn.setAttribute('title', 'Switch to Dark Mode / التبديل إلى الوضع الداكن');
        btn.setAttribute('aria-label', 'Switch to dark theme');
      }
    });

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try {
        window.lucide.createIcons();
      } catch (e) {}
    }
  }

  /**
   * Toggle between dark and light themes
   */
  function toggleTheme() {
    var currentTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
    var newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    try {
      localStorage.setItem('theme', newTheme);
    } catch (err) {}

    applyTheme(newTheme);

    // Notify any listening components / canvas renderers
    try {
      window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: newTheme } }));
    } catch (e) {}
  }

  // 1. Immediate execution on parse (in <head>) to prevent FOUC (Flash of Unstyled Content)
  var initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // 2. Setup interactive controls and listeners once DOM is ready
  function initThemeControls() {
    var current = document.documentElement.getAttribute('data-theme') || initialTheme;
    applyTheme(current);

    // Global event delegation for all present and future theme buttons
    document.addEventListener('click', function (e) {
      var toggleBtn = e.target.closest('#theme-toggle, .theme-toggle-btn');
      if (toggleBtn) {
        e.preventDefault();
        toggleTheme();
      }
    });

    // Listen for OS system theme changes if user hasn't set an explicit preference
    if (window.matchMedia) {
      var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      var handler = function (e) {
        try {
          if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
          }
        } catch (err) {}
      };

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handler);
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handler);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeControls);
  } else {
    initThemeControls();
  }

  // Expose global ThemeController API
  window.ThemeController = {
    getTheme: function () {
      return document.documentElement.getAttribute('data-theme') || initialTheme;
    },
    setTheme: function (theme) {
      if (theme === 'dark' || theme === 'light') {
        try {
          localStorage.setItem('theme', theme);
        } catch (e) {}
        applyTheme(theme);
      }
    },
    toggleTheme: toggleTheme
  };
})();
