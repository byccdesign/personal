# MyMind

A browser-based visual workspace for mind maps and process flows.

## Local development

```bash
npm install
npm run build
```

Then open `http://localhost:8080/MyMind/`. The root `.htaccess` serves the generated app from `dist/` and preserves routes such as `/MyMind/editor/...` and `/MyMind/payment-flow`.

Without a configured API, MyMind automatically saves documents in browser storage. Run `npm run build` again after making source changes.

For Vite's live development server, use `npm run dev` and open `http://localhost:4173/MyMind/`.

## Namecheap deployment

1. Create a subdomain such as `mymind.christine-uy.com` in cPanel and point its document root to the folder where MyMind will be uploaded.
2. Run `npm run build:subdomain` and upload the contents of `dist/` to that document root. This switches routes and assets from the local `/MyMind/` base to `/` for the subdomain.
3. Create a MySQL database and user in cPanel.
4. Import `public/api/schema.sql` using phpMyAdmin.
5. In the deployed `api/` folder, copy `config.example.php` to `config.php` and enter the cPanel database credentials.
6. Generate a dashboard password hash with `php -r "echo password_hash('your-password', PASSWORD_DEFAULT), PHP_EOL;"` and add the result to `app_password_hash` in `config.php`.
7. Keep `config.php` private and never commit it.

The included `.htaccess` sends routes such as `/payment-flow` to the app, while leaving the PHP API and built assets accessible.

## Storage model

- `mind_documents.graph_json` stores nodes and connectors as JSON.
- Dashboard metadata, share status, and public slugs live in indexed columns.
- Browser storage acts as an offline/local fallback if the PHP API is unavailable.
- Server-backed dashboards require the configured password; shared canvas slugs remain publicly viewable and read-only.
