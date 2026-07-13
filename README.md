# 📱 FocusUp - Planificador de Estudio

FocusUp es una aplicación móvil desarrollada con React Native que permite organizar y optimizar el tiempo de estudio de manera eficiente. Está diseñada para estudiantes que desean mejorar su productividad mediante planificación, seguimiento y enfoque.

---

## 🚀 Características

- 📋 Gestión de sesiones de estudio
- 📅 Agenda organizada por días
- ⏱️ Temporizador tipo Pomodoro
- 📊 Estadísticas de progreso
- 💾 Almacenamiento local de datos
- 🎨 Interfaz moderna y sencilla

---

## 🧱 Tecnologías utilizadas

- React Native (Expo)
- React Navigation
- AsyncStorage

---

## 📂 Estructura del proyecto

```
/src
  /screens       # Pantallas principales de la app
  /components    # Componentes reutilizables
  /navigation    # Configuración de navegación
  /storage       # Manejo de datos (AsyncStorage)
  /styles        # Estilos globales
```

---

## ⚙️ Instalación y ejecución

### 1. Clonar el repositorio

```
git clone https://github.com/tu-usuario/focusup.git
cd focusup
```

### 2. Instalar dependencias

```
npm install
```

### 3. Ejecutar la aplicación

```
npx expo start
```

## ☁️ Configuración de Supabase

FocusUp requiere un proyecto de Supabase para autenticar personas y sincronizar
datos. Crea un archivo `.env` a partir de `.env.example` y completa sus valores:

```bash
cp .env.example .env
```

Ejecuta `supabase/migrations/20260712_initial_schema.sql` en el SQL Editor del
proyecto Supabase. En Authentication habilita el proveedor Email y configura la
URL de redirección `focusup://` para la confirmación de cuentas.

No subas `.env` al repositorio; contiene configuración específica del proyecto.

## 📦 Generar APK interno

La distribución no utiliza Google Play. Después de iniciar sesión en Expo y
configurar Supabase, genera una APK instalable con:

```bash
npx eas build --platform android --profile preview
```

EAS devolverá un enlace privado para descargar e instalar la APK. Android debe
permitir la instalación desde esa fuente.

---

## 📱 Ejecutar en dispositivo

- Descargar la app **Expo Go** en tu celular
- Escanear el código QR que aparece en la terminal
- También puedes ejecutar en:
  - Android (presionando `a`)
  - Navegador web (presionando `w`)

---

## 🎯 Objetivo del proyecto

Este proyecto fue desarrollado con el objetivo de aplicar conocimientos en desarrollo móvil, gestión de estado y diseño de interfaces, creando una aplicación funcional enfocada en la productividad académica.

---

## 💡 Futuras mejoras

- Sistema de autenticación de usuarios
- Sincronización en la nube
- Notificaciones de estudio
- Mejoras en estadísticas y visualización de datos
