import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
          <div className="flex items-center justify-center sm:justify-start">
            <Link to="/home" className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-md">
              <img
                src="/assets/logo.jpeg"
                alt="HealLink logo"
                className="h-8 w-8 rounded-md object-cover ring-1 ring-white/10"
              />
              <span className="ml-2 font-semibold tracking-wide">HealLink</span>
            </Link>
          </div>
          
          <nav className="flex items-center justify-center gap-4">
            <Link to="/privacy" className="text-white/80 hover:text-white transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/80 hover:text-white transition-colors text-sm">
              Terms of Service
            </Link>
          </nav>

          <div className="flex items-center justify-center sm:justify-end">
            <p className="text-sm text-white/60">&copy; {new Date().getFullYear()} HealLink. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
