import { useEffect, useState } from 'react';
import { Mail, Phone, Linkedin, Award } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Mentor } from '../types';

export default function MentorsSection() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const { data, error } = await supabase
        .from('mentors')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setMentors(data || []);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="mentors" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mentors</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Industry experts and thought leaders guiding our incubated NGOs to success
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-gray-100 rounded-xl h-64 animate-pulse" />
            ))}
          </div>
        ) : mentors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Mentor information coming soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {mentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <img
                      src={mentor.photo_url}
                      alt={mentor.name}
                      className="w-32 h-32 rounded-xl object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{mentor.name}</h3>
                    <div className="flex items-center text-emerald-600 mb-3">
                      <Award size={18} className="mr-2" />
                      <span className="font-medium">{mentor.expertise}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{mentor.bio}</p>

                    <div className="space-y-2">
                      <a
                        href={`mailto:${mentor.email}`}
                        className="flex items-center text-sm text-gray-700 hover:text-emerald-600 transition-colors"
                      >
                        <Mail size={16} className="mr-2" />
                        {mentor.email}
                      </a>
                      {mentor.phone && (
                        <a
                          href={`tel:${mentor.phone}`}
                          className="flex items-center text-sm text-gray-700 hover:text-emerald-600 transition-colors"
                        >
                          <Phone size={16} className="mr-2" />
                          {mentor.phone}
                        </a>
                      )}
                      {mentor.linkedin && (
                        <a
                          href={mentor.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-gray-700 hover:text-emerald-600 transition-colors"
                        >
                          <Linkedin size={16} className="mr-2" />
                          LinkedIn Profile
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
