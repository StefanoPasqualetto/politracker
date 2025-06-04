'use client'

import {useSearchParams} from 'next/navigation'
import {useEffect, useState} from 'react'

type EntityMap = {
    [key: string]: string[]
}

type NewsItem = {
    title: string
    link: string
    snippet?: string,
    publishedAt?:string,
}

type ResponseData = {
    bio: string
    image: string | null
    source: string
    entities: EntityMap
    news: NewsItem[]
        videos: {
      title: string
      duration?: string
      link: string
      thumbnail: string
    }[]
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
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({target})
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

            <h2 className="text-2xl font-bold mt-10 mb-2">📰 Notizie Recenti</h2>

            {data.news.length === 0 ? (
                <p className="text-gray-600">Nessuna notizia trovata.</p>
            ) : (
            <ul className="space-y-4">
              {data.news.map((item, index) => (

                <li key={index} className="border-b pb-2">
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-lg text-blue-600 hover:underline">
                    {item.title}
                  </a>
                  <p className="text-gray-600 text-sm">{item.snippet}</p>
                  {item.publishedAt && (
                    <p className="text-gray-400 text-xs">
                      🕒 {new Date(item.publishedAt).toLocaleString("it-IT")}
                    </p>
                  )}
                </li>
              ))}
            </ul>
            )}

            <h2 className="text-2xl font-bold mt-10 mb-2">🎥 Video recenti</h2>

{data.videos.length === 0 ? (
  <p className="text-gray-600">Nessun video trovato.</p>
) : (
  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {data.videos.map((v, index) => (
      <li key={index} className="border rounded p-4 bg-gray-50 shadow">
        <a href={v.link} target="_blank" rel="noopener noreferrer">
          <img src={v.thumbnail} alt="video thumbnail" className="w-full h-auto rounded mb-2" />
          <h3 className="text-blue-700 font-semibold hover:underline">{v.title}</h3>
        </a>
        {v.duration && (
          <p className="text-sm text-gray-600 mt-1">⏱ {v.duration}</p>
        )}
      </li>
    ))}
  </ul>
)}

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