import type { Node } from 'unist';
import { visit } from 'unist-util-visit';

type Text = Node & { value: string };

export const stripLineBreaks = () => (tree: Node) => {
    visit(tree, 'text', (node: Text) => {
        node.value = node.value.replace(/\r?\n|\r/g, ''); // matches \r\n, \n, \r
    });
};

type Link = Node & { url: string };

declare module 'unist' {
    interface Data {
        hProperties?: Record<string, unknown>;
    }
}

export const externalLinks = (site: string) => () => (tree: Node) => {
    visit(tree, 'link', (node: Link) => {
        if (!node.url.startsWith(site)) {
            node.data ??= {};
            node.data.hProperties ??= {};
            node.data.hProperties.target = '_blank';
            node.data.hProperties.rel = 'noreferrer';
        }
    });
};
