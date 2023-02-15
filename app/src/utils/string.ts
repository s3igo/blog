const grapheme = (str: string): Intl.SegmentData[] => {
    const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' });
    return [...segmenter.segment(str)];
};

export const truncate = (str: string, size: number, suffix = '...'): string => {
    const chars = grapheme(str).map(({ segment }) => segment);
    return chars.slice(0, size).join('') + (chars.length > size ? suffix : '');
};
