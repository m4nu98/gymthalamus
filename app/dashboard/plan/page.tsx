import { Suspense } from "react"
import Loading from "@/components/loading"
import { AssignedRoutine } from "@/components/assigned-routine"

export default function PlanPage() {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <AssignedRoutine />
      </div>
    </Suspense>
  )
}

