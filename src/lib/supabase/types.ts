export type Profile = {
  id: string;
  name: string | null;
  phone: string | null;
  company: string | null;
  position: string | null;
  role: "member" | "admin" | "superadmin";
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Member = {
  id: string;
  company: string;
  unp: string | null;
  contact_person: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  membership_type: "standard" | "premium" | "partner";
  status: "active" | "suspended" | "expired";
  member_since: string | null;
  valid_until: string | null;
  user_id: string | null;
  created_at: string;
  updated_at: string;
};

export type MemberApplication = {
  id: string;
  company_name: string;
  company_unp: string | null;
  company_address: string | null;
  company_activity: string | null;
  company_employees: string | null;
  company_year: string | null;
  contact_name: string;
  contact_position: string | null;
  contact_email: string;
  contact_phone: string | null;
  membership_type: string;
  goals: string[] | null;
  additional_info: string | null;
  documents_consent: boolean;
  status: "pending" | "reviewing" | "approved" | "rejected";
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  category: string;
  date: string;
  read_time: string | null;
  views: number;
  featured: boolean;
  image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type EventItem = {
  id: string;
  title: string;
  type: "conference" | "seminar" | "webinar" | "mission" | "club" | "training";
  date: string;
  time: string | null;
  location: string | null;
  is_online: boolean;
  speakers: string[] | null;
  seats: number | null;
  seats_left: number | null;
  price: string | null;
  description: string | null;
  tags: string[] | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type EventRegistration = {
  id: string;
  event_id: string;
  user_id: string;
  status: "registered" | "attended" | "cancelled";
  created_at: string;
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  author: string | null;
  author_role: string | null;
  category: string;
  date: string;
  read_time: string | null;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type Expert = {
  id: string;
  name: string;
  title: string | null;
  specializations: string[];
  experience: number | null;
  education: string | null;
  rating: number;
  consultations: number;
  bio: string | null;
  available: boolean;
  created_at: string;
  updated_at: string;
};

export type CourtCase = {
  id: string;
  title: string;
  category: string;
  date: string;
  court: string | null;
  status: "won" | "lost" | "partial" | "pending";
  amount: string | null;
  description: string | null;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type Document = {
  id: string;
  name: string;
  category: string;
  type: "pdf" | "docx" | "xlsx" | "template";
  size: string | null;
  file_url: string | null;
  storage_path: string | null;
  downloads: number;
  is_new: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type Consultation = {
  id: string;
  user_id: string;
  expert_id: string | null;
  expert_name: string | null;
  expert_title: string | null;
  topic: string;
  date: string;
  time: string | null;
  type: "online" | "phone" | "office";
  status: "scheduled" | "completed" | "cancelled" | "in_progress";
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Invoice = {
  id: string;
  member_id: string;
  number: string | null;
  description: string | null;
  amount: number;
  status: "paid" | "pending" | "overdue";
  due_date: string | null;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Notification = {
  id: string;
  user_id: string;
  type: "info" | "warning" | "success" | "event" | "document" | "billing";
  title: string;
  description: string | null;
  read: boolean;
  link: string | null;
  created_at: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};
