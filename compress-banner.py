#!/usr/bin/env python3
"""
Compress the Tailwind themes banner for web use
Creates multiple sizes and optimizes file size
"""

from PIL import Image
import os

def compress_banner():
    input_file = "tailwind-themes-banner.png"
    
    if not os.path.exists(input_file):
        print(f"Error: {input_file} not found!")
        return
    
    # Load the original banner
    print("Loading original banner...")
    original = Image.open(input_file)
    original_size = original.size
    original_file_size = os.path.getsize(input_file) / (1024 * 1024)  # MB
    
    print(f"Original: {original_size[0]}x{original_size[1]} pixels ({original_file_size:.1f} MB)")
    
    # Create different compressed versions
    versions = [
        {
            "name": "web",
            "scale": 0.4,  # 40% of original size
            "quality": 85,
            "description": "Web-optimized version"
        },
        {
            "name": "github",
            "scale": 0.6,  # 60% of original size  
            "quality": 90,
            "description": "GitHub README version"
        },
        {
            "name": "thumbnail",
            "scale": 0.2,  # 20% of original size
            "quality": 80,
            "description": "Small thumbnail version"
        }
    ]
    
    for version in versions:
        # Calculate new dimensions
        new_width = int(original_size[0] * version["scale"])
        new_height = int(original_size[1] * version["scale"])
        
        # Resize image
        print(f"\nCreating {version['description']}...")
        resized = original.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Save compressed version
        output_file = f"tailwind-themes-banner-{version['name']}.jpg"
        resized.save(output_file, 'JPEG', quality=version["quality"], optimize=True)
        
        # Check file size
        file_size = os.path.getsize(output_file) / (1024 * 1024)  # MB
        compression_ratio = (1 - file_size / original_file_size) * 100
        
        print(f"✅ {output_file}")
        print(f"   Size: {new_width}x{new_height} pixels")
        print(f"   File size: {file_size:.1f} MB")
        print(f"   Compression: {compression_ratio:.1f}% smaller")
    
    # Also create a PNG version that's optimized but lossless
    print(f"\nCreating optimized PNG...")
    # Resize to 60% and save as optimized PNG
    new_width = int(original_size[0] * 0.6)
    new_height = int(original_size[1] * 0.6)
    resized_png = original.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
    output_png = "tailwind-themes-banner-optimized.png"
    resized_png.save(output_png, 'PNG', optimize=True)
    
    png_size = os.path.getsize(output_png) / (1024 * 1024)
    png_compression = (1 - png_size / original_file_size) * 100
    
    print(f"✅ {output_png}")
    print(f"   Size: {new_width}x{new_height} pixels")
    print(f"   File size: {png_size:.1f} MB")
    print(f"   Compression: {png_compression:.1f}% smaller")
    
    print(f"\n🎉 All compressed versions created!")
    print(f"\nRecommended usage:")
    print(f"• GitHub README: tailwind-themes-banner-github.jpg")
    print(f"• Web/blog posts: tailwind-themes-banner-web.jpg") 
    print(f"• Social media: tailwind-themes-banner-thumbnail.jpg")
    print(f"• High quality: tailwind-themes-banner-optimized.png")

if __name__ == "__main__":
    compress_banner()
