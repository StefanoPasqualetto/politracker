from app.data_sources.youtube import get_youtube_videos

if __name__ == "__main__":
    results = get_youtube_videos("Elon Musk")
    for video in results:
        print(video)