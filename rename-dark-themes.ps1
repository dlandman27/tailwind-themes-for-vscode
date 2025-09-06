# PowerShell script to rename DARK theme screenshots
# Dark themes in alphabetical order

# List of DARK theme names in alphabetical order
$darkThemeNames = @(
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
Write-Host "Have $($darkThemeNames.Count) dark theme names"

if ($screenshots.Count -ne $darkThemeNames.Count) {
    Write-Host "ERROR: Number of screenshots ($($screenshots.Count)) doesn't match number of dark themes ($($darkThemeNames.Count))"
    exit 1
}

# Rename each screenshot
for ($i = 0; $i -lt $screenshots.Count; $i++) {
    $oldName = $screenshots[$i].Name
    $newName = "tailwind_$($darkThemeNames[$i]).png"
    $oldPath = "images\$oldName"
    $newPath = "images\$newName"
    
    Write-Host "Renaming: $oldName -> $newName"
    Rename-Item -Path $oldPath -NewName $newName
}

Write-Host "✅ All DARK theme screenshots renamed successfully!"
Write-Host "Dark themes are in alphabetical order"
