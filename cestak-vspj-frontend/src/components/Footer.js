import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      &copy; {new Date().getFullYear()} Testovací Cestovní kancelář. Všechna práva vyhrazena.
    </footer>
  );
}

export default Footer;