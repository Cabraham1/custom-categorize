import { CategorizeOptions, Grouped, KeyResolver } from "./types";
/**
 * Group an array of items by a key.
 *
 * `key` can be:
 *   - a top-level property name: "language"
 *   - a dot-path for nested values: "userStatus.status"
 *   - a function returning the bucket value(s). If it returns an array,
 *     the item is placed in every bucket in that array.
 */
export declare function categorize<T>(items: ReadonlyArray<T>, key: KeyResolver<T>, options?: CategorizeOptions<T>): Grouped<T>;
