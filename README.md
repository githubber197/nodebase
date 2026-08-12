Nodebase

A visual workflow automation platform — build, connect, and run automated workflows on a drag-and-drop canvas, similar to n8n or Zapier. Trigger workflows from manual actions, Google Form submissions, or Stripe events, and chain them into HTTP requests, AI model calls, and more.

Features
Visual workflow editor — build workflows on an interactive node-based canvas powered by React Flow
Multiple trigger types — manually trigger a workflow, or start one automatically from a Google Form submission or a Stripe event
Action nodes — make HTTP requests, call AI models, and chain node outputs into subsequent steps using Handlebars templating
Multi-provider AI integration — connect and use models from Google Gemini, OpenAI, and Anthropic within your workflows
Background job execution — workflow runs are executed reliably and asynchronously via Inngest, with real-time status updates streamed back to the canvas
Authentication — email/password auth handled by Better Auth
Subscriptions & billing — Pro plan upgrades and checkout handled via Polar
Credential management — securely store and reuse API keys/credentials across workflow nodes
Execution history — track past workflow runs, their status, and output
Tech Stack

Framework & UI

Next.js 15 (App Router, Turbopack)
React 19
Tailwind CSS 4
Radix UI / shadcn/ui components
XYFlow (React Flow) for the workflow canvas

Backend & Data

tRPC for type-safe API routes
Prisma ORM with the prisma-client generator
Neon serverless Postgres
Inngest for background job orchestration and realtime pub/sub

Auth & Payments

Better Auth
Polar for subscriptions/checkout

AI

Vercel AI SDK with Google Gemini, OpenAI, and Anthropic providers

Other

Zod for schema validation
React Hook Form
Handlebars for dynamic templating in node configs
Sentry for error tracking
Biome for linting/formatting
Getting Started
Prerequisites
Node.js 20+
A Neon Postgres database (or any Postgres instance)
API keys for the services you want to use (Better Auth secret, Polar, Google/OpenAI/Anthropic, etc.)
1. Clone and install
bash
git clone https://github.com/githubber197/nodebase.git
cd nodebase
npm install
2. Configure environment variables

Create a .env file in the project root:

env
DATABASE_URL=your_neon_connection_string

BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000

POLAR_ACCESS_TOKEN=your_polar_token
POLAR_WEBHOOK_SECRET=your_polar_webhook_secret

GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key

INNGEST_DEV=1
3. Set up the database
bash
npx prisma generate
npx prisma migrate dev
4. Run the dev server
bash
npm run dev

Open http://localhost:3000 in your browser.

5. Run Inngest locally

In a separate terminal, start the Inngest Dev Server to process background workflow executions:

bash
npx inngest-cli@latest dev

View the local Inngest dashboard at http://localhost:8288.

6. (Optional) Expose your local server for webhook testing

To test Google Form or Stripe webhooks locally, tunnel your local server with ngrok:

bash
ngrok http 3000
Project Structure
├── prisma/                # Database schema and migrations
├── src/
│   ├── app/                # Next.js App Router pages and API routes
│   ├── components/         # Shared UI components
│   ├── features/           # Feature modules (workflows, credentials, executions, triggers, editor)
│   ├── inngest/             # Inngest client, functions, channels, and executors
│   ├── lib/                 # Shared utilities (db, auth, etc.)
│   └── trpc/                 # tRPC routers and client setup
└── public/                # Static assets
How It Works
Build a workflow on the visual canvas by adding trigger and action nodes (e.g. a Google Form trigger connected to an HTTP Request node).
Triggers fire either manually from the UI, or automatically via an incoming webhook (Google Forms, Stripe).
Each trigger sends an event to Inngest, which picks up the job and executes the workflow's nodes in dependency order (via topological sort).
Each node type has its own executor function that runs its logic (e.g. making an HTTP call, invoking an AI model) and passes its output into the shared context for downstream nodes.
Real-time status updates are published back to the canvas via Inngest's realtime channels, so node status indicators update live as the workflow runs.
License

This project was built as a learning project following a full-stack development course. Not licensed for production use as-is.
