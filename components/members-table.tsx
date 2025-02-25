"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { MoreHorizontal, Pencil, Trash2, UserX } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { useRouter } from 'next/navigation'

const members = [
  {
    id: "1",
    name: "Ana García",
    email: "ana.garcia@email.com",
    plan: "3 días",
    status: "active",
    joinDate: "15 Dic 2023",
    lastPayment: "15 Dic 2023",
    branch: "Norte"
  },
  {
    id: "2",
    name: "Carlos Martínez",
    email: "carlos.martinez@email.com",
    plan: "5 días",
    status: "pending",
    joinDate: "14 Dic 2023",
    lastPayment: "Pendiente",
    branch: "Sur"
  },
  {
    id: "3",
    name: "Laura Torres",
    email: "laura.torres@email.com",
    plan: "2 días",
    status: "active",
    joinDate: "14 Dic 2023",
    lastPayment: "14 Dic 2023",
    branch: "Norte"
  },
  {
    id: "4",
    name: "Miguel Ángel Ruiz",
    email: "miguel.ruiz@email.com",
    plan: "3 días",
    status: "inactive",
    joinDate: "13 Dic 2023",
    lastPayment: "13 Nov 2023",
    branch: "Sur"
  },
  {
    id: "5",
    name: "Sofia Luna",
    email: "sofia.luna@email.com",
    plan: "5 días",
    status: "active",
    joinDate: "13 Dic 2023",
    lastPayment: "13 Dic 2023",
    branch: "Norte"
  }
]

export function MembersTable() {
  const router = useRouter()

  const handleEdit = (memberId: string) => {
    router.push(`/admin/members/${memberId}/edit`)
  }

  return (
    <>
      {/* Tabla para pantallas medianas y grandes */}
      <div className="hidden md:block rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Sucursal</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha de Registro</TableHead>
              <TableHead>Último Pago</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.plan}</TableCell>
                <TableCell>Sucursal {member.branch}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      member.status === "active"
                        ? "success"
                        : member.status === "pending"
                        ? "warning"
                        : "destructive"
                    }
                  >
                    {member.status === "active"
                      ? "Activo"
                      : member.status === "pending"
                      ? "Pendiente"
                      : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell>{member.joinDate}</TableCell>
                <TableCell>{member.lastPayment}</TableCell>
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
                      <DropdownMenuItem onSelect={() => handleEdit(member.id)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserX className="mr-2 h-4 w-4" />
                        Desactivar
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

      {/* Vista de tarjetas para móviles */}
      <div className="grid gap-4 md:hidden">
        {members.map((member) => (
          <Card key={member.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{member.email}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant={
                      member.status === "active"
                        ? "success"
                        : member.status === "pending"
                        ? "warning"
                        : "destructive"
                    }
                  >
                    {member.status === "active"
                      ? "Activo"
                      : member.status === "pending"
                      ? "Pendiente"
                      : "Inactivo"}
                  </Badge>
                  <span className="text-sm">{member.plan}</span>
                  <span className="text-sm text-muted-foreground">· Sucursal {member.branch}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Registro: {member.joinDate}</p>
                  <p>Último pago: {member.lastPayment}</p>
                </div>
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
                  <DropdownMenuItem onSelect={() => handleEdit(member.id)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UserX className="mr-2 h-4 w-4" />
                    Desactivar
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}

