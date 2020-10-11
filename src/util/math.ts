export function map(value: number, start1: number, stop1: number, start2: number, stop2: number) {
  return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2
}

export function range(len: number) {
  return new Array(len).fill(0).map((_, i) => i)
}
