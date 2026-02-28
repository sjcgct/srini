import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = dark ? "light" : "dark";

    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
    setDark(!dark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 left-6 z-50 bg-grey-800 dark:bg-white border border-grey-300 dark:border-grey-700 p-3 rounded-full shadow-lg hover:scale-110 transition duration-300"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}