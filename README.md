# TNC7 Heidenhain (.H) – VS Code Extension

VS Code extension for **Heidenhain TNC7 `.H` programs**, focused on **readability, safety and OEM-style formatting**.

This extension is designed for users working with **machine-specific Heidenhain TNC7 macros**, not generic G-code.

---

## ✨ Features

### ✅ Language support for `.H`
- Automatic language detection for `.H` files
- Dedicated language ID: `tnc7h`

### 🎨 Syntax Highlighting (TNC7-aware)
- **PLC functions** (`FN`, `READ FROM PLC`, `WRITE TO PLC`)
- **Cycle definitions** (`CYCL DEF`, `CYC CALL`)
- **M-functions** (`M8`, `M340`, `M352`, etc.) with a distinct color
- **Q parameters** (`Q1`, `QL2`, `Q1800`, …)
- **Strings** (`"..."`) highlighted correctly
- **Comments** (`; ...`)
  - Text inside quotes **inside comments is not highlighted as strings**

### 🧠 M-Function Hover Documentation
Hover over any `Mxxx` to see:
- Function name
- Description / purpose
- Source `.H` macro (OEM)

Example:
```
M340 → Clean program
This macro performs a clean program.
Source: M340.h
```

### 🔢 Automatic Line Renumbering
- All lines are renumbered starting from **0**
- Incremented by **+1**
- Required TNC7 program format

Available as:
- Formatter (`Shift + Alt + F`)
- Command: **TNC7: Renumber (0..)**

---

## 📦 Installation

### Option 1 – Install from VSIX
1. Build the extension:
   ```bash
   npx vsce package
   ```
2. In VS Code:
   - Extensions → `...` → **Install from VSIX…**
   - Select the generated `.vsix`

### Option 2 – Development Mode
Press `F5` in the project to launch an **Extension Development Host**.

---

## ⚙️ Recommended VS Code Settings

To ensure `.H` files always use this extension:

```json
"files.associations": {
  "*.H": "tnc7h",
  "*.h": "tnc7h"
}
```

---

## 🧩 Commands

| Command | Description |
|------|------------|
| `TNC7: Renumber (0..)` | Renumber all lines starting from 0 |

---

## 📄 Supported File Type

- `.H` (Heidenhain TNC7 macro / program files)

---

## ⚠️ Important Notes

- M-functions are **OEM / machine-builder dependent**
- Hover descriptions reflect **machine macro behavior**, not generic Heidenhain defaults
- This extension **does not validate machine safety or PLC logic**

---

## 🛠️ Development

```bash
npm install
npm run compile
```

---

## 📜 License

MIT License  
© 2026 Pedro Richena
