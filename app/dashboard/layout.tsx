import { DashboardHeader } from "@/components/dashbaord/header"
import { DashboardShell } from "@/components/shell"
import { Suspense } from "react"
import Loading from "@/components/loading"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex min-h-screen flex-col">
        <div className="w-full">
          <DashboardHeader />
        </div>
        <div className="px-[15px] pt-[90px]">
          <DashboardShell>
            {children}
          </DashboardShell>
        </div>
      </div>
    </Suspense>
  )
}

