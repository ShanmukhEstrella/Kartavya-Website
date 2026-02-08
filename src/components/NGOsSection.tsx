import { useEffect, useState } from 'react';
import { ExternalLink, X, Calendar, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { NGO, NGOMember } from '../types';

export default function NGOsSection() {
  const [ngos, setNgos] = useState<NGO[]>([]);
  const [selectedNGO, setSelectedNGO] = useState<NGO | null>(null);
  const [ngoMembers, setNgoMembers] = useState<NGOMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNGOs();
  }, []);

  useEffect(() => {
    if (selectedNGO) {
      fetchNGOMembers(selectedNGO.id);
    }
  }, [selectedNGO]);

  const fetchNGOs = async () => {
    try {
      const { data, error } = await supabase
        .from('ngos')
        .select('*')
        .eq('status', 'active')
        .order('incubation_date', { ascending: false });

      if (error) throw error;
      setNgos(data || []);
    } catch (error) {
      console.error('Error fetching NGOs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNGOMembers = async (ngoId: string) => {
    try {
      const { data, error } = await supabase
        .from('ngo_members')
        .select('*')
        .eq('ngo_id', ngoId)
        .order('created_at');

      if (error) throw error;
      setNgoMembers(data || []);
    } catch (error) {
      console.error('Error fetching NGO members:', error);
    }
  };

  return (
    <section id="ngos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Incubated NGOs</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the innovative organizations we're proud to support in their journey to create meaningful social impact
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-xl h-64 animate-pulse" />
            ))}
          </div>
        ) : ngos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No NGOs currently incubated. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ngos.map((ngo) => (
              <div
                key={ngo.id}
                onClick={() => setSelectedNGO(ngo)}
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
              >
                <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={ngo.logo_url}
                    alt={ngo.name}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {ngo.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {ngo.description}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={16} className="mr-2" />
                  Incubated: {new Date(ngo.incubation_date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedNGO && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{selectedNGO.name}</h2>
              <button
                onClick={() => setSelectedNGO(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-center bg-gray-50 rounded-lg p-8 mb-6">
                <img
                  src={selectedNGO.logo_url}
                  alt={selectedNGO.name}
                  className="max-h-32 object-contain"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {selectedNGO.founded_date && (
                  <div className="flex items-center text-gray-600">
                    <Calendar size={20} className="mr-2 text-emerald-600" />
                    <div>
                      <p className="text-sm text-gray-500">Founded</p>
                      <p className="font-medium">{new Date(selectedNGO.founded_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center text-gray-600">
                  <Calendar size={20} className="mr-2 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-500">Incubated</p>
                    <p className="font-medium">{new Date(selectedNGO.incubation_date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {selectedNGO.website && (
                <a
                  href={selectedNGO.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 mb-6"
                >
                  <ExternalLink size={16} />
                  <span>Visit Website</span>
                </a>
              )}

              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3">About</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{selectedNGO.description}</p>
              </div>

              {ngoMembers.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Users size={20} className="mr-2" />
                    Team Members
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {ngoMembers.map((member) => (
                      <div key={member.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        {member.photo_url ? (
                          <img
                            src={member.photo_url}
                            alt={member.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-xl font-bold text-gray-600">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <h4 className="font-semibold text-gray-900">{member.name}</h4>
                          <p className="text-sm text-emerald-600 mb-1">{member.role}</p>
                          {member.bio && (
                            <p className="text-sm text-gray-600">{member.bio}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
