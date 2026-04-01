-- ============================================================
-- BSPN Database Schema
-- Run in Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. PROFILES (extends auth.users)
-- ============================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  phone TEXT,
  company TEXT,
  position TEXT,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'admin', 'superadmin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- 2. MEMBERS (organizations)
-- ============================================================
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  unp TEXT,
  contact_person TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  membership_type TEXT NOT NULL DEFAULT 'standard' CHECK (membership_type IN ('standard', 'premium', 'partner')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'expired')),
  member_since DATE,
  valid_until DATE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 3. MEMBER APPLICATIONS
-- ============================================================
CREATE TABLE member_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  company_unp TEXT,
  company_address TEXT,
  company_activity TEXT,
  company_employees TEXT,
  company_year TEXT,
  contact_name TEXT NOT NULL,
  contact_position TEXT,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  membership_type TEXT NOT NULL DEFAULT 'standard',
  goals TEXT[],
  additional_info TEXT,
  documents_consent BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 4. NEWS
-- ============================================================
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT NOT NULL DEFAULT 'other',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  read_time TEXT,
  views INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN NOT NULL DEFAULT false,
  image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 5. EVENTS
-- ============================================================
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'seminar' CHECK (type IN ('conference', 'seminar', 'webinar', 'mission', 'club', 'training')),
  date DATE NOT NULL,
  time TEXT,
  location TEXT,
  is_online BOOLEAN NOT NULL DEFAULT false,
  speakers TEXT[],
  seats INTEGER,
  seats_left INTEGER,
  price TEXT,
  description TEXT,
  tags TEXT[],
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 6. EVENT REGISTRATIONS
-- ============================================================
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'attended', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- ============================================================
-- 7. BLOG POSTS
-- ============================================================
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  author TEXT,
  author_role TEXT,
  category TEXT NOT NULL DEFAULT 'other',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  read_time TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 8. EXPERTS
-- ============================================================
CREATE TABLE experts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT,
  specializations TEXT[] NOT NULL DEFAULT '{}',
  experience INTEGER,
  education TEXT,
  rating NUMERIC(3,2) NOT NULL DEFAULT 0,
  consultations INTEGER NOT NULL DEFAULT 0,
  bio TEXT,
  available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 9. COURT CASES
-- ============================================================
CREATE TABLE court_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'other',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  court TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('won', 'lost', 'partial', 'pending')),
  amount TEXT,
  description TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 10. DOCUMENTS
-- ============================================================
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'other',
  type TEXT NOT NULL DEFAULT 'pdf' CHECK (type IN ('pdf', 'docx', 'xlsx', 'template')),
  size TEXT,
  file_url TEXT,
  storage_path TEXT,
  downloads INTEGER NOT NULL DEFAULT 0,
  is_new BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 11. CONSULTATIONS
-- ============================================================
CREATE TABLE consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  expert_id UUID REFERENCES experts(id) ON DELETE SET NULL,
  expert_name TEXT,
  expert_title TEXT,
  topic TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT,
  type TEXT NOT NULL DEFAULT 'online' CHECK (type IN ('online', 'phone', 'office')),
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'in_progress')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 12. INVOICES
-- ============================================================
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  number TEXT,
  description TEXT,
  amount NUMERIC(12,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('paid', 'pending', 'overdue')),
  due_date DATE,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 13. NOTIFICATIONS
-- ============================================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'warning', 'success', 'event', 'document', 'billing')),
  title TEXT NOT NULL,
  description TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 14. FAQ ITEMS
-- ============================================================
CREATE TABLE faq_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'other',
  sort_order INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- ADVOCACY DIRECTIONS
-- ============================================================
CREATE TABLE advocacy_directions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon_name TEXT NOT NULL DEFAULT 'FileText',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  results TEXT[] NOT NULL DEFAULT '{}',
  sort_order INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- ADVOCACY INITIATIVES
