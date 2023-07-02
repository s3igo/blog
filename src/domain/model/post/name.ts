import { type Companion, Opaque } from '~/utils/types';

/** 記事のファイル名 */
export type Name = Opaque<string, 'Name'>;

const transformName = (name: string): string => {
    const formedName = name.split('/').slice(-1)[0];
    if (!formedName) throw new Error('name is undefined');

    return formedName;
};

export const Name: Companion<string, Name> = {
    new: (name) => Opaque.create<Name, string>(transformName(name)),
};

if (import.meta.vitest) {
    const { describe, expect, test } = import.meta.vitest;

    describe('Name', () => {
        test('name', () => {
            expect(Name.new('name')).toBe('name');
        });
        test('name with slash', () => {
            expect(Name.new('name/with/slash')).toBe('slash');
        });
        test('no name', () => {
            expect(() => Name.new('')).toThrow('name is undefined');
        });
    });
}
