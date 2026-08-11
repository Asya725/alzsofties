// 1. Removed 'Instagram' from the import list
import { ChevronRight, MapPin, Phone, Mail, Globe } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[#a4133c] dark:bg-gray-950 border-t border-transparent dark:border-gray-800 text-white pt-16 pb-6 w-full mt-auto font-['Poppins',sans-serif] transition-colors duration-300"
      id="about"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-black tracking-wide text-white">
              ALZSOFTIE
            </h2>
            <p className="text-rose-100/90 dark:text-gray-400 text-sm leading-relaxed max-w-xs transition-colors">
              Small-batch clothing made to be worn for years, not seasons. Based
              in Phnom Penh, shipped worldwide.
            </p>
            {/* Highlight Box */}
            <div className="inline-flex items-center gap-3 bg-white/10 dark:bg-gray-900/50 border border-white/20 dark:border-gray-800 rounded-lg px-4 py-3 mt-2 w-fit shadow-sm backdrop-blur-sm transition-colors">
              <Globe size={18} className="text-rose-200 dark:text-rose-500" />
              <span className="text-xs font-semibold text-white dark:text-gray-200 tracking-wide transition-colors">
                Worldwide Shipping Available
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-rose-200 dark:text-gray-100 mb-6 transition-colors">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                "Shop All",
                "Men's Collection",
                "Women's Collection",
                "Accessories",
              ].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="group flex items-center text-sm text-rose-100/90 dark:text-gray-400 hover:text-white dark:hover:text-rose-400 transition-colors"
                  >
                    <ChevronRight
                      size={14}
                      className="mr-2 text-rose-300 dark:text-gray-600 group-hover:text-white dark:group-hover:text-rose-400 transition-colors"
                    />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-rose-200 dark:text-gray-100 mb-6 transition-colors">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start text-sm text-rose-100/90 dark:text-gray-400 transition-colors">
                <MapPin
                  size={18}
                  className="mr-3 text-rose-300 dark:text-gray-500 shrink-0 mt-0.5 transition-colors"
                />
                <span>Phnom Penh, Cambodia.</span>
              </li>
              <li className="flex items-center text-sm text-rose-100/90 dark:text-gray-400 transition-colors">
                <Phone
                  size={18}
                  className="mr-3 text-rose-300 dark:text-gray-500 shrink-0 transition-colors"
                />
                <span>+855 85 264 570</span>
              </li>
              <li className="flex items-center text-sm text-rose-100/90 dark:text-gray-400 transition-colors">
                <Mail
                  size={18}
                  className="mr-3 text-rose-300 dark:text-gray-500 shrink-0 transition-colors"
                />
                <a
                  href="mailto:support@alzsoftie.store"
                  className="hover:text-white dark:hover:text-rose-400 transition-colors"
                >
                  support@alzsoftie.store
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-rose-200 dark:text-gray-100 mb-6 transition-colors">
              Follow Us
            </h3>
            <div className="flex items-center gap-3">
              {/* Facebook Icon */}
              <a
                href="https://www.facebook.com/share/18zjucDYiw/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#3b5998] dark:bg-[#3b5998]/80 flex items-center justify-center hover:bg-[#2d4373] dark:hover:bg-[#3b5998] transition-colors shadow-sm"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              {/* 2. Replaced lucide Instagram component with Raw SVG */}
              <a
                href="https://www.instagram.com/alzsoftiestore?igsh=ZmY4ZHhndXV1emVx"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-linear-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-6 border-t border-white/20 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors">
          <p className="text-xs text-rose-200/80 dark:text-gray-500 transition-colors">
            © {currentYear} Alzsoftie. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-rose-200/80 dark:text-gray-500 transition-colors">
            <a
              href="#privacy"
              className="hover:text-white dark:hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="hover:text-white dark:hover:text-gray-300 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
