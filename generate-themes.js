const fs = require('fs');
const path = require('path');

// Import the Tailwind colors
const colors = {
	slate: {
		50: '#f8fafc',
		100: '#f1f5f9',
		200: '#e2e8f0',
		300: '#cbd5e1',
		400: '#94a3b8',
		500: '#64748b',
		600: '#475569',
		700: '#334155',
		800: '#1e293b',
		900: '#0f172a',
		950: '#020617',
	},
	gray: {
		50: '#f9fafb',
		100: '#f3f4f6',
		200: '#e5e7eb',
		300: '#d1d5db',
		400: '#9ca3af',
		500: '#6b7280',
		600: '#4b5563',
		700: '#374151',
		800: '#1f2937',
		900: '#111827',
		950: '#030712',
	},
	zinc: {
		50: '#fafafa',
		100: '#f4f4f5',
		200: '#e4e4e7',
		300: '#d4d4d8',
		400: '#a1a1aa',
		500: '#71717a',
		600: '#52525b',
		700: '#3f3f46',
		800: '#27272a',
		900: '#18181b',
		950: '#09090b',
	},
	neutral: {
		50: '#fafafa',
		100: '#f5f5f5',
		200: '#e5e5e5',
		300: '#d4d4d4',
		400: '#a3a3a3',
		500: '#737373',
		600: '#525252',
		700: '#404040',
		800: '#262626',
		900: '#171717',
		950: '#0a0a0a',
	},
	stone: {
		50: '#fafaf9',
		100: '#f5f5f4',
		200: '#e7e5e4',
		300: '#d6d3d1',
		400: '#a8a29e',
		500: '#78716c',
		600: '#57534e',
		700: '#44403c',
		800: '#292524',
		900: '#1c1917',
		950: '#0c0a09',
	},
	red: {
		50: '#fef2f2',
		100: '#fee2e2',
		200: '#fecaca',
		300: '#fca5a5',
		400: '#f87171',
		500: '#ef4444',
		600: '#dc2626',
		700: '#b91c1c',
		800: '#991b1b',
		900: '#7f1d1d',
		950: '#450a0a',
	},
	orange: {
		50: '#fff7ed',
		100: '#ffedd5',
		200: '#fed7aa',
		300: '#fdba74',
		400: '#fb923c',
		500: '#f97316',
		600: '#ea580c',
		700: '#c2410c',
		800: '#9a3412',
		900: '#7c2d12',
		950: '#431407',
	},
	amber: {
		50: '#fffbeb',
		100: '#fef3c7',
		200: '#fde68a',
		300: '#fcd34d',
		400: '#fbbf24',
		500: '#f59e0b',
		600: '#d97706',
		700: '#b45309',
		800: '#92400e',
		900: '#78350f',
		950: '#451a03',
	},
	yellow: {
		50: '#fefce8',
		100: '#fef9c3',
		200: '#fef08a',
		300: '#fde047',
		400: '#facc15',
		500: '#eab308',
		600: '#ca8a04',
		700: '#a16207',
		800: '#854d0e',
		900: '#713f12',
		950: '#422006',
	},
	lime: {
		50: '#f7fee7',
		100: '#ecfccb',
		200: '#d9f99d',
		300: '#bef264',
		400: '#a3e635',
		500: '#84cc16',
		600: '#65a30d',
		700: '#4d7c0f',
		800: '#3f6212',
		900: '#365314',
		950: '#1a2e05',
	},
	green: {
		50: '#f0fdf4',
		100: '#dcfce7',
		200: '#bbf7d0',
		300: '#86efac',
		400: '#4ade80',
		500: '#22c55e',
		600: '#16a34a',
		700: '#15803d',
		800: '#166534',
		900: '#14532d',
		950: '#052e16',
	},
	emerald: {
		50: '#ecfdf5',
		100: '#d1fae5',
		200: '#a7f3d0',
		300: '#6ee7b7',
		400: '#34d399',
		500: '#10b981',
		600: '#059669',
		700: '#047857',
		800: '#065f46',
		900: '#064e3b',
		950: '#022c22',
	},
	teal: {
		50: '#f0fdfa',
		100: '#ccfbf1',
		200: '#99f6e4',
		300: '#5eead4',
		400: '#2dd4bf',
		500: '#14b8a6',
		600: '#0d9488',
		700: '#0f766e',
		800: '#115e59',
		900: '#134e4a',
		950: '#042f2e',
	},
	cyan: {
		50: '#ecfeff',
		100: '#cffafe',
		200: '#a5f3fc',
		300: '#67e8f9',
		400: '#22d3ee',
		500: '#06b6d4',
		600: '#0891b2',
		700: '#0e7490',
		800: '#155e75',
		900: '#164e63',
		950: '#083344',
	},
	sky: {
		50: '#f0f9ff',
		100: '#e0f2fe',
		200: '#bae6fd',
		300: '#7dd3fc',
		400: '#38bdf8',
		500: '#0ea5e9',
		600: '#0284c7',
		700: '#0369a1',
		800: '#075985',
		900: '#0c4a6e',
		950: '#082f49',
	},
	blue: {
		50: '#eff6ff',
		100: '#dbeafe',
		200: '#bfdbfe',
		300: '#93c5fd',
		400: '#60a5fa',
		500: '#3b82f6',
		600: '#2563eb',
		700: '#1d4ed8',
		800: '#1e40af',
		900: '#1e3a8a',
		950: '#172554',
	},
	indigo: {
		50: '#eef2ff',
		100: '#e0e7ff',
		200: '#c7d2fe',
		300: '#a5b4fc',
		400: '#818cf8',
		500: '#6366f1',
		600: '#4f46e5',
		700: '#4338ca',
		800: '#3730a3',
		900: '#312e81',
		950: '#1e1b4b',
	},
	violet: {
		50: '#f5f3ff',
		100: '#ede9fe',
		200: '#ddd6fe',
		300: '#c4b5fd',
		400: '#a78bfa',
		500: '#8b5cf6',
		600: '#7c3aed',
		700: '#6d28d9',
		800: '#5b21b6',
		900: '#4c1d95',
		950: '#2e1065',
	},
	purple: {
		50: '#faf5ff',
		100: '#f3e8ff',
		200: '#e9d5ff',
		300: '#d8b4fe',
		400: '#c084fc',
		500: '#a855f7',
		600: '#9333ea',
		700: '#7e22ce',
		800: '#6b21a8',
		900: '#581c87',
		950: '#3b0764',
	},
	fuchsia: {
		50: '#fdf4ff',
		100: '#fae8ff',
		200: '#f5d0fe',
		300: '#f0abfc',
		400: '#e879f9',
		500: '#d946ef',
		600: '#c026d3',
		700: '#a21caf',
		800: '#86198f',
		900: '#701a75',
		950: '#4a044e',
	},
	pink: {
		50: '#fdf2f8',
		100: '#fce7f3',
		200: '#fbcfe8',
		300: '#f9a8d4',
		400: '#f472b6',
		500: '#ec4899',
		600: '#db2777',
		700: '#be185d',
		800: '#9d174d',
		900: '#831843',
		950: '#500724',
	},
	rose: {
		50: '#fff1f2',
		100: '#ffe4e6',
		200: '#fecdd3',
		300: '#fda4af',
		400: '#fb7185',
		500: '#f43f5e',
		600: '#e11d48',
		700: '#be123c',
		800: '#9f1239',
		900: '#881337',
		950: '#4c0519',
	},
};

