import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Users } from 'lucide-react'

export function CurrentBooking() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Próxima Reserva</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div className="grid gap-1">
              <p className="text-sm font-medium">Fecha</p>
              <p className="text-sm text-muted-foreground">Lunes, 18 de Diciembre</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div className="grid gap-1">
              <p className="text-sm font-medium">Horario</p>
              <p className="text-sm text-muted-foreground">09:00 - 10:30</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Users className="h-5 w-5 text-muted-foreground" />
            <div className="grid gap-1">
              <p className="text-sm font-medium">Cupos</p>
              <p className="text-sm text-muted-foreground">8/12 personas</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

