"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorizePages = categorizePages;
const categorize_1 = require("./categorize");
/**
 * Categorize across paginated chunks of the shape:
 *   [{ data: T[], total?, count?, page?, pageCount? }, ...]
 *
 * Returns one bucket per category with the matching items concatenated
 * and pagination counters aggregated across the input pages that
 * contributed to that bucket.
 */
function categorizePages(pages, key, options = {}) {
    var _a, _b, _c;
    const result = Object.create(null);
    for (const page of pages) {
        const grouped = (0, categorize_1.categorize)(page.data || [], key, options);
        for (const bucket of Object.keys(grouped)) {
            const items = grouped[bucket];
            if (!items.length)
                continue;
            if (!result[bucket]) {
                result[bucket] = {
                    data: [],
                    total: 0,
                    count: 0,
                    page: 1,
                    pageCount: 1,
                };
            }
            const acc = result[bucket];
            acc.data.push(...items);
            acc.total += (_a = page.total) !== null && _a !== void 0 ? _a : 0;
            acc.count += (_b = page.count) !== null && _b !== void 0 ? _b : 0;
            acc.pageCount = Math.max(acc.pageCount, (_c = page.pageCount) !== null && _c !== void 0 ? _c : 1);
        }
    }
    return result;
}
