# 📱 FocusUp — Planificador de Estudio Inteligente

FocusUp es una aplicación móvil construida con **React Native (Expo)** y **TypeScript** que te ayuda a organizar sesiones de estudio, gestionar tareas, mantener la concentración con un temporizador Pomodoro, y visualizar tu progreso con estadísticas detalladas. Los datos se sincronizan en la nube mediante **Supabase**.

---

## 🚀 Funcionalidades

### 📋 Gestión de Sesiones de Estudio
- Crear, editar, completar y eliminar sesiones.
- Cada sesión incluye: materia, tema, fecha, hora de inicio/fin, ubicación, prioridad (Alta/Media/Baja) y notas.
- Las sesiones se filtran por día en la agenda y el dashboard.

### 📅 Agenda Semanal
- Vista de calendario semanal con desplazamiento entre semanas.
- Selección de día para ver las sesiones programadas.
- Acciones rápidas: completar, editar o eliminar sesión.

### ✅ Gestión de Tareas
- Crear, editar, completar y eliminar tareas.
- Cada tarea tiene: título, fecha de vencimiento, categoría y prioridad.
- Filtro por categorías y toggle entre tareas activas/completadas.

### ⏱️ Temporizador Pomodoro — Zona de Enfoque
- Temporizador con control de minutos de enfoque configurables.
- Círculo de progreso animado con `react-native-svg`.
- Selección de una sesión de estudio activa para asociar el Pomodoro.
- Resumen de Pomodoros completados en la sesión actual.
- Registro automático de cada Pomodoro completado en la nube.

### 📊 Estadísticas y Métricas
- Resumen semanal: total de sesiones, sesiones de hoy, tareas completadas, racha actual, minutos totales de estudio.
- Gráfico de barras semanal con minutos estudiados por día.
- Desglose por materia con total de sesiones y minutos.
- Banner animado de racha (streak).
- Cálculo automático de racha basado en días consecutivos con actividad.

### 🔐 Autenticación de Usuarios
- Registro e inicio de sesión con correo electrónico y contraseña via Supabase Auth.
- Recuperación de contraseña con deep link `focusup://`.
- Persistencia de sesión con `expo-secure-store`.
- Protección de rutas: sin sesión activa solo se muestra la pantalla de autenticación.

### ☁️ Sincronización en la Nube
- Todos los datos (sesiones, tareas, Pomodoros) se almacenan en Supabase (PostgreSQL).
- Row Level Security (RLS): cada usuario solo ve sus propios datos.
- Actualización en tiempo real al volver a cada pantalla (refetch automático con `useFocusEffect`).

### 🎨 Interfaz Moderna
- Diseño con paleta de colores Material Design 3 (azul como tono primario).
- Componentes reutilizables con tipografía, espaciado y sombras consistentes.
- Gradientes, iconos y animaciones sutiles.

---

## 🧱 Tecnologías Utilizadas

| Tecnología | Versión | Propósito en el Proyecto |
|---|---|---|
| **React Native (Expo)** | ~54.0.34 | Framework principal para desarrollo móvil multiplataforma (Android, iOS, Web) |
| **TypeScript** | ~5.9.2 | Tipado estático para mayor seguridad y mantenibilidad del código |
| **Expo Router / React Navigation** | 7.x | Navegación por tabs (Inicio, Agenda, Estudio, Métricas, Tareas) + modales |
| **Supabase** | ^2.110.2 | Backend como servicio: autenticación, base de datos PostgreSQL, RLS |
| **expo-secure-store** | ~15.0.8 | Almacenamiento seguro del token de autenticación |
| **react-native-svg** | 15.12.1 | Gráficos vectoriales: círculo de progreso del Pomodoro, gráfico de barras |
| **expo-linear-gradient** | ~15.0.8 | Fondos con degradado en componentes visuales |
| **expo-notifications** | ~0.32.17 | Notificaciones locales (preparado para futuros recordatorios) |
| **@react-native-community/datetimepicker** | 8.4.4 | Selector nativo de fecha y hora en formularios |
| **@react-native-async-storage/async-storage** | 2.2.0 | Persistencia local liviana (usado internamente por Supabase) |
| **react-native-gesture-handler** | ~2.28.0 | Manejo avanzado de gestos táctiles |
| **react-native-safe-area-context** | ~5.6.0 | Gestión de áreas seguras en dispositivos con notch |
| **Hermes** | — | Motor de JavaScript optimizado para React Native (habilitado) |
| **New Architecture (Fabric + TurboModules)** | — | Arquitectura moderna de React Native para mejor rendimiento |
| **ESLint + Prettier** | 9.x / 3.x | Linting y formateo de código para mantener consistencia |

---

## 📂 Estructura del Proyecto

```
FocusUp/
├── App.tsx                   # Componente raíz (providers + navegación)
├── index.js                  # Punto de entrada
├── app.json                  # Configuración de Expo
├── eas.json                  # Configuración de EAS Build
├── tsconfig.json             # Configuración de TypeScript
├── package.json              # Dependencias y scripts
├── .env.example              # Plantilla para variables de entorno
├── .env                      # (NO SUBIR) Credenciales de Supabase
├── supabase/
│   └── migrations/           # Esquema SQL de Supabase
└── src/
    ├── components/           # Componentes reutilizables
    │   ├── agenda/           #   Calendario y items de agenda
    │   ├── dashboard/        #   Tarjetas del inicio
    │   ├── focus/            #   Temporizador Pomodoro
    │   ├── forms/            #   Campos y selectores de formularios
    │   └── metrics/          #   Gráficos y estadísticas
    ├── constants/            # Tema visual y opciones de formularios
    ├── hooks/                # Hooks personalizados (datos + temporizador)
    ├── lib/                  # Cliente de Supabase
    ├── navigation/           # Configuración de tabs y stacks
    ├── providers/            # Contexto de autenticación
    ├── screens/              # Pantallas principales
    ├── storage/              # Capa de datos (CRUD contra Supabase)
    └── utils/                # Funciones auxiliares (fechas, métricas, agenda)
```

