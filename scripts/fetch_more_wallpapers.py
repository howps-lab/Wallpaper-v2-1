import os
import urllib.request

wallpapers = [
    {
        "filename": "desert-dunes.jpg",
        "url": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2400&q=85",
        "fallback": "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=2400&q=85"
    },
    {
        "filename": "glacial-fjord.jpg",
        "url": "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=2400&q=85",
        "fallback": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=85"
    },
    {
        "filename": "northern-aurora.jpg",
        "url": "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=2400&q=85",
        "fallback": "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=2400&q=85"
    },
    {
        "filename": "sakura-blossom.jpg",
        "url": "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=2400&q=85",
        "fallback": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2400&q=85"
    }
]

headers = {'User-Agent': 'Mozilla/5.0'}

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
            print(f"Saved {wp['filename']} fallback ({os.path.getsize(path)} bytes)")

print("4 new wallpapers downloaded!")
