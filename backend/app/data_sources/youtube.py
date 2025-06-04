from yt_dlp import YoutubeDL

def get_youtube_videos(query: str, max_results: int = 5):
    ydl_opts = {
        'quiet': True,
        'skip_download': True,
        'default_search': 'ytsearch',
        'extract_flat': True,
    }

    with YoutubeDL(ydl_opts) as ydl:
        try:
            result = ydl.extract_info(f"ytsearch{max_results}:{query}", download=False)
        except Exception as e:
            print(f"[YouTube] Errore: {e}")
            return []

    return [
        {
            "title": entry.get("title"),
            "duration": entry.get("duration"),
            "link": f"https://www.youtube.com/watch?v={entry.get('id')}",
            "thumbnail": entry.get("thumbnails", [{}])[0].get("url"),
        }
        for entry in result.get("entries", [])

    ]