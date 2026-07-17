# JarrellTX.co

Static HTML, CSS, and JavaScript website for JarrellTX.co. The site is compatible with GitHub Pages and uses the custom domain `jarrelltx.co`.

## Website structure

- `index.html` — home page
- `businesses.html` — searchable local business directory
- `services.html` — website and local visibility services
- `about.html` — local purpose and operation
- `contact.html` — contact information, map, and contact form
- `list-your-business.html` — directory submission form
- `privacy.html` and `terms.html` — legal information
- `404.html` — GitHub Pages not-found page
- `styles.css` — complete visual and responsive design system
- `script.js` — contact configuration, navigation, directory rendering, and static form behavior
- `data/businesses.json` — future directory records
- `assets/images/` — locally stored site photography and image attribution
- `sitemap.xml`, `robots.txt`, and `CNAME` — search and GitHub Pages configuration

## Change contact information

The documented `siteContact` object is near the beginning of `script.js`. Update the phone, email, social URLs, Maps URL, and optional form endpoint there.

Important contact details also appear directly in the HTML for accessibility and SEO. After changing the configuration, search the HTML files for the old phone or email and update the visible links, metadata, and JSON-LD too.

Phone links use the international `tel:` value `+15123633797`. Visible formatting uses `(512) 363-3797`.

## Add social links

Set `facebook`, `instagram`, or `linkedin` in `siteContact`. Links use `data-social="facebook"`, `data-social="instagram"`, or `data-social="linkedin"`. A link whose configuration is empty is hidden automatically. Add the same real URL directly to the relevant HTML link so it remains useful without JavaScript.

## Change the Google Maps location

Update `maps` in `siteContact`, then update the visible Google Maps links and the two map iframe URLs in `index.html` and `contact.html`. The current embed uses a no-key URL:

`https://www.google.com/maps?q=Jarrell%2C%20Texas&output=embed`

## Replace images

Store replacement images in `assets/images/`, compress them before publishing, use descriptive filenames, and include width, height, and useful alternative text in HTML. Update `assets/images/IMAGE-SOURCES.md` with the original source, photographer when available, and source platform/license.

## Add a directory business

Edit `data/businesses.json`. It must remain a JSON array. A supported record looks like:

```json
{
  "name": "Verified business name",
  "category": "Home Services",
  "description": "Short factual description supplied by the business.",
  "address": "Verified public business address",
  "phone": "+15125550100",
  "website": "https://example.com",
  "email": "hello@example.com",
  "maps": "https://www.google.com/maps/...",
  "facebook": "https://www.facebook.com/...",
  "instagram": "https://www.instagram.com/...",
  "image": "assets/images/business-name.jpg",
  "featured": false
}
```

Publish only information supplied or verified by the business. Do not add fictional records, ratings, reviews, or addresses.

## Configure the forms

The forms currently validate in the browser and prepare a `mailto:` message to `hello@jarrelltx.co`. They do not report a successful web submission.

To connect a production form service, set the approved HTTPS endpoint in `siteContact.formEndpoint` in `script.js`. Test the endpoint response before changing the visitor message. No form package or build tool is required.

## Test locally

From the repository directory:

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173/`. Test every page, the mobile menu, directory filters, maps, telephone links, email links, and form fallback. Also run:

```sh
node --check script.js
xmllint --noout sitemap.xml
git diff --check
```

## Deploy through GitHub Pages

Commit changes and push to the `main` branch of `aldulaimi83/jarrelltx`. GitHub Pages serves the static files directly. Keep `CNAME` in the repository root with exactly:

```text
jarrelltx.co
```

No npm install, build command, framework, or database is used.