-- ============================================================
CREATE TABLE advocacy_initiatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'discussion', 'completed')),
  deadline TEXT,
  description TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- Auto-update updated_at trigger
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'profiles', 'members', 'member_applications', 'news', 'events',
    'blog_posts', 'experts', 'court_cases', 'documents',
    'consultations', 'invoices', 'faq_items',
    'advocacy_directions', 'advocacy_initiatives'
  ] LOOP
    EXECUTE format(
      'CREATE TRIGGER set_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_updated_at()',
      t
    );
  END LOOP;
END $$;

-- ============================================================
-- RLS POLICIES
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE experts ENABLE ROW LEVEL SECURITY;
ALTER TABLE court_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE advocacy_directions ENABLE ROW LEVEL SECURITY;
ALTER TABLE advocacy_initiatives ENABLE ROW LEVEL SECURITY;

-- Helper: check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- PROFILES
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (is_admin());
CREATE POLICY "Admins can update all profiles" ON profiles FOR UPDATE USING (is_admin());

-- PUBLIC TABLES (news, events, blog_posts, experts, court_cases, faq_items)
-- Anon can SELECT published items
CREATE POLICY "Public can read published news" ON news FOR SELECT USING (published = true);
CREATE POLICY "Public can read published events" ON events FOR SELECT USING (published = true);
CREATE POLICY "Public can read published blog posts" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public can read experts" ON experts FOR SELECT USING (true);
CREATE POLICY "Public can read published court cases" ON court_cases FOR SELECT USING (published = true);
CREATE POLICY "Public can read published faq" ON faq_items FOR SELECT USING (published = true);

-- Admin CRUD on public tables
CREATE POLICY "Admins manage news" ON news FOR ALL USING (is_admin());
CREATE POLICY "Admins manage events" ON events FOR ALL USING (is_admin());
CREATE POLICY "Admins manage blog posts" ON blog_posts FOR ALL USING (is_admin());
CREATE POLICY "Admins manage experts" ON experts FOR ALL USING (is_admin());
CREATE POLICY "Admins manage court cases" ON court_cases FOR ALL USING (is_admin());
CREATE POLICY "Admins manage faq" ON faq_items FOR ALL USING (is_admin());

CREATE POLICY "Public can read published advocacy_directions" ON advocacy_directions FOR SELECT USING (published = true);
CREATE POLICY "Admins manage advocacy_directions" ON advocacy_directions FOR ALL USING (is_admin());

CREATE POLICY "Public can read published advocacy_initiatives" ON advocacy_initiatives FOR SELECT USING (published = true);
CREATE POLICY "Admins manage advocacy_initiatives" ON advocacy_initiatives FOR ALL USING (is_admin());

-- MEMBERS
CREATE POLICY "Authenticated can read members" ON members FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins manage members" ON members FOR ALL USING (is_admin());

-- MEMBER APPLICATIONS
CREATE POLICY "Anyone can insert application" ON member_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage applications" ON member_applications FOR ALL USING (is_admin());

-- EVENT REGISTRATIONS
CREATE POLICY "Users can read own registrations" ON event_registrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can register for events" ON event_registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can cancel own registration" ON event_registrations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins manage registrations" ON event_registrations FOR ALL USING (is_admin());

-- DOCUMENTS
CREATE POLICY "Authenticated can read documents" ON documents FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins manage documents" ON documents FOR ALL USING (is_admin());

-- CONSULTATIONS
CREATE POLICY "Users can read own consultations" ON consultations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create consultations" ON consultations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own consultations" ON consultations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins manage consultations" ON consultations FOR ALL USING (is_admin());

-- INVOICES
CREATE POLICY "Users can read own invoices" ON invoices FOR SELECT USING (
  EXISTS (SELECT 1 FROM members WHERE members.id = invoices.member_id AND members.user_id = auth.uid())
);
CREATE POLICY "Admins manage invoices" ON invoices FOR ALL USING (is_admin());

-- NOTIFICATIONS
CREATE POLICY "Users can read own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins manage notifications" ON notifications FOR ALL USING (is_admin());

-- ============================================================
-- STORAGE
-- ============================================================
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Authenticated can read documents bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'documents' AND auth.role() = 'authenticated');

CREATE POLICY "Admins can upload to documents bucket"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'documents' AND is_admin());

CREATE POLICY "Admins can delete from documents bucket"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'documents' AND is_admin());
