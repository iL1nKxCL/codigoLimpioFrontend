# Proyecto  Codigo limpio Frontend

Este proyecto contiene dos versiones:  
- **Versión A:** Código desordenado en HTML/JS básico.  
- **Versión B:** Proyecto optimizado con React + TypeScript + Ant Design.

## **1. Clonar el repositorio**
```bash
git clone https://github.com/tuusuario/proyecto-mejora-frontend.git
cd proyecto-mejora-frontend/versionB
```

## **2. Instalar dependencias**
```bash
npm install
```

## **3. Ejecutar en modo desarrollo**
```bash
npm run dev
```
Después de ejecutar el comando, abre la URL que aparece en la terminal (generalmente `http://localhost:5173`).

## **4. Ejecutar la versión A**
Para probar la versión A, abre el archivo `versionA/index.html` directamente en el navegador.

## **5. Compilar para producción**
```bash
npm run build
```

## **6. Ejecutar pruebas de calidad (opcional)**
- **Lighthouse:** Usa Google Chrome (F12 > Lighthouse) para medir rendimiento y accesibilidad.
- **ESLint:**  
```bash
npx eslint src --ext .ts,.tsx
```

## **7. Estructura del proyecto**
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
      └── index.html
```

---
**Autor:** Lian Venegas  
**Fecha:** 2025
