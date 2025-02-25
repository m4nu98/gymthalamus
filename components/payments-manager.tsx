"use client"

import { useState, Suspense } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentHistory } from "./payment-history"
import { NewPaymentForm } from "./new-payment-form"
import { Loader2 } from 'lucide-react'

function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}

export function PaymentsManager() {
  const [activeTab, setActiveTab] = useState("members")

  return (
    <div className="grid gap-6">
      <Card className="p-4 sm:p-6">
        <Tabs defaultValue="members" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-[400px] grid-cols-2">
            <TabsTrigger value="members">Socios</TabsTrigger>
            <TabsTrigger value="items">Artículos</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <Suspense fallback={<LoadingState />}>
              <NewPaymentForm type={activeTab} />
            </Suspense>
          </div>
        </Tabs>
      </Card>
      <Suspense fallback={<LoadingState />}>
        <PaymentHistory type={activeTab} />
      </Suspense>
    </div>
  )
}

