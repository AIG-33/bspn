"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/navigation";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
        <h1 className="font-heading text-2xl font-bold">Вход в кабинет</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Войдите, чтобы получить доступ к закрытым материалам и личному кабинету
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
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Пароль</Label>
              <Link
                href="/forgot-password"
                className="text-xs text-primary hover:underline"
              >
                Забыли пароль?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="mt-1.5"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Войти
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Нет аккаунта?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Зарегистрироваться
          </Link>
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          Для получения аккаунта необходимо быть членом БСПН.{" "}
          <Link href="/membership/join" className="font-medium text-primary hover:underline">
            Вступить
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
