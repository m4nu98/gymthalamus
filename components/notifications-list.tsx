import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell } from 'lucide-react'

// Simulated notifications data
const notifications = [
  {
    id: 1,
    title: "Horario 24 de Diciembre",
    message: "El 24 de diciembre se trabajará en horario normal",
    date: "18 Dic 2023",
    isNew: true
  },
  {
    id: 2,
    title: "Cierre por Año Nuevo",
    message: "El 1 de enero el establecimiento estará cerrado",
    date: "18 Dic 2023",
    isNew: true
  },
  {
    id: 3,
    title: "Nuevas Clases de Yoga",
    message: "A partir de enero, nuevos horarios de yoga disponibles",
    date: "15 Dic 2023",
    isNew: false
  }
]

export function NotificationsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notificaciones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex gap-4 pb-6 border-b last:pb-0 last:border-0"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{notification.title}</p>
                  {notification.isNew && (
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      Nuevo
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {notification.message}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

