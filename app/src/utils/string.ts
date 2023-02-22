// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/Segmenter
type Granularity = 'grapheme' | 'word' | 'sentence';
const segments = (str: string, granularity: Granularity): Intl.SegmentData[] => {
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
