import Header from './components/Header';
import Hero from './components/Hero';
import NGOsSection from './components/NGOsSection';
import TeamSection from './components/TeamSection';
import MentorsSection from './components/MentorsSection';
import PodcastsSection from './components/PodcastsSection';
import EventsSection from './components/EventsSection';
import ApplicationForm from './components/ApplicationForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <NGOsSection />
        <TeamSection />
        <MentorsSection />
        <PodcastsSection />
        <EventsSection />
        <ApplicationForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