---

## ⚙️ Guía de Instalación Paso a Paso

### Prerrequisitos

- **Node.js** 18+
- **npm** 9+
- **Expo CLI**: `npm install -g expo-cli`
- **Cuenta en [Supabase](https://supabase.com)** (gratuita)
- **Smartphone con Expo Go** (para pruebas en dispositivo) o **emulador Android/iOS** o **navegador web**

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/focusup.git
cd focusup
```

### 2. Instalar dependencias

```bash
npm install
```

Esto instalará todas las dependencias listadas en `package.json`, incluyendo Expo, React Navigation, Supabase SDK, y utilerías gráficas.

### 3. Configurar Supabase

#### 3.1 Crear un proyecto en Supabase
- Ve a [supabase.com](https://supabase.com) e inicia sesión.
- Crea un nuevo proyecto (gratuito).
- Una vez creado, ve a **Project Settings > API** y copia la **Project URL** y la **anon public key**.

#### 3.2 Configurar variables de entorno
```bash
cp .env.example .env
```
Edita `.env` y pega tus credenciales:
```
EXPO_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

#### 3.3 Ejecutar la migración de base de datos
- En el panel de Supabase, ve a **SQL Editor**.
- Abre el archivo `supabase/migrations/20260712_initial_schema.sql` y copia su contenido.
- Pégalo en el SQL Editor y ejecútalo.
- Esto creará las tablas `profiles`, `study_sessions`, `tasks` y `pomodoro_logs` con sus políticas de seguridad (RLS).

#### 3.4 Configurar autenticación
- En Supabase, ve a **Authentication > Providers**.
- Habilita **Email**.
- En **Redirect URLs**, agrega `focusup://` (esto permite que la app maneje la confirmación de cuentas y recuperación de contraseña mediante deep links).

### 4. Iniciar la aplicación

```bash
npx expo start
```

Esto iniciará el servidor de desarrollo de Expo. Verás un código QR en la terminal.

### 5. Ejecutar en diferentes plataformas

| Plataforma | Comando / Acción |
|---|---|
| **Expo Go (Android/iOS)** | Escanea el código QR con la app Expo Go |
| **Android Emulator** | Presiona `a` en la terminal (requiere emulador abierto) |
| **iOS Simulator** | Presiona `i` en la terminal (solo macOS, requiere Xcode) |
| **Navegador Web** | Presiona `w` en la terminal |
| **APK standalone** | `npx eas build --platform android --profile preview` |

### 6. Scripts disponibles

```bash
npm start         # Inicia el servidor de Expo
npm run android   # Ejecuta en dispositivo Android conectado
npm run ios       # Ejecuta en iOS Simulator (solo macOS)
npm run web       # Abre en navegador web
npm run lint      # Ejecuta ESLint para revisar el código
npm run lint:fix  # Corrige errores de lint automáticamente
npm run format    # Formatea el código con Prettier
npm run typecheck # Verifica tipos de TypeScript sin compilar
```

---

## 🧠 Arquitectura del Proyecto

```
App.tsx
 └── GestureHandlerRootView
     └── SafeAreaProvider
         └── AuthProvider (Context de sesión con Supabase Auth)
             └── AppNavigator
                 ├── [Sin sesión] → AuthScreen
                 └── [Con sesión]
                     ├── BottomTabNavigator
                     │   ├── Inicio → DashboardScreen
                     │   ├── Agenda → AgendaScreen
                     │   ├── Estudio → FocusZoneScreen
                     │   ├── Métricas → MetricsScreen
                     │   └── Tareas → TasksScreen
                     ├── NuevaSesion (modal)
                     └── NuevaTarea (modal)

Flujo de datos:
 Screens → Custom Hooks (useSessions, useTasks, usePomodoroLogs)
        → asyncStorage.ts (CRUD contra Supabase)
        → supabase.ts (Cliente inicializado)
        → Supabase Cloud (PostgreSQL + Auth)
```

Cada pantalla se suscribe al foco mediante `useFocusEffect` para refrescar los datos automáticamente al navegar. El temporizador Pomodoro es 100% del lado del cliente y registra los logs en Supabase al completar cada bloque.

---

## 📦 Generar APK para Distribución Interna

```bash
npx eas build --platform android --profile preview
```

Requisitos:
- Tener una cuenta en [Expo Application Services](https://expo.dev) y haber iniciado sesión con `npx expo login`.
- EAS devolverá un enlace privado para descargar la APK.
- El dispositivo Android debe tener permitida la instalación desde orígenes desconocidos (o desde la fuente que uses para descargar).

---

## 🤝 Contribuir

Mira [`CONTRIBUTING.md`](./CONTRIBUTING.md) para conocer el flujo de trabajo (GitFlow, Conventional Commits, PRs).

---

## 📄 Licencia

Este proyecto es de uso educativo y personal.
