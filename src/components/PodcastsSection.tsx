import { useEffect, useState } from 'react';
import { Play, Clock, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Podcast } from '../types';

export default function PodcastsSection() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    try {
      const { data, error } = await supabase
        .from('podcasts')
        .select('*')
        .order('published_date', { ascending: false });

      if (error) throw error;
      setPodcasts(data || []);
    } catch (error) {
      console.error('Error fetching podcasts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="podcasts" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Podcasts</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Listen to inspiring conversations with social entrepreneurs and change-makers
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        ) : podcasts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Podcast episodes coming soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {podcasts.map((podcast) => (
              <div
                key={podcast.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="relative aspect-square bg-gradient-to-br from-emerald-400 to-teal-500 overflow-hidden group">
                  <img
                    src={podcast.cover_image_url}
                    alt={podcast.title}
                    className="w-full h-full object-cover"
                  />
                  {(podcast.audio_url || podcast.video_url) && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <a
                        href={podcast.audio_url || podcast.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                      >
                        <Play className="text-emerald-600 ml-1" size={28} />
                      </a>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{podcast.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{podcast.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      {new Date(podcast.published_date).toLocaleDateString()}
                    </div>
                    {podcast.duration && (
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2" />
                        {podcast.duration}
                      </div>
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
