# AlFallo

> Planifica, registra y supera tus entrenamientos de fuerza.

**AlFallo** es una aplicación web *full stack* para la monitorización, planificación analítica y socialización del entrenamiento de fuerza e hipertrofia. Unifica en un solo sitio lo que hoy suele repartirse entre bloc de notas, hoja de cálculo y redes sociales: registro de series, repeticiones y cargas, analíticas de progreso y una comunidad con la que compartir logros.

Proyecto de la asignatura **Sistemas y Tecnologías Web** · Universidad de La Laguna · Curso 2026/27.

---

## Estado del proyecto

| Área | Estado |
| --- | --- |
| Frontend: tema, layout y navegación | ✅ Hecho |
| Frontend: Inicio, Rutinas (CRUD en memoria), Estadísticas y Perfil | 🟡 Maqueta con datos de ejemplo |
| Backend: API REST, JWT y MongoDB | ⏳ En desarrollo |
| Registro de entrenamiento en vivo | ⏳ Pendiente |
| Feed social | ⏳ Pendiente |
| Despliegue (Vercel + Render) | ⏳ Pendiente |

## Funcionalidades

**Alcance del MVP**

- Registro e inicio de sesión securizado con JWT.
- CRUD del catálogo de ejercicios y de las rutinas.
- Flujo completo de un entrenamiento: inicio, inserción de datos y finalización.
- Visualización gráfica del progreso.
- Feed social básico con las sesiones completadas por otros usuarios.

**Más adelante**

- Estimación del 1RM y detección automática de récords personales (PRs).
- Gamificación: insignias y logros desbloqueables.
- Reconocimientos (*kudos*) y comentarios en el feed.

## Stack tecnológico

| Capa | Tecnología |
| --- | --- |
| Frontend | [Astro](https://astro.build), [React](https://react.dev) (islas interactivas) y [Tailwind CSS 4](https://tailwindcss.com) |
| Backend | Node.js + [Express](https://expressjs.com) (API REST) |
| Autenticación | JSON Web Tokens (JWT) |
| Base de datos | [MongoDB Atlas](https://www.mongodb.com/atlas) + [Mongoose](https://mongoosejs.com) |
| Despliegue | Vercel (frontend) y Render (backend) |
| Herramientas | Git/GitHub, Postman, Figma |

## Estructura del repositorio

```
alfallo/
├── frontend/          # Astro + React + Tailwind
│   └── src/
│       ├── components/    # Componentes (BottomNav, RutinasApp...)
│       ├── data/          # Datos de ejemplo (temporal, hasta tener API)
│       ├── layouts/       # Layout base
│       ├── pages/         # Rutas de la aplicación
│       └── styles/        # Estilos globales y tema
├── backend/           # Node + Express + Mongoose
├── docs/              # Anteproyecto, diseños y diagramas
├── .nvmrc             # Versión de Node del proyecto
└── README.md
```

## Puesta en marcha

### Requisitos

- [Node.js](https://nodejs.org) en la versión indicada en `.nvmrc` (se recomienda [nvm](https://github.com/nvm-sh/nvm))
- Git
- Una cuenta de MongoDB Atlas (para el backend)

### 1. Clonar e instalar la versión de Node

```bash
git clone git@github.com:HugoMArtinG/alfallo.git
cd alfallo
nvm install
nvm use
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:4321`.

| Comando | Acción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción en `dist/` |
| `npm run preview` | Vista previa de la compilación |

### 3. Backend *(en desarrollo)*

```bash
cd backend
npm install
cp .env.example .env     # y rellena los valores
npm run dev
```

Variables de entorno previstas (`backend/.env`):

```env
PORT=3000
MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/alfallo
JWT_SECRET=cambia-esto-por-un-secreto-largo
CLIENT_URL=http://localhost:4321
```

> ⚠️ El archivo `.env` nunca se sube al repositorio. Solo se versiona `.env.example`, sin valores reales.

## Diseño

- **Modo oscuro nativo** (grises carbón) con acentos naranja (`#f26a1b`, del logo) y verde lima (`#b6f23a`) para acciones y métricas clave.
- **Mobile-first**: barra de navegación inferior en móvil, que pasa a barra lateral en escritorio.
- Pensado para usarse con una sola mano durante el entrenamiento.

## Flujo de trabajo en equipo

- `main` contiene siempre código estable y es la rama desde la que se despliega.
- Cada tarea se desarrolla en su **propia rama** (`feat/...`, `fix/...`, `docs/...`) creada desde `main` actualizado.
- Todo cambio entra mediante **Pull Request** revisado por al menos otro compañero.
- Mensajes de commit siguiendo [Conventional Commits](https://www.conventionalcommits.org/es/): `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`.

```bash
git checkout main && git pull
git checkout -b feat/nombre-de-la-tarea
# ...trabajar y hacer commits...
git push -u origin feat/nombre-de-la-tarea
# abrir Pull Request en GitHub
```

## Cronograma (8 semanas)

| Fase | Semanas | Contenido |
| --- | --- | --- |
| 1. Análisis y diseño | 1-2 | Anteproyecto, modelado de datos, diseño en Figma |
| 2. Backend | 3-4 | Servidor Express, autenticación JWT, CRUD |
| 3. Frontend | 5-6 | Maquetación con Astro y Tailwind, componentes |
| 4. Integración | 7 | Conexión con la API, registro en vivo, feed |
| 5. QA y despliegue | 8 | Pruebas, despliegue en producción, memoria final |

## Equipo

- Iker Martín Gámez
- Hugo Martín Gámez
- Aitor Castro Darias

## Documentación

El informe técnico de anteproyecto está en la carpeta [`docs/`](./docs).