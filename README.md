# Angular Projects & Exercises

A repository dedicated to Angular learning, practical projects, hands-on architectural patterns, and daily exercises.

---

## Repository Structure

```
Angular/
├── day-1/                     # Day 1: EasyTask Dashboard
│   ├── public/
│   │   └── avatars/           # Local SVG team avatars
│   ├── src/
│   │   ├── app/
│   │   │   ├── header/        # Header brand & navigation
│   │   │   ├── user/          # Sidebar user list & active state selection
│   │   │   ├── tasks/         # Main article area & task management
│   │   │   │   ├── task/      # Task card component with completion action
│   │   │   │   └── new-task/  # Modal popup form for creating tasks
│   │   │   ├── models/        # TypeScript interfaces for User & Task
│   │   │   ├── dummy-data.ts  # In-memory local data arrays
│   │   │   ├── app.ts         # Root component
│   │   │   ├── app.html       # 3-part layout (Header + Sidebar + Article)
│   │   │   └── app.css        # Responsive styling
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
├── .gitignore
└── README.md
```

---

## Projects Overview

### Day 1: EasyTask Management App

A responsive task manager and team assignment dashboard featuring:
- **Modern Layout**: Responsive layout with top Header, Sidebar navigation, and main Article workspace.
- **Sidebar User Component**: Displays team members storing `id`, `name`, and `avatar`. Highlights active member on selection.
- **Tasks Article**: Shows `<User Name>'s Tasks`, pending tasks count, and an `+ Add Task` trigger.
- **Add Task Popup Form**: Modal dialog overlay supporting all required fields:
  - `task id`: Auto-generated or custom identifier.
  - `userid`: Linked to the selected team member.
  - `title`: Task headline.
  - `summary`: Detailed description of the deliverable.
  - `duedate`: Target completion deadline.
- **Local Arrays**: Fully managed in-memory data arrays for users and tasks, supporting dynamic additions and completions.

#### Running Day 1:
```bash
cd day-1
npm install
npm start
```
Open `http://localhost:4200` in your browser.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- [Angular CLI](https://angular.dev/tools/cli)

### Build & Test
```bash
cd day-1
npm run build
npm test -- --watch=false
```
