import { ArrowRight, Sparkles, Users, TrendingUp } from 'lucide-react';

export default function Hero() {
  const scrollToApply = () => {
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6">
            <Sparkles className="text-emerald-600" size={20} />
            <span className="text-sm font-medium text-gray-700">Empowering NGOs to Create Impact</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Building Tomorrow's
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              Social Change Leaders
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            KARTAVYA is a premier NGO incubator dedicated to nurturing and scaling social impact organizations.
            We provide mentorship, resources, and a collaborative ecosystem to help NGOs transform communities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={scrollToApply}
              className="group bg-emerald-600 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 transition-all font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span>Join Our Incubator</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button
              onClick={() => document.getElementById('ngos')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-medium border border-gray-200"
            >
              Explore Our NGOs
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Users className="text-emerald-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Expert Mentorship</h3>
              <p className="text-gray-600 text-sm">Connect with industry leaders and experienced professionals</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="text-teal-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Scale Your Impact</h3>
              <p className="text-gray-600 text-sm">Access resources and strategies to amplify your reach</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="text-cyan-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Collaborative Network</h3>
              <p className="text-gray-600 text-sm">Join a community of change-makers and innovators</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
