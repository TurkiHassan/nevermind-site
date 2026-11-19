(function () {
  var root = document.documentElement;
  var store = {
    get: function (key) {
      try { return localStorage.getItem(key); } catch (error) { return null; }
    },
    set: function (key, value) {
      try { localStorage.setItem(key, value); } catch (error) {}
    }
  };

  var language = store.get("nm-lang") === "en" ? "en" : "ar";
  var savedTheme = store.get("nm-theme");
  var prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  var theme = savedTheme || (prefersLight ? "light" : "dark");

  function apply() {
    root.lang = language;
    root.dir = language === "ar" ? "rtl" : "ltr";
    root.dataset.theme = theme;
    var title = document.querySelector("title");
    var next = title && title.dataset[language];
    if (next) document.title = next;
  }

  apply();

  document.addEventListener("DOMContentLoaded", function () {
    var langButton = document.getElementById("lang-toggle");
    var themeButton = document.getElementById("theme-toggle");

    function label() {
      langButton.textContent = language === "ar" ? "English" : "العربية";
      langButton.setAttribute("aria-label", language === "ar" ? "Switch to English" : "التبديل إلى العربية");
      themeButton.textContent = theme === "dark" ? (language === "ar" ? "فاتح" : "Light") : (language === "ar" ? "داكن" : "Dark");
      themeButton.setAttribute("aria-label", theme === "dark"
        ? (language === "ar" ? "التبديل إلى الوضع الفاتح" : "Switch to light mode")
        : (language === "ar" ? "التبديل إلى الوضع الداكن" : "Switch to dark mode"));
    }

    langButton.addEventListener("click", function () {
      language = language === "ar" ? "en" : "ar";
      store.set("nm-lang", language);
      apply();
      label();
    });

    themeButton.addEventListener("click", function () {
      theme = theme === "dark" ? "light" : "dark";
      store.set("nm-theme", theme);
      apply();
      label();
    });

    label();
  });
})();
