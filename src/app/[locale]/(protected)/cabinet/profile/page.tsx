"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
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

const companyData = {
  name: "ООО «ТехноСтар»",
  unp: "190456789",
  legalAddress: "220030, г. Минск, ул. Интернациональная, 36Б, пом. 2",
  actualAddress: "220030, г. Минск, ул. Интернациональная, 36Б, пом. 2",
  industry: "Информационные технологии",
  employees: "85",
  website: "technostar.by",
  founded: "2015",
};

const contactPerson = {
  firstName: "Алексей",
  lastName: "Иванов",
  patronymic: "Петрович",
  position: "Генеральный директор",
  email: "ivanov@technostar.by",
  phone: "+375 29 123-45-67",
  additionalPhone: "+375 17 234-56-78",
};

const membershipInfo = {
  type: "Полное членство",
  since: "15.03.2024",
  validUntil: "15.03.2027",
  status: "Активно",
  council: "IT и цифровизация",
  representative: "Делегат Совета",
};

export default function ProfilePage() {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [company, setCompany] = useState(companyData);
  const [contact, setContact] = useState(contactPerson);

  const handleSave = () => {
    setEditingSection(null);
  };

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
                  <h3 className="font-heading text-base font-semibold">{membershipInfo.type}</h3>
                  <Badge className="border border-success/20 bg-success/10 text-success text-xs">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    {membershipInfo.status}
                  </Badge>
                </div>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span>Член с {membershipInfo.since}</span>
                  <span>Действует до {membershipInfo.validUntil}</span>
                  <span>Совет: {membershipInfo.council}</span>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="w-fit text-xs">
              {membershipInfo.representative}
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
                <Button size="sm" variant="ghost" onClick={() => setEditingSection(null)} className="h-7 text-xs">
                  <X className="mr-1 h-3 w-3" />
                  Отмена
                </Button>
                <Button size="sm" onClick={handleSave} className="h-7 text-xs bg-primary text-primary-foreground">
                  <Save className="mr-1 h-3 w-3" />
                  Сохранить
                </Button>
              </div>
            ) : (
              <Button size="sm" variant="ghost" onClick={() => setEditingSection("company")} className="h-7 text-xs">
                <Edit3 className="mr-1 h-3 w-3" />
                Изменить
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Наименование", value: company.name, field: "name", icon: Building2 },
              { label: "УНП", value: company.unp, field: "unp", icon: FileText },
              { label: "Юридический адрес", value: company.legalAddress, field: "legalAddress", icon: MapPin },
              { label: "Фактический адрес", value: company.actualAddress, field: "actualAddress", icon: MapPin },
              { label: "Отрасль", value: company.industry, field: "industry", icon: Shield },
              { label: "Сотрудников", value: company.employees, field: "employees", icon: User },
              { label: "Веб-сайт", value: company.website, field: "website", icon: LinkIcon },
              { label: "Год основания", value: company.founded, field: "founded", icon: Calendar },
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
                    <p className="text-sm font-medium">{value}</p>
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
                <Button size="sm" variant="ghost" onClick={() => setEditingSection(null)} className="h-7 text-xs">
                  <X className="mr-1 h-3 w-3" />
                  Отмена
                </Button>
                <Button size="sm" onClick={handleSave} className="h-7 text-xs bg-primary text-primary-foreground">
                  <Save className="mr-1 h-3 w-3" />
                  Сохранить
                </Button>
              </div>
            ) : (
              <Button size="sm" variant="ghost" onClick={() => setEditingSection("contact")} className="h-7 text-xs">
                <Edit3 className="mr-1 h-3 w-3" />
                Изменить
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Фамилия", value: contact.lastName, field: "lastName", icon: User },
              { label: "Имя", value: contact.firstName, field: "firstName", icon: User },
              { label: "Отчество", value: contact.patronymic, field: "patronymic", icon: User },
              { label: "Должность", value: contact.position, field: "position", icon: Shield },
              { label: "Email", value: contact.email, field: "email", icon: Mail },
              { label: "Телефон", value: contact.phone, field: "phone", icon: Phone },
              { label: "Доп. телефон", value: contact.additionalPhone, field: "additionalPhone", icon: Phone },
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
                    <p className="text-sm font-medium">{value}</p>
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
