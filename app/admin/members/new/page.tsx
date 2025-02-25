import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { NewMemberForm } from "@/components/new-member-form"

export default function NewMemberPage() {
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
                Registrar Nuevo Socio
              </h2>
            </div>
            <NewMemberForm />
          </div>
        </DashboardShell>
      </div>
    </div>
  )
}

