'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type EntityMap = {
  [key: string]: string[]
}

type ResponseData = {
  bio: string
  image: string | null
  source: string
  entities: EntityMap
}

export default function ResultPage() {
  const searchParams = useSearchParams()
  const target = searchParams.get('target')
  const [data, setData] = useState<ResponseData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!target) return

    fetch('http://localhost:8000/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target })
    })
      .then((res) => {
        if (!res.ok) throw new Error('Errore nella risposta API')
        return res.json()
      })
      .then(setData)
      .catch((err) => setError(err.message))
  }, [target])

  if (!target) return <p className="p-8 text-center">Nessun target fornito.</p>
  if (error) return <p className="p-8 text-red-600 text-center">Errore: {error}</p>
  if (!data) return <p className="p-8 text-center">Caricamento in corso...</p>

  return (
    <main className="min-h-screen p-6 bg-white">
      <h1 className="text-3xl font-semibold mb-4">📊 Analisi di: {target}</h1>

      <p className="mb-4 text-gray-800">
        <strong>Bio:</strong> {data.bio}
      </p>

      {data.image && (
        <img
          src={data.image}
          alt="immagine profilo"
          className="w-48 rounded shadow mb-6"
        />
      )}

      <h2 className="text-2xl font-bold mt-6 mb-2">🔍 Entità Nominate:</h2>
      <div className="space-y-2">
        {Object.entries(data.entities).map(([label, values]) => (
          <div key={label}>
            <span className="font-semibold text-blue-600">{label}</span>: {values.join(', ')}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <a
          href={data.source}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Fonte Wikipedia
        </a>
      </div>
    </main>
  )
}