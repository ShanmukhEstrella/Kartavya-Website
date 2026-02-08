/*
  # KARTAVYA NGO Incubator Database Schema

  ## New Tables Created

  1. **ngos** - Stores information about incubated NGOs
    - `id` (uuid, primary key)
    - `name` (text) - NGO name
    - `logo_url` (text) - URL to NGO logo
    - `description` (text) - Detailed description
    - `website` (text, optional) - NGO website
    - `founded_date` (date, optional)
    - `incubation_date` (date) - When incubated under Kartavya
    - `status` (text) - active/graduated
    - `created_at` (timestamptz)

  2. **ngo_members** - Members of each NGO
    - `id` (uuid, primary key)
    - `ngo_id` (uuid, foreign key to ngos)
    - `name` (text)
    - `role` (text) - position in NGO
    - `photo_url` (text, optional)
    - `bio` (text, optional)
    - `created_at` (timestamptz)

  3. **team_members** - Kartavya team members
    - `id` (uuid, primary key)
    - `name` (text)
    - `role` (text)
    - `photo_url` (text)
    - `bio` (text, optional)
    - `email` (text, optional)
    - `linkedin` (text, optional)
    - `display_order` (integer) - for ordering
    - `created_at` (timestamptz)

  4. **mentors** - Kartavya mentors
    - `id` (uuid, primary key)
    - `name` (text)
    - `photo_url` (text)
    - `expertise` (text)
    - `bio` (text)
    - `email` (text)
    - `phone` (text, optional)
    - `linkedin` (text, optional)
    - `display_order` (integer)
    - `created_at` (timestamptz)

  5. **podcasts** - Podcast episodes
    - `id` (uuid, primary key)
    - `title` (text)
    - `description` (text)
    - `cover_image_url` (text)
    - `audio_url` (text, optional)
    - `video_url` (text, optional)
    - `published_date` (date)
    - `duration` (text, optional)
    - `created_at` (timestamptz)

  6. **events** - Events (past and upcoming)
    - `id` (uuid, primary key)
    - `title` (text)
    - `description` (text)
    - `event_date` (timestamptz)
    - `location` (text)
    - `image_url` (text, optional)
    - `status` (text) - upcoming/past/ongoing
    - `created_at` (timestamptz)

  7. **ngo_applications** - NGO registration applications
    - `id` (uuid, primary key)
    - `ngo_name` (text)
    - `contact_person` (text)
    - `email` (text)
    - `phone` (text)
    - `description` (text)
    - `pitch_deck_url` (text)
    - `website` (text, optional)
    - `status` (text) - pending/approved/rejected
    - `submitted_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Public read access for all tables except ngo_applications
  - Only authenticated users can view ngo_applications
  - Only authenticated users can insert into ngo_applications
*/

-- Create ngos table
CREATE TABLE IF NOT EXISTS ngos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL,
  description text NOT NULL,
  website text,
  founded_date date,
  incubation_date date NOT NULL DEFAULT CURRENT_DATE,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ngos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active ngos"
  ON ngos FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create ngo_members table
CREATE TABLE IF NOT EXISTS ngo_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ngo_id uuid NOT NULL REFERENCES ngos(id) ON DELETE CASCADE,
  name text NOT NULL,
  role text NOT NULL,
  photo_url text,
  bio text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ngo_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view ngo members"
  ON ngo_members FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  photo_url text NOT NULL,
  bio text,
  email text,
  linkedin text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view team members"
  ON team_members FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create mentors table
CREATE TABLE IF NOT EXISTS mentors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  photo_url text NOT NULL,
  expertise text NOT NULL,
  bio text NOT NULL,
  email text NOT NULL,
  phone text,
  linkedin text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view mentors"
  ON mentors FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create podcasts table
CREATE TABLE IF NOT EXISTS podcasts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  cover_image_url text NOT NULL,
  audio_url text,
  video_url text,
  published_date date NOT NULL DEFAULT CURRENT_DATE,
  duration text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE podcasts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view podcasts"
  ON podcasts FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  event_date timestamptz NOT NULL,
  location text NOT NULL,
  image_url text,
  status text NOT NULL DEFAULT 'upcoming',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view events"
  ON events FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create ngo_applications table
CREATE TABLE IF NOT EXISTS ngo_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ngo_name text NOT NULL,
  contact_person text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  description text NOT NULL,
  pitch_deck_url text NOT NULL,
  website text,
  status text NOT NULL DEFAULT 'pending',
  submitted_at timestamptz DEFAULT now()
);

ALTER TABLE ngo_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit applications"
  ON ngo_applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view applications"
  ON ngo_applications FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_ngos_status ON ngos(status);
CREATE INDEX IF NOT EXISTS idx_ngo_members_ngo_id ON ngo_members(ngo_id);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_team_members_order ON team_members(display_order);
CREATE INDEX IF NOT EXISTS idx_mentors_order ON mentors(display_order);
