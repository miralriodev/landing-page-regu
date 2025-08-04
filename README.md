# Landing Page con Angular y Supabase

## Descripción

Este proyecto es una aplicación web moderna tipo landing page desarrollada con Angular 20 y Supabase como backend. La aplicación incluye funcionalidades de autenticación, registro de usuarios y una interfaz moderna utilizando PrimeNG con la fuente Inter.

## Tecnologías Utilizadas

- **Frontend**: Angular 20.1.0
- **Backend**: Supabase (PostgreSQL + Auth + API)
- **UI Framework**: PrimeNG 20.0.1 con tema Lara
- **Estilos**: SCSS con variables personalizadas
- **Fuente**: Inter (Google Fonts)
- **Estado**: RxJS con Signals

## Características

- Autenticación completa (registro, inicio de sesión)
- Interfaz responsive y moderna
- Validación de formularios
- Manejo de errores
- Protección de rutas
- Perfiles de usuario

## Requisitos Previos

- Node.js (versión 18 o superior)
- Angular CLI (versión 20.1.1 o superior)
- Cuenta en Supabase

## Instalación

1. Clonar el repositorio:

```bash
git clone <url-del-repositorio>
cd landing-page-new
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:
   - Crear o editar el archivo `src/environments/environment.ts` con las credenciales de Supabase

4. Ejecutar migraciones en Supabase:
   - Utilizar el script SQL proporcionado en la documentación para crear las tablas y políticas necesarias

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`

Para iniciar el servidor en un puerto específico:

```bash
ng serve --port 4202
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/       # Componentes reutilizables
│   ├── services/         # Servicios (auth, supabase)
│   ├── app.config.ts     # Configuración de Angular y PrimeNG
│   ├── app.routes.ts     # Definición de rutas
│   └── app.ts           # Componente principal
├── environments/         # Variables de entorno
└── styles.scss          # Estilos globales
```

## Construcción para Producción

```bash
ng build --configuration production
```

Los archivos de la build se generarán en el directorio `dist/`.

## Pruebas

Para ejecutar las pruebas unitarias:

```bash
ng test
```

## Documentación

Para una guía detallada del desarrollo, consultar el archivo PDF generado a partir del documento LaTeX incluido en el proyecto.

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.
