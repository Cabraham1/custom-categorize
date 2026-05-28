import { KeyResolver } from "./types";

export function resolveKey<T>(item: T, key: KeyResolver<T>): unknown {
  if (typeof key === "function") return key(item);
  return getPath(item, key);
}

function getPath(obj: unknown, path: string): unknown {
  if (obj == null) return undefined;
  if (path.indexOf(".") === -1) return (obj as Record<string, unknown>)[path];
  const parts = path.split(".");
  let cur: unknown = obj;
  for (let i = 0; i < parts.length; i++) {
    if (cur == null) return undefined;
    cur = (cur as Record<string, unknown>)[parts[i]];
  }
  return cur;
}
