"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card"
import { Icons } from "@/components/icons"
import Link from "next/link"
import { ChevronRight, ChevronLeft, User, Building2, CreditCard } from 'lucide-react'
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from 'next/navigation'

export function NewMemberForm() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"paid" | "pending">("")
  const router = useRouter()

  const steps = [
    { id: 1, name: 'Datos Personales', icon: User },
    { id: 2, name: 'Sucursal y Plan', icon: Building2 },
    { id: 3, name: 'Información de Pago', icon: CreditCard },
  ]

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const handleNext = () => {
    setDirection(1)
    setStep(step + 1)
  }

  const handlePrevious = () => {
    setDirection(-1)
    setStep(step - 1)
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  const FormStep = ({ step }: { step: number }) => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input id="firstName" placeholder="Juan" required disabled={isLoading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input id="lastName" placeholder="Pérez" required disabled={isLoading} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="juan@ejemplo.com"
                type="email"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                placeholder="+54 11 1234-5678"
                type="tel"
                disabled={isLoading}
              />
            </div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6"
          >
            <div className="space-y-2">
              <Label htmlFor="branch">Sucursal</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar sucursal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="norte">Sucursal Norte</SelectItem>
                  <SelectItem value="sur">Sucursal Sur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Plan</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2days">2 días</SelectItem>
                  <SelectItem value="3days">3 días</SelectItem>
                  <SelectItem value="5days">5 días</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Fecha de Inicio</Label>
              <Input
                id="startDate"
                type="date"
                disabled={isLoading}
                required
              />
            </div>
          </motion.div>
        )
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6"
          >
            <div className="space-y-2">
              <Label htmlFor="paymentStatus">Estado de Pago</Label>
              <Select 
                required 
                value={paymentStatus} 
                onValueChange={setPaymentStatus}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Pagado</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className={cn(
              "grid gap-6 transition-all duration-300",
              paymentStatus === "paid" 
                ? "grid-rows-[1fr] opacity-100" 
                : "grid-rows-[0fr] opacity-0"
            )}>
              <div className="overflow-hidden">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="paymentDate">Fecha de Pago</Label>
                    <Input
                      id="paymentDate"
                      type="date"
                      disabled={isLoading}
                      required={paymentStatus === "paid"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Método de Pago</Label>
                    <Select required={paymentStatus === "paid"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar método" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Efectivo</SelectItem>
                        <SelectItem value="card">Tarjeta</SelectItem>
                        <SelectItem value="transfer">Transferencia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="hidden sm:block">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-center space-x-8">
            {steps.map((stepItem, stepIdx) => (
              <li key={stepItem.name} className="relative">
                <div className="flex items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStep(stepItem.id)}
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                      step === stepItem.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : step > stepItem.id
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-muted bg-background"
                    )}
                  >
                    <stepItem.icon className="h-5 w-5" />
                  </motion.button>
                  {stepIdx !== steps.length - 1 && (
                    <div className={cn(
                      "absolute left-full top-1/2 h-0.5 w-8 -translate-y-1/2 transition-colors duration-500",
                      step > stepItem.id ? "bg-primary" : "bg-muted"
                    )} />
                  )}
                </div>
                <p className="mt-2 text-sm font-medium">{stepItem.name}</p>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="sm:hidden">
        <p className="text-sm font-medium mb-1">
          Paso {step} de {steps.length}
        </p>
        <p className="text-lg font-semibold">{steps[step - 1].name}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{steps[step - 1].name}</CardTitle>
          <CardDescription>
            {step === 1 && "Ingrese los datos personales del nuevo socio"}
            {step === 2 && "Seleccione la sucursal y el plan de membresía"}
            {step === 3 && "Complete la información de pago"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="newMemberForm" onSubmit={onSubmit}>
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <FormStep step={step} />
            </AnimatePresence>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4">
          <div className="flex w-full sm:w-auto gap-4">
            {step > 1 && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>
              </motion.div>
            )}
            {step < steps.length ? (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="button"
                  className="w-full sm:w-auto"
                  onClick={handleNext}
                >
                  Siguiente
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  form="newMemberForm"
                  className="w-full sm:w-auto"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Registrar Socio
                </Button>
              </motion.div>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            className="w-full sm:w-auto"
            onClick={() => router.push('/admin/members')}
          >
            Cancelar
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

