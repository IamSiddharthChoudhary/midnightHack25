'use client'

import { Navigation } from '@/components/navigation'
import { CreateRFBForm } from '@/components/create-rfb-form'

export default function CreateRFBPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      <div className="pt-20 pb-12">
        <CreateRFBForm />
      </div>
    </div>
  )
}
