# Proyecto: Código Limpio Frontend

Este proyecto incluye dos versiones para demostrar buenas prácticas en el desarrollo frontend:

- **Versión A:** Código desordenado, sin estructura modular, en HTML/JS básico.
- **Versión B:** Proyecto optimizado con **React + TypeScript + Ant Design**, integrando herramientas de calidad como **ESLint** y **Prettier**.

---

## **1. Requisitos previos**
Antes de comenzar, asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (versión 16 o superior).
- [Git](https://git-scm.com/).

Verifica las versiones:
```bash
node -v
npm -v
git --version
```

---

## **2. Clonar el repositorio**
Clona este proyecto en tu máquina:
```bash
git clone https://github.com/tuusuario/proyecto-mejora-frontend.git
```

Accede a la versión optimizada:
```bash
cd proyecto-mejora-frontend/versionB
```

---

## **3. Instalar dependencias**
Dentro de la carpeta `versionB`, ejecuta:
```bash
npm install
```

---

## **4. Ejecutar en modo desarrollo**
Inicia el servidor de desarrollo con:
```bash
npm run dev
```
Luego, abre la URL que aparece en la terminal (generalmente `http://localhost:5173`) para ver la aplicación.

---

## **5. Compilar para producción**
Genera la versión optimizada del proyecto:
```bash
npm run build
```
Esto creará una carpeta `dist` lista para producción.

---

## **6. Ejecutar la versión A**
Para evaluar la versión con código desordenado, simplemente abre el archivo:
```
versionA/index.html
```
en tu navegador.

---

## **7. Pruebas de calidad**
- **Lighthouse:**  
  Abre Google Chrome > F12 > pestaña *Lighthouse* y genera un reporte de rendimiento y accesibilidad.
  
- **ESLint (análisis de código):**
```bash
npm run lint
```
Para corregir errores automáticamente:
```bash
npm run lint:fix
```

---

## **8. Estructura del proyecto**
```
proyecto-mejora-frontend/
  ├── versionA/
  │   └── index.html
  └── versionB/
      ├── src/
      │   ├── components/
      │   │   └── ProductList.tsx
      │   ├── App.tsx
      │   └── main.tsx
      ├── package.json
      ├── tsconfig.json
      ├── .eslintrc.cjs
      ├── .prettierrc
      └── index.html
```

---

## **9. Comandos útiles**
- **Iniciar desarrollo:** `npm run dev`
- **Construir para producción:** `npm run build`
- **Analizar con ESLint:** `npm run lint`
- **Corregir con ESLint:** `npm run lint:fix`

---

**Autor:** Lian Venegas  
**Fecha:** 2025
