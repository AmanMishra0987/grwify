import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LogOut,
  LayoutDashboard,
  Shirt,
  Image,
  Shield,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Products", path: "/select", icon: Shirt, protected: true },
    { name: "Photo Upload", path: "/upload", icon: Image, protected: true },
    { name: "Try-On", path: "/tryon", icon: Shirt, protected: true },
    { name: "Admin Panel", path: "/admin", icon: Shield, protected: false },
  ];

  const visibleLinks = navLinks.filter((link) => !link.protected || user);

  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-900 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="h-9 w-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
            <Shirt className="h-5 w-5 text-white" />
          </span>
          <span className="text-xl font-black bg-gradient-to-r from-white via-slate-100 to-purple-400 bg-clip-text text-transparent tracking-tight">
            growify
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5">
          {visibleLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/40 border border-transparent"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: User Profile / Call to Action */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl hover:bg-slate-800/60 transition-all duration-300 border border-transparent hover:border-slate-800"
              >
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="h-8 w-8 rounded-lg object-cover ring-2 ring-purple-500/20"
                />
                <span className="text-xs font-semibold text-slate-300">
                  {user.displayName}
                </span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-300 ${profileDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {profileDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setProfileDropdownOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2.5 w-56 rounded-xl border border-slate-800 bg-slate-900/95 backdrop-blur-xl p-2 shadow-2xl z-20 animate-in fade-in slide-in-from-top-3 duration-250">
                    <div className="px-3 py-2 border-b border-slate-800/50 mb-1.5">
                      <p className="text-xs text-slate-500">Signed in as</p>
                      <p className="text-sm font-semibold text-slate-200 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      to="/admin"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4 text-slate-400" />
                      Admin Dashboard
                    </Link>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors mt-1"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-500/10 hover:shadow-purple-500/20 active:scale-95 transition-all duration-300"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-800/60 text-slate-300 hover:text-white transition-colors"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 border-t border-slate-900 pt-3.5 space-y-2 animate-in slide-in-from-top-5 duration-300">
          {visibleLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/10"
                    : "text-slate-300 hover:bg-slate-850 hover:text-white"
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                {link.name}
              </Link>
            );
          })}

          <div className="pt-3.5 border-t border-slate-900 mt-2">
            {user ? (
              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-2.5">
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="h-9 w-9 rounded-lg object-cover"
                  />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-slate-200">
                      {user.displayName}
                    </p>
                    <p className="text-xs text-slate-500 truncate max-w-[150px]">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex justify-center py-2.5 rounded-lg text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
