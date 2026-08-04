/**
 * Minimal runtime polyfills for older mobile browsers (e.g. Android Chrome < 93),
 * where a missing built-in throws during render and leaves a blank screen.
 * Must be imported before the app renders.
 */

// Object.hasOwn — Chrome 93+, used by bundled dependencies.
if (!(Object as unknown as { hasOwn?: unknown }).hasOwn) {
  Object.defineProperty(Object, "hasOwn", {
    value: (target: object, key: PropertyKey) =>
      Object.prototype.hasOwnProperty.call(target, key),
    configurable: true,
    writable: true,
  });
}

// Array.prototype.at / String.prototype.at — Chrome 92+.
const at = function (this: ArrayLike<unknown>, index: number) {
  const len = this.length;
  const i = Math.trunc(index) || 0;
  const k = i < 0 ? len + i : i;
  return k < 0 || k >= len ? undefined : this[k];
};

for (const proto of [Array.prototype, String.prototype] as unknown as Array<
  Record<string, unknown>
>) {
  if (!proto.at) {
    Object.defineProperty(proto, "at", {
      value: at,
      configurable: true,
      writable: true,
    });
  }
}

// String.prototype.replaceAll — Chrome 85+.
if (!(String.prototype as unknown as { replaceAll?: unknown }).replaceAll) {
  Object.defineProperty(String.prototype, "replaceAll", {
    value: function (search: string, replacement: string) {
      return this.split(search).join(replacement);
    },
    configurable: true,
    writable: true,
  });
}

export {};
