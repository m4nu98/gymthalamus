import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { NotificationsManager } from "@/components/notifications-manager"

export default function NotificationsPage() {
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
                Gestión de Notificaciones
              </h2>
            </div>
            <NotificationsManager />
          </div>
        </DashboardShell>
      </div>
    </div>
  )
}

