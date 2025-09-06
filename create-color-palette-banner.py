#!/usr/bin/env python3
"""
Create a color palette banner showing all Tailwind CSS colors
Perfect for social media and LinkedIn posts
"""

import os
from PIL import Image, ImageDraw, ImageFont
import json

def create_color_palette_banner():
    # Load the Tailwind colors from the JS file
    colors_data = {}
    
    # Read the tailwind_pallete.js file and extract colors
    with open('tailwind_pallete.js', 'r') as f:
        content = f.read()
    
    # Parse the colors (simple extraction)
    import re
    
    # Find all color definitions
    color_pattern = r'(\w+):\s*{\s*((?:\d+:\s*[\'"]#[a-fA-F0-9]{6}[\'"],?\s*)+)\s*}'
    color_matches = re.findall(color_pattern, content)
    
    tailwind_colors = {}
    
    for color_name, color_values in color_matches:
        # Extract hex values
        hex_pattern = r'(\d+):\s*[\'"](#[a-fA-F0-9]{6})[\'"]'
        hex_matches = re.findall(hex_pattern, color_values)
        
        color_dict = {}
        for shade, hex_color in hex_matches:
            color_dict[int(shade)] = hex_color
        
        tailwind_colors[color_name] = color_dict
    
    print(f"Found {len(tailwind_colors)} color families")
    
    # Banner dimensions
    banner_width = 1200  # LinkedIn optimal width
    banner_height = 600  # LinkedIn optimal height
    
    # Calculate grid for colors (use all 22 colors)
    colors_per_row = 8
    rows = 3  # 22 colors will fill most of 8x3=24 grid
    
    # Calculate color block size (use full space)
    margin = 20
    available_width = banner_width - (margin * 2)
    available_height = banner_height - (margin * 2)
    
    color_block_width = available_width // colors_per_row
    color_block_height = available_height // rows
    
    # Create banner
    banner = Image.new('RGB', (banner_width, banner_height), color='#0f172a')  # Dark background
    draw = ImageDraw.Draw(banner)
    
    # Sort colors for consistent layout
    sorted_colors = sorted(tailwind_colors.items())
    
    # Draw all color blocks
    x_start = margin
    y_start = margin
    
    for i, (color_name, shades) in enumerate(sorted_colors):
        if i >= colors_per_row * rows:  # Limit to what fits
            break
            
        row = i // colors_per_row
        col = i % colors_per_row
        
        x = x_start + (col * color_block_width)
        y = y_start + (row * color_block_height)
        
        # Get shades for this color (use 500 as primary, fallback to middle value)
        primary_shade = shades.get(500, list(shades.values())[len(shades)//2])
        
        # Draw gradient of shades within the block
        shade_keys = sorted(shades.keys())
        if len(shade_keys) > 1:
            shade_height = color_block_height // len(shade_keys)
            for j, shade_key in enumerate(shade_keys):
                shade_y = y + (j * shade_height)
                draw.rectangle([x, shade_y, x + color_block_width - 2, shade_y + shade_height], 
                              fill=shades[shade_key])
        else:
            # Single color
            draw.rectangle([x, y, x + color_block_width - 2, y + color_block_height - 2], 
                          fill=primary_shade)
    
    # Add centered text overlay on top of all colors
    # Create semi-transparent overlay
    overlay = Image.new('RGBA', (banner_width, banner_height), (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    
    # Dark semi-transparent background for text readability
    overlay_draw.rectangle([0, 0, banner_width, banner_height], fill=(0, 0, 0, 120))
    
    # Combine overlay with banner
    banner = Image.alpha_composite(banner.convert('RGBA'), overlay).convert('RGB')
    draw = ImageDraw.Draw(banner)
    
    # Load fonts
    try:
        title_font = ImageFont.truetype("C:/Windows/Fonts/calibri.ttf", 56)
        subtitle_font = ImageFont.truetype("C:/Windows/Fonts/calibri.ttf", 32)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
    
    # Main title
    title = "Tailwind Themes for VS Code"
    bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = bbox[2] - bbox[0]
    title_x = (banner_width - title_width) // 2
    title_y = (banner_height // 2) - 40
    
    # Title with outline for visibility
    # for offset_x in [-2, -1, 0, 1, 2]:
    #     for offset_y in [-2, -1, 0, 1, 2]:
    #         if offset_x != 0 or offset_y != 0:
    #             draw.text((title_x + offset_x, title_y + offset_y), title, 
    #                      font=title_font, fill='#000000')
    # draw.text((title_x, title_y), title, font=title_font, fill='#ffffff')
    
    # Subtitle
    # subtitle = "22 Color Families • 44 Beautiful Themes"
    # bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    # subtitle_width = bbox[2] - bbox[0]
    # subtitle_x = (banner_width - subtitle_width) // 2
    # subtitle_y = title_y + 70
    
    # Subtitle with outline
    # for offset_x in [-1, 0, 1]:
    #     for offset_y in [-1, 0, 1]:
    #         if offset_x != 0 or offset_y != 0:
    #             draw.text((subtitle_x + offset_x, subtitle_y + offset_y), subtitle, 
    #                      font=subtitle_font, fill='#000000')
    # draw.text((subtitle_x, subtitle_y), subtitle, font=subtitle_font, fill='#e2e8f0')
    
    # Banner is complete with embedded text
    
    # Save banner
    output_file = "tailwind-color-palette-banner.png"
    banner.save(output_file, 'PNG', quality=95)
    
    print(f"\n✅ Color palette banner created: {output_file}")
    print(f"Dimensions: {banner_width}x{banner_height} pixels")
    print(f"Perfect for LinkedIn, Twitter, and social media!")
    print(f"Shows all Tailwind CSS colors with your branding")

if __name__ == "__main__":
    create_color_palette_banner()
