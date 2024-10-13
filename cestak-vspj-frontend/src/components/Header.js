import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold" prefetch={false}>
          Test cesťák
        </Link>
        
        <nav className={`md:flex md:space-x-4 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
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