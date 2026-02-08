import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">KARTAVYA</h1>
              <p className="text-xs text-gray-600">NGO Incubator</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('ngos')} className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Our NGOs
            </button>
            <button onClick={() => scrollToSection('team')} className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Team
            </button>
            <button onClick={() => scrollToSection('mentors')} className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Mentors
            </button>
            <button onClick={() => scrollToSection('podcasts')} className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Podcasts
            </button>
            <button onClick={() => scrollToSection('events')} className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Events
            </button>
            <button
              onClick={() => scrollToSection('apply')}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              Apply Now
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t">
            <button onClick={() => scrollToSection('ngos')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50">
              Our NGOs
            </button>
            <button onClick={() => scrollToSection('team')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50">
              Team
            </button>
            <button onClick={() => scrollToSection('mentors')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50">
              Mentors
            </button>
            <button onClick={() => scrollToSection('podcasts')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50">
              Podcasts
            </button>
            <button onClick={() => scrollToSection('events')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50">
              Events
            </button>
            <button onClick={() => scrollToSection('apply')} className="block w-full text-left px-4 py-2 bg-emerald-600 text-white rounded-lg">
              Apply Now
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
