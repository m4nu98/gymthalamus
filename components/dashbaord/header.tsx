"use client"

import { UserCircle, Settings, LogOut, Calendar, CreditCard, Bell, Dumbbell, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import Link from "next/link"

export function DashboardHeader() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4 max-w-6xl px-4 mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">THALAMUS</h2>
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <CreditCard className="h-4 w-4" />
            <span>Créditos disponibles:</span>
            <span className="font-semibold">15</span>
          </div>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/admin-avatar.svg" alt="Admin" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <Avatar>
                  <AvatarImage src="/admin-avatar.svg" alt="Admin" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Juan Pérez</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    juan@ejemplo.com
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Datos</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard/bookings')}>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Reservas</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  router.push('/dashboard/plan')
                  setOpen(false)
                }}>
                  <Dumbbell className="mr-2 h-4 w-4" />
                  <span>Mi Rutina</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  router.push('/dashboard/notifications')
                  setOpen(false)
                }}>
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notificaciones</span>
                  <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">3</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard/credits')}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Créditos</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/admin/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
                <span className="ml-auto text-xs text-muted-foreground">⌘S</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => router.push('/logout')}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
                <span className="ml-auto text-xs text-muted-foreground">⌘Q</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}