"use client"

import { useState, Suspense } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationHistory } from "@/components/notification-history"
import { NewNotificationForm } from "@/components/new-notification-form"
import { Loader2 } from 'lucide-react'

function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}

export function NotificationsManager() {
  const [activeTab, setActiveTab] = useState<"general" | "targeted">("general")

  return (
    <div className="grid gap-6">
      <Card className="p-4 sm:p-6">
        <Tabs defaultValue="general" className="w-full" onValueChange={(value) => setActiveTab(value as "general" | "targeted")}>
          <TabsList className="grid w-full max-w-[400px] grid-cols-2">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="targeted">Selectiva</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <Suspense fallback={<LoadingState />}>
              <NewNotificationForm type={activeTab} />
            </Suspense>
          </div>
        </Tabs>
      </Card>
      <Suspense fallback={<LoadingState />}>
        <NotificationHistory type={activeTab} />
      </Suspense>
    </div>
  )
}