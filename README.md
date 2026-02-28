# React Calendar

Jednoduchý studentský kalendář postavený na React + TypeScript + Vite.

## Spuštění lokálně

1. Nainstaluj závislosti:

```bash
npm install
```

2. Spusť vývojový server:

```bash
npm run dev
```

3. Otevři aplikaci v prohlížeči (Vite URL se vypíše v terminálu, obvykle `http://localhost:5173`).

## Další skripty

```bash
npm run build   # produkční build
npm run lint    # linting
npm run preview # náhled buildu
```

## Security poznámky

- Klientská validace je jen první vrstva; stejné kontroly musí být i na backendu.
- Nezobrazuj neověřený HTML obsah přes `dangerouslySetInnerHTML`.
- Validuj vstupy (délka textu, datumy, whitelist hodnot) před uložením.
