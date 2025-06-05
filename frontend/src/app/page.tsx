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
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gray-900 text-gray-100">
      <h1 className="text-5xl font-extrabold mb-6 text-yellow-400 tracking-tight text-center">
        🎯 PoliTracker
      </h1>
      <p className="text-gray-400 mb-8 text-center max-w-xl">
        Inserisci il nome di un personaggio pubblico per ottenere un'analisi contestualizzata tra bio, entità, news e video.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Es. Giorgia Meloni"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="w-full px-4 py-3 rounded-md border border-gray-700 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 text-black font-semibold py-3 rounded-md hover:bg-yellow-400 transition-colors"
        >
          ▶ Analizza
        </button>
      </form>
    </main>
  )
}