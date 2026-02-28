import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";


const blogCategories = [
  { name: "All", value: "all" },
  { name: "Campus Pulse", value: "Campus Pulse" },
  { name: "Montage", value: "Montage" },
  { name: "SciTech", value: "SciTech" },
  { name: "AlumSpace", value: "AlumSpace" },
  { name: "Internview", value: "InternView" },
  { name: "Open Page", value: "Open Page" },
  { name: "Beyond The Classroom", value: "Beyond The Classroom" },
];

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState(""); // ✅ search state
  const router = useRouter();
  const { category } = router.query;
  const isStoriesPage = router.pathname === "/stories";


  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blogs", href: "/stories" },
    { name: "Aperture", href: "/aperture" },
    { name: "Humans Of Gct", href: "/humansofgct" },
    { name: "Alumspace", href: "/alumspace" },
    { name: "SJC Channel", href: "https://www.youtube.com/channel/UCA0xGzzdoMFt4Kq9UtTDsig" },
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
  ];

  // ✅ Search handler
  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
   <div
  className={`sticky top-0 z-40 bg-white dark:bg-grey-900 border-b border-gray-200 dark:border-grey-700 transition-all duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <nav
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          scrolled ? "py-1" : "py-2"
        }`}
      >
        {/* Top Row */}
      {/* Top Row */}
      <div
        className={`hidden lg:flex flex-col items-center justify-center
        transition-all duration-500 ease-in-out
        ${
          scrolled
            ? "opacity-0 -translate-y-4 pointer-events-none absolute"
            : "opacity-100 translate-y-0 relative mb-3"
        }
      `}
      >
           {/* Light mode logo */}
        <img
          className="h-16 w-24 block dark:hidden"
          src="/images/sjc.svg"
          alt="SJC Logo"
        />

        {/* Dark mode logo */}
        <img
          className="h-16 w-24 hidden dark:block"
          src="/images/sjc_white.svg"
          alt="SJC Logo"
        />

          {/* Desktop Search */}
          <div className="absolute right-0 hidden lg:flex items-center gap-2">
            <div className="bg-gray-100 border border-gray-200 text-black dark:text-white dark:bg-grey-800 dark:border-white rounded-full px-3 py-1 flex items-center hover:bg-white hover:shadow-sm transition-colors transition-shadow duration-200">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search..."
                className="bg-transparent outline-none text-sm w-32"
              />
            </div>
          </div>
        </div>

        {/* Desktop Navbar */}
        <div className="hidden lg:flex justify-center mt-3">
          <div className="bg-[#D9D9D9] rounded-full px-2 py-1 flex items-center gap-1.5 w-fit">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? router.pathname === "/"
                  : router.pathname === link.href;

              return (
                <Link key={link.name} href={link.href}>
                  <span
                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full transition-colors transition-shadow duration-200 cursor-pointer ${
                      isActive
                        ? "bg-white text-black shadow-sm scale-105"
                        : "text-gray-700 hover:bg-white hover:shadow-sm hover:scale-105"
                    }`}
                  >
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Blog Category Pills */}
        {isStoriesPage && (
          <div className="hidden lg:flex justify-center mt-4">
            <div className="bg-[#D9D9D9] rounded-full px-2 py-1 flex items-center gap-1.5 w-fit">
              {blogCategories.map((cat) => {
                const isActiveCategory =
                  (!category && cat.value === "all") ||
                  category === cat.value;

                return (
                  <button
                    key={cat.name}
                    onClick={() =>
                      cat.value === "all"
                        ? router.push("/stories")
                        : router.push(
                            `/stories?category=${cat.value}`
                          )
                    }
                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full transition-colors transition-shadow duration-200 ${
                      isActiveCategory
                        ? "bg-white text-black shadow-sm scale-105"
                        : "text-gray-700 hover:bg-white hover:shadow-sm hover:scale-105"
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}
            
        {/* Mobile Toggle */}
        <div className="flex justify-between items-center lg:hidden">
          <Link href="/">
            <a onClick={() => setIsOpen(false)} className="cursor-pointer">
              <img
                className="h-10 w-10 block dark:hidden"
                src="/images/sjc.svg"
                alt="SJC Logo"
              />

              {/* Dark mode logo */}
              <img
                className="h-10 w-10 hidden dark:block"
                src="/images/sjc_white.png"
                alt="SJC Logo"
              />
            </a>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
          >
            {!isOpen ? "☰" : "✕"}
          </button>
        </div>

        {/* Mobile Menu */}
        <Transition
          show={isOpen}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-2"
        >
          <div className="lg:hidden mt-4 bg-[#F3F4F6] rounded-2xl p-4 space-y-3 shadow-md">

            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? router.pathname === "/"
                  : router.pathname === link.href;

              if (link.href.startsWith("http")) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-4 py-2 rounded-full bg-white text-gray-700 shadow-sm transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                );
              }

              return (
                <Link key={link.name} href={link.href}>
                  <a
                    onClick={() => setIsOpen(false)}
                    className={`block w-full text-center px-4 py-2 rounded-full transition-colors duration-200 ${
                      isActive
                        ? "bg-white text-black shadow-sm"
                        : "bg-gray-200 text-gray-700 hover:bg-white hover:shadow-sm"
                    }`}
                  >
                    {link.name}
                  </a>
                </Link>
              );
            })}

          </div>
        </Transition>
      </nav>
    </div>
  );
}

export default Nav;