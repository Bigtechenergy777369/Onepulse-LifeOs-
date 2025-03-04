/*
  # Initial Schema Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `last_login` (timestamp)
      - `settings` (jsonb)
    - `routines`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `name` (text)
      - `type` (text)
      - `start_time` (time)
      - `active` (boolean)
      - `created_at` (timestamp)
    - `routine_steps`
      - `id` (uuid, primary key)
      - `routine_id` (uuid, foreign key)
      - `title` (text)
      - `type` (text)
      - `duration` (integer)
      - `content` (text)
      - `order` (integer)
    - `progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `type` (text)
      - `value` (integer)
      - `recorded_at` (timestamp)
    - `achievements`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `badge_id` (text)
      - `unlocked_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz,
  settings jsonb DEFAULT '{}'::jsonb
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Routines Table
CREATE TABLE IF NOT EXISTS routines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL,
  start_time time NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE routines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own routines"
  ON routines
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Routine Steps Table
CREATE TABLE IF NOT EXISTS routine_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  routine_id uuid REFERENCES routines(id) ON DELETE CASCADE,
  title text NOT NULL,
  type text NOT NULL,
  duration integer NOT NULL,
  content text,
  "order" integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE routine_steps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own routine steps"
  ON routine_steps
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM routines
      WHERE routines.id = routine_steps.routine_id
      AND routines.user_id = auth.uid()
    )
  );

-- Progress Table
CREATE TABLE IF NOT EXISTS progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL,
  value integer NOT NULL,
  recorded_at timestamptz DEFAULT now()
);

ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own progress"
  ON progress
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Achievements Table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  badge_id text NOT NULL,
  unlocked_at timestamptz DEFAULT now()
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own achievements"
  ON achievements
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own achievements"
  ON achievements
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());