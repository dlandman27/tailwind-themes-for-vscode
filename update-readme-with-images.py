#!/usr/bin/env python3
"""
Update README with organized color sections showing light and dark themes
Groups: Neutrals, Warm Colors, Cool Colors, Nature Colors, Creative Colors
"""

import os
import re

def update_readme_with_images():
    # Color groupings
    color_groups = {
        "Neutral Colors": ["slate", "gray", "zinc", "neutral", "stone"],
        "Warm Colors": ["red", "orange", "amber", "yellow"],
        "Cool Colors": ["sky", "blue", "indigo", "cyan"],
        "Nature Colors": ["lime", "green", "emerald", "teal"],
        "Creative Colors": ["violet", "purple", "fuchsia", "pink", "rose"]
    }
    
    # Read current README
    with open('README.md', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find where to insert the new sections (after the color palette preview)
    insert_marker = "## 🎨 Available Themes"
    
    if insert_marker not in content:
        print("Could not find insertion point in README")
        return
    
    # Build the new sections
    new_sections = []
    
    new_sections.append("## 📸 Theme Showcase")
    new_sections.append("")
    new_sections.append("### 🎨 All Themes by Color Family")
    new_sections.append("")
    
    for group_name, colors in color_groups.items():
        new_sections.append(f"### {group_name}")
        new_sections.append("")
        
        for color in colors:
            # Check if images exist
            light_path = f"images/light/tailwind_{color}_light.png"
            dark_path = f"images/dark/tailwind_{color}_dark.png"
            
            light_exists = os.path.exists(light_path)
            dark_exists = os.path.exists(dark_path)
            
            if light_exists or dark_exists:
                color_title = color.replace('_', ' ').title()
                new_sections.append(f"#### {color_title}")
                new_sections.append("")
                
                # Create a table with light and dark side by side
                new_sections.append("| Light Theme | Dark Theme |")
                new_sections.append("|-------------|------------|")
                
                light_cell = f"![{color_title} Light]({light_path})" if light_exists else "*Not available*"
                dark_cell = f"![{color_title} Dark]({dark_path})" if dark_exists else "*Not available*"
                
                new_sections.append(f"| {light_cell} | {dark_cell} |")
                new_sections.append("")
    
    # Insert the new sections before "Available Themes"
    before_themes = content.split(insert_marker)[0]
    after_themes = insert_marker + content.split(insert_marker)[1]
    
    new_content = before_themes + "\n".join(new_sections) + "\n" + after_themes
    
    # Write updated README
    with open('README.md', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("✅ README updated with organized color sections!")
    print(f"Added {len([c for colors in color_groups.values() for c in colors])} color themes organized into {len(color_groups)} groups")

if __name__ == "__main__":
    update_readme_with_images()
