# Mini App - Catálogo de Productos

Mini aplicación web que consume una API pública, muestra los datos
dinámicamente y permite búsqueda y filtrado. Incluye control de calidad
de código automatizado con **ESLint** y **Husky**.

## Estructura del proyecto

```
mini-app-productos/
├── index.html
├── style.css
├── script.js
├── eslint.config.js
├── package.json
├── .husky/
│   └── pre-commit
└── README.md
```

## Funcionalidad

- Obtiene datos desde la API pública [Fake Store API](https://fakestoreapi.com/products)
  usando `fetch()`.
- Muestra los productos dinámicamente en tarjetas (imagen, nombre,
  categoría y precio).
- Permite interacción básica:
  - Búsqueda de productos por nombre.
  - Filtro por categoría (generado dinámicamente según los datos).
  - Botón para recargar los datos.

## Cómo ejecutar la app

1. Instalar las dependencias:
   ```
   npm install
   ```
2. Abrir `index.html` en el navegador (por ejemplo, con la extensión
   "Live Server" de VS Code), ya que la app solo usa HTML/CSS/JS puro.

## Proceso de configuración de Git, ESLint y Husky

1. **Inicializar el repositorio Git**
   ```
   git init
   ```

2. **Instalar Husky**
   ```
   npm install husky --save-dev
   npx husky init
   ```
   Esto crea la carpeta `.husky/` con un hook `pre-commit` de ejemplo
   y agrega el script `"prepare": "husky"` en `package.json`.

3. **Instalar ESLint**
   ```
   npm install eslint --save-dev
   npx eslint .
   ```
   Se creó manualmente el archivo `eslint.config.js` (formato *flat
   config*, usado por ESLint 9+) con reglas básicas de estilo:
   - `no-unused-vars`
   - `no-undef`
   - `eqeqeq`
   - `no-var`
   - `prefer-const`

4. **Configurar el pre-commit hook**

   Se editó `.husky/pre-commit` para que ejecute ESLint antes de cada
   commit:
   ```
   npx eslint .
   ```

5. **Verificación de bloqueo de commits**

   Se probó intencionalmente agregando una línea con errores de estilo
   (`var x = 1`, variable no usada) y al intentar hacer commit, Husky
   ejecutó ESLint, detectó los errores y **bloqueó el commit** con el
   mensaje `husky - pre-commit script failed (code 1)`. Al corregir el
   código (o revertir el cambio), el commit se pudo realizar
   normalmente.

## Scripts disponibles

| Script         | Descripción                          |
|----------------|---------------------------------------|
| `npm run lint` | Ejecuta ESLint sobre todo el proyecto |
