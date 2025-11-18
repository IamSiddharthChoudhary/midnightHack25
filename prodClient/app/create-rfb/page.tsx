'use client'

import { Navigation } from '@/components/navigation'
import { CreateRFBForm } from '@/components/create-rfb-form'

export default function CreateRFBPage() {
  return (
    <div className="min-h-screen bg-gradient-to-l from-amber-300 via-slate-800 to-black">
      <Navigation />
      <div className="pt-20 pb-12">
        <CreateRFBForm />
      </div>
    </div>
  )
}
