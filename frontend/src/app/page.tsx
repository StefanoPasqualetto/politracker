'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [target, setTarget] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (target.trim() === '') return
    router.push(`/result?target=${encodeURIComponent(target)}`)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">🎯 PoliTracker</h1>
      <p className="text-gray-700 mb-4 text-center max-w-lg">
        Inserisci il nome di un politico o personaggio pubblico per analizzarne bio ed entità.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Es. Giorgia Meloni"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
        >
          Analizza
        </button>
      </form>
    </main>
  )
}