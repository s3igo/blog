// import type { Props as CardProps } from '~/components/organisms/Card';

// export const globPosts = (): Post[] => {
//     const postImportResult = import.meta.glob('../data/posts/*.md', { eager: true });
//     const posts = Object.values(postImportResult) as Post[];
//     return posts.filter(({ frontmatter }) => !frontmatter.tags.includes('draft'));
// };

// if (import.meta.vitest) {
//     const { describe, expect, test } = import.meta.vitest;
//     describe('投稿の一覧を取得する', () => {
//         test('投稿が3つ以上存在する', () => {
//             const posts = globPosts();
//             expect(posts.length).toBeGreaterThanOrEqual(3);
//         });
//         test('投稿の中にdraftが含まれていない', () => {
//             const posts = globPosts();
//             posts.forEach(({ frontmatter }) => {
//                 expect(frontmatter.tags).not.toContain('draft');
//             });
//         });
//     });
// }

// export const postsToCards = (posts: ReturnType<typeof globPosts>): CardProps[] =>
//     R.pipe(
//         posts,
//         R.map(({ frontmatter }) => R.omit(frontmatter, ['layout'])),
//         R.sortBy(({ pubDate }) => pubDate),
//         R.reverse()
//     );

// if (import.meta.vitest) {
//     const { describe, expect, test } = import.meta.vitest;
//     describe('投稿の一覧をCardの配列に変換する', () => {
//         const post1 = {
//             file: '',
//             frontmatter: {
//                 layout: '~/layouts/Blog.astro',
//                 preview: 'preview1',
//                 pubDate: new Date('2021-01-01'),
//                 slug: 'slug1',
//                 tags: ['tag1'],
//                 title: 'title1',
//                 updatedAt: new Date('2021-01-01'),
//             },
//             url: '',
//         } as Post;
//         const post2 = {
//             file: '',
//             frontmatter: {
//                 layout: '~/layouts/Blog.astro',
//                 preview: 'preview2',
//                 pubDate: new Date('2021-01-02'),
//                 slug: 'slug2',
//                 tags: ['tag1', 'tag2'],
//                 title: 'title2',
//                 updatedAt: new Date('2021-01-02'),
//             },
//             url: '',
//         } as Post;
//         const post3 = {
//             file: '',
//             frontmatter: {
//                 layout: '~/layouts/Blog.astro',
//                 preview: 'preview3',
//                 pubDate: new Date('2021-01-03'),
//                 slug: 'slug3',
//                 tags: ['tag3', 'tag4', 'tag5'],
//                 title: 'title3',
//                 updatedAt: new Date('2021-01-03'),
//             },
//             url: '',
//         } as Post;
//         const card1: CardProps = {
//             preview: 'preview1',
//             pubDate: new Date('2021-01-01'),
//             slug: 'slug1',
//             tags: ['tag1'],
//             title: 'title1',
//             updatedAt: new Date('2021-01-01'),
//         };
//         const card2: CardProps = {
//             preview: 'preview2',
//             pubDate: new Date('2021-01-02'),
//             slug: 'slug2',
//             tags: ['tag1', 'tag2'],
//             title: 'title2',
//             updatedAt: new Date('2021-01-02'),
//         };
//         const card3: CardProps = {
//             preview: 'preview3',
//             pubDate: new Date('2021-01-03'),
//             slug: 'slug3',
//             tags: ['tag3', 'tag4', 'tag5'],
//             title: 'title3',
//             updatedAt: new Date('2021-01-03'),
//         };
//         const expected = [card3, card2, card1];

//         test('Cardの配列に変換できる', () => {
//             const cards = postsToCards([post3, post2, post1]);
//             expect(cards).toEqual(expected);
//         });
//         test('pubDateで降順に並び替えられる', () => {
//             const cards = postsToCards([post1, post2, post3]);
//             expect(cards).toEqual(expected);
//             const cards2 = postsToCards([post1, post3, post2]);
//             expect(cards2).toEqual(expected);
//         });
//     });
// }
