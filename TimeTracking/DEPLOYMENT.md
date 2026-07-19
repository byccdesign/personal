# Deploy Time Tracker to Namecheap

This version uses PHP and MySQL/MariaDB. phpMyAdmin does not manage SQLite databases.

## 0. Connect the subdomain

1. In Namecheap cPanel, open **Domains > Create A New Domain**.
2. Add `timetracking.christine-uy.com`, turn off **Share document root**, and use a dedicated folder such as `public_html/timetracking`.
3. In the AWS Route 53 hosted zone for `christine-uy.com`, create a simple `A` record named `timetracking` pointing to the **Shared IP Address** shown in Namecheap cPanel. Do not change the domain's AWS nameservers.
4. Wait for the record to resolve before requesting the SSL certificate.

## 1. Create the database

1. In Namecheap cPanel, open **Databases > Database Wizard** (or **Manage My Databases**).
2. Create a database, for example `timetracker`.
3. Create a database user with a long, unique password.
4. Assign that user to the database with **ALL PRIVILEGES**.
5. Keep the full names shown by cPanel. They normally include your cPanel prefix, such as `account_timetracker` and `account_tracker`.
6. Open **Databases > phpMyAdmin**, select the new database, choose **Import**, and import `api/schema.sql`.

## 2. Configure the PHP API

1. Make a copy of `api/config.example.php` named `api/config.php`.
2. Put the database name, user, and password from cPanel into `api/config.php`.
3. Leave the host as `localhost` unless Namecheap shows a different MySQL hostname.
4. Never commit or share `api/config.php`. It is ignored by Git and blocked from browser access by `api/.htaccess`.
5. In cPanel File Manager, set `api/config.php` to permission `0600` if the PHP handler can still read it; otherwise use `0640`. Never use `0666` or `0777`.

Example:

```php
<?php
return [
    'host' => 'localhost',
    'port' => 3306,
    'database' => 'account_timetracker',
    'username' => 'account_tracker',
    'password' => 'your-long-random-database-password',
];
```

## 3. Upload the site

Upload this folder's contents to the domain's document root using cPanel **File Manager** or SFTP. For a primary domain this is usually `public_html`; cPanel's **Domains** page shows the exact document root.

The deployed folder must contain:

```text
index.html
style.css
support.js
.htaccess
api/
  index.php
  config.php
  config.example.php
  schema.sql
  .htaccess
```

Use HTTPS when opening the deployed app.

Do not upload the local `api/config.php`; it contains credentials for the MySQL server on your Mac and will not work on Namecheap. Create the Namecheap version directly in cPanel from `config.example.php`.

## 4. Protect the private tracker

This is a personal app containing client and billing information. In cPanel, use **Files > Directory Privacy** to require a username and strong password for the tracker directory. Do not publish it without access protection.

The included root `.htaccess` and HTML metadata tell search engines not to index, follow, cache, or show snippets from the app. Those crawler instructions are not access control: Directory Privacy is what prevents unauthorized visitors and scrapers from downloading the files or calling the API.

To enable protection in Namecheap:

1. Open cPanel **Files > Directory Privacy**.
2. Select the deployed Time Tracker directory.
3. Enable **Password protect this directory**.
4. Create a separate username and a strong, unique password.
5. Open the live URL in a private browser window and confirm that it asks for credentials before showing anything.

Upload the included `.htaccess` files before enabling Directory Privacy. cPanel adds its password rules to the root `.htaccess`. If you upload a replacement `.htaccess` later, merge the files instead of overwriting cPanel's authentication lines.

## 5. Move existing localhost data

Browser storage is tied to a domain, so `localhost` data cannot automatically appear on your live domain.

1. Open the localhost tracker and click **Export**.
2. Open the deployed tracker and click **Import**.
3. Select the downloaded JSON file and confirm.
4. The import is saved to MySQL automatically.

Afterward, the server database is loaded on each visit. The browser also keeps a local fallback copy if the network or database is temporarily unavailable.

This storage design is intended for one person. Avoid editing the tracker in several browsers or devices at the same time because the most recent save replaces the earlier database state.

## Troubleshooting

- `503 Database configuration is missing`: create and fill in `api/config.php`.
- `503 The database is unavailable`: verify the cPanel-prefixed database/user names, password, database assignment, and privileges.
- `500 The server could not process the request`: import `api/schema.sql`, then check cPanel's **Errors** page.
- Changes remain only in the browser: open the browser developer console and look for a server sync warning.
