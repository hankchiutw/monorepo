/**
 * Extend a property getter or setter.
 */
export function extendPropertyAccessor(
  proto: string,
  prop: string,
  config: { get?: any; set?: any }
) {
  const internalKey = `__${prop}`;
  const propDescriptor = Object.getOwnPropertyDescriptor(proto, prop);
  const { get: getterFunc, set: setterFunc } = config;

  const get = getterFunc
    ? getterFunc
    : propDescriptor
    ? propDescriptor.get
    : function () {
        return this[internalKey];
      };

  const set = function (value: any) {
    this[internalKey] = value;
    // keep existing setter working
    if (propDescriptor) {
      propDescriptor.set.call(this, value);
    }
    setterFunc.call(this, value);
  };

  Object.defineProperty(proto, prop, {
    get,
    set,
    configurable: true,
  });
}
