// @types/mdastに型あるけど、そこまで厳密性必要ないため使わない
// TODO: 余裕あったら型付ける
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Func = (tree: any, file: any) => void;
export type Plugin = () => Func;

export type Type = { type: string };
export type Value = { value: string };
export type Depth = { depth: number };
