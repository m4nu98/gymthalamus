import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { MembersTable } from "@/components/members-table"
import { MembersToolbar } from "@/components/members-toolbar"
import { Suspense } from "react"
import Loading from "@/components/loading.tsx"

export default function MembersPage() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex min-h-screen flex-col">
        <div className="w-full">
          <DashboardHeader />
        </div>
        <div className="px-[15px] pt-[90px]">
          <DashboardShell>
            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Gestión de Socios
                </h2>
              </div>
              <MembersToolbar />
              <MembersTable />
            </div>
          </DashboardShell>
        </div>
      </div>
    </Suspense>
  )
}

