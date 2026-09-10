# Prototype 1 — Basic one-pager (€499)

Built from [`01-basic-onepager.md`](../01-basic-onepager.md). Grondwerk Bloembollen,
a fictional bulb grower in Hillegom. Plain HTML/CSS/JS, no build step, no dependencies.

## Run it

Any static server. From this folder:

```
python -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` over `file://` works too, except
the form POST — that needs a host.

## Deploy

Netlify, free tier. Drag this folder into the Netlify UI, or connect the repo with no build
command and this folder as the publish directory. Nothing to compile.

The contact form is wired for **Netlify Forms**: `data-netlify="true"`, a hidden `form-name`
input, and `data-netlify-honeypot="bedrijfsnaam"`. Submissions appear in the Netlify UI;
turn on email notification to the client inbox. To host elsewhere, set a Formspree endpoint
as the form's `action` — `js/form.js` posts to `action` and falls back to `/`. No other
change is needed, and no custom mail script belongs in this tier.

## What is here

```
index.html            one page, five anchor sections
css/tokens.css        §2.2 verbatim — byte-identical across all three prototypes
css/site.css          everything else, one hand-written file
js/nav.js             mobile disclosure menu + IntersectionObserver scrollspy
js/season-bar.js      current-month marker, animates once on load
js/form.js            inline validation, submit states, time-to-submit floor
img/                  photography from Wikimedia Commons (see CREDITS.md)
```

Every script is `defer`, and every one of them is an enhancement: with JS disabled the page
reads in full, the nav anchors work, the season bar renders without its marker, and the form
falls back to native browser validation and a normal POST.

## Images

Real photography from Wikimedia Commons, centre-cropped to the spec ratios (3:2 landscape,
4:5 portrait) and re-encoded as WebP. No filters, no duotone. The hero and the About photo
are actual tulip fields in the Bollenstreek at Hillegom, which is where the fictional
business is set.

Attribution is **required** by the CC BY licences and lives in two places: a credit line in
the footer, and [CREDITS.md](CREDITS.md) with the full table. Do not strip either without
replacing the photos first.

One substitution to know about: the spec asks for a portrait of the grower in the About
section. No suitably licensed portrait of a Dutch bulb grower exists on Commons, and putting
a real stranger's face on a fictional family would misrepresent that person, so `portret.webp`
is a Hillegom field instead. A real person there needs a shoot or a paid stock licence.

## Deliberately absent

No CMS, no admin route, no second page, no analytics, no cookie banner, no cart, no
structured data, no `sitemap.xml`. That absence is the tier boundary against Prototype 2 —
see §10 of the spec. `Privacy` and `Algemene voorwaarden` in the footer are `#` placeholders,
marked as such in a source comment.

## Open questions carried over (spec §11)

1. **Copy language** — the site is in Dutch. Flip to English, or ship both, if the audience
   for these prototypes is not Dutch-speaking.
2. **Contact details** — address, phone, and KvK number are fictional. Confirm that is fine,
   or supply real ones.
3. **Wordmark** — plain text in Bricolage Grotesque 800. A drawn logo is design work outside
   the €499.

## Not verified here

Lighthouse (≥ 95 performance / accessibility / best practices on mobile) and the live form
delivery in §9 both need a deployed URL. Run them after the first Netlify deploy.
