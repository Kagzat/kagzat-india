
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'About', href: '#about', isSection: true },
    { name: 'How it Works', href: '#how-it-works', isSection: true },
    { name: 'Pricing', href: '#pricing', isSection: true },
    { name: 'Verify Document', href: '/document-verification', isSection: false, openNewTab: true },
    { name: 'Sign In', href: '/signin', isSection: false }
  ];

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-kagzat-black">
            Kagzat
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.isSection ? (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href.substring(1))}
                  className="text-gray-700 hover:text-kagzat-green transition-colors duration-200 font-medium cursor-pointer"
                >
                  {link.name}
                </button>
              ) : link.openNewTab ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-kagzat-green transition-colors duration-200 font-medium"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-700 hover:text-kagzat-green transition-colors duration-200 font-medium"
                >
                  {link.name}
                </Link>
              )
            ))}
            <Link to="/role-selection">
              <Button 
                className="bg-kagzat-yellow hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105"
              >
                Join the Revolution
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-kagzat-black" />
            ) : (
              <Menu className="h-6 w-6 text-kagzat-black" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 mt-4">
              {navLinks.map((link) => (
                link.isSection ? (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href.substring(1))}
                    className="text-gray-700 hover:text-kagzat-green transition-colors duration-200 font-medium py-2 text-left"
                  >
                    {link.name}
                  </button>
                ) : link.openNewTab ? (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-kagzat-green transition-colors duration-200 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-gray-700 hover:text-kagzat-green transition-colors duration-200 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <Link to="/role-selection">
                <Button 
                  className="bg-kagzat-yellow hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg w-full mt-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Join the Revolution
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
