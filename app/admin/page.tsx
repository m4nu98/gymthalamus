import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { Overview } from "@/components/overview"
import { RecentMembers } from "@/components/recent-members"
import { BranchSelector } from "@/components/branch-selector"

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="w-full">
        <DashboardHeader />
      </div>
      <div className="px-[15px] pt-[90px]">
        <DashboardShell>
          <div className="grid gap-6">
            <BranchSelector />
            <Overview />
            <RecentMembers />
          </div>
        </DashboardShell>
      </div>
    </div>
  )
}

