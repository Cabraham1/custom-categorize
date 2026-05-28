"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveKey = resolveKey;
function resolveKey(item, key) {
    if (typeof key === "function")
        return key(item);
    return getPath(item, key);
}
function getPath(obj, path) {
    if (obj == null)
        return undefined;
    if (path.indexOf(".") === -1)
        return obj[path];
    const parts = path.split(".");
    let cur = obj;
    for (let i = 0; i < parts.length; i++) {
        if (cur == null)
            return undefined;
        cur = cur[parts[i]];
    }
    return cur;
}
