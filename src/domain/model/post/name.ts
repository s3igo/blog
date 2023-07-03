import { type Companion, Opaque } from '~/utils/types';

const transformName = (name: string): string => {
    const formedName = name.split('/').slice(-1)[0];
    if (!formedName) throw new Error('name is undefined');

    return formedName;
};

/**
 * 記事のファイル名
 * @package
 */
export type Name = Opaque<string, 'Name'>;
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
