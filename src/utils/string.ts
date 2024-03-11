// ref: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/Segmenter
type Granularity = 'grapheme' | 'word' | 'sentence';
const segments = (
    str: string,
    granularity: Granularity,
): Intl.SegmentData[] => {
    const segmenter = new Intl.Segmenter('ja', { granularity });
    return [...segmenter.segment(str)];
};

export const truncate = (str: string, size: number, suffix = '...'): string => {
    const chars = segments(str, 'grapheme').map(({ segment }) => segment);
    return chars.slice(0, size).join('') + (chars.length > size ? suffix : '');
};

export const first3Sentences = (str: string): string => {
    const sentences = segments(str, 'sentence').map(({ segment }) => segment);
    return sentences.slice(0, 3).join('');
};

if (import.meta.vitest) {
    const { describe, expect, test } = import.meta.vitest;
    describe('truncate', () => {
        const asset = 'あいうえおかきくけこさしすせそたちつてとなにぬねの';
        describe('文字数が正しい', () => {
            test('5文字', () => {
                expect(truncate(asset, 5)).toBe('あいうえお...');
            });
            test('10文字', () => {
                expect(truncate(asset, 10)).toBe('あいうえおかきくけこ...');
            });
            test('20文字', () => {
                expect(truncate(asset, 20)).toBe(
                    'あいうえおかきくけこさしすせそたちつてと...',
                );
            });
        });
        describe('suffixが正しい', () => {
            test('suffixなし', () => {
                expect(truncate(asset, 5, '')).toBe('あいうえお');
            });
            test('suffixあり', () => {
                expect(truncate(asset, 5, '...')).toBe('あいうえお...');
            });
            test('suffixに`~`を指定', () => {
                expect(truncate(asset, 5, '~')).toBe('あいうえお~');
            });
        });
    });
    describe('first3Sentences', () => {
        test('50音表', () => {
            const str =
                'あいうえお。かきくけこ。さしすせそ。たちつてと。なにぬねの。';
            expect(first3Sentences(str)).toBe(
                'あいうえお。かきくけこ。さしすせそ。',
            );
        });
        test('自動生成', () => {
            const str =
                'ぼく飛びおりて、あいつをとって、また眼をそらに挙げました。ああ、ここはケンタウルの村だよカムパネルラはこおどりしました。と思ったら、もうそこに鳥捕りの形はなくなって、ぽかっとともってまたなくなって、ぽかっとともってまたなくなって、かえって、ああせいせいした。誰も一言も物を言う人もありませんかおかしいねえカムパネルラが首をかしげました。黒曜石でできてるねえジョバンニが左手をつき出して窓から前の方へ行きました。';
            expect(first3Sentences(str)).toBe(
                'ぼく飛びおりて、あいつをとって、また眼をそらに挙げました。ああ、ここはケンタウルの村だよカムパネルラはこおどりしました。と思ったら、もうそこに鳥捕りの形はなくなって、ぽかっとともってまたなくなって、ぽかっとともってまたなくなって、かえって、ああせいせいした。',
            );
        });
        test('ポラーノの広場', () => {
            const str =
                '五月のしまいの日曜でした。わたくしは賑にぎやかな市の教会の鐘の音で眼をさましました。もう日はよほど登って、まわりはみんなきらきらしていました。時計を見るとちょうど六時でした。わたくしはすぐチョッキだけ着て山羊を見に行きました。';
            expect(first3Sentences(str)).toBe(
                '五月のしまいの日曜でした。わたくしは賑にぎやかな市の教会の鐘の音で眼をさましました。もう日はよほど登って、まわりはみんなきらきらしていました。',
            );
        });
    });
}
