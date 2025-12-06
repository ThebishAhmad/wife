-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create allowed_emails table for whitelist
CREATE TABLE public.allowed_emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on allowed_emails
ALTER TABLE public.allowed_emails ENABLE ROW LEVEL SECURITY;

-- Allow anyone to check if email is allowed (needed for signup validation)
CREATE POLICY "Anyone can check allowed emails"
  ON public.allowed_emails FOR SELECT
  USING (true);

-- Insert the two allowed emails
INSERT INTO public.allowed_emails (email) VALUES
  ('unnatimall1612@gmail.com'),
  ('tabishahmaddd@gmail.com');

-- Create bucket list table
CREATE TABLE public.bucket_list (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN NOT NULL DEFAULT false,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on bucket_list
ALTER TABLE public.bucket_list ENABLE ROW LEVEL SECURITY;

-- Only the two specific users can access bucket list
CREATE POLICY "Only allowed users can view bucket list"
  ON public.bucket_list FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.email IN ('unnatimall1612@gmail.com', 'tabishahmaddd@gmail.com')
    )
  );

CREATE POLICY "Only allowed users can insert bucket list items"
  ON public.bucket_list FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.email IN ('unnatimall1612@gmail.com', 'tabishahmaddd@gmail.com')
    )
  );

CREATE POLICY "Only allowed users can update bucket list items"
  ON public.bucket_list FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.email IN ('unnatimall1612@gmail.com', 'tabishahmaddd@gmail.com')
    )
  );

CREATE POLICY "Only allowed users can delete bucket list items"
  ON public.bucket_list FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.email IN ('unnatimall1612@gmail.com', 'tabishahmaddd@gmail.com')
    )
  );

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger for bucket_list updated_at
CREATE TRIGGER update_bucket_list_updated_at
  BEFORE UPDATE ON public.bucket_list
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();