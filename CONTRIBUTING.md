# Contribuir a FocusUp

## Flujo de ramas

FocusUp usa Gitflow completo. Las ramas permanentes son:

- `main`: versiones estables y entregables.
- `dev`: integración del trabajo en curso.

No se desarrolla directamente en `main` ni en `dev`, aunque el repositorio permite push directo. Todo cambio funcional debe comenzar desde la rama base indicada y regresar mediante un merge explícito.

| Tipo | Crear desde | Formato | Integrar en |
| --- | --- | --- | --- |
| Funcionalidad | `dev` | `feature/<descripcion-kebab-case>` | `dev` |
| Corrección no urgente | `dev` | `bugfix/<descripcion-kebab-case>` | `dev` |
| Entrega | `dev` | `release/vX.Y.Z` | `main` y `dev` |
| Corrección urgente | `main` | `hotfix/<descripcion-kebab-case>` | `main` y `dev` |

Las ramas remotas históricas se conservan como referencia. A partir de ahora sólo se usan los prefijos de la tabla.

## Trabajo diario

Actualiza la rama base y crea una rama de trabajo:

```bash
git switch dev
git pull origin dev
git switch -c feature/<descripcion-kebab-case>
```

Para una corrección no urgente, reemplaza `feature/` por `bugfix/`. Al terminar, verifica el cambio y fusiónalo en `dev`:

```bash
npm run typecheck
npm run lint
git switch dev
git merge --no-ff feature/<descripcion-kebab-case>
git branch -d feature/<descripcion-kebab-case>
```

El uso de pull requests es opcional. Si se abre uno, debe describir el cambio, las pruebas ejecutadas y la versión afectada. No hay checks bloqueantes configurados, pero typecheck y lint son obligatorios antes de una release.

## Releases y hotfixes

Las versiones siguen [Semantic Versioning](https://semver.org/lang/es/):

- `MAJOR`: cambios incompatibles.
- `MINOR`: funcionalidades compatibles.
- `PATCH`: correcciones compatibles.

Una release se prepara desde `dev`. En `release/vX.Y.Z` sólo se permiten cambios de estabilización, documentación y actualización de versión. `package.json` y `app.json` deben tener exactamente `X.Y.Z` antes de finalizarla.

```bash
git switch dev
git pull origin dev
git switch -c release/vX.Y.Z
# actualizar package.json y app.json; validar la aplicación
git switch main
git merge --no-ff release/vX.Y.Z
git tag -a vX.Y.Z -m "release: vX.Y.Z"
git switch dev
git merge --no-ff release/vX.Y.Z
git branch -d release/vX.Y.Z
```

Un hotfix parte de `main`, usa el prefijo `hotfix/` y se integra tanto en `main` como en `dev`. Después se etiqueta una nueva versión de parche:

```bash
git switch main
git pull origin main
git switch -c hotfix/<descripcion-kebab-case>
# aplicar y validar la corrección
git switch main
git merge --no-ff hotfix/<descripcion-kebab-case>
git tag -a vX.Y.Z -m "hotfix: vX.Y.Z"
git switch dev
git merge --no-ff hotfix/<descripcion-kebab-case>
git branch -d hotfix/<descripcion-kebab-case>
```

Publica ramas y tags sólo cuando estén listos para compartirse:

```bash
git push origin <rama>
git push origin main dev --tags
```

## Commits

Usa Conventional Commits con mensajes cortos en imperativo:

```text
feat: agregar recordatorios de sesiones
fix: corregir cálculo de racha
refactor: extraer selector de prioridades
docs: documentar flujo de releases
test: cubrir migración de sesiones
chore: actualizar dependencias
build: configurar perfil de APK
```
