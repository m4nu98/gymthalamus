import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PersonalRoutine() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rutina Personal</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="routine" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="routine">Ejercicios</TabsTrigger>
            <TabsTrigger value="diet">Alimentación</TabsTrigger>
          </TabsList>
          <TabsContent value="routine" className="mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <h4 className="font-medium">Pecho y Tríceps</h4>
                <ul className="list-disc pl-4 text-sm text-muted-foreground">
                  <li>Press de banca: 4x12</li>
                  <li>Press inclinado: 4x12</li>
                  <li>Aperturas: 3x15</li>
                  <li>Extensiones de tríceps: 4x12</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="diet" className="mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <h4 className="font-medium">Plan Alimenticio</h4>
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">Desayuno:</p>
                  <ul className="list-disc pl-4 mb-2">
                    <li>Avena con proteína</li>
                    <li>Frutas</li>
                  </ul>
                  <p className="mb-2">Almuerzo:</p>
                  <ul className="list-disc pl-4">
                    <li>Pechuga de pollo</li>
                    <li>Arroz integral</li>
                    <li>Vegetales</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

