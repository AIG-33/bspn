"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/navigation";
import { Mail, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
        <h1 className="font-heading text-2xl font-bold">
          Восстановление пароля
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Укажите email, привязанный к аккаунту. Мы отправим ссылку для сброса
          пароля.
        </p>

        <form className="mt-6 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="director@company.by"
              className="mt-1.5"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Mail className="mr-2 h-4 w-4" />
            Отправить ссылку
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Вернуться к входу
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
