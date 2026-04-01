"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/navigation";
import { UserPlus } from "lucide-react";

export default function RegisterPage() {
  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
        <h1 className="font-heading text-2xl font-bold">Регистрация</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Создайте аккаунт для доступа к личному кабинету члена БСПН
        </p>

        <form className="mt-6 space-y-4">
          <div>
            <Label htmlFor="name">ФИО</Label>
            <Input
              id="name"
              placeholder="Иванов Иван Иванович"
              className="mt-1.5"
            />
          </div>
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
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="Минимум 8 символов"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="password-confirm">Подтвердите пароль</Label>
            <Input
              id="password-confirm"
              type="password"
              placeholder="Повторите пароль"
              className="mt-1.5"
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-border accent-primary"
            />
            <span className="text-xs text-muted-foreground leading-relaxed">
              Я принимаю условия использования и даю согласие на обработку
              персональных данных
            </span>
          </label>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Зарегистрироваться
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Уже есть аккаунт?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Войти
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
