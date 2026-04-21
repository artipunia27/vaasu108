This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Content Admin Panel

You can now add/update spiritual content directly from the browser.

1. Set an admin token in your environment:

```env
CONTENT_ADMIN_TOKEN=your-strong-secret
```

If you want to use the admin panel on your live domain, also set:

```env
CONTENT_ADMIN_ENABLE_REMOTE=true
CONTENT_ADMIN_ALLOWED_HOSTS=your-domain.com,www.your-domain.com
```

Keep `CONTENT_ADMIN_ENABLE_REMOTE` unset or `false` to restrict admin to localhost only.

2. Ensure Prisma tables are synced:

```bash
npx prisma db push
```

3. Open the admin page:

```text
/admin
/admin/content
/admin-ramanju-portal
```

From this page, you can add or update:
- Bhajans
- Spiritual books and chapters
- Shlokas

Public pages automatically read DB content first and keep JSON content as fallback.

## Live Update Notes

- Admin panel edits update your database, not Git files.
- For live updates, make sure your deployed app has the correct production `DATABASE_URL`.
- If your live data is not changing, confirm the above environment variables are set in your hosting dashboard and redeploy once.

If you edited content locally earlier and want those exact changes on live quickly:

```bash
npm run export-db-json
```

Then commit/push the updated JSON files in `src/data/` and redeploy.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
