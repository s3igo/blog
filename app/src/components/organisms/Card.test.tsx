import { fireEvent, render, screen } from '@solidjs/testing-library';
import { embedUpdated } from '~/utils/dateToString';
import { Card, type Props } from './Card';

const mockProps: Props[] = [
    {
        preview: 'preview',
        pubDate: new Date('2021-08-08'),
        slug: 'slug',
        tags: ['tag1'],
        title: 'title',
        updatedAt: null,
    },
    {
        preview: 'preview',
        pubDate: new Date('2021-08-08'),
        slug: 'slug',
        tags: ['tag1', 'tag2'],
        title: 'title',
        updatedAt: null,
    },
    {
        preview: 'preview',
        pubDate: new Date('2021-08-08'),
        slug: 'slug',
        tags: ['tag1'],
        title: 'title',
        updatedAt: new Date('2021-08-09'),
    },
    {
        preview: 'preview',
        pubDate: new Date('2021-08-08'),
        slug: 'slug',
        tags: [],
        title: 'title',
        updatedAt: null,
    },
];

describe('レンダリングできる', () => {
    test('base', () => {
        render(() => <Card {...mockProps[0]!} />);
    });
    test('with 2tags', () => {
        render(() => <Card {...mockProps[1]!} />);
    });
    test('with updatedAt', () => {
        render(() => <Card {...mockProps[2]!} />);
    });
    test('without tags', () => {
        render(() => <Card {...mockProps[3]!} />);
    });
});

describe('正しい値が表示される', () => {
    test('base', () => {
        render(() => <Card {...mockProps[0]!} />);
        expect(screen.getByText('2021-08-08')).toBeInTheDocument();
        expect(screen.getByText('#tag1')).toBeInTheDocument();
        expect(screen.queryByText('#tag2')).not.toBeInTheDocument();
        expect(screen.getByText('preview')).toBeInTheDocument();
    });
    test('with 2tags', () => {
        render(() => <Card {...mockProps[1]!} />);
        expect(screen.getByText('2021-08-08')).toBeInTheDocument();
        expect(screen.getByText('#tag1')).toBeInTheDocument();
        expect(screen.getByText('#tag2')).toBeInTheDocument();
        expect(screen.getByText('preview')).toBeInTheDocument();
    });
    test('with updatedAt', () => {
        render(() => <Card {...mockProps[2]!} />);
        expect(
            screen.getByText(`2021-08-08 ${embedUpdated(new Date('2021-08-09'))}`)
        ).toBeInTheDocument();
        expect(screen.getByText('#tag1')).toBeInTheDocument();
        expect(screen.queryByText('#tag2')).not.toBeInTheDocument();
        expect(screen.getByText('preview')).toBeInTheDocument();
    });
    test('without tags', () => {
        render(() => <Card {...mockProps[3]!} />);
        expect(screen.getByText('2021-08-08')).toBeInTheDocument();
        expect(screen.queryByText('#tag1')).not.toBeInTheDocument();
        expect(screen.queryByText('#tag2')).not.toBeInTheDocument();
        expect(screen.getByText('preview')).toBeInTheDocument();
    });
});

describe('タグにホバーすると、コンポーネントの`data-taghovered`属性がtrueになる', () => {
    test('base', () => {
        render(() => <Card {...mockProps[0]!} />);
        const card = screen.getByRole('article');
        expect(card).toHaveAttribute('data-taghovered', 'false');
        fireEvent.mouseEnter(screen.getByText('#tag1').parentElement?.parentElement!);
        expect(card).toHaveAttribute('data-taghovered', 'true');
        fireEvent.mouseLeave(screen.getByText('#tag1').parentElement?.parentElement!);
        expect(card).toHaveAttribute('data-taghovered', 'false');
    });
    test('with 2tags', () => {
        render(() => <Card {...mockProps[1]!} />);
        const card = screen.getByRole('article');
        expect(card).toHaveAttribute('data-taghovered', 'false');
        fireEvent.mouseEnter(screen.getByText('#tag1').parentElement?.parentElement!);
        expect(card).toHaveAttribute('data-taghovered', 'true');
        fireEvent.mouseLeave(screen.getByText('#tag1').parentElement?.parentElement!);
        expect(card).toHaveAttribute('data-taghovered', 'false');
        fireEvent.mouseEnter(screen.getByText('#tag2').parentElement?.parentElement!);
        expect(card).toHaveAttribute('data-taghovered', 'true');
        fireEvent.mouseLeave(screen.getByText('#tag2').parentElement?.parentElement!);
        expect(card).toHaveAttribute('data-taghovered', 'false');
    });
    test('with updatedAt', () => {
        render(() => <Card {...mockProps[2]!} />);
        const card = screen.getByRole('article');
        expect(card).toHaveAttribute('data-taghovered', 'false');
        fireEvent.mouseEnter(screen.getByText('#tag1').parentElement?.parentElement!);
        expect(card).toHaveAttribute('data-taghovered', 'true');
        fireEvent.mouseLeave(screen.getByText('#tag1').parentElement?.parentElement!);
        expect(card).toHaveAttribute('data-taghovered', 'false');
    });
    test('without tags', () => {
        render(() => <Card {...mockProps[3]!} />);
        const card = screen.getByRole('article');
        expect(card).toHaveAttribute('data-taghovered', 'false');
        fireEvent.mouseEnter(screen.getByText('preview').parentElement?.parentElement!);
        expect(card).toHaveAttribute('data-taghovered', 'false');
        fireEvent.mouseLeave(screen.getByText('preview').parentElement?.parentElement!);
        expect(card).toHaveAttribute('data-taghovered', 'false');
    });
});
