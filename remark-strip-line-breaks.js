import { visit } from 'unist-util-visit';

export const remarkStripLineBreaks = () => (tree) => {
    visit(tree, 'text', (node) => {
        node.value = node.value.replace(/\r?\n|\r/g, ''); // matches \r\n, \n, \r
    });
};
