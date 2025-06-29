
import { FileCheck } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Contact Us', href: '#contact' }
  ];

  return (
    <footer className="bg-kagzat-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo and Description */}
          <div className="mb-8 md:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <FileCheck className="h-8 w-8 text-kagzat-yellow" />
              <span className="text-2xl font-bold">Kagzat</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Revolutionizing document validation with secure, verifiable, and instant protocols for the digital age.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-kagzat-yellow transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Kagzat Protocol. All rights reserved. Building the future of document validation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
