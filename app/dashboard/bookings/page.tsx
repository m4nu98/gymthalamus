import { Suspense } from "react"
import Loading from "@/components/loading"
import { BookingCalendar } from "@/components/booking-calendar"

export default function BookingsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <BookingCalendar />
      </div>
    </Suspense>
  )
}

