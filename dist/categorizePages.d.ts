import { CategorizeOptions, GroupedPages, KeyResolver, Page } from "./types";
/**
 * Categorize across paginated chunks of the shape:
 *   [{ data: T[], total?, count?, page?, pageCount? }, ...]
 *
 * Returns one bucket per category with the matching items concatenated
 * and pagination counters aggregated across the input pages that
 * contributed to that bucket.
 */
export declare function categorizePages<T>(pages: ReadonlyArray<Page<T>>, key: KeyResolver<T>, options?: CategorizeOptions<T>): GroupedPages<T>;
