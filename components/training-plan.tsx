import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dumbbell } from 'lucide-react'

export function TrainingPlan() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Plan de Entrenamiento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Plan Actual</span>
            </div>
            <Badge>3 días</Badge>
          </div>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <p className="text-sm font-medium">Lunes</p>
              <p className="text-sm text-muted-foreground">Pecho y Tríceps</p>
            </div>
            <div className="grid gap-1">
              <p className="text-sm font-medium">Miércoles</p>
              <p className="text-sm text-muted-foreground">Espalda y Bíceps</p>
            </div>
            <div className="grid gap-1">
              <p className="text-sm font-medium">Viernes</p>
              <p className="text-sm text-muted-foreground">Piernas y Hombros</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

