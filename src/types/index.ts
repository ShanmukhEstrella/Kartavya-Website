export interface NGO {
  id: string;
  name: string;
  logo_url: string;
  description: string;
  website?: string;
  founded_date?: string;
  incubation_date: string;
  status: string;
  created_at: string;
}

export interface NGOMember {
  id: string;
  ngo_id: string;
  name: string;
  role: string;
  photo_url?: string;
  bio?: string;
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo_url: string;
  bio?: string;
  email?: string;
  linkedin?: string;
  display_order: number;
  created_at: string;
}

export interface Mentor {
  id: string;
  name: string;
  photo_url: string;
  expertise: string;
  bio: string;
  email: string;
  phone?: string;
  linkedin?: string;
  display_order: number;
  created_at: string;
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  cover_image_url: string;
  audio_url?: string;
  video_url?: string;
  published_date: string;
  duration?: string;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  image_url?: string;
  status: 'upcoming' | 'past' | 'ongoing';
  created_at: string;
}

export interface NGOApplication {
  ngo_name: string;
  contact_person: string;
  email: string;
  phone: string;
  description: string;
  pitch_deck_url: string;
  website?: string;
}
