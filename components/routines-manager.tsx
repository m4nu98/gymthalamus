"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoutinesList } from "./routines-list"
import { NewRoutineForm } from "./new-routine-form"

export function RoutinesManager() {
  const [activeTab, setActiveTab] = useState("list")

  return (
    <div className="grid gap-6">
      <Card className="p-4 sm:p-6">
        <Tabs defaultValue="list" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-[400px] grid-cols-2">
            <TabsTrigger value="list">Rutinas</TabsTrigger>
            <TabsTrigger value="new">Nueva Rutina</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            {activeTab === "list" ? <RoutinesList /> : <NewRoutineForm />}
          </div>
        </Tabs>
      </Card>
    </div>
  )
}

