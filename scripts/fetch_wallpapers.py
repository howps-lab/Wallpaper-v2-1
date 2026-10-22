import os
import urllib.request

wallpapers = [
    {
        "filename": "alpine-dawn.jpg",
        "url": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=85",
        "fallback": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2400&q=85"
    },
    {
        "filename": "lavender-fields.jpg",
        "url": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=2400&q=85",
        "fallback": "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=2400&q=85"
    },
    {
        "filename": "emerald-waterfall.jpg",
        "url": "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=2400&q=85",
        "fallback": "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=2400&q=85"
    },
    {
        "filename": "misty-forest.jpg",
        "url": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2400&q=85",
        "fallback": "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=2400&q=85"
    },
    {
        "filename": "golden-meadow.jpg",
        "url": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=85",
        "fallback": "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=2400&q=85"
    },
    {
        "filename": "ocean-horizon.jpg",
        "url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=85",
        "fallback": "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=2400&q=85"
    },
    {
        "filename": "autumn-valley.jpg",
        "url": "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=2400&q=85",
        "fallback": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=85"
    },
    {
        "filename": "starry-wilderness.jpg",
        "url": "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2400&q=85",
        "fallback": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=2400&q=85"
    }
]

headers = {'User-Agent': 'Mozilla/5.0'}

os.makedirs('public/images/wallpapers', exist_ok=True)
os.makedirs('public/images/posters', exist_ok=True)
os.makedirs('public/videos', exist_ok=True)

for wp in wallpapers:
    path = os.path.join('public/images/wallpapers', wp['filename'])
    if not os.path.exists(path) or os.path.getsize(path) < 1000:
        print(f"Downloading {wp['filename']}...")
        req = urllib.request.Request(wp['url'], headers=headers)
        try:
            with urllib.request.urlopen(req, timeout=15) as resp, open(path, 'wb') as f:
                f.write(resp.read())
            print(f"Saved {wp['filename']} ({os.path.getsize(path)} bytes)")
        except Exception as e:
            print(f"Failed {wp['filename']} primary, trying fallback: {e}")
            req = urllib.request.Request(wp['fallback'], headers=headers)
            with urllib.request.urlopen(req, timeout=15) as resp, open(path, 'wb') as f:
                f.write(resp.read())

print("All wallpapers downloaded!")
