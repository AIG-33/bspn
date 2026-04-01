"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Settings,
  Lock,
  Bell,
  Globe,
  Shield,
  Eye,
  EyeOff,
  Save,
  Mail,
  Smartphone,
  CheckCircle2,
} from "lucide-react";

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    events: true,
    documents: true,
    legislation: true,
    marketing: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Настройки</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Безопасность, уведомления и предпочтения
        </p>
      </div>

      {/* Security */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Lock className="h-4 w-4 text-primary" />
            Безопасность
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Текущий пароль</label>
            <div className="relative mt-1">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-10 pr-10 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Новый пароль</label>
              <Input
                type="password"
                placeholder="Минимум 8 символов"
                className="mt-1 h-10 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Подтвердите пароль</label>
              <Input
                type="password"
                placeholder="Повторите пароль"
                className="mt-1 h-10 text-sm"
              />
            </div>
          </div>
          <Button size="sm" className="bg-primary text-primary-foreground rounded-xl">
            <Save className="mr-1.5 h-4 w-4" />
            Сменить пароль
          </Button>

          <div className="border-t border-border pt-4">
            <h4 className="text-sm font-medium">Двухфакторная аутентификация</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Дополнительный уровень защиты вашего аккаунта
            </p>
            <div className="mt-3 flex items-center gap-3">
              <Badge className="border border-success/20 bg-success/10 text-success text-xs">
                <Shield className="mr-1 h-3 w-3" />
                Рекомендуется
              </Badge>
              <Button size="sm" variant="outline" className="h-8 text-xs rounded-lg">
                Включить 2FA
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            Уведомления
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {([
            { key: "email" as const, label: "Email-уведомления", description: "Важные обновления и напоминания", icon: Mail },
            { key: "events" as const, label: "Мероприятия", description: "Новые мероприятия и напоминания о регистрации", icon: Bell },
            { key: "documents" as const, label: "Документы", description: "Новые шаблоны и аналитические отчёты", icon: Shield },
            { key: "legislation" as const, label: "Законодательство", description: "Изменения, влияющие на ваш бизнес", icon: Globe },
            { key: "marketing" as const, label: "Маркетинг", description: "Новости партнёров и спецпредложения", icon: Smartphone },
          ]).map(({ key, label, description, icon: Icon }) => (
            <div
              key={key}
              className="flex items-center justify-between rounded-lg border border-border p-3"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
              </div>
              <button
                onClick={() => toggleNotification(key)}
                className={cn(
                  "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
                  notifications[key] ? "bg-primary" : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 rounded-full bg-white transition-transform shadow-sm",
                    notifications[key] ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            Язык и регион
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="text-sm font-medium">Язык интерфейса</p>
              <p className="text-xs text-muted-foreground">Выберите предпочтительный язык</p>
            </div>
            <div className="flex gap-1">
              <button className="rounded-lg border border-primary bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Русский
              </button>
              <button className="rounded-lg border border-border px-3 py-1 text-xs font-medium text-muted-foreground hover:border-primary/30">
                English
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="text-sm font-medium">Часовой пояс</p>
              <p className="text-xs text-muted-foreground">Для корректного отображения времени мероприятий</p>
            </div>
            <Badge variant="secondary" className="text-xs">
              UTC+3 (Минск)
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-destructive">Опасная зона</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-destructive/10 p-3">
            <div>
              <p className="text-sm font-medium">Деактивация аккаунта</p>
              <p className="text-xs text-muted-foreground">Временно заблокировать доступ к кабинету</p>
            </div>
            <Button size="sm" variant="outline" className="h-8 text-xs rounded-lg border-destructive/20 text-destructive hover:bg-destructive/10">
              Деактивировать
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
