import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("build output contains static site entry assets", async () => {
  const indexFile = new URL("../dist/index.html", import.meta.url);

  await access(indexFile);
  await access(new URL("../dist/couple-portrait.png", import.meta.url));
  await access(new URL("../dist/favicon.svg", import.meta.url));

  const html = await readFile(indexFile, "utf8");
  assert.match(html, /<title>Shehan &amp; Gayathri — Wedding Invitation<\/title>/i);
  assert.match(html, /<script type="module" crossorigin src="\/assets\/.+\.js"><\/script>/);
  assert.doesNotMatch(html, /dist\/server|vinext|wrangler/i);
});

test("source app still includes rsvp route content", async () => {
  const rsvpPage = await readFile(new URL("../app/rsvp/page.tsx", import.meta.url), "utf8");
  assert.match(rsvpPage, /අප සමඟ/);
  assert.match(rsvpPage, /තහවුරු කරන්න/);
});
