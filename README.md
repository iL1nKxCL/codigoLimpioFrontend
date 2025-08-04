# 🧼 Proyecto: Mejora de Código Frontend con Buenas Prácticas

**Autor:** Lian Venegas  
**Fecha:** Agosto 2025

Este proyecto implementa una propuesta de mejora basada en el uso de buenas prácticas en el desarrollo frontend. Incluye dos versiones de una aplicación de gestión de productos:

- 🔴 **Versión A:** Código desorganizado, sin tipado, sin separación de lógica, HTML/JS plano.
- 🟢 **Versión B:** Proyecto estructurado en React + TypeScript + Ant Design, con ESLint, Prettier y prácticas modernas.

---

## ✅ Objetivo del Proyecto

> Demostrar cómo el uso de herramientas modernas, tipado estático, separación modular y validaciones automáticas mejora la calidad, accesibilidad, mantenibilidad y rendimiento de una aplicación web.

---

## 🧩 Contenido del Proyecto

```
codigoLimpioFrontend/
├── versionA/                 # HTML + JS sin estructura ni tipado
│   └── index.html
└── versionB/                 # Proyecto optimizado con buenas prácticas
    ├── src/
    │   ├── components/
    │   │   └── ProductList.tsx
    │   ├── App.tsx
    │   └── main.tsx
    ├── public/
    ├── package.json
    ├── tsconfig.json
    ├── .eslintrc.cjs
    ├── .prettierrc
    └── index.html
```

---

## 🛠️ Requisitos Previos

- [Node.js](https://nodejs.org/) v16 o superior
- [Git](https://git-scm.com/)
- Navegador Google Chrome (para auditorías Lighthouse)

Verifica tu entorno:
```bash
node -v
npm -v
git --version
```

---

## 🚀 Instrucciones de Uso

### 1. Clonar el repositorio
```bash
git clone https://github.com/tuusuario/proyecto-mejora-frontend.git
cd codigoLimpioFrontend/versionB
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar en modo desarrollo
```bash
npm run dev
```

Accede desde tu navegador a:  
`http://localhost:5173`

### 4. Compilar para producción
```bash
npm run build
```

---

## ⚙️ Evaluar la Versión A
Abre directamente en navegador el archivo:
```
versionA/index.html
```

---

## 🧪 Pruebas de Calidad y Validaciones

### ✅ ESLint
Revisar errores de sintaxis y estilo:
```bash
npm run lint
```

Corregir errores automáticamente:
```bash
npm run lint:fix
```

### ✅ Lighthouse (Auditoría)
1. Abre la app en Chrome (`localhost`)
2. Inspecciona (`F12`) → pestaña **Lighthouse**
3. Evalúa: Performance, Accesibilidad, Mejores Prácticas, SEO

### ✅ WAVE (Accesibilidad manual)
- Instala [extensión WAVE](https://wave.webaim.org/extension/)
- Accede a la app → haz clic en el ícono de la extensión
- Revisa errores de contraste, navegación, etiquetas `alt`, etc.

---

## 📋 Evaluaciones y Encuestas

Se incorporan:

- 📊 Comparación técnica entre versiones A y B (KPIs de ESLint y Lighthouse)
- 📋 Formularios de evaluación con Ant Design y exportación en PDF
- 📥 Descarga del informe final desde la app

---

## 🧠 Principales Buenas Prácticas Aplicadas en Versión B

- 🔹 Arquitectura limpia (separación lógica, UI, servicios)
- 🔹 Tipado fuerte con TypeScript
- 🔹 HTML semántico y componentes accesibles
- 🔹 Uso de ESLint y Prettier
- 🔹 Validación de formularios con reglas visuales

---

## 🧾 Créditos y Autoría

Desarrollado como parte del proyecto de investigación académica  
**“Codigo Limpio FrontEnd”**  
**Autor:** Lian Venegas 
---
