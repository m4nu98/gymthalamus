"use client"

import { useState, useCallback, memo, useEffect } from "react"
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
import { toast } from 'sonner'

type Sucursal = {
  id: number
  nombre: string
  direccion: string
  telefono: string
}

interface FormData {
  nombre: string
  apellido: string
  email: string
  telefono: string
  fecha_nacimiento: string
  genero: string
  sucursal_id: number | null
  plan: string
  metodoPago: string
  fechaPago: string
}

interface FormErrors {
  [key: string]: string
}

// Mover FormStep fuera del componente principal
const FormStep = memo(({ 
  step, 
  formData, 
  errors, 
  isLoading, 
  handleChange, 
  paymentStatus, 
  setPaymentStatus,
  sucursales
}: { 
  step: number;
  formData: FormData;
  errors: FormErrors;
  isLoading: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement> | string, name?: string) => void;
  paymentStatus: string;
  setPaymentStatus: (value: "paid" | "pending") => void;
  sucursales: Sucursal[];
}) => {
  // Add debug log for sucursales prop
  console.log('Sucursales recibidas en FormStep:', sucursales)
  console.log('Sucursales completas:', JSON.stringify(sucursales, null, 2))
  
  // Get selected sucursal data
  const selectedSucursal = sucursales.find(s => s.id === parseInt(formData.sucursal_id?.toString() || '', 10));
  console.log('Sucursal seleccionada:', selectedSucursal)
  console.log('Sucursal seleccionada:', JSON.stringify(selectedSucursal, null, 2))

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
              <Input 
                id="firstName" 
                name="nombre" 
                value={formData.nombre} 
                onChange={handleChange}  
                placeholder="Juan" 
                required 
                disabled={isLoading} 
              />
              {errors.nombre && <p className="text-sm text-red-500 mt-1">{errors.nombre}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input 
                id="lastName" 
                name="apellido"
                placeholder="Pérez" 
                value={formData.apellido} 
                onChange={handleChange} 
                required 
                disabled={isLoading}
              /> 
              {errors.apellido && <p className="text-sm text-red-500 mt-1">{errors.apellido}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
              <Input
                id="birthDate"
                name="fecha_nacimiento"
                type="date"
                value={formData.fecha_nacimiento}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                required
                disabled={isLoading}
              />
              {errors.fecha_nacimiento && <p className="text-sm text-red-500 mt-1">{errors.fecha_nacimiento}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Género</Label>
              <Select
                required
                value={formData.genero}
                onValueChange={(value) => handleChange(value, 'genero')}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Seleccionar género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="femenino">Femenino</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
              {errors.genero && <p className="text-sm text-red-500 mt-1">{errors.genero}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="juan@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              type="email"
              required
              disabled={isLoading}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="+54 11 1234-5678"
              type="tel"
              required
              disabled={isLoading}
            />
            {errors.telefono && <p className="text-sm text-red-500 mt-1">{errors.telefono}</p>}
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
            <Select 
              required
              value={formData.sucursal_id?.toString() || ""}
              onValueChange={(value) => {
                console.log('Valor seleccionado:', value);
                const sucursal = sucursales.find(s => s.id === parseInt(value, 10));
                console.log('Datos de la sucursal seleccionada:', JSON.stringify(sucursal, null, 2));
                handleChange(value, 'sucursal_id');
              }}
            >
              <SelectTrigger className="w-full h-auto min-h-[2.5rem] py-2">
                <SelectValue placeholder="Seleccionar sucursal">
                  {selectedSucursal && (
                    <span>{selectedSucursal.nombre}</span>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Array.isArray(sucursales) && sucursales.map((sucursal) => {
                  console.log('Renderizando sucursal:', JSON.stringify(sucursal, null, 2));
                  return (
                    <SelectItem 
                      key={sucursal.id} 
                      value={sucursal.id.toString()}
                    >
                      <span>{sucursal.nombre}</span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {errors.sucursal_id && <p className="text-sm text-red-500 mt-1">{errors.sucursal_id}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="plan">Plan</Label>
            <Select 
              required
              value={formData.plan}
              onValueChange={(value) => handleChange(value, 'plan')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2days">2 días</SelectItem>
                <SelectItem value="3days">3 días</SelectItem>
                <SelectItem value="5days">5 días</SelectItem>
              </SelectContent>
            </Select>
            {errors.plan && <p className="text-sm text-red-500 mt-1">{errors.plan}</p>}
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
                    name="fechaPago"
                    type="date"
                    value={formData.fechaPago}
                    onChange={handleChange}
                    max={new Date().toISOString().split('T')[0]}
                    disabled={isLoading}
                    required={paymentStatus === "paid"}
                  />
                  {errors.fechaPago && <p className="text-sm text-red-500 mt-1">{errors.fechaPago}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Método de Pago</Label>
                  <Select 
                    required={paymentStatus === "paid"}
                    value={formData.metodoPago}
                    onValueChange={(value) => handleChange(value, 'metodoPago')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Efectivo</SelectItem>
                      <SelectItem value="card">Tarjeta</SelectItem>
                      <SelectItem value="transfer">Transferencia</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.metodoPago && <p className="text-sm text-red-500 mt-1">{errors.metodoPago}</p>}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )
    default:
      return null
  }
})

FormStep.displayName = 'FormStep'

export function NewMemberForm() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"paid" | "pending">("")
  const [sucursales, setSucursales] = useState<Sucursal[]>([])
  const [errors, setErrors] = useState<FormErrors>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    fecha_nacimiento: '',
    genero: '',
    sucursal_id: '',
    plan: '',
    metodoPago: '',
    fechaPago: ''
  })
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    fecha_nacimiento: '',
    genero: '',
    sucursal_id: null,
    plan: '',
    metodoPago: '',
    fechaPago: ''
  });

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

  const validateStep = (currentStep: number): boolean => {
    let isValid = true;
    const newErrors = { ...errors };

    switch (currentStep) {
      case 1:
        // Validar datos personales
        if (!formData.nombre.trim()) {
          newErrors.nombre = 'El nombre es requerido';
          isValid = false;
        }
        if (!formData.apellido.trim()) {
          newErrors.apellido = 'El apellido es requerido';
          isValid = false;
        }
        if (!formData.email.trim()) {
          newErrors.email = 'El email es requerido';
          isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Email no válido';
          isValid = false;
        }
        if (!formData.telefono.trim()) {
          newErrors.telefono = 'El teléfono es requerido';
          isValid = false;
        }
        if (!formData.fecha_nacimiento) {
          newErrors.fecha_nacimiento = 'La fecha de nacimiento es requerida';
          isValid = false;
        }
        if (!formData.genero) {
          newErrors.genero = 'El género es requerido';
          isValid = false;
        }
        break;
      case 2:
        // Validar sucursal y plan
        if (!formData.sucursal_id) {
          newErrors.sucursal_id = 'Debe seleccionar una sucursal';
          isValid = false;
        }
        if (!formData.plan) {
          newErrors.plan = 'Debe seleccionar un plan';
          isValid = false;
        }
        break;
      case 3:
        // Validar información de pago
        if (!paymentStatus) {
          toast.error("Error", {
            description: "Por favor seleccione el estado de pago"
          });
          isValid = false;
        } else if (paymentStatus === 'paid') {
          if (!formData.metodoPago) {
            newErrors.metodoPago = 'Debe seleccionar un método de pago';
            isValid = false;
          }
          if (!formData.fechaPago) {
            newErrors.fechaPago = 'Debe ingresar la fecha de pago';
            isValid = false;
          } else if (new Date(formData.fechaPago) > new Date()) {
            newErrors.fechaPago = 'La fecha de pago no puede ser futura';
            isValid = false;
          }
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    
    if (step !== 3) {
      return;
    }

    // Validar antes de enviar
    if (!validateStep(step)) {
      return;
    }
    
    setIsLoading(true);

    try {
      const dataToSend = {
        ...formData,
        paymentStatus,
        metodoPago: paymentStatus === 'paid' ? formData.metodoPago : null,
        fechaPago: paymentStatus === 'paid' && formData.fechaPago ? formData.fechaPago : null,
      };

      console.log('Enviando datos:', dataToSend);

      const response = await fetch('/api/member', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (!response.ok) {
        // Verificar si el error es por email duplicado
        if (data.error === 'El email ya está registrado') {
          toast.error("Error", {
            description: "El email ya se encuentra registrado. Intente con otro"
          });
          // Regresar al paso 1 para corregir el email
          setStep(1);
          setErrors(prev => ({
            ...prev,
            email: 'El email ya se encuentra registrado'
          }));
          return;
        }
        throw new Error(data.error || 'Error al crear el miembro');
      }

      toast.success("¡Éxito!", {
        description: "El miembro ha sido registrado correctamente"
      });

      router.push('/admin/members');
      router.refresh();
    } catch (error) {
      console.error('Error detallado:', error);
      toast.error("Error", {
        description: error instanceof Error ? error.message : "Error al crear el miembro"
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setDirection(1)
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    setDirection(-1)
    setStep(step - 1)
  }

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement> | string, name?: string) => {
    let fieldName: string;
    let value: any;

    if (typeof event === 'string' && name) {
      // Para Select components
      fieldName = name;
      value = name === 'sucursal_id' ? parseInt(event, 10) : event;
    } else if ('target' in event) {
      // Para Input components
      fieldName = event.target.name;
      value = event.target.value;
    } else {
      return;
    }

    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Limpiar el error cuando el usuario empiece a escribir
    setErrors(prev => ({
      ...prev,
      [fieldName]: ''
    }));
  }, []);

  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        console.log('Intentando obtener sucursales...')
        const response = await fetch('/api/member')
        const data = await response.json()
        console.log('Respuesta del servidor:', data)
        
        if (response.ok && data.sucursales) {
          console.log('Sucursales cargadas:', data.sucursales)
          setSucursales(data.sucursales)
        } else {
          console.error('Error en la respuesta:', data)
          toast.error("Error", {
            description: "No se pudieron cargar las sucursales"
          })
        }
      } catch (error) {
        console.error('Error al obtener sucursales:', error)
        toast.error("Error", {
          description: "No se pudieron cargar las sucursales"
        })
      }
    }

    fetchSucursales()
  }, [])

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
          <form 
            id="newMemberForm" 
            onSubmit={onSubmit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
          >
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <FormStep 
                step={step}
                formData={formData}
                errors={errors}
                isLoading={isLoading}
                handleChange={handleChange}
                paymentStatus={paymentStatus}
                setPaymentStatus={setPaymentStatus}
                sucursales={sucursales}
              />
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
  )}

