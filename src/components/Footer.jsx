import React from "react";
import { Link } from "react-router-dom";
import { Shirt, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950/60 py-12 px-4 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Description */}
        <div className="md:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center">
              <Shirt className="h-4.5 w-4.5 text-white" />
            </span>
            <span className="text-lg font-black bg-gradient-to-r from-white via-slate-100 to-purple-400 bg-clip-text text-transparent tracking-tight">
              growify
            </span>
          </Link>
          <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
            The next-generation virtual fitting room. Empowering shoppers to
            visualize clothing instantly, reducing returns and styling wardrobes
            with zero friction.
          </p>
          <div className="flex items-center gap-4 text-slate-500">
            <a
              href="#"
              className="hover:text-purple-400 transition-colors"
              aria-label="Twitter"
            >
              <svg
                className="h-4.5 w-4.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a
              href="#"
              className="hover:text-purple-400 transition-colors"
              aria-label="Instagram"
            >
              <svg
                className="h-4.5 w-4.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="#"
              className="hover:text-purple-400 transition-colors"
              aria-label="GitHub"
            >
              <svg
                className="h-4.5 w-4.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          </div>
        </div>

        {/* Sitemap Quicklinks */}
        <div>
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-4">
            Workspace
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                to="/select"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Product Grid
              </Link>
            </li>
            <li>
              <Link
                to="/upload"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Fitting Upload
              </Link>
            </li>
            <li>
              <Link
                to="/tryon"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Fitting Room
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Info */}
        <div>
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-4">
            Resources
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                to="/admin"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Admin Panel
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Credits */}
      <div className="max-w-7xl mx-auto border-t border-slate-900/60 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>
          &copy; {new Date().getFullYear()} growify Inc. All rights reserved.
        </p>
        <p className="flex items-center gap-1">
          Made with{" "}
          <Heart className="h-3 w-3 text-purple-500 fill-purple-500" /> for
          modern fashion.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
