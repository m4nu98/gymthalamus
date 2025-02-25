"use client"

import { UserCircle, Settings, LogOut, Users, CreditCard, Bell, Dumbbell, HelpCircle, User } from 'lucide-react'
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

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background">
      <div className="w-full">
        <div className="container flex h-16 items-center justify-between py-4 max-w-6xl px-4 mx-auto">
          <div className="flex items-center gap-2">
            <Link href="/admin">
              <h2 className="text-lg font-semibold cursor-pointer">THALAMUS Admin</h2>
            </Link>
          </div>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/admin-avatar.svg" alt="Admin" />
                  <AvatarFallback>
                    AD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/admin-avatar.svg" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Administrador</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      admin@gympro.com
                    </p>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={() => handleNavigation('/admin/members')}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Gestión de Socios</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleNavigation('/admin/payments')}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Pagos</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onSelect={() => {
                    handleNavigation('/admin/notifications')
                    setOpen(false)
                  }}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notificaciones</span>
                  <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">3</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onSelect={() => {
                    handleNavigation('/admin/routines')
                    setOpen(false)
                  }}
                >
                  <Dumbbell className="mr-2 h-4 w-4" />
                  <span>Rutinas</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleNavigation('/admin/support')}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Soporte</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
                <span className="ml-auto text-xs text-muted-foreground">⌘S</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
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

