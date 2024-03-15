import type { Literal, Node } from 'unist';
import { visit } from 'unist-util-visit';

export const remarkStripLineBreaks = () => (tree: Node) => {
    visit(tree, 'text', (node: Literal) => {
        if (typeof node.value === 'string') {
            node.value = node.value.replace(/\r?\n|\r/g, ''); // matches \r\n, \n, \r
        }
    });
};
