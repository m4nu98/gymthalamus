"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState("socio")

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="socio" className="w-full" onValueChange={setUserType}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="socio">Socio</TabsTrigger>
          <TabsTrigger value="admin">Administrador</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            placeholder="nombre@ejemplo.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
            className="border-gray-200"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
            Contraseña
          </label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            autoCapitalize="none"
            autoComplete="current-password"
            disabled={isLoading}
            className="border-gray-200"
          />
        </div>
        
        <Button 
          className="w-full bg-[#0a1629] hover:bg-[#152238] text-white" 
          disabled={isLoading}
        >
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Iniciar Sesión
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">
            O CONTINÚA CON
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="w-full" disabled={isLoading}>
          <Icons.google className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button variant="outline" className="w-full" disabled={isLoading}>
          <Icons.facebook className="mr-2 h-4 w-4" />
          Facebook
        </Button>
      </div>

      <div className="flex flex-col space-y-4 text-center text-sm">
        <a 
          href="#" 
          className="text-gray-600 hover:text-gray-800"
        >
          ¿Olvidaste tu contraseña?
        </a>
        <div className="text-gray-600">
          ¿Nuevo por aquí?{" "}
          <Link 
            href="/register" 
            className="underline hover:text-gray-800"
          >
            Crear una cuenta
          </Link>
        </div>
      </div>
    </div>
  )
}

