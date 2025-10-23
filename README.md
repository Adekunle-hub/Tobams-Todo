



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

**Todo App**

A modern and interactive Todo App built with Next.js, React, and TailwindCSS, designed to manage tasks efficiently. This project incorporates a sleek UI inspired by a Figma design and showcases dynamic task statuses with visual progress indicators.
Features
Add New Tasks: Click on the "Add More Task" button to create a new todo. Newly added todos start with the default Todo status.
Task Status Management:
Todos can have three states: Todo, In Progress, and Completed.
Use the three-dot icon beside a task to edit its status or delete it.
Tasks automatically move to their respective columns when status is updated.
Preloaded Example Tasks:
On first load, two example todos appear in the Todo column with a default In Progress status to match the Figma design.
Progress Indicators:
Each task has a progress bar and a 3D cube visualization representing its completion status.
Newly added todos will have no progress bar color until marked as In Progress or Completed.
Responsive Design: Works well on different screen sizes.
Light/Dark Mode Toggle: Switch between light and dark themes using the toggle at the sidebar footer.

UI Interaction Notes
Edit/Delete Task: Click the three-dot icon next to a task title to open the task options.
Status Updates:
Changing a todo to In Progress or Completed moves it to the appropriate column.
The visual progress indicators update according to the task status.
Filter and Sort: The filter and sort buttons are present in the UI but currently non-functional (dormant).

Technologies Used
Next.js (App Router) – Server-side rendering and frontend framework.
React Three Fiber & Three.js – For 3D task cube visualization.
TailwindCSS – Utility-first CSS framework for styling.
TypeScript – Type-safe development.
ShadCnUI – Reusable Components
Next-Themes – Light and dark theme support



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.




You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
