# 🏋️ Thalamus - Gym Management Dashboard

<video src="https://github.com/user-attachments/assets/586d820c-cb9a-4f9a-81b1-a787b1737317" width="100%" controls></video>

<video src="https://github.com/user-attachments/assets/53ba0676-c4fc-4483-8c83-323aa22c3d94" width="100%" controls></video>

---

**Thalamus** es una aplicación web frontend moderna y completa para la gestión integral de un gimnasio. Construida con tecnologías de vanguardia, proporciona una interfaz intuitiva para administrar miembros, rutinas, pagos, reservas y notificaciones.

## 📋 Descripción del Proyecto

Thalamus es una **demo frontend** que simula un sistema completo de gestión para gimnasios. Permite a los administradores y usuarios gestionar:

- **Miembros**: Registro, edición y seguimiento de datos de clientes
- **Rutinas Personalizadas**: Creación y asignación de planes de entrenamiento
- **Reservas**: Gestión de citas y espacios disponibles
- **Pagos**: Administración de pagos y planes de membresía
- **Notificaciones**: Sistema de alertas y comunicaciones
- **Dashboard**: Panel de control con estadísticas generales

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 14.2.16** - Framework React moderno con SSR
- **React 18** - Librería de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS 3.4.1** - Framework de utilidades CSS
- **Shadcn/ui** - Componentes UI reutilizables basados en Radix UI

### UI & Componentes
- **Radix UI** - Librería de componentes accesibles
- **Framer Motion** - Animaciones suaves
- **Lucide React** - Iconografía moderna
- **Sonner** - Notificaciones de toast elegantes

### Backend & Base de Datos
- **Prisma** - ORM moderno para Node.js
- **PostgreSQL** - Base de datos relacional
- **Node.js** - Runtime JavaScript

### Herramientas de Desarrollo
- **TypeScript** - Lenguaje con tipos
- **ESLint** - Análisis estático de código
- **PostCSS** - Transformación de CSS

## 📁 Estructura del Proyecto

```
├── app/                          # Rutas y páginas de la aplicación
│   ├── admin/                    # Sección administrativa
│   │   ├── members/              # Gestión de miembros
│   │   ├── notifications/        # Centro de notificaciones
│   │   ├── payments/             # Control de pagos
│   │   └── routines/             # Administración de rutinas
│   ├── dashboard/                # Panel de control del usuario
│   ├── register/                 # Página de registro
│   └── api/                      # Rutas API
├── components/                   # Componentes React reutilizables
│   ├── ui/                       # Componentes UI base
│   ├── forms/                    # Formularios (login, registro, etc.)
│   ├── managers/                 # Gestores de características
│   └── ...                       # Otros componentes
├── lib/                          # Utilidades y helpers
├── prisma/                       # Configuración de base de datos
│   ├── schema.prisma             # Modelo de datos
│   └── seed.ts                   # Script de datos iniciales
├── public/                       # Archivos estáticos
└── styles/                       # Estilos globales
```

## 🚀 Instalación y Ejecución

### Requisitos Previos
- **Node.js** (v18 o superior)
- **npm** o **yarn**
- **PostgreSQL** (para base de datos)

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   cd "ruta/del/proyecto"
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crea archivos `.env` o `.env.local` con las variables necesarias:
   ```
   DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/thalamus
   ```

4. **Configurar base de datos**
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:3000`

### Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run start` | Ejecuta build en producción |
| `npm run lint` | Valida código con ESLint |

## ✨ Características Principales

### 👥 Gestión de Miembros
- Registro de nuevos miembros
- Edición de datos personales
- Seguimiento de estado de membresía
- Búsqueda y filtrado avanzado

### 💪 Rutinas de Entrenamiento
- Creación de rutinas personalizadas
- Asignación a miembros
- Historial de cambios
- Planes flexibles

### 📅 Sistema de Reservas
- Calendario interactivo
- Reserva de sesiones de entrenamiento
- Gestión de disponibilidad

### 💳 Administración de Pagos
- Control de pagos y planes
- Historial de transacciones
- Seguimiento de membresías
- Generación de reportes

### 🔔 Notificaciones
- Alertas automáticas
- Historial de notificaciones
- Comunicación con miembros

### 📊 Dashboard
- Vista general de métricas
- Estadísticas de miembros
- Información en tiempo real

## 🎨 Diseño e Interface

La interfaz utiliza:
- **Diseño responsivo** adaptado a móvil, tablet y desktop
- **Tema moderno** con Tailwind CSS
- **Componentes accesibles** según WCAG 2.1
- **Animaciones suaves** con Framer Motion
- **Dark mode** soportado

## 📝 Modelo de Datos

El proyecto utiliza Prisma ORM con las siguientes entidades principales:

- **Users** - Usuarios del sistema
- **Members** - Miembros del gimnasio
- **Routines** - Rutinas de entrenamiento
- **Bookings** - Reservas de sesiones
- **Payments** - Control de pagos
- **Notifications** - Sistema de alertas

## 🔐 Características de Seguridad

- Autenticación de usuarios
- Validación de formularios
- Protección de rutas
- Manejo seguro de datos

## 📱 Plataformas Soportadas

- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Dispositivos móviles
- ✅ Tablets
- ✅ Desktop

## 🤝 Contribuciones

Este proyecto es una demo de desarrollo frontend. Las mejoras y sugerencias son bienvenidas.

