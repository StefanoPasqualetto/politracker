'use client'

import { useState, ReactNode } from 'react'

type SectionProps = {
  title: string
  icon?: string
  defaultOpen?: boolean
  children: ReactNode
}

export default function Section({ title, icon = '📦', defaultOpen = true, children }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section className="mb-6 border border-gray-600 rounded-md overflow-hidden">
      <header
        onClick={() => setOpen(!open)}
        className="cursor-pointer bg-gray-800 text-yellow-400 px-4 py-2 flex items-center justify-between"
      >
        <h2 className="font-mono font-bold text-lg">
          {icon} {title}
        </h2>
        <span className="text-xl">{open ? '−' : '+'}</span>
      </header>
      {open && <div className="p-4 bg-gray-900 text-gray-100">{children}</div>}
    </section>
  )
}