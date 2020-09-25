const compose = (...funcs) => (comp) => {
  return funcs.reduceRight((wrapped, fn) => fn(wrapped), comp)
}

export {
  compose
}