import { CategorizeOptions, Grouped, KeyResolver } from "./types";
import { resolveKey } from "./resolveKey";

/**
 * Group an array of items by a key.
 *
 * `key` can be:
 *   - a top-level property name: "language"
 *   - a dot-path for nested values: "userStatus.status"
 *   - a function returning the bucket value(s). If it returns an array,
 *     the item is placed in every bucket in that array.
 */
export function categorize<T>(
  items: ReadonlyArray<T>,
  key: KeyResolver<T>,
  options: CategorizeOptions<T> = {}
): Grouped<T> {
  const { only, keyAs, includeUnmatched = false, unmatchedKey = "_unmatched" } =
    options;

  const onlySet = only ? new Set(only.map((v) => String(v))) : null;
  const result: Grouped<T> = Object.create(null);

  if (onlySet) {
    for (const v of onlySet) {
      const k = keyAs ? keyAs(v) : v;
      result[k] = [];
    }
  }

  for (const item of items) {
    const raw = resolveKey(item, key);
    const buckets = Array.isArray(raw) ? raw : [raw];
    let placed = false;

    for (const b of buckets) {
      if (b === undefined || b === null) continue;
      const bucketStr = String(b);
      if (onlySet && !onlySet.has(bucketStr)) continue;

      const finalKey = keyAs ? keyAs(bucketStr) : bucketStr;
      if (!result[finalKey]) result[finalKey] = [];
      result[finalKey].push(item);
      placed = true;
    }

    if (!placed && includeUnmatched) {
      if (!result[unmatchedKey]) result[unmatchedKey] = [];
      result[unmatchedKey].push(item);
    }
  }

  return result;
}
