import { useEffect, useState } from 'react';
import { Mail, Linkedin } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { TeamMember } from '../types';

export default function TeamSection() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setTeam(data || []);
    } catch (error) {
      console.error('Error fetching team:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the passionate individuals driving KARTAVYA's mission to empower NGOs
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        ) : team.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Team information coming soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="aspect-square bg-gradient-to-br from-emerald-100 to-teal-100 overflow-hidden">
                  <img
                    src={member.photo_url}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
                  {member.bio && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.bio}</p>
                  )}
                  <div className="flex items-center space-x-3">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="p-2 bg-gray-100 hover:bg-emerald-100 rounded-lg transition-colors"
                        title="Email"
                      >
                        <Mail size={18} className="text-gray-700" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 hover:bg-emerald-100 rounded-lg transition-colors"
                        title="LinkedIn"
                      >
                        <Linkedin size={18} className="text-gray-700" />
                      </a>
                    )}
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
