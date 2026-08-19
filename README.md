# සිංහල මංගල ආරාධනා RSVP

The mobile invitation keeps the original Sinhala artwork and adds a matching RSVP form for name, telephone number, and guest count.

## Connect Google Sheets

1. Create or open the destination Google Sheet.
2. Open **Extensions → Apps Script** and paste `google-apps-script/Code.gs`.
3. Choose **Deploy → New deployment → Web app**. Run as yourself and allow access to anyone with the link.
4. Copy the `/exec` URL into `.env.local` as `GOOGLE_SHEETS_WEB_APP_URL=...`.
5. For a hosted Sites deployment, add that URL as the `GOOGLE_SHEETS_WEB_APP_URL` environment variable.

The script creates an `RSVP` tab automatically with submission time, name, telephone, and guest-count columns.

## Run locally

```bash
npm install
npm run dev
```
