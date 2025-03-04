/*
  # Penalty System Schema

  1. New Tables
    - user_penalties
      - user_id (uuid, references auth.users)
      - streak (integer)
      - penalty_level (integer)
      - custom_penalties (jsonb)
      - accountability_partner (uuid, references auth.users)
      - financial_penalty (numeric)
      - last_penalty_date (timestamptz)
      - last_redemption_date (timestamptz)
    
    - notifications
      - id (uuid)
      - user_id (uuid, references auth.users)
      - type (text)
      - message (text)
      - read (boolean)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- User Penalties Table
CREATE TABLE IF NOT EXISTS user_penalties (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  streak integer DEFAULT 0,
  penalty_level integer DEFAULT 0,
  custom_penalties jsonb DEFAULT '[]'::jsonb,
  accountability_partner uuid REFERENCES auth.users(id),
  financial_penalty numeric DEFAULT 0,
  last_penalty_date timestamptz,
  last_redemption_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE user_penalties ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Policies for user_penalties
CREATE POLICY "Users can view own penalties"
  ON user_penalties
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own penalties"
  ON user_penalties
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own penalties"
  ON user_penalties
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policies for notifications
CREATE POLICY "Users can view own notifications"
  ON notifications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert notifications for accountability partners"
  ON notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_penalties
      WHERE user_penalties.accountability_partner = auth.uid()
    )
  );

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_penalties_updated_at
  BEFORE UPDATE ON user_penalties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();