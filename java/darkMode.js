
export function toggleDarkMode(){
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('.theme-icon');
    const rootElement = document.documentElement; // Detta är :root / <html>

    // Läs in sparat tema eller kolla om användarens system föredrar dark mode
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    // Sätt start-temat på :root
    rootElement.setAttribute('data-theme', initialTheme);
    themeIcon.textContent = initialTheme === 'dark' ? '🌙' : '☀️';

    // Växla tema vid klick
    themeToggleBtn.addEventListener('click', () => {
    const currentTheme = rootElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    rootElement.setAttribute('data-theme', newTheme);
    themeIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('theme', newTheme);
    });
}
