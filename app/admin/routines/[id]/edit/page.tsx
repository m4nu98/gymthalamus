import { DashboardHeader } from "@/components/admin/header"
import { DashboardShell } from "@/components/admin/shell"
import { EditRoutineForm } from "@/components/admin/routines/edit-routine-form"

export default function EditRoutinePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="w-full">
        <DashboardHeader />
      </div>
      <div className="px-[15px]">
        <DashboardShell>
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Editar Rutina
              </h2>
            </div>
            <EditRoutineForm />
          </div>
        </DashboardShell>
      </div>
    </div>
  )
}

