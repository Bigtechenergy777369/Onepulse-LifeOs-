/*
  # Rewards System Schema

  1. New Tables
    - rewards
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - points_required (integer)
      - reward_type (text)
      - available_quantity (integer)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - user_rewards
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - reward_id (uuid, references rewards)
      - redeemed_at (timestamptz)
      - status (text)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Rewards Table
CREATE TABLE IF NOT EXISTS rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  points_required integer NOT NULL,
  reward_type text NOT NULL,
  available_quantity integer DEFAULT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User Rewards Table
CREATE TABLE IF NOT EXISTS user_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  reward_id uuid REFERENCES rewards(id) ON DELETE CASCADE,
  redeemed_at timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_rewards ENABLE ROW LEVEL SECURITY;

-- Policies for rewards
CREATE POLICY "Anyone can view available rewards"
  ON rewards
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for user_rewards
CREATE POLICY "Users can view own rewards"
  ON user_rewards
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can redeem rewards"
  ON user_rewards
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Insert initial rewards
INSERT INTO rewards (name, description, points_required, reward_type) VALUES
  ('Avatar Customization', 'Unlock exclusive avatar items and customization options', 500, 'Digital'),
  ('$10 Amazon Gift Card', 'Digital gift card for Amazon purchases', 5000, 'Gift'),
  ('1-on-1 Coaching Session', '30-minute personal coaching session', 10000, 'Exclusive'),
  ('Free Flight Voucher', 'Travel voucher for select airlines', 50000, 'Ultimate');

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_rewards_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_rewards_updated_at
  BEFORE UPDATE ON rewards
  FOR EACH ROW
  EXECUTE FUNCTION update_rewards_updated_at();

CREATE TRIGGER update_user_rewards_updated_at
  BEFORE UPDATE ON user_rewards
  FOR EACH ROW
  EXECUTE FUNCTION update_rewards_updated_at();