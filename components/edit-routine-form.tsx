"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"
import { Check, Search, Plus, Trash2, Users, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

type Exercise = {
  name: string
  sets: string
  reps: string
  videoUrl: string
}

type DayExercises = {
  [key: number]: Exercise[]
}

export function EditRoutineForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [numberOfDays, setNumberOfDays] = useState<string>("3")
  const [exercises, setExercises] = useState<DayExercises>({
    1: [{ name: 'Press de Banca', sets: '4', reps: '12', videoUrl: '' }],
    2: [{ name: 'Sentadillas', sets: '4', reps: '10', videoUrl: '' }],
    3: [{ name: 'Peso Muerto', sets: '3', reps: '8', videoUrl: '' }]
  })
  const [openDays, setOpenDays] = useState<number[]>([1])
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  const members = [
    { id: "1", name: "Ana García", plan: "3 días", email: "ana.garcia@email.com" },
    { id: "2", name: "Carlos Martínez", plan: "5 días", email: "carlos.martinez@email.com" },
    { id: "3", name: "Laura Torres", plan: "2 días", email: "laura.torres@email.com" },
    { id: "4", name: "Miguel Ángel Ruiz", plan: "3 días", email: "miguel.ruiz@email.com" },
    { id: "5", name: "Sofia Luna", plan: "5 días", email: "sofia.luna@email.com" },
  ]

  const handleDaysChange = (value: string) => {
    setNumberOfDays(value)
    const days = parseInt(value)
    const newExercises: DayExercises = {}
    
    // Mantener los ejercicios existentes para los días que permanecen
    for (let i = 1; i <= days; i++) {
      newExercises[i] = exercises[i] || []
    }
    
    setExercises(newExercises)
  }

  const handleAddExercise = (day: number) => {
    setExercises(prev => ({
      ...prev,
      [day]: [...(prev[day] || []), { name: '', sets: '', reps: '', videoUrl: '' }]
    }))
  }

  const handleRemoveExercise = (day: number, index: number) => {
    setExercises(prev => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index)
    }))
  }

  const handleExerciseChange = (day: number, index: number, field: string, value: string) => {
    setExercises(prev => ({
      ...prev,
      [day]: prev[day].map((exercise, i) => 
        i === index ? { ...exercise, [field]: value } : exercise
      )
    }))
  }

  const toggleDay = (day: number) => {
    setOpenDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    )
  }

  const handleSelectMember = (memberId: string) => {
    setSelectedMembers(current => {
      if (current.includes(memberId)) {
        return current.filter(id => id !== memberId)
      }
      return [...current, memberId]
    })
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid w-full max-w-[400px] grid-cols-2">
        <TabsTrigger value="details">Detalles</TabsTrigger>
        <TabsTrigger value="members">Asignar Socios</TabsTrigger>
      </TabsList>

      <TabsContent value="details">
        <Card className="p-6">
          <form onSubmit={onSubmit} className="grid gap-6">
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre de la Rutina</Label>
                  <Input
                    id="name"
                    defaultValue="Rutina de Fuerza"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Nivel</Label>
                  <Select defaultValue="intermediate">
                    <SelectTrigger id="level">
                      <SelectValue placeholder="Seleccionar nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Principiante</SelectItem>
                      <SelectItem value="intermediate">Intermedio</SelectItem>
                      <SelectItem value="advanced">Avanzado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="days">Cantidad de Días</Label>
                  <Select 
                    value={numberOfDays} 
                    onValueChange={handleDaysChange}
                    required
                  >
                    <SelectTrigger id="days">
                      <SelectValue placeholder="Seleccionar días" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 día</SelectItem>
                      <SelectItem value="2">2 días</SelectItem>
                      <SelectItem value="3">3 días</SelectItem>
                      <SelectItem value="4">4 días</SelectItem>
                      <SelectItem value="5">5 días</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  defaultValue="Rutina de fuerza enfocada en ejercicios compuestos..."
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-4">
                <Label>Ejercicios por Día</Label>
                {Array.from({ length: parseInt(numberOfDays) }, (_, i) => i + 1).map((day) => (
                  <Collapsible
                    key={day}
                    open={openDays.includes(day)}
                    onOpenChange={() => toggleDay(day)}
                    className="border rounded-lg p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <CollapsibleTrigger className="flex items-center gap-2 hover:text-primary">
                        <h3 className="text-lg font-semibold">Día {day}</h3>
                        {openDays.includes(day) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </CollapsibleTrigger>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAddExercise(day)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Ejercicio
                      </Button>
                    </div>

                    <CollapsibleContent className="space-y-4">
                      {exercises[day]?.map((exercise, index) => (
                        <div key={index} className="grid gap-4 sm:grid-cols-[2fr,1fr,1fr,1fr,auto] items-end border rounded-lg p-4">
                          <div className="space-y-2">
                            <Label htmlFor={`exercise-${day}-${index}`}>Ejercicio</Label>
                            <Input
                              id={`exercise-${day}-${index}`}
                              value={exercise.name}
                              onChange={(e) => handleExerciseChange(day, index, 'name', e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`sets-${day}-${index}`}>Series</Label>
                            <Input
                              id={`sets-${day}-${index}`}
                              value={exercise.sets}
                              onChange={(e) => handleExerciseChange(day, index, 'sets', e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`reps-${day}-${index}`}>Repeticiones</Label>
                            <Input
                              id={`reps-${day}-${index}`}
                              value={exercise.reps}
                              onChange={(e) => handleExerciseChange(day, index, 'reps', e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`video-${day}-${index}`}>Video URL</Label>
                            <Input
                              id={`video-${day}-${index}`}
                              value={exercise.videoUrl}
                              onChange={(e) => handleExerciseChange(day, index, 'videoUrl', e.target.value)}
                              placeholder="https://..."
                              type="url"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="self-end"
                            onClick={() => handleRemoveExercise(day, index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      {exercises[day]?.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No hay ejercicios agregados para este día
                        </p>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Guardar Cambios
              </Button>
            </div>
          </form>
        </Card>
      </TabsContent>

      <TabsContent value="members">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Socios Asignados</h3>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <Users className="mr-2 h-4 w-4" />
                      Asignar Socios
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="end">
                    <Command className="border rounded-md" shouldFilter={true}>
                      <CommandInput placeholder="Buscar socios..." />
                      <CommandEmpty>No se encontraron socios.</CommandEmpty>
                      <CommandGroup>
                        {members.map((member) => (
                          <CommandItem
                            key={member.id}
                            value={`${member.name} ${member.email}`}
                            onSelect={() => handleSelectMember(member.id)}
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="space-y-1">
                                <p className="text-sm font-medium">{member.name}</p>
                                <p className="text-xs text-muted-foreground">{member.email}</p>
                              </div>
                              <Check
                                className={cn(
                                  "h-4 w-4",
                                  selectedMembers.includes(member.id) ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-4">
                {members
                  .filter(member => selectedMembers.includes(member.id))
                  .map(member => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                        <p className="text-sm text-muted-foreground">{member.plan}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSelectMember(member.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex justify-end">
              <Button disabled={isLoading}>
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Guardar Asignaciones
              </Button>
            </div>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

