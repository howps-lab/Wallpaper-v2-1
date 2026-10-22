import os
import urllib.request
import subprocess

headers = {'User-Agent': 'Mozilla/5.0'}

themes = [
    {
        "name": "summer_day_01",
        "poster": "summer-day-poster.jpg",
        "url": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=3840&q=90",
        "color_filter": "curves=all='0/0 0.5/0.52 1/1':green='0/0 0.5/0.53 1/1':blue='0/0 0.5/0.55 1/1'"
    },
    {
        "name": "sunset_field_01",
        "poster": "sunset-field-poster.jpg",
        "url": "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=3840&q=90",
        "color_filter": "curves=all='0/0 0.5/0.48 1/1':red='0/0 0.5/0.55 1/1':blue='0/0 0.5/0.42 1/1'"
    },
    {
        "name": "night_time_01",
        "poster": "night-time-poster.jpg",
        "url": "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=3840&q=90",
        "color_filter": "curves=all='0/0 0.5/0.45 1/1':blue='0/0 0.5/0.54 1/1':red='0/0 0.5/0.42 1/1'"
    }
]

os.makedirs('public/videos', exist_ok=True)
os.makedirs('public/images/posters', exist_ok=True)
os.makedirs('temp_assets', exist_ok=True)

for t in themes:
    raw_img = os.path.join('temp_assets', f"{t['name']}.jpg")
    poster_path = os.path.join('public/images/posters', t['poster'])
    video_path = os.path.join('public/videos', f"{t['name']}.mp4")
    
    if not os.path.exists(raw_img) or os.path.getsize(raw_img) < 1000:
        print(f"Downloading source image for {t['name']}...")
        req = urllib.request.Request(t['url'], headers=headers)
        with urllib.request.urlopen(req, timeout=20) as resp, open(raw_img, 'wb') as f:
            f.write(resp.read())
            
    # Also save poster frame
    if not os.path.exists(poster_path):
        subprocess.run([
            'ffmpeg', '-y', '-i', raw_img,
            '-vf', 'scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080',
            '-q:v', '2', poster_path
        ], check=True)
        print(f"Created poster {poster_path}")
        
    # Generate cinematic 10-second seamless loop video
    # 30 fps * 10 sec = 300 frames
    # Seamless sinusoidal pan and zoom:
    # zoom oscillates between 1.05 and 1.15
    # x oscillates smoothly
    # Because sin(0) = sin(2*pi) = 0, frame 0 matches frame 300 perfectly!
    if not os.path.exists(video_path) or os.path.getsize(video_path) < 1000:
        print(f"Rendering seamless cinematic loop for {t['name']}...")
        filter_str = (
            f"scale=2560:-1,"
            f"zoompan=z='1.08+0.05*sin(2*PI*on/300)':x='(iw-iw/zoom)/2+sin(2*PI*on/300)*50':y='(ih-ih/zoom)/2':d=300:s=1920x1080:fps=30,"
            f"{t['color_filter']}"
        )
        subprocess.run([
            'ffmpeg', '-y', '-loop', '1', '-i', raw_img,
            '-vf', filter_str,
            '-t', '10',
            '-c:v', 'libx264',
            '-preset', 'fast',
            '-crf', '22',
            '-pix_fmt', 'yuv420p',
            '-movflags', '+faststart',
            '-an',
            video_path
        ], check=True)
        print(f"Generated {video_path} ({os.path.getsize(video_path)} bytes)")

print("All video backgrounds and posters generated successfully!")
