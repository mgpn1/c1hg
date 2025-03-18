import requests
import os
from PIL import Image
from io import BytesIO

def download_and_save_image(url, filename, size=None):
    response = requests.get(url)
    if response.status_code == 200:
        img = Image.open(BytesIO(response.content))
        if size:
            img = img.resize(size, Image.Resampling.LANCZOS)
        img.save(f'images/{filename}', quality=85, optimize=True)
        print(f"Downloaded and saved: {filename}")
    else:
        print(f"Failed to download: {filename}")

# Create images directory if it doesn't exist
os.makedirs('images', exist_ok=True)

# Image URLs (from Unsplash - free to use)
images = {
    'hero-bg.jpg': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',  # Gym background
    'trainer.jpg': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b',  # Professional trainer
    'before1.jpg': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',  # Before transformation
    'after1.jpg': 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61',   # After transformation
    'before2.jpg': 'https://images.unsplash.com/photo-1571019613531-fbeaeb5b5a07',  # Before transformation
    'after2.jpg': 'https://images.unsplash.com/photo-1583454151984-5e35cb0e5455',   # After transformation
    'before3.jpg': 'https://images.unsplash.com/photo-1571019613576-2b22c76fd955',  # Before transformation
    'after3.jpg': 'https://images.unsplash.com/photo-1583454177592-4d3dae729d91',   # After transformation
    'whey-protein.jpg': 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f',  # Whey protein
    'bcaa.jpg': 'https://images.unsplash.com/photo-1579722819471-5f9e455cd310',     # BCAA supplement
    'pre-workout.jpg': 'https://images.unsplash.com/photo-1579722819467-9c0c1d1a8f2e',  # Pre-workout
    'creatine.jpg': 'https://images.unsplash.com/photo-1579722819466-8e49e0cf0e56',  # Creatine
}

# Download and process each image
for filename, url in images.items():
    # Add Unsplash API parameters for better quality
    url = f"{url}?q=85&w=1500&fit=crop"
    download_and_save_image(url, filename)

print("All images downloaded successfully!") 