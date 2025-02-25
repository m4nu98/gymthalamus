import { DashboardShell } from "@/components/shell"
import { CurrentBooking } from "@/components/current-booking"
import { TrainingPlan } from "@/components/training-plan"
import { PersonalRoutine } from "@/components/personal-routine"
import { Suspense } from "react"
import Loading from "@/components/loading.tsx"

export default function DashboardPage() {
  return (
    <Suspense fallback={<Loading />}>
      <DashboardShell>
        <div className="grid gap-6">
          <CurrentBooking />
          <div className="grid gap-6 md:grid-cols-2">
            <TrainingPlan />
            <PersonalRoutine />
          </div>
        </div>
      </DashboardShell>
    </Suspense>
  )
}

