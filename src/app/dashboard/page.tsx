import { Suspense } from "react"

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL


export default function DashboardPoge() {
  return (
    <section>
      <Suspense fallback={<p>Loading feed...</p>}>
      <h1>Hello, Dashboard Page!</h1>
      </Suspense>
      <Suspense fallback={<p>Loading weather...</p>}>
      <h1>Hello, Dashboard Page!</h1>
      </Suspense>
    </section>
  )
}