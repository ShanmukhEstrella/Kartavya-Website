import { Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">KARTAVYA</h3>
                <p className="text-xs text-gray-400">NGO Incubator</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering NGOs to create lasting social impact through mentorship, resources, and collaboration.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => document.getElementById('ngos')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Our NGOs
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('mentors')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Mentors
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Events
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => document.getElementById('podcasts')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Podcasts
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Apply Now
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start">
                <Mail size={16} className="mr-2 mt-1 flex-shrink-0 text-emerald-400" />
                <a href="mailto:info@kartavya.org" className="hover:text-emerald-400 transition-colors">
                  info@kartavya.org
                </a>
              </li>
              <li className="flex items-start">
                <Phone size={16} className="mr-2 mt-1 flex-shrink-0 text-emerald-400" />
                <span>+91 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 flex-shrink-0 text-emerald-400" />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} KARTAVYA. All rights reserved.
          </p>
          <div className="flex items-center text-sm text-gray-400">
            <span>Made with</span>
            <Heart className="mx-2 text-red-500" size={16} fill="currentColor" />
            <span>for social impact</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
