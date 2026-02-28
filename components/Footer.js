import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-grey-700 text-dominantbg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Column 1 – About + Address */}
          <div>
            <h2 className="text-xl font-semibold mb-4 tracking-wide">
              Student Journalist Council
            </h2>

            <p className="text-sm leading-relaxed mb-6 opacity-80">
              SJC - GCT is the official student media body of 
              Government College of Technology, Coimbatore.
            </p>

            <div className="text-sm leading-6 opacity-80">
              <p>Government College of Technology</p>
              <p>Thadagam Road</p>
              <p>Coimbatore - 641013</p>

              <a
                href="https://goo.gl/maps/NX5hqshxhPgoLzZD9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-blue-400 hover:text-blue-300 hover:underline transition duration-300"
              >
                View on Map →
              </a>
            </div>
          </div>

          {/* Column 2 – Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              {[
                { name: "Stories", path: "/stories" },
                { name: "Aperture", path: "/aperture" },
                { name: "Humans of GCT", path: "/humansofgct" },
                { name: "AlumSpace", path: "/alumspace" },
                { name: "About", path: "/about" },
                { name: "Team", path: "/team" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path}>
                    <span className="cursor-pointer hover:text-white hover:pl-1 transition-all duration-200 ease-in-out">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 – Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Connect With Us
            </h3>

            <div className="flex gap-4">

              <a
                href="https://www.facebook.com/sjcgct"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-grey-600 p-3 rounded-lg hover:bg-black transition duration-300"
              >
                <img src="/images/facebook.svg" alt="Facebook" className="w-5 h-5" />
              </a>

              <a
                href="https://www.instagram.com/sjcgct/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-grey-600 p-3 rounded-lg hover:bg-black transition duration-300"
              >
                <img src="/images/instagram.svg" alt="Instagram" className="w-5 h-5" />
              </a>

              <a
                href="https://www.twitter.com/sjcgct"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-grey-600 p-3 rounded-lg hover:bg-black transition duration-300"
              >
                <img src="/images/x.svg" alt="X" className="w-5 h-5" />
              </a>

              <a
                href="https://www.linkedin.com/company/sjcgct"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-grey-600 p-3 rounded-lg hover:bg-black transition duration-300"
              >
                <img src="/images/linkedin-svgrepo-com.svg" alt="LinkedIn" className="w-5 h-5" />
              </a>

            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-grey-500 my-10" />

        {/* Bottom Copyright */}
        <div className="text-center text-sm opacity-70">
          © {new Date().getFullYear()} Student Journalist Council - GCT. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;