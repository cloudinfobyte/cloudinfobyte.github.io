# CloudInfoByte website

Static, no-build site (plain HTML/CSS/JS) for GitHub Pages. Single page with: Services, Migration approach,
CI/CD flow, MLOps & AIOps, Tech stack, Engagement models, FAQ, Contact form.

## 1. Make the contact form deliver to your inbox

GitHub Pages cannot run server code, so the form posts to a free form service that emails you. Edit
`assets/js/config.js` and fill **one** of these (first one set wins):

| Option | Setup | Config value |
|--------|-------|--------------|
| **Web3Forms** (recommended) | go to web3forms.com, enter your email, they email you an access key | `web3formsKey: "your-key"` |
| **Formspree** | formspree.io, create a form, confirm your email | `formspreeEndpoint: "https://formspree.io/f/xxxx"` |
| **mailto fallback** | nothing to sign up for; opens the visitor's mail app | `contactEmail: "you@yourdomain.com"` |

The Web3Forms key and Formspree endpoint are meant to be public (they can only send to you). Free plans have monthly
limits - check the current terms on their sites. Test by submitting the form once after you deploy; the first message
may also trigger a one-time confirmation email.

Spam: the form has a hidden honeypot field. Both services also offer captcha / domain allow-listing in their dashboards;
enable the domain restriction once you know your final URL.

If none of the three values is set, the form tells the visitor it is not connected yet (it never pretends to send).

## 2. Put it on GitHub Pages

Create a **new repository** (e.g. `cloudinfobyte.github.io`, or any name) and put the **contents of this folder at the
repo root** (so `index.html` is at the top level).

```bash
cd raw/cloudinfobyte-website
git init -b main
git add .
git commit -m "Initial CloudInfoByte site"
git remote add origin https://github.com/<your-user>/<your-repo>.git
git push -u origin main
```

Then on GitHub: **Settings -> Pages -> Build and deployment -> Source: GitHub Actions**. The included workflow
`.github/workflows/pages.yml` deploys on every push to `main`. (Alternative with no workflow: Source = "Deploy from a
branch", `main`, `/ (root)`; delete the workflow file.)

Site URL: `https://<your-user>.github.io/<repo>/` (or `https://<your-user>.github.io/` for a repo named
`<your-user>.github.io`). All asset paths are relative, so project sites work.

## 3. Custom domain (optional)

Settings -> Pages -> Custom domain. Add a `CNAME` file containing just the domain, then set DNS (CNAME to
`<your-user>.github.io`, or the A records GitHub documents). Turn on "Enforce HTTPS".

## 4. Edit content

| Want to change | File |
|----------------|------|
| Text, services, FAQ | `index.html` |
| Colors / layout | `assets/css/styles.css` (variables at the top) |
| Form + email settings | `assets/js/config.js` |
| Logo / favicon | `assets/img/favicon.svg` |

Before launch: add your real contact email (`contactEmail`), and consider adding a privacy note near the form, any
case studies/testimonials you can substantiate, and `<link rel="canonical">` / `og:url` once the domain is final. The
site makes no client counts, certifications or performance claims - add them only if they are true and provable.

## Preview locally

```bash
python -m http.server 8080
# open http://localhost:8080
```
