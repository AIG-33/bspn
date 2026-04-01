"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Settings, Globe, Mail, Shield, Save, Database, Server } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "БСПН — Бизнес Союз Предпринимателей и Нанимателей",
    siteEmail: "info@bspn.by",
    sitePhone: "+375 17 210-18-64",
    maxConsultations: "5",
    emailNotifications: true,
    maintenanceMode: false,
  });

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold">Настройки системы</h1>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2"><Globe className="h-4 w-4 text-primary" />Основные</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Название сайта</label>
            <Input value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} className="mt-1 h-10 text-sm" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <Input value={settings.siteEmail} onChange={(e) => setSettings({ ...settings, siteEmail: e.target.value })} className="mt-1 h-10 text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Телефон</label>
              <Input value={settings.sitePhone} onChange={(e) => setSettings({ ...settings, sitePhone: e.target.value })} className="mt-1 h-10 text-sm" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Макс. консультаций/месяц для членов</label>
            <Input type="number" value={settings.maxConsultations} onChange={(e) => setSettings({ ...settings, maxConsultations: e.target.value })} className="mt-1 h-10 text-sm max-w-32" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2"><Server className="h-4 w-4 text-primary" />Система</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="text-sm font-medium">Email-уведомления</p>
              <p className="text-xs text-muted-foreground">Отправка уведомлений пользователям</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, emailNotifications: !settings.emailNotifications })}
              className={cn("relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors", settings.emailNotifications ? "bg-primary" : "bg-muted")}
            >
              <span className={cn("inline-block h-4 w-4 rounded-full bg-white transition-transform shadow-sm", settings.emailNotifications ? "translate-x-6" : "translate-x-1")} />
            </button>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-destructive/20 p-3">
            <div>
              <p className="text-sm font-medium">Режим обслуживания</p>
              <p className="text-xs text-muted-foreground">Сайт будет недоступен для пользователей</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
              className={cn("relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors", settings.maintenanceMode ? "bg-destructive" : "bg-muted")}
            >
              <span className={cn("inline-block h-4 w-4 rounded-full bg-white transition-transform shadow-sm", settings.maintenanceMode ? "translate-x-6" : "translate-x-1")} />
            </button>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-4">
        <div className="flex items-center gap-3">
          <Database className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Версия системы</p>
            <p className="text-xs text-muted-foreground">БСПН CMS v1.0.0 · Next.js 16.2 · Vercel</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs">Актуально</Badge>
      </div>

      <Button className="bg-primary text-primary-foreground rounded-xl">
        <Save className="mr-1.5 h-4 w-4" />
        Сохранить настройки
      </Button>
    </div>
  );
}
