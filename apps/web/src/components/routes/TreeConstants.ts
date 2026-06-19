// Logical coordinate space for the route tree. Node x/y from the data are
// mapped into this box; both the SVG viewBox and the absolutely-positioned
// node cards use the same normalized mapping so lines and cards align.
export const TREE_LOGICAL_W = 1000;
export const TREE_LOGICAL_H = 660;

export const toLeftPct = (x: number) => (x / TREE_LOGICAL_W) * 100;
export const toTopPct = (y: number) => (y / TREE_LOGICAL_H) * 100;
