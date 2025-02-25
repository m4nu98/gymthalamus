"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Icons } from "@/components/icons"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

// Horarios disponibles (6 AM a 9 PM)
const timeSlots = Array.from({ length: 15 }, (_, i) => {
  const hour = i + 6
  return {
    id: i,
    time: `${hour.toString().padStart(2, '0')}:00`,
    capacity: 16,
    booked: Math.floor(Math.random() * 16) // Simulación de reservas
  }
})

const mockRegisteredUsers = {
  0: [
    { id: 1, name: "Ana García" },
    { id: 2, name: "Carlos Martínez" },
    { id: 3, name: "Laura Torres" }
  ],
  1: [
    { id: 4, name: "Miguel Ruiz" },
    { id: 5, name: "Sofia Luna" }
  ]
  // ... más usuarios por slot
}

export function BookingCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedSlot, setSelectedSlot] = useState<typeof timeSlots[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleBooking = async () => {
    if (!selectedSlot || !date) return

    setIsLoading(true)
    // Simular la reserva
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    setIsDialogOpen(false)
    // Aquí iría la lógica real de reserva
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Calendario de Reservas</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            locale={es}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Horarios Disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[450px] pr-4">
            <div className="grid gap-2">
              {timeSlots.map((slot) => {
                const availableSpots = slot.capacity - slot.booked
                const isFull = availableSpots === 0

                return (
                  <Button
                    key={slot.id}
                    variant="outline"
                    className={cn(
                      "w-full justify-between",
                      isFull && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={isFull}
                    onClick={() => {
                      setSelectedSlot(slot)
                      setIsDialogOpen(true)
                    }}
                  >
                    <span>{slot.time}</span>
                    <Badge 
                      variant={isFull ? "destructive" : availableSpots <= 3 ? "warning" : "secondary"}
                    >
                      {availableSpots} cupos disponibles
                    </Badge>
                  </Button>
                )
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Reserva</DialogTitle>
            <DialogDescription asChild>
              <div>
                {date && selectedSlot && (
                  <div className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4 rounded-lg border p-4">
                      <div>
                        <p className="text-sm font-medium">Fecha</p>
                        <p className="text-sm text-muted-foreground">
                          {format(date, "EEEE d 'de' MMMM", { locale: es })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Hora</p>
                        <p className="text-sm text-muted-foreground">{selectedSlot.time}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Cupos Disponibles</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedSlot.capacity - selectedSlot.booked} de {selectedSlot.capacity}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Créditos</p>
                        <p className="text-sm text-muted-foreground">1 crédito</p>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <p className="text-sm font-medium mb-3">Usuarios Registrados</p>
                      <div className="space-y-2">
                        {mockRegisteredUsers[selectedSlot.id]?.length > 0 ? (
                          mockRegisteredUsers[selectedSlot.id].map((user) => (
                            <div key={user.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="w-2 h-2 rounded-full bg-primary" />
                              <span>{user.name}</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No hay usuarios registrados aún</p>
                        )}
                      </div>
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={handleBooking}
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Confirmar Reserva
                    </Button>
                  </div>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

