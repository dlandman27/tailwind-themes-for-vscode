#!/usr/bin/env python3
"""
Add exact theme names to README sections
"""

import re

def add_theme_names_to_readme():
    # Read current README
    with open('README.md', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Color names that need theme names added
    colors = [
        "Gray", "Zinc", "Neutral", "Stone",  # Remaining neutrals
        "Red", "Orange", "Amber", "Yellow",  # Warm colors
        "Sky", "Blue", "Indigo", "Cyan",     # Cool colors  
        "Lime", "Green", "Emerald", "Teal",  # Nature colors
        "Violet", "Purple", "Fuchsia", "Pink", "Rose"  # Creative colors
    ]
    
    # Pattern to find color sections that don't have theme names yet
    for color in colors:
        # Look for pattern: #### ColorName followed by table
        pattern = f"#### {color}\n\n\\| Light Theme \\| Dark Theme \\|"
        replacement = f"#### {color}\n**Theme Names**: `Tailwind {color} Light` • `Tailwind {color} Dark`\n\n| Light Theme | Dark Theme |"
        
        content = re.sub(pattern, replacement, content)
    
    # Write updated README
    with open('README.md', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Added theme names to all color sections!")
    print("Users can now see the exact names to look for in VS Code")

if __name__ == "__main__":
    add_theme_names_to_readme()
