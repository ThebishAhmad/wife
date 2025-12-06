-- Create love_coupons table
CREATE TABLE public.love_coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  redeemed boolean NOT NULL DEFAULT false,
  redeemed_at timestamp with time zone,
  redeemed_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create diary_entries table
CREATE TABLE public.diary_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  created_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.love_coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diary_entries ENABLE ROW LEVEL SECURITY;

-- RLS policies for love_coupons (only allowed users)
CREATE POLICY "Only allowed users can view coupons"
ON public.love_coupons
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.email IN ('tabishahmaddd@gmail.com', 'unnatimall1612@gmail.com')
  )
);

CREATE POLICY "Only allowed users can update coupons"
ON public.love_coupons
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.email IN ('tabishahmaddd@gmail.com', 'unnatimall1612@gmail.com')
  )
);

CREATE POLICY "Only allowed users can insert coupons"
ON public.love_coupons
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.email IN ('tabishahmaddd@gmail.com', 'unnatimall1612@gmail.com')
  )
);

-- RLS policies for diary_entries (only allowed users)
CREATE POLICY "Only allowed users can view diary entries"
ON public.diary_entries
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.email IN ('tabishahmaddd@gmail.com', 'unnatimall1612@gmail.com')
  )
);

CREATE POLICY "Only allowed users can insert diary entries"
ON public.diary_entries
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.email IN ('tabishahmaddd@gmail.com', 'unnatimall1612@gmail.com')
  )
);

-- Add trigger for updated_at on love_coupons
CREATE TRIGGER update_love_coupons_updated_at
BEFORE UPDATE ON public.love_coupons
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add trigger for updated_at on diary_entries
CREATE TRIGGER update_diary_entries_updated_at
BEFORE UPDATE ON public.diary_entries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial love coupons
INSERT INTO public.love_coupons (title, description) VALUES
  ('Movie Night of Your Choice', 'Pick any movie and I''ll watch it with you, no complaints! Popcorn included.'),
  ('Breakfast in Bed', 'Wake up to your favorite breakfast, made with love (and maybe a few burnt edges).'),
  ('One Free Hug Attack', 'Redeem this for a surprise hug attack at any moment - no escape!'),
  ('Dance Party for Two', 'Let''s have our own private dance party, your playlist rules.'),
  ('Massage Therapy', 'A relaxing massage session from yours truly, guaranteed to make you smile.'),
  ('Adventure Day', 'A full day doing whatever adventure you choose - hiking, exploring, or just getting lost together.');