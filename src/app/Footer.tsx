'use client'

import Link from 'next/link';
import { FC } from 'react';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { BiLogoInstagramAlt } from 'react-icons/bi';
import { BsPinterest, BsYoutube } from 'react-icons/bs';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import logo from "@/public/assets/CovetenLogo.png";

// Types for our navigation and social links
interface NavigationLink {
  title: string;
  href: string;
}

interface SocialLink {
  icon: JSX.Element;
  href: string;
  ariaLabel: string;
}

// Sample data
const navigationLinks: NavigationLink[] = [
  { title: 'What We Do', href: '/' },
  { title: 'Products', href: '/products' },
  { title: 'Insights', href: '/insights' },
  { title: 'Benefits', href: '/benefits' },
  { title: 'About Us', href: '/about' },
  { title: 'Contact', href: '/contact' },
  { title: 'Careers', href: '/careers' },
  { title: 'Support', href: '/support' }
];

const socialLinks: SocialLink[] = [
  { 
    icon: <FaFacebook className="w-6 h-6" />, 
    href: 'https://www.facebook.com/profile.php?id=61553710623584',
    ariaLabel: 'Visit our Facebook page'
  },
  { 
    icon: <AiFillTwitterCircle className="w-6 h-6" />, 
    href: 'https://twitter.com/Xcoveten',
    ariaLabel: 'Visit our Twitter profile'
  },
  { 
    icon: <BiLogoInstagramAlt className="w-7 h-7" />, 
    href: 'https://www.instagram.com/coveten_technologies_india',
    ariaLabel: 'Visit our Instagram profile'
  },
  { 
    icon: <BsPinterest className="w-6 h-6" />, 
    href: 'https://in.pinterest.com/pcoveten/',
    ariaLabel: 'Visit our Pinterest profile'
  },
  { 
    icon: <BsYoutube className="w-6 h-6" />, 
    href: 'https://www.youtube.com/@Coveten',
    ariaLabel: 'Visit our YouTube channel'
  },
  { 
    icon: <FaLinkedin className="w-6 h-6" />, 
    href: 'https://www.linkedin.com/company/coveten-industrial-solutions/',
    ariaLabel: 'Visit our LinkedIn profile'
  }
];

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-[50] bg-gradient-to-b from-gray-900 to-black pt-12 pb-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between mb-12">
          {/* Logo and Social Links */}
          <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
            <img 
              src={logo.src} 
              alt="Coveten Logo" 
              className="w-48 mb-6"
            />
            <p className="text-gray-300 mb-6">
              Engineering solutions that transform industries. Innovating for a better tomorrow.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={social.ariaLabel}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3">
                  {navigationLinks.slice(i * 2, (i * 2) + 2).map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Bottom Section */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Coveten. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;