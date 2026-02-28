import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  // Load saved preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 left-6 z-50 bg-gray-200 dark:bg-gray-800 p-3 rounded-full shadow-lg hover:scale-110 transition"
    >
      {darkMode ? "🌙" : "☀️"}
    </button>
  );
}