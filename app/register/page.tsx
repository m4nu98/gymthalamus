import { RegisterForm } from "@/components/register-form"
import { Suspense } from "react"
import Loading from "@/components/loading"

export default function RegisterPage() {
  return (
    <Suspense fallback={<Loading />}>
      <main className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Crear una cuenta
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Ingresa tus datos para registrarte en GymPro
            </p>
          </div>
          <RegisterForm />
        </div>
      </main>
    </Suspense>
  )
}