// Function to create a light theme
function createLightTheme(colorName, colorPalette) {
  return {
    name: `Tailwind ${colorName.charAt(0).toUpperCase() + colorName.slice(1)} Light`,
    type: "light",
    colors: {
      // Editor colors
      "editor.background": colorPalette[50],
      "editor.foreground": colorPalette[800],
      "editorCursor.foreground": colorPalette[600],
      "editor.lineHighlightBackground": colorPalette[100],
      "editor.selectionBackground": colorPalette[200],
      "editor.selectionHighlightBackground": colorPalette[150] || colorPalette[200],
      "editor.wordHighlightBackground": colorPalette[150] || colorPalette[200],
      "editor.wordHighlightStrongBackground": colorPalette[200],
      "editor.findMatchBackground": colorPalette[300],
      "editor.findMatchHighlightBackground": colorPalette[200],
      "editor.hoverHighlightBackground": colorPalette[100],
      "editorLineNumber.foreground": colorPalette[400],
      "editorLineNumber.activeForeground": colorPalette[600],
      "editorIndentGuide.background": colorPalette[200],
      "editorIndentGuide.activeBackground": colorPalette[400],
      "editorWhitespace.foreground": colorPalette[300],
      "editorRuler.foreground": colorPalette[200],

      // Activity Bar
      "activityBar.background": colorPalette[100],
      "activityBar.foreground": colorPalette[700],
      "activityBar.activeBorder": colorPalette[500],
      "activityBarBadge.background": colorPalette[500],
      "activityBarBadge.foreground": colorPalette[50],

      // Sidebar
      "sideBar.background": colorPalette[100],
      "sideBar.foreground": colorPalette[700],
      "sideBarTitle.foreground": colorPalette[800],
      "sideBarSectionHeader.background": colorPalette[200],
      "sideBarSectionHeader.foreground": colorPalette[800],

      // Status Bar
      "statusBar.background": colorPalette[600],
      "statusBar.foreground": colorPalette[50],
      "statusBar.debuggingBackground": colors.red[600],
      "statusBar.debuggingForeground": colors.red[50],
      "statusBar.noFolderBackground": colorPalette[500],

      // Tab colors
      "tab.activeBackground": colorPalette[50],
      "tab.activeForeground": colorPalette[800],
      "tab.inactiveBackground": colorPalette[100],
      "tab.inactiveForeground": colorPalette[600],
      "tab.border": colorPalette[200],
      "tab.activeBorder": colorPalette[500],

      // Panel colors
      "panel.background": colorPalette[100],
      "panel.border": colorPalette[200],
      "panelTitle.activeForeground": colorPalette[800],
      "panelTitle.inactiveForeground": colorPalette[600],

      // Terminal colors
      "terminal.background": colorPalette[50],
      "terminal.foreground": colorPalette[800],
      "terminal.ansiBlack": colorPalette[900],
      "terminal.ansiRed": colors.red[500],
      "terminal.ansiGreen": colors.green[500],
      "terminal.ansiYellow": colors.yellow[500],
      "terminal.ansiBlue": colors.blue[500],
      "terminal.ansiMagenta": colors.purple[500],
      "terminal.ansiCyan": colors.cyan[500],
      "terminal.ansiWhite": colorPalette[100],

      // Button colors
      "button.background": colorPalette[500],
      "button.foreground": colorPalette[50],
      "button.hoverBackground": colorPalette[600],

      // Input colors
      "input.background": colorPalette[50],
      "input.foreground": colorPalette[800],
      "input.border": colorPalette[300],
      "inputOption.activeBorder": colorPalette[500],

      // Dropdown colors
      "dropdown.background": colorPalette[50],
      "dropdown.foreground": colorPalette[800],
      "dropdown.border": colorPalette[300],

      // List colors
      "list.activeSelectionBackground": colorPalette[200],
      "list.activeSelectionForeground": colorPalette[800],
      "list.hoverBackground": colorPalette[100],
      "list.inactiveSelectionBackground": colorPalette[150] || colorPalette[100],
      "list.focusBackground": colorPalette[200],

      // Scrollbar colors
      "scrollbar.shadow": colorPalette[200],
      "scrollbarSlider.background": colorPalette[300],
      "scrollbarSlider.hoverBackground": colorPalette[400],
      "scrollbarSlider.activeBackground": colorPalette[500],

      // Badge colors
      "badge.background": colorPalette[500],
      "badge.foreground": colorPalette[50],

      // Progress bar
      "progressBar.background": colorPalette[500],

      // Window border
      "window.activeBorder": colorPalette[300],
      "window.inactiveBorder": colorPalette[200],

      // Title Bar
      "titleBar.activeBackground": colorPalette[600],
      "titleBar.activeForeground": colorPalette[50],
      "titleBar.inactiveBackground": colorPalette[500],
      "titleBar.inactiveForeground": colorPalette[200],

      // Menu Bar
      "menuBar.selectionBackground": colorPalette[500],
      "menuBar.selectionForeground": colorPalette[50],

      // Editor Group Header
      "editorGroupHeader.tabsBackground": colorPalette[100]
    },
    tokenColors: [
      {
        name: "Comment",
        scope: ["comment", "punctuation.definition.comment"],
        settings: {
          fontStyle: "italic",
          foreground: colorPalette[500]
        }
      },
      {
        name: "Variables",
        scope: ["variable", "string constant.other.placeholder"],
        settings: {
          foreground: colorPalette[700]
        }
      },
      {
        name: "Keywords",
        scope: ["keyword", "storage.type", "storage.modifier"],
        settings: {
          foreground: colors.purple[600]
        }
      },
      {
        name: "Operators",
        scope: "keyword.operator",
        settings: {
          foreground: colors.pink[600]
        }
      },
      {
        name: "Strings",
        scope: ["string", "string.quoted"],
        settings: {
          foreground: colors.green[600]
        }
      },
      {
        name: "Functions",
        scope: ["entity.name.function", "meta.require", "support.function.any-method"],
        settings: {
          foreground: colors.blue[600]
        }
      },
      {
        name: "Classes",
        scope: ["entity.name.type", "entity.other.inherited-class", "support.class"],
        settings: {
          foreground: colors.yellow[700]
        }
      },
      {
        name: "Numbers",
        scope: ["constant.numeric", "constant.language", "support.constant", "constant.character.escape"],
        settings: {
          foreground: colors.orange[600]
        }
      },
      {
        name: "Tags",
        scope: ["entity.name.tag", "markup.deleted.git_gutter"],
        settings: {
          foreground: colors.red[600]
        }
      },
      {
        name: "Attributes",
        scope: ["entity.other.attribute-name"],
        settings: {
          foreground: colors.orange[600]
        }
      }
    ]
  };
}

