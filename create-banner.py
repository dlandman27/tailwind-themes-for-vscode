#!/usr/bin/env python3
"""
Create a banner/grid of all Tailwind theme screenshots
Combines all 44 screenshots into a grid with theme names
"""

import os
from PIL import Image, ImageDraw, ImageFont
import math

def create_theme_banner():
    # Directories
    light_dir = "images-light"
    dark_dir = "images" 
    output_file = "tailwind-themes-banner.png"
    
    # Get all image files
    light_files = [f for f in os.listdir(light_dir) if f.endswith('.png')]
    dark_files = [f for f in os.listdir(dark_dir) if f.endswith('.png')]
    
    light_files.sort()
    dark_files.sort()
    
    all_files = []
    # Add light themes first
    for f in light_files:
        all_files.append((os.path.join(light_dir, f), f))
    # Add dark themes second
    for f in dark_files:
        all_files.append((os.path.join(dark_dir, f), f))
    
    print(f"Found {len(all_files)} theme screenshots")
    
    if len(all_files) == 0:
        print("No screenshots found!")
        return
    
    # Load first image to get dimensions
    first_img = Image.open(all_files[0][0])
    img_width, img_height = first_img.size
    
    # Grid layout - 8 columns, calculate rows needed
    cols = 8
    rows = math.ceil(len(all_files) / cols)
    
    # Spacing and text area
    spacing = 10
    text_height = 30
    theme_height = img_height + text_height + spacing
    
    # Calculate banner dimensions
    banner_width = (img_width * cols) + (spacing * (cols + 1))
    banner_height = (theme_height * rows) + (spacing * (rows + 1))
    
    print(f"Creating banner: {banner_width}x{banner_height} pixels")
    print(f"Grid: {cols} columns × {rows} rows")
    
    # Create banner
    banner = Image.new('RGB', (banner_width, banner_height), color='#1a1a1a')
    draw = ImageDraw.Draw(banner)
    
    # Try to load a font
    try:
        font = ImageFont.truetype("arial.ttf", 16)
    except:
        try:
            font = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 16)
        except:
            font = ImageFont.load_default()
    
    # Place each screenshot
    for i, (file_path, filename) in enumerate(all_files):
        row = i // cols
        col = i % cols
        
        # Calculate position
        x = spacing + (col * (img_width + spacing))
        y = spacing + (row * (theme_height + spacing))
        
        # Load and paste image
        img = Image.open(file_path)
        banner.paste(img, (x, y))
        
        # Extract theme name from filename
        theme_name = filename.replace('tailwind_', '').replace('.png', '').replace('_', ' ').title()
        
        # Draw theme name below image
        text_x = x + (img_width // 2)
        text_y = y + img_height + 5
        
        # Get text size for centering
        bbox = draw.textbbox((0, 0), theme_name, font=font)
        text_width = bbox[2] - bbox[0]
        text_x = text_x - (text_width // 2)
        
        # Draw text with outline for better visibility
        # Outline
        for offset_x in [-1, 0, 1]:
            for offset_y in [-1, 0, 1]:
                if offset_x != 0 or offset_y != 0:
                    draw.text((text_x + offset_x, text_y + offset_y), theme_name, font=font, fill='#000000')
        
        # Main text
        draw.text((text_x, text_y), theme_name, font=font, fill='#ffffff')
        
        print(f"Added: {theme_name}")
    
    # Add title at the top
    title = "Tailwind Themes for VS Code - All 44 Themes"
    title_font_size = 32
    try:
        title_font = ImageFont.truetype("arial.ttf", title_font_size)
    except:
        try:
            title_font = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", title_font_size)
        except:
            title_font = ImageFont.load_default()
    
    # Expand banner to add title space
    title_height = 60
    final_banner = Image.new('RGB', (banner_width, banner_height + title_height), color='#1a1a1a')
    final_banner.paste(banner, (0, title_height))
    
    # Draw title
    final_draw = ImageDraw.Draw(final_banner)
    bbox = final_draw.textbbox((0, 0), title, font=title_font)
    title_width = bbox[2] - bbox[0]
    title_x = (banner_width - title_width) // 2
    title_y = 15
    
    # Title outline
    for offset_x in [-2, -1, 0, 1, 2]:
        for offset_y in [-2, -1, 0, 1, 2]:
            if offset_x != 0 or offset_y != 0:
                final_draw.text((title_x + offset_x, title_y + offset_y), title, font=title_font, fill='#000000')
    
    # Main title
    final_draw.text((title_x, title_y), title, font=title_font, fill='#ffffff')
    
    # Save banner
    final_banner.save(output_file, 'PNG', quality=95)
    print(f"\n✅ Banner created successfully: {output_file}")
    print(f"Dimensions: {final_banner.size[0]}x{final_banner.size[1]} pixels")

if __name__ == "__main__":
    create_theme_banner()
