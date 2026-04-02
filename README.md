# Rosefolio

Portfolio starter built with Next.js (App Router), TypeScript, and Tailwind CSS v4.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## GitHub + Vercel

The local Git remote is set to:

`https://github.com/omnomrose/rosefolio.git`

If your GitHub username is different, run:

```bash
git remote set-url origin https://github.com/YOUR_GITHUB_USERNAME/rosefolio.git
```

### 1. Create the repo on GitHub

1. Open [github.com/new](https://github.com/new).
2. Repository name: `rosefolio` (must match the URL above).
3. Leave **empty** (no README, no .gitignore) so the first push works.
4. Click **Create repository**.

### 2. Push from this machine

From the project folder:

```bash
cd /Users/rose/desktop/rosefolio
git push -u origin main
```

If Git asks for credentials, use a [Personal Access Token](https://github.com/settings/tokens) as the password over HTTPS, or switch to SSH:

```bash
git remote set-url origin git@github.com:omnomrose/rosefolio.git
git push -u origin main
```

Optional: install [GitHub CLI](https://cli.github.com/) then:

```bash
brew install gh
gh auth login
gh repo create rosefolio --public --source=. --remote=origin --push
```

(Use this only if the repo does not exist yet; otherwise push is enough.)

### 3. Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new).
2. **Import** `omnomrose/rosefolio` (or your fork).
3. Framework: **Next.js** (auto-detected).
4. Click **Deploy**.

CLI alternative (after `npm i -g vercel` and `vercel login`):

```bash
cd /Users/rose/desktop/rosefolio
vercel --prod
```

## Figma handoff

Figma source:
- [me-rebrand design file](https://www.figma.com/design/RMG8c6QrOgpHfZLi2jVS7O/me-rebrand?node-id=457-16&t=GPijsnGTMSd6kWwz-1)

After Figma MCP is connected in Cursor, we can map the file into:
- design tokens (colors, type, spacing)
- section components
- responsive breakpoints
- exported images/icons