// Function to create a dark theme
function createDarkTheme(colorName, colorPalette) {
  return {
    name: `Tailwind ${colorName.charAt(0).toUpperCase() + colorName.slice(1)} Dark`,
    type: "dark",
    colors: {
      // Editor colors
      "editor.background": colorPalette[900] || colorPalette[900],
      "editor.foreground": colorPalette[100],
      "editorCursor.foreground": colorPalette[400],
      "editor.lineHighlightBackground": colorPalette[800],
      "editor.selectionBackground": colorPalette[700],
      "editor.selectionHighlightBackground": colorPalette[750] || colorPalette[700],
      "editor.wordHighlightBackground": colorPalette[750] || colorPalette[700],
      "editor.wordHighlightStrongBackground": colorPalette[700],
      "editor.findMatchBackground": colorPalette[600],
      "editor.findMatchHighlightBackground": colorPalette[700],
      "editor.hoverHighlightBackground": colorPalette[800],
      "editorLineNumber.foreground": colorPalette[500],
      "editorLineNumber.activeForeground": colorPalette[300],
      "editorIndentGuide.background": colorPalette[700],
      "editorIndentGuide.activeBackground": colorPalette[500],
      "editorWhitespace.foreground": colorPalette[600],
      "editorRuler.foreground": colorPalette[700],

      // Activity Bar
      "activityBar.background": colorPalette[800],
      "activityBar.foreground": colorPalette[200],
      "activityBar.activeBorder": colorPalette[400],
      "activityBarBadge.background": colorPalette[500],
      "activityBarBadge.foreground": colorPalette[900],

      // Sidebar
      "sideBar.background": colorPalette[800],
      "sideBar.foreground": colorPalette[200],
      "sideBarTitle.foreground": colorPalette[100],
      "sideBarSectionHeader.background": colorPalette[700],
      "sideBarSectionHeader.foreground": colorPalette[100],

      // Status Bar
      "statusBar.background": colorPalette[700],
      "statusBar.foreground": colorPalette[100],
      "statusBar.debuggingBackground": colors.red[700],
      "statusBar.debuggingForeground": colors.red[100],
      "statusBar.noFolderBackground": colorPalette[600],

      // Tab colors
      "tab.activeBackground": colorPalette[900] || colorPalette[900],
      "tab.activeForeground": colorPalette[100],
      "tab.inactiveBackground": colorPalette[800],
      "tab.inactiveForeground": colorPalette[400],
      "tab.border": colorPalette[700],
      "tab.activeBorder": colorPalette[400],

      // Panel colors
      "panel.background": colorPalette[800],
      "panel.border": colorPalette[700],
      "panelTitle.activeForeground": colorPalette[100],
      "panelTitle.inactiveForeground": colorPalette[400],

      // Terminal colors
      "terminal.background": colorPalette[900] || colorPalette[900],
      "terminal.foreground": colorPalette[100],
      "terminal.ansiBlack": colorPalette[800],
      "terminal.ansiRed": colors.red[400],
      "terminal.ansiGreen": colors.green[400],
      "terminal.ansiYellow": colors.yellow[400],
      "terminal.ansiBlue": colors.blue[400],
      "terminal.ansiMagenta": colors.purple[400],
      "terminal.ansiCyan": colors.cyan[400],
      "terminal.ansiWhite": colorPalette[200],

      // Button colors
      "button.background": colorPalette[600],
      "button.foreground": colorPalette[100],
      "button.hoverBackground": colorPalette[500],

      // Input colors
      "input.background": colorPalette[800],
      "input.foreground": colorPalette[100],
      "input.border": colorPalette[600],
      "inputOption.activeBorder": colorPalette[400],

      // Dropdown colors
      "dropdown.background": colorPalette[800],
      "dropdown.foreground": colorPalette[100],
      "dropdown.border": colorPalette[600],

      // List colors
      "list.activeSelectionBackground": colorPalette[700],
      "list.activeSelectionForeground": colorPalette[100],
      "list.hoverBackground": colorPalette[800],
      "list.inactiveSelectionBackground": colorPalette[750] || colorPalette[800],
      "list.focusBackground": colorPalette[700],

      // Scrollbar colors
      "scrollbar.shadow": colorPalette[950] || colorPalette[900],
      "scrollbarSlider.background": colorPalette[600],
      "scrollbarSlider.hoverBackground": colorPalette[500],
      "scrollbarSlider.activeBackground": colorPalette[400],

      // Badge colors
      "badge.background": colorPalette[500],
      "badge.foreground": colorPalette[900],

      // Progress bar
      "progressBar.background": colorPalette[500],

      // Window border
      "window.activeBorder": colorPalette[600],
      "window.inactiveBorder": colorPalette[700],

      // Title Bar
      "titleBar.activeBackground": colorPalette[700],
      "titleBar.activeForeground": colorPalette[100],
      "titleBar.inactiveBackground": colorPalette[800],
      "titleBar.inactiveForeground": colorPalette[400],

      // Menu Bar
      "menuBar.selectionBackground": colorPalette[600],
      "menuBar.selectionForeground": colorPalette[100],

      // Editor Group Header
      "editorGroupHeader.tabsBackground": colorPalette[800]
    },
    tokenColors: [
      {
        name: "Comment",
        scope: ["comment", "punctuation.definition.comment"],
        settings: {
          fontStyle: "italic",
          foreground: colorPalette[400]
        }
      },
      {
        name: "Variables",
        scope: ["variable", "string constant.other.placeholder"],
        settings: {
          foreground: colorPalette[200]
        }
      },
      {
        name: "Keywords",
        scope: ["keyword", "storage.type", "storage.modifier"],
        settings: {
          foreground: colors.purple[400]
        }
      },
      {
        name: "Operators",
        scope: "keyword.operator",
        settings: {
          foreground: colors.pink[400]
        }
      },
      {
        name: "Strings",
        scope: ["string", "string.quoted"],
        settings: {
          foreground: colors.green[400]
        }
      },
      {
        name: "Functions",
        scope: ["entity.name.function", "meta.require", "support.function.any-method"],
        settings: {
          foreground: colors.blue[400]
        }
      },
      {
        name: "Classes",
        scope: ["entity.name.type", "entity.other.inherited-class", "support.class"],
        settings: {
          foreground: colors.yellow[400]
        }
      },
      {
        name: "Numbers",
        scope: ["constant.numeric", "constant.language", "support.constant", "constant.character.escape"],
        settings: {
          foreground: colors.orange[400]
        }
      },
      {
        name: "Tags",
        scope: ["entity.name.tag", "markup.deleted.git_gutter"],
        settings: {
          foreground: colors.red[400]
        }
      },
      {
        name: "Attributes",
        scope: ["entity.other.attribute-name"],
        settings: {
          foreground: colors.orange[400]
        }
      }
    ]
  };
}

// Generate all themes
function generateAllThemes() {
  const themesDir = path.join(__dirname, 'themes');
  
  // Ensure themes directory exists
  if (!fs.existsSync(themesDir)) {
    fs.mkdirSync(themesDir, { recursive: true });
  }

  // Generate themes for each color
  Object.keys(colors).forEach(colorName => {
    const colorPalette = colors[colorName];
    
    // Generate light theme
    const lightTheme = createLightTheme(colorName, colorPalette);
    const lightFileName = `tailwind-${colorName}-light.json`;
    fs.writeFileSync(
      path.join(themesDir, lightFileName), 
      JSON.stringify(lightTheme, null, 2)
    );
    
    // Generate dark theme
    const darkTheme = createDarkTheme(colorName, colorPalette);
    const darkFileName = `tailwind-${colorName}-dark.json`;
    fs.writeFileSync(
      path.join(themesDir, darkFileName), 
      JSON.stringify(darkTheme, null, 2)
    );
    
    console.log(`Generated ${lightFileName} and ${darkFileName}`);
  });

  console.log(`\n✅ Generated ${Object.keys(colors).length * 2} themes total!`);
  console.log('All themes saved in the ./themes/ directory');
}

// Run the generator
generateAllThemes();
