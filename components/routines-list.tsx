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
import { MoreHorizontal, Pencil, Trash2, Users, Eye } from 'lucide-react'
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation'

const routines = [
  {
    id: 1,
    name: "Rutina de Fuerza",
    level: "Intermedio",
    exercises: 8,
    assignedTo: 12,
    lastModified: "20/12/2023"
  },
  {
    id: 2,
    name: "Principiantes Total Body",
    level: "Principiante",
    exercises: 6,
    assignedTo: 25,
    lastModified: "19/12/2023"
  },
  {
    id: 3,
    name: "Hipertrofia Avanzada",
    level: "Avanzado",
    exercises: 12,
    assignedTo: 8,
    lastModified: "18/12/2023"
  }
]

export function RoutinesList() {
  const router = useRouter()

  const handleEdit = (routineId: number) => {
    router.push(`/admin/routines/${routineId}/edit`)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex-1">
          <Input placeholder="Buscar rutinas..." className="max-w-xs" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Nivel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="beginner">Principiante</SelectItem>
            <SelectItem value="intermediate">Intermedio</SelectItem>
            <SelectItem value="advanced">Avanzado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabla para pantallas medianas y grandes */}
      <div className="hidden md:block">
        <Card>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Nivel</TableHead>
                  <TableHead>Ejercicios</TableHead>
                  <TableHead>Asignada a</TableHead>
                  <TableHead>Última modificación</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {routines.map((routine) => (
                  <TableRow key={routine.id}>
                    <TableCell className="font-medium">{routine.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{routine.level}</Badge>
                    </TableCell>
                    <TableCell>{routine.exercises} ejercicios</TableCell>
                    <TableCell>{routine.assignedTo} socios</TableCell>
                    <TableCell>{routine.lastModified}</TableCell>
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
                          <DropdownMenuItem onSelect={() => handleEdit(routine.id)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
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
        {routines.map((routine) => (
          <Card key={routine.id} className="p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="font-medium">{routine.name}</p>
                  <Badge variant="secondary">{routine.level}</Badge>
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
                    <DropdownMenuItem onSelect={() => handleEdit(routine.id)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Ejercicios</p>
                  <p>{routine.exercises}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Asignada a</p>
                  <p>{routine.assignedTo} socios</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Última modificación: {routine.lastModified}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

