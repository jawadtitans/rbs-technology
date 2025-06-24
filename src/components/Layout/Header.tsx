import React, { useState, useEffect } from 'react';
import { Globe, Monitor, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import rbsLogo from '../../assets/images/rbs.png';
import manImg from '../../assets/images/man.jpg';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const courseCategories = [
    { name: t('programming'), icon: '💻', href: '#courses' },
    { name: t('english'), icon: '🌍', href: '#courses' },
    { name: t('itBasics'), icon: '🖥️', href: '#courses' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : ''}`}>
      {isScrolled ? (
        <div className="absolute inset-0 pointer-events-none" style={{zIndex:0}}>
          <div className="w-full h-full bg-gradient-to-b from-white/90 via-blue-100/80 to-indigo-100/60" />
        </div>
      ) : null}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('home')}>
            <img src={rbsLogo} alt="RBS Logo" className="w-10 h-10 rounded-lg object-contain p-1" />
            <span className={`text-xl font-bold transition-colors duration-300 ${isScrolled ? 'bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent' : 'text-white'}`}>RBS-Technology</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className={`font-medium transition-colors duration-200 ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
            >
              {t('home')}
            </button>
            
            <button
              onClick={() => scrollToSection('about')}
              className={`font-medium transition-colors duration-200 ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
            >
              {t('about')}
            </button>

            {/* Courses Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsCoursesOpen(true)}
                onMouseLeave={() => setIsCoursesOpen(false)}
                className={`flex items-center space-x-1 font-medium transition-colors duration-200 ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
              >
                <span>{t('courses')}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isCoursesOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isCoursesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setIsCoursesOpen(true)}
                    onMouseLeave={() => setIsCoursesOpen(false)}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2"
                  >
                    {courseCategories.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          scrollToSection('courses');
                          setIsCoursesOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-200"
                      >
                        <span className="text-xl">{category.icon}</span>
                        <span className="text-gray-700 font-medium">{category.name}</span>
                      </button>
                    ))}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={() => {
                          scrollToSection('courses');
                          setIsCoursesOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-blue-600 font-semibold hover:bg-blue-50 transition-colors duration-200"
                      >
                        View All Courses →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => scrollToSection('blog')}
              className={`font-medium transition-colors duration-200 ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
            >
              {t('blog')}
            </button>

            <button
              onClick={() => scrollToSection('community')}
              className={`font-medium transition-colors duration-200 ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
            >
              {t('community')}
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className={`font-medium transition-colors duration-200 ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
            >
              {t('contact')}
            </button>
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center space-x-2">
            <Globe className={`h-4 w-4 ${isScrolled ? 'text-gray-600' : 'text-white'}`} />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'dari')}
              className={`bg-transparent border-none text-sm font-medium focus:outline-none cursor-pointer transition-colors duration-300 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            >
              <option value="en">🇺🇸 EN</option>
              <option value="dari">🇦🇫 دری</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;