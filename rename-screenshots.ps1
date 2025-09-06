# PowerShell script to rename screenshots to theme names
# The themes appear in VS Code in alphabetical order

# List of theme names in the order you took screenshots
# First 22: All LIGHT themes alphabetically
# Last 22: All DARK themes alphabetically
$themeNames = @(
    # LIGHT themes first (alphabetical, but blue is last)
    "amber_light",
    "cyan_light",
    "emerald_light",
    "fuchsia_light",
    "gray_light",
    "green_light",
    "indigo_light",
    "lime_light",
    "neutral_light",
    "orange_light",
    "pink_light",
    "purple_light",
    "red_light",
    "rose_light",
    "sky_light",
    "slate_light",
    "stone_light",
    "teal_light",
    "violet_light",
    "yellow_light",
    "zinc_light",
    "blue_light",
    # DARK themes second (alphabetical)
    "amber_dark",
    "blue_dark",
    "cyan_dark",
    "emerald_dark",
    "fuchsia_dark",
    "gray_dark",
    "green_dark",
    "indigo_dark",
    "lime_dark",
    "neutral_dark",
    "orange_dark",
    "pink_dark",
    "purple_dark",
    "red_dark",
    "rose_dark",
    "sky_dark",
    "slate_dark",
    "stone_dark",
    "teal_dark",
    "violet_dark",
    "yellow_dark",
    "zinc_dark"
)

# Get all screenshot files sorted by name (chronological order)
$screenshots = Get-ChildItem -Path "images" -Filter "*.png" | Sort-Object Name

Write-Host "Found $($screenshots.Count) screenshots"
Write-Host "Have $($themeNames.Count) theme names"

if ($screenshots.Count -ne $themeNames.Count) {
    Write-Host "ERROR: Number of screenshots ($($screenshots.Count)) doesn't match number of themes ($($themeNames.Count))"
    exit 1
}

# Rename each screenshot
for ($i = 0; $i -lt $screenshots.Count; $i++) {
    $oldName = $screenshots[$i].Name
    $newName = "tailwind_$($themeNames[$i]).png"
    $oldPath = "images\$oldName"
    $newPath = "images\$newName"
    
    Write-Host "Renaming: $oldName -> $newName"
    Rename-Item -Path $oldPath -NewName $newName
}

Write-Host "✅ All screenshots renamed successfully!"
Write-Host "Files are now named like: tailwind_red_light.png, tailwind_blue_dark.png, etc."
