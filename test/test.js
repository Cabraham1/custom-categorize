const assert = require("node:assert/strict");
const { test } = require("node:test");
const { categorize, categorizePages } = require("../dist");

const users = [
  { name: "Ada",   country: "USA",     language: "en", userStatus: { status: "active"   }, tags: ["admin", "beta"] },
  { name: "Bisi",  country: "Nigeria", language: "pt", userStatus: { status: "active"   }, tags: ["beta"] },
  { name: "Chen",  country: "Canada",  language: "fr", userStatus: { status: "inactive" }, tags: [] },
  { name: "Dimi",  country: "Germany", language: "de", userStatus: { status: "active"   }, tags: ["admin"] },
  { name: "Eze",   country: "UK",      language: "en", userStatus: { status: "active"   }, tags: ["beta", "vip"] },
];

test("categorize by top-level key", () => {
  const out = categorize(users, "language");
  assert.deepEqual(Object.keys(out).sort(), ["de", "en", "fr", "pt"]);
  assert.equal(out.en.length, 2);
  assert.equal(out.en[0].name, "Ada");
});

test("categorize by dot-path", () => {
  const out = categorize(users, "userStatus.status");
  assert.equal(out.active.length, 4);
  assert.equal(out.inactive.length, 1);
});

test("categorize by function", () => {
  const out = categorize(users, (u) => u.country);
  assert.equal(out.USA[0].name, "Ada");
});

test("categorize with only-list returns stable shape", () => {
  const out = categorize(users, "language", { only: ["en", "fr", "ja"] });
  assert.deepEqual(Object.keys(out).sort(), ["en", "fr", "ja"]);
  assert.equal(out.ja.length, 0);
});

test("categorize keyAs transforms bucket keys", () => {
  const out = categorize(users, "country", { keyAs: (k) => k.toLowerCase() });
  assert.ok(out.usa);
  assert.ok(out.nigeria);
});

test("categorize multi-bucket via array-returning resolver", () => {
  const out = categorize(users, (u) => u.tags);
  assert.equal(out.admin.length, 2);
  assert.equal(out.beta.length, 3);
  assert.equal(out.vip.length, 1);
});

test("categorize includeUnmatched gathers leftovers", () => {
  const out = categorize(users, (u) => u.tags, {
    only: ["admin"],
    includeUnmatched: true,
  });
  assert.equal(out.admin.length, 2);
  assert.equal(out._unmatched.length, 3); // Bisi, Chen, Eze (Eze is in beta+vip, not admin)
});

test("categorizePages aggregates totals across pages", () => {
  const pages = [
    {
      data: users.slice(0, 3),
      total: 10, count: 3, page: 1, pageCount: 2,
    },
    {
      data: users.slice(3),
      total: 5, count: 2, page: 2, pageCount: 2,
    },
  ];
  const out = categorizePages(pages, "userStatus.status", { only: ["active"] });
  assert.equal(out.active.data.length, 4);
  assert.equal(out.active.total, 15);
  assert.equal(out.active.count, 5);
  assert.equal(out.active.pageCount, 2);
});

test("categorize skips null/undefined values", () => {
  const items = [
    { lang: "en" },
    { lang: null },
    { lang: undefined },
    {},
  ];
  const out = categorize(items, "lang");
  assert.deepEqual(Object.keys(out), ["en"]);
  assert.equal(out.en.length, 1);
});
