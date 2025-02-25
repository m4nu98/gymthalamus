import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { RoutinesManager } from "@/components/routines-manager"

export default function RoutinesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="w-full">
        <DashboardHeader />
      </div>
      <div className="px-[15px] pt-[90px]">
        <DashboardShell>
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Gestión de Rutinas
              </h2>
            </div>
            <RoutinesManager />
          </div>
        </DashboardShell>
      </div>
    </div>
  )
}

