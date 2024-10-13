import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Close dropdown on link click
  const handleLinkClick = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold" prefetch={false}>
          Test cesťák
        </Link>
        
        <nav className={`md:flex md:space-x-4 items-center ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          <Link to="/" className="block md:inline-block mt-4 md:mt-0 mr-4 md:mr-0 hover:text-accent" prefetch={false}>
            Přehled
          </Link>
          <Link to="/zajezdy" className="block md:inline-block mt-4 md:mt-0 mr-4 md:mr-0 hover:text-accent" prefetch={false}>
            Zájezdy
          </Link>
          <Link to="/o-nas" className="block md:inline-block mt-4 md:mt-0 mr-4 md:mr-0 hover:text-accent" prefetch={false}>
            O nás
          </Link>
          <Link to="/pruvodci" className="block md:inline-block mt-4 md:mt-0 mr-4 md:mr-0 hover:text-accent" prefetch={false}>
            Průvodci
          </Link>
          <Link to="/kontakty" className="block md:inline-block mt-4 md:mt-0 mr-4 md:mr-0 hover:text-accent" prefetch={false}>
            Kontakty
          </Link>

          {/* Dropdown Menu */}
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <div>
              <button
                onClick={toggleDropdown}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                Více
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5.23 7.21a.75.75 0 011.06 0L10 10.44l3.71-3.23a.75.75 0 111.06 1.06l-4.25 3.5a.75.75 0 01-1.06 0l-4.25-3.5a.75.75 0 010-1.06z" />
                </svg>
              </button>
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <Link
                    to="/sluzby"
                    onClick={handleLinkClick} // Close dropdown on link click
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    prefetch={false}
                  >
                    Služby
                  </Link>
                  <Link
                    to="/dokumenty"
                    onClick={handleLinkClick} // Close dropdown on link click
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    prefetch={false}
                  >
                    Dokumenty
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        <button 
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;