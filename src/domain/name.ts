import { newType } from '~/utils/types';
import type { Companion } from '~/utils/types';

export type Name = string & { readonly brand: unique symbol };
export const Name: Companion<string, Name> = {
    new: (name) => newType<string, Name>(name.split('/').slice(-1)[0] ?? ''),
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
    });
}
