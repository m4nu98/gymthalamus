import { Suspense } from "react"
import Loading from "@/components/loading"
import { NotificationsList } from "@/components/notifications-list"

export default function NotificationsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <NotificationsList />
      </div>
    </Suspense>
  )
}

