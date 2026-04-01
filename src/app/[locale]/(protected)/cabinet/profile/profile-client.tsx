"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/lib/actions/profile";
import type { Member, Profile } from "@/lib/supabase/types";
import {
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  CheckCircle2,
  Edit3,
  Save,
  X,
  Star,
  FileText,
  Link as LinkIcon,
} from "lucide-react";

type CompanyForm = {
  name: string;
  unp: string;
  legalAddress: string;
  actualAddress: string;
  industry: string;
  employees: string;
  website: string;
  founded: string;
};

type ContactForm = {
  firstName: string;
  lastName: string;
  patronymic: string;
  position: string;
  email: string;
  phone: string;
  additionalPhone: string;
};

function formatDateRu(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function membershipTypeLabel(type: Member["membership_type"]): string {
  switch (type) {
    case "standard":
      return "Стандартное членство";
    case "premium":
      return "Полное членство";
    case "partner":
      return "Партнёрское членство";
    default:
      return "—";
  }
}

function memberStatusLabel(status: Member["status"]): string {
  switch (status) {
    case "active":
      return "Активно";
    case "suspended":
      return "Приостановлено";
    case "expired":
      return "Истекло";
    default:
      return "—";
  }
}

function splitFullName(full: string | null | undefined): Pick<ContactForm, "lastName" | "firstName" | "patronymic"> {
  const s = (full ?? "").trim();
  if (!s) return { lastName: "", firstName: "", patronymic: "" };
  const parts = s.split(/\s+/);
  if (parts.length >= 3) {
    return {
      lastName: parts[0] ?? "",
      firstName: parts[1] ?? "",
      patronymic: parts.slice(2).join(" "),
    };
  }
  if (parts.length === 2) {
    return { lastName: parts[0] ?? "", firstName: parts[1] ?? "", patronymic: "" };
  }
  return { lastName: "", firstName: parts[0] ?? "", patronymic: "" };
}

function joinFullName(c: Pick<ContactForm, "lastName" | "firstName" | "patronymic">): string {
  return [c.lastName, c.firstName, c.patronymic].filter(Boolean).join(" ").trim();
}

function companyFromProps(profile: Profile | null, member: Member | null): CompanyForm {
  return {
    name: profile?.company ?? member?.company ?? "",
    unp: member?.unp ?? "",
    legalAddress: "",
    actualAddress: "",
    industry: "",
    employees: "",
    website: "",
    founded: "",
  };
}

function contactFromProps(profile: Profile | null, userEmail: string, member: Member | null): ContactForm {
  const fromName = splitFullName(profile?.name);
  return {
    ...fromName,
    position: profile?.position ?? member?.contact_person ?? "",
    email: userEmail,
    phone: profile?.phone ?? member?.contact_phone ?? "",
    additionalPhone: "",
  };
}

export type ProfileClientProps = {
  profile: Profile | null;
  member: Member | null;
  userEmail: string;
};

export function ProfileClient({ profile, member, userEmail }: ProfileClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [company, setCompany] = useState<CompanyForm>(() => companyFromProps(profile, member));
  const [contact, setContact] = useState<ContactForm>(() => contactFromProps(profile, userEmail, member));

  useEffect(() => {
    if (editingSection !== null) return;
    setCompany(companyFromProps(profile, member));
    setContact(contactFromProps(profile, userEmail, member));
  }, [profile, member, userEmail, editingSection]);

  const membershipType = member ? membershipTypeLabel(member.membership_type) : "—";
  const membershipStatus = member ? memberStatusLabel(member.status) : "—";
  const since = formatDateRu(member?.member_since);
  const validUntil = formatDateRu(member?.valid_until);
  const council = "";
  const representative = "";

  function saveCompany() {
    startTransition(async () => {
      const res = await updateProfile({ company: company.name });
      if (!res.success) {
        toast.error(res.error ?? "Не удалось сохранить");
        return;
      }
      toast.success("Сохранено");
      setEditingSection(null);
      router.refresh();
    });
  }

  function saveContact() {
    startTransition(async () => {
      const res = await updateProfile({
        name: joinFullName(contact),
        phone: contact.phone,
        position: contact.position,
      });
      if (!res.success) {
        toast.error(res.error ?? "Не удалось сохранить");
        return;
      }
      toast.success("Сохранено");
      setEditingSection(null);
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Профиль</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Информация о вашей компании и контактных лицах
          </p>
        </div>
      </div>

      {/* Membership Status */}
      <Card className="border-gold/20 bg-gradient-to-r from-gold/5 to-primary/5">
        <CardContent className="p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                <Star className="h-6 w-6 text-gold" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading text-base font-semibold">{membershipType}</h3>
                  <Badge className="border border-success/20 bg-success/10 text-success text-xs">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    {membershipStatus}
                  </Badge>
                </div>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span>Член с {since}</span>
                  <span>Действует до {validUntil}</span>
                  <span>Совет: {council || "—"}</span>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="w-fit text-xs">
              {representative || "—"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Company Info */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              Данные компании
            </CardTitle>
            {editingSection === "company" ? (
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditingSection(null)}
                  className="h-7 text-xs"
                  disabled={isPending}
                >
                  <X className="mr-1 h-3 w-3" />
                  Отмена
                </Button>
                <Button
                  size="sm"
                  onClick={saveCompany}
                  className="h-7 text-xs bg-primary text-primary-foreground"
                  disabled={isPending}
                >
                  <Save className="mr-1 h-3 w-3" />
                  Сохранить
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setEditingSection("company")}
                className="h-7 text-xs"
              >
                <Edit3 className="mr-1 h-3 w-3" />
                Изменить
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Наименование", value: company.name, field: "name" as const, icon: Building2 },
              { label: "УНП", value: company.unp, field: "unp" as const, icon: FileText },
              { label: "Юридический адрес", value: company.legalAddress, field: "legalAddress" as const, icon: MapPin },
              { label: "Фактический адрес", value: company.actualAddress, field: "actualAddress" as const, icon: MapPin },
              { label: "Отрасль", value: company.industry, field: "industry" as const, icon: Shield },
              { label: "Сотрудников", value: company.employees, field: "employees" as const, icon: User },
              { label: "Веб-сайт", value: company.website, field: "website" as const, icon: LinkIcon },
              { label: "Год основания", value: company.founded, field: "founded" as const, icon: Calendar },
            ].map(({ label, value, field, icon: Icon }) => (
              <div key={field} className="flex items-start gap-3">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  {editingSection === "company" ? (
                    <Input
                      value={value}
                      onChange={(e) =>
                        setCompany({ ...company, [field]: e.target.value })
                      }
                      className="mt-0.5 h-8 text-sm"
                    />
                  ) : (
                    <p className="text-sm font-medium">{value || "—"}</p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contact Person */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Контактное лицо
            </CardTitle>
            {editingSection === "contact" ? (
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditingSection(null)}
                  className="h-7 text-xs"
                  disabled={isPending}
                >
                  <X className="mr-1 h-3 w-3" />
                  Отмена
                </Button>
                <Button
                  size="sm"
                  onClick={saveContact}
                  className="h-7 text-xs bg-primary text-primary-foreground"
                  disabled={isPending}
                >
                  <Save className="mr-1 h-3 w-3" />
                  Сохранить
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setEditingSection("contact")}
                className="h-7 text-xs"
              >
                <Edit3 className="mr-1 h-3 w-3" />
                Изменить
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Фамилия", value: contact.lastName, field: "lastName" as const, icon: User },
              { label: "Имя", value: contact.firstName, field: "firstName" as const, icon: User },
              { label: "Отчество", value: contact.patronymic, field: "patronymic" as const, icon: User },
              { label: "Должность", value: contact.position, field: "position" as const, icon: Shield },
              { label: "Email", value: contact.email, field: "email" as const, icon: Mail },
              { label: "Телефон", value: contact.phone, field: "phone" as const, icon: Phone },
              { label: "Доп. телефон", value: contact.additionalPhone, field: "additionalPhone" as const, icon: Phone },
            ].map(({ label, value, field, icon: Icon }) => (
              <div key={field} className="flex items-start gap-3">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  {editingSection === "contact" ? (
                    <Input
                      value={value}
                      onChange={(e) =>
                        setContact({ ...contact, [field]: e.target.value })
                      }
                      className="mt-0.5 h-8 text-sm"
                    />
                  ) : (
                    <p className="text-sm font-medium">{value || "—"}</p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
