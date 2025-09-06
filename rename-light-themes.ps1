# PowerShell script to rename LIGHT theme screenshots only
# Blue is last in your screenshot order

# List of LIGHT theme names in your screenshot order (alphabetical, blue last)
$lightThemeNames = @(
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
    "blue_light"
)

# Get all screenshot files sorted by name (chronological order)
$screenshots = Get-ChildItem -Path "images" -Filter "*.png" | Sort-Object Name

Write-Host "Found $($screenshots.Count) screenshots"
Write-Host "Have $($lightThemeNames.Count) light theme names"

if ($screenshots.Count -ne $lightThemeNames.Count) {
    Write-Host "ERROR: Number of screenshots ($($screenshots.Count)) doesn't match number of light themes ($($lightThemeNames.Count))"
    exit 1
}

# Rename each screenshot
for ($i = 0; $i -lt $screenshots.Count; $i++) {
    $oldName = $screenshots[$i].Name
    $newName = "tailwind_$($lightThemeNames[$i]).png"
    $oldPath = "images\$oldName"
    $newPath = "images\$newName"
    
    Write-Host "Renaming: $oldName -> $newName"
    Rename-Item -Path $oldPath -NewName $newName
}

Write-Host "✅ All LIGHT theme screenshots renamed successfully!"
Write-Host "Blue is correctly placed last as: tailwind_blue_light.png"
