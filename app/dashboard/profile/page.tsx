import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Suspense } from "react"
import Loading from "@/components/loading"

export default function ProfilePage() {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Datos Personales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-1">
                <p className="text-sm font-medium">Nombre</p>
                <p className="text-sm text-muted-foreground">Juan Pérez</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">juan@ejemplo.com</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Plan Actual</p>
                <p className="text-sm text-muted-foreground">3 días por semana</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Fecha de Inicio</p>
                <p className="text-sm text-muted-foreground">01/12/2023</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Suspense>
  )
}

