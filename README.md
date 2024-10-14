
# Test Cesťák

Test Cesťák je webová aplikace určená pro správu a prezentaci zájezdů. Frontend je postaven pomocí React JS, zatímco backend je poháněn Strapi 5. 
Aplikace umožňuje správu zájezdů z administrace Strapi, tam je možné nahrávat různé typy obsahu, jako texty, obrázky a dokumenty.


## Obsah
- [Funkce](#funkce)
- [Struktura projektu](#struktura-projektu)
- [Technologický stack](#technologický-stack)
- [Instalace](#instalace)
- [Spuštění projektu](#spuštění-projektu)

## Funkce
- **Správa zájezdů**: Administrace může přidávat nové zájezdy a aktualizovat dynamické části webu.
- **Nahrávání obsahu**: Administrace může nahrávat soubory související s projektem (texty, obrázky, videa, plakáty).
- **Úživatelská zpětná vazba**: Uživatelé mají možnosti nezávazně si objednat informace k daným zájezdům a přes kontaktní formulář dát zpětnou vazbu.
- **Autentizace**: Správa uživatelů je zajištěna přes Strapi.

## Struktura projektu

### Backend (Strapi)
Backend zajišťuje správu obsahu a autentizaci uživatelů. Vystavuje API, které konzumuje frontend.

Klíčové adresáře:
- `src/admin`: Konfigurace administrátorského panelu Strapi
- `src/api`: API pro správu obsahu (např. dokumenty, obrázky, týmové údaje)
- `src/components`: Znovupoužitelné komponenty v backendu pro různé entity (např. `detail`, `obrazek`)
- `src/extensions`: Rozšíření základní funkčnosti Strapi

### Frontend (React JS)
Frontend zajišťuje zobrazování obsahu a poskytuje interaktivní uživatelské rozhraní pro uživatele.

Klíčové závislosti:
- **React Router DOM**: Řízení routování v React aplikaci.
- **TailwindCSS**: Použito pro stylování frontendové části.

## Technologický stack
- **Frontend**: React JS, TailwindCSS, React Router DOM, React Icons
- **Backend**: Strapi 5, SQLite
- **Jazyky**: JavaScript, TypeScript

## Instalace

### Předpoklady
- **Node.js**: Ujistěte se, že máte nainstalovaný Node.js (>=18.0.0).
- **NPM**: Nainstalujte npm (>=6.0.0).
- **Strapi**: Strapi CLI pro správu backendu.

### Instalace backendu (Strapi)
1. Přejděte do adresáře backendu:
   ```bash
   cd cestak-vspj-backend
   ```
2. Nainstalujte závislosti:
   ```bash
   npm install
   ```
3. Spusťte Strapi server v režimu vývoje:
   ```bash
   npm run develop
   ```

### Instalace frontend (React)
1. Přejděte do adresáře frontend:
   ```bash
   cd cestak-vspj-frontend
   ```
2. Nainstalujte závislosti:
   ```bash
   npm install
   ```
3. Spusťte React server v režimu vývoje:
   ```bash
   npm run start
   ```

## Spuštění projektu

### Backend
Pro spuštění backendu v režimu vývoje:
```bash
cd cestak-vspj-backend
npm run develop
```

Pro sestavení backendu pro produkci:
```bash
npm run build
```

### Frontend
Pro spuštění frontendového serveru v režimu vývoje:
```bash
cd cestak-vspj-frontend
npm run start
```

Pro sestavení frontendové části pro produkci:
```bash
npm run build
```