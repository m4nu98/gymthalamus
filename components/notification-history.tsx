"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Trash2, RefreshCw, Eye } from 'lucide-react'

interface NotificationHistoryProps {
  type: "general" | "targeted"
}

export function NotificationHistory({ type }: NotificationHistoryProps) {
  const notifications = type === "general" ? generalNotifications : targetedNotifications

  return (
    <>
      {/* Tabla para pantallas medianas y grandes */}
      <div className="hidden md:block">
        <Card>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Mensaje</TableHead>
                  {type === "targeted" && <TableHead>Destinatarios</TableHead>}
                  <TableHead>Estado</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notifications.map((notification) => (
                  <TableRow key={notification.id}>
                    <TableCell>{notification.date}</TableCell>
                    <TableCell>{notification.title}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {notification.message}
                    </TableCell>
                    {type === "targeted" && (
                      <TableCell>{notification.recipients}</TableCell>
                    )}
                    <TableCell>
                      <Badge variant="outline">
                        {notification.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Reenviar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Vista de tarjetas para móviles */}
      <div className="grid gap-4 md:hidden">
        {notifications.map((notification) => (
          <Card key={notification.id} className="p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="font-medium">{notification.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {notification.message}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menú</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Ver detalles
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reenviar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">
                  {notification.status}
                </Badge>
                {type === "targeted" && (
                  <span className="text-sm text-muted-foreground">
                    {notification.recipients}
                  </span>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {notification.date}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}

const generalNotifications = [
  {
    id: 1,
    date: "20/12/2023",
    title: "Mantenimiento Programado",
    message: "El gimnasio permanecerá cerrado el día 25/12 por mantenimiento.",
    priority: "high",
    status: "Enviado"
  },
  {
    id: 2,
    date: "19/12/2023",
    title: "Nuevas Clases",
    message: "¡Nuevas clases de yoga disponibles a partir de enero!",
    priority: "medium",
    status: "Enviado"
  },
  {
    id: 3,
    date: "18/12/2023",
    title: "Horarios Festivos",
    message: "Consulta los horarios especiales durante las fiestas.",
    priority: "low",
    status: "Enviado"
  }
]

const targetedNotifications = [
  {
    id: 1,
    date: "20/12/2023",
    title: "Renovación de Membresía",
    message: "Tu membresía vence en 5 días. ¡Renueva ahora!",
    recipients: "15 socios",
    priority: "high",
    status: "Enviado"
  },
  {
    id: 2,
    date: "19/12/2023",
    title: "Clase Cancelada",
    message: "La clase de spinning de hoy ha sido cancelada.",
    recipients: "8 socios",
    priority: "medium",
    status: "Enviado"
  },
  {
    id: 3,
    date: "18/12/2023",
    title: "Evaluación Física",
    message: "Recordatorio de tu evaluación física programada.",
    recipients: "3 socios",
    priority: "low",
    status: "Enviado"
  }
]

