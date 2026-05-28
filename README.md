# custom-categorize

[![npm version](https://img.shields.io/npm/v/custom-categorize.svg)](https://www.npmjs.com/package/custom-categorize)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A tiny, zero-dependency library to **group arrays of objects by a key**, a
**dot-path**, or a **function**. Written in TypeScript.

```ts
import { categorize } from "custom-categorize";

categorize(users, "language");
categorize(users, "userStatus.status");
categorize(users, (u) => u.tags);             // multi-bucket (array return)
categorize(users, "country", { only: ["USA", "UK"] });
```

---

## Install

```bash
npm install custom-categorize
# or
yarn add custom-categorize
```

---

## Quick start

```ts
import { categorize } from "custom-categorize";

const users = [
  { name: "Ada",   language: "en", userStatus: { status: "active"   } },
  { name: "Bisi",  language: "pt", userStatus: { status: "active"   } },
  { name: "Chen",  language: "en", userStatus: { status: "inactive" } },
];

categorize(users, "language");
// { en: [Ada, Chen], pt: [Bisi] }

categorize(users, "userStatus.status");
// { active: [Ada, Bisi], inactive: [Chen] }
```

---

## API

### `categorize(items, key, options?)`

Group items by `key`.

| Param     | Type                                       | Description |
| --------- | ------------------------------------------ | ----------- |
| `items`   | `T[]`                                      | Items to group. |
| `key`     | `string \| (item: T) => unknown`           | Property name, dot-path (`"a.b.c"`), or function. If the function returns an array the item is placed in every returned bucket. |
| `options` | `CategorizeOptions`                        | See below. |

**Returns:** `Record<string, T[]>` — buckets keyed by the resolved value.

**Options**

| Option              | Type                          | Default        | What it does |
| ------------------- | ----------------------------- | -------------- | ------------ |
| `only`              | `(string \| number)[]`        | —              | Only keep these bucket keys. Empty buckets in this list are still returned. |
| `keyAs`             | `(raw: string) => string`     | —              | Transform bucket keys (e.g. `k => k.toLowerCase()`). |
| `includeUnmatched`  | `boolean`                     | `false`        | Put items whose resolved value is `null`/`undefined`/filtered-out into an extra bucket. |
| `unmatchedKey`      | `string`                      | `"_unmatched"` | Name of that extra bucket. |

#### Examples

```ts
// Whitelist with stable shape (missing keys still come back as empty arrays)
categorize(users, "language", { only: ["en", "fr"] });
// { en: [...], fr: [] }

// Normalize keys
categorize(users, "country", { keyAs: (k) => k.toLowerCase() });

// Multi-bucket via function
categorize(posts, (p) => p.tags);   // each post lands in every tag bucket

// Capture leftovers
categorize(users, "language", { only: ["en"], includeUnmatched: true });
// { en: [...], _unmatched: [...everyone else...] }
```

---

### `categorizePages(pages, key, options?)`

Convenience helper for paginated payloads of the shape:

```ts
[{ data: T[], total?, count?, page?, pageCount? }, ...]
```

Returns one bucket per category with the matching items concatenated and
pagination counters aggregated:

```ts
{
  [bucket: string]: {
    data: T[];
    total: number;
    count: number;
    page: number;
    pageCount: number;
  }
}
```

```ts
import { categorizePages } from "custom-categorize";

const pages = [
  {
    data: [
      { country: "USA", language: "en" },
      { country: "UK",  language: "en" },
      { country: "Brazil", language: "pt" },
    ],
    total: 3, count: 3, page: 1, pageCount: 1,
  },
];

categorizePages(pages, "language", { only: ["en"] });
// {
//   en: {
//     data: [{country:"USA",...}, {country:"UK",...}],
//     total: 3, count: 3, page: 1, pageCount: 1
//   }
// }
```

---

## TypeScript

Everything is typed. Public types:

```ts
import type {
  CategorizeOptions,
  Grouped,
  GroupedPage,
  GroupedPages,
  KeyResolver,
  Page,
} from "custom-categorize";
```

---

## Migration from 1.x

`1.x` exposed a single `categorize(users, selectedFilters, targetName, filterFn?)`
that required a paginated wrapper shape. `2.x` is a clean redesign.

| 1.x                                                          | 2.x |
| ------------------------------------------------------------ | --- |
| `categorize(pages, ["en"], "language")`                      | `categorizePages(pages, "language", { only: ["en"] })` |
| `categorize(pages, ["active"], "status", customFn)`          | `categorizePages(pages, item => customFn(item, ...), ...)` or `categorizePages(pages, "userStatus.status", { only: ["active"] })` |
| Plain array of items                                         | `categorize(items, "language", { only: ["en"] })` |

---

## License

MIT
