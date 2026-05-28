import { categorize } from "./categorize";
import {
  CategorizeOptions,
  GroupedPage,
  GroupedPages,
  KeyResolver,
  Page,
} from "./types";

/**
 * Categorize across paginated chunks of the shape:
 *   [{ data: T[], total?, count?, page?, pageCount? }, ...]
 *
 * Returns one bucket per category with the matching items concatenated
 * and pagination counters aggregated across the input pages that
 * contributed to that bucket.
 */
export function categorizePages<T>(
  pages: ReadonlyArray<Page<T>>,
  key: KeyResolver<T>,
  options: CategorizeOptions<T> = {}
): GroupedPages<T> {
  const result: GroupedPages<T> = Object.create(null);

  for (const page of pages) {
    const grouped = categorize(page.data || [], key, options);

    for (const bucket of Object.keys(grouped)) {
      const items = grouped[bucket];
      if (!items.length) continue;

      if (!result[bucket]) {
        result[bucket] = {
          data: [],
          total: 0,
          count: 0,
          page: 1,
          pageCount: 1,
        };
      }

      const acc: GroupedPage<T> = result[bucket];
      acc.data.push(...items);
      acc.total += page.total ?? 0;
      acc.count += page.count ?? 0;
      acc.pageCount = Math.max(acc.pageCount, page.pageCount ?? 1);
    }
  }

  return result;
}
