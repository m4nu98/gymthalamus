"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Play } from 'lucide-react'

// Simulated data - En una implementación real, esto vendría de la base de datos
const assignedRoutine = {
  name: "Rutina de Fuerza",
  level: "Intermedio",
  exercises: [
    {
      id: 1,
      name: "Press de Banca",
      sets: "4",
      reps: "12",
      videoUrl: "https://example.com/press-banca.mp4"
    },
    {
      id: 2,
      name: "Sentadillas",
      sets: "4",
      reps: "10",
      videoUrl: "https://example.com/sentadillas.mp4"
    },
    {
      id: 3,
      name: "Peso Muerto",
      sets: "3",
      reps: "8",
      videoUrl: "https://example.com/peso-muerto.mp4"
    }
  ]
}

export function AssignedRoutine() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{assignedRoutine.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {assignedRoutine.exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="space-y-1">
                  <p className="font-medium">{exercise.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {exercise.sets} series x {exercise.reps} repeticiones
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => setSelectedVideo(exercise.videoUrl)}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Ver video
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="sm:max-w-[800px]">
          <div className="aspect-video">
            <video
              src={selectedVideo ?? undefined}
              controls
              className="w-full h-full rounded-lg"
            >
              Tu navegador no soporta el elemento de video.
            </video>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

