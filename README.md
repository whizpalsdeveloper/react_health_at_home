# Health At Home TV UI

React + TypeScript + Vite application optimized for LG webOS TVs.  
The app targets 1280×720 resolution, uses `HashRouter`, and is packaged via the LG `ares-cli`.

## Requirements

- Node.js 18+ and npm 9+
- webOS CLI tooling: `npm install -g @webosose/ares-cli`
- LG webOS TV 24 Simulator (or a physical device in developer mode)

Clone the repo and install dependencies:

```bash
git clone <repo-url>
cd tv-ui
npm install
```

## Local development

| Purpose | Command |
| --- | --- |
| Start dev server with HMR | `npm run dev` |
| Type check + production bundle | `npm run build` |
| Preview built bundle locally | `npm run preview` |
| Lint sources | `npm run lint` |

## Build + run on webOS simulator

The simulator loads the contents of `webos/dist` via `file://`, so each release copies the freshly built `dist/` output into `webos/` before packaging.

1. **Build for production**
   ```bash
   npm run build
   ```
2. **Sync build into webOS folder**
   ```bash
   rm -rf webos/dist
   cp -R dist webos/
   ```
3. **Package (.ipk)**
   ```bash
   cd webos
   ares-package .
   ```
   This produces `com.healthathome.tvui_1.0.0_all.ipk`.
4. **Install into the simulator (simulator must be running)**
   ```bash
   ares-install com.healthathome.tvui_1.0.0_all.ipk
   ```
5. **Launch the app**
   ```bash
   ares-launch com.healthathome.tvui
   ```
6. **Inspect / debug (optional)**
   ```bash
   ares-inspect --device simulator com.healthathome.tvui
   ```

Each time you make code changes, repeat steps 1–5.  
Icons (`icon.png`, `largeIcon.png`, `splash.png`) referenced in `webos/appinfo.json` already exist inside `webos/`.

## Troubleshooting tips

- If build fails with `Cannot find module @rollup/rollup-darwin-arm64`, delete `node_modules/` and `package-lock.json`, then rerun `npm install`.
- Blank screen or routing errors inside the simulator usually mean the latest `dist/` output was not copied into `webos/`.
- `net::ERR_FILE_NOT_FOUND` for images indicates absolute `/images/...` paths; keep asset references relative (e.g., `./images/foo.png`).
