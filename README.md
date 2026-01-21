# Proiect Vremea

Link catre site-ul de prezentare: https://itschool-weather.netlify.app/

## Descriere

Acesta este un mic proiect front-end care afișează vremea curentă și prognoza pe 5 zile pentru orașe din România folosind API-ul OpenWeatherMap. Scopul proiectului este educațional: exemplifică consumul unui API REST, manipularea DOM-ului cu JavaScript și organizarea logicii în fișiere separate.

## Funcționalități principale
- Afișează vremea curentă (temperatură, senzație termică, descriere, vânt, iconiță)
- Load/Save oraș selectat în `localStorage`
- Buton dropdown pentru selectarea rapidă a unor orașe
- Prognoză pe 5 zile (fișier separat `wheaterForcast.js`)

## Structura proiectului (fișiere importante)
- `index.html` — pagină principală; include scripturile în ordinea corectă
- `style.css` — stiluri
- `utils.js` — funcții reutilizabile (ex: `convertTimeStampToTime`, storage helpers)
- `cityWheater.js` — logica principală pentru afișarea vremii curente
- `wheaterForcast.js` / `cityWheaterForcast.js` — logica pentru prognoza pe 5 zile
- `config.example.js` — template pentru fișierul local `config.js` (conține `window.APP_CONFIG.apiKey`)
- `config.js` — (opțional, local, NU comitat) conține cheia ta OpenWeatherMap

## Configurare locală (API key)

1. Deschide `config.example.js` și copiaz-o în `config.js` în aceeași locație:

	cp config.example.js config.js

2. Deschide `config.js` și înlocuiește `YOUR_OPENWEATHERMAP_API_KEY_HERE` cu cheia ta reală.

3. `config.js` este adăugat în `.gitignore` astfel încât nu va fi comis accidental.

Notă: cheile API plasate în front-end sunt vizibile client-side. Pentru producție, ia în considerare folosirea unui backend/proxy care păstrează cheia secretă.
