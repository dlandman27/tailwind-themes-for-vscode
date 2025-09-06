# Testing Your Tailwind Themes Extension

## 🧪 How to Test the Extension Locally

1. **Open VS Code in this directory**:
   ```bash
   code .
   ```

2. **Press F5** to open a new Extension Development Host window

3. **In the new window**:
   - Go to `File > Preferences > Color Theme` (or `Ctrl+K Ctrl+T`)
   - You should see all your Tailwind themes listed!
   - Try switching between different themes to test them

4. **Test with different file types**:
   - Create test files: `.js`, `.ts`, `.html`, `.css`, `.py`, etc.
   - Check syntax highlighting and readability

## 🖼️ Creating the PNG Icon

Since the extension needs a PNG icon, you can:

**Option 1: Online SVG to PNG Converter**
1. Go to https://convertio.co/svg-png/ or similar
2. Upload the `icon.svg` file
3. Download as `icon.png` (128x128 pixels)
4. Save it in the project root

**Option 2: If you have design software**
- Open `icon.svg` in Photoshop, Figma, or similar
- Export as PNG at 128x128 pixels
- Save as `icon.png`

## 📦 Package for Publishing

1. **Install VSCE** (VS Code Extension Manager):
   ```bash
   npm install -g vsce
   ```

2. **Package the extension**:
   ```bash
   vsce package
   ```

3. **This creates a `.vsix` file** that you can:
   - Install locally: `code --install-extension tailwind-themes-1.0.0.vsix`
   - Publish to marketplace: `vsce publish`

## 🚀 Publishing to VS Code Marketplace

1. **Create Azure DevOps account** (required for publishing)
2. **Get Personal Access Token** from Azure DevOps
3. **Create publisher** (first time only):
   ```bash
   vsce create-publisher your-publisher-name
   ```
4. **Update package.json** with your publisher name
5. **Publish**:
   ```bash
   vsce publish
   ```

## ✅ Final Checklist Before Publishing

- [ ] All 44 themes work properly
- [ ] Icon shows up correctly (PNG format)
- [ ] README has good screenshots
- [ ] Publisher name updated in package.json
- [ ] Repository URL updated
- [ ] License file added
- [ ] Version number set correctly
- [ ] Keywords optimized for discoverability

## 🎯 Popular Theme Testing

Test these specific themes as they'll likely be most popular:
- Tailwind Blue Dark/Light
- Tailwind Slate Dark/Light  
- Tailwind Emerald Dark/Light
- Tailwind Purple Dark/Light
- Tailwind Rose Dark/Light
