const hash = (seed: number) => {
  let x = (seed * 2654435761) >>> 0;
  x ^= x >>> 15;
  x = Math.imul(x, 2246822519);
  x ^= x >>> 13;
  x = Math.imul(x, 3266489917);
  x ^= x >>> 16;
  return x >>> 0;
};

export const seeded = (seed: number) => hash(seed) / 4294967296;

export const seededRange = (seed: number, min: number, max: number, decimals = 3) =>
  Number((min + seeded(seed) * (max - min)).toFixed(decimals));
