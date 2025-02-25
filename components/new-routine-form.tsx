"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"
import { Check, Search, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
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

export function NewRoutineForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [numberOfDays, setNumberOfDays] = useState<string>("1")
  const [exercises, setExercises] = useState<DayExercises>({ 1: [] })
  const [openDays, setOpenDays] = useState<number[]>([1])

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

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre de la Rutina</Label>
            <Input
              id="name"
              placeholder="Ej: Rutina de Fuerza"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="level">Nivel</Label>
            <Select required>
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
            placeholder="Describe la rutina..."
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
                        placeholder="Ej: Press de Banca"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`sets-${day}-${index}`}>Series</Label>
                      <Input
                        id={`sets-${day}-${index}`}
                        value={exercise.sets}
                        onChange={(e) => handleExerciseChange(day, index, 'sets', e.target.value)}
                        placeholder="Ej: 4"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`reps-${day}-${index}`}>Repeticiones</Label>
                      <Input
                        id={`reps-${day}-${index}`}
                        value={exercise.reps}
                        onChange={(e) => handleExerciseChange(day, index, 'reps', e.target.value)}
                        placeholder="Ej: 12"
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

      <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Crear Rutina
      </Button>
    </form>
  )
}

