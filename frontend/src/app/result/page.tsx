'use client'

import {useSearchParams} from 'next/navigation'
import Section from "@/components/Section";
import {useEffect, useState} from 'react'

type EntityItem = {
    entity: string
    context: string
}

type EntityMap = {
    [key: string]: EntityItem[]
}

type NewsItem = {
    title: string
    link: string
    snippet?: string,
    publishedAt?: string,
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
        <main className="min-h-screen p-6">
            <h1 className="text-3xl font-semibold mb-4 text-yellow-400 font-mono">📊 Analisi di: {target}</h1>


            <Section title="📄 Bio">
                <div className="flex flex-col md:flex-row items-start gap-6">
                    {data.image && (
                        <img
                            src={data.image}
                            alt="profilo"
                            className="w-40 h-auto rounded shadow-md object-cover"
                        />
                    )}
                    <p className="text-gray-300 leading-relaxed">{data.bio}</p>
                </div>
            </Section>

            <Section title="📍 Entità">
                <div className="space-y-2">
                    {Object.entries(data.entities).map(([label, values]) => (
                        <div key={label}>
                            <h3 className="text-yellow-400 font-semibold">{label}</h3>
                            <ul className="pl-4 list-disc">
                                {values.map((v, i) => (
                                    <li key={i}>
                                        <span className="font-bold">{v.entity}</span>
                                        <p className=" text-sm italic">{v.context}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </Section>


            <Section title="📰 Notizie Recenti">
                {data.news.length === 0 ? (
                    <p className="text-gray-600">Nessuna notizia trovata.</p>
                ) : (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.news.map((item, index) => (
                            <li key={index} className="border rounded p-4 bg-gray-900 shadow-md">
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-lg text-yellow-400 hover:underline"
                                >
                                    {item.title}
                                </a>
                                <p className="text-gray-400 text-sm mt-1">{item.snippet}</p>
                                {item.publishedAt && (
                                    <p className="text-gray-500 text-xs mt-2">
                                        🕒 {new Date(item.publishedAt).toLocaleString("it-IT")}
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </Section>


            <Section title="🎥 Video">
                {data.videos.length === 0 ? (
                    <p className="text-gray-600">Nessun video trovato.</p>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {data.videos.map((v, index) => (
                            <li key={index} className="border rounded p-4 bg-gray-50 shadow">
                                <a href={v.link} target="_blank" rel="noopener noreferrer">
                                    <img src={v.thumbnail} alt="video thumbnail"
                                         className="w-full h-auto rounded mb-2"/>
                                    <h3 className="text-gray-900 font-semibold hover:underline">{v.title}</h3>
                                </a>
                                {v.duration && (
                                    <p className="text-sm text-gray-600 mt-1">⏱ {v.duration}</p>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </Section>


            <div className="mt-6">
                <a href={data.source} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">
                    Fonte Wikipedia
                </a>
            </div>
        </main>
    )
}