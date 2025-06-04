type MarkdownInlineNode =
  | { type: 'text'; content: string }
  | { type: 'bold-italic'; content: MarkdownInlineNode[] }
  | { type: 'bold'; content: MarkdownInlineNode[] }
  | { type: 'del'; content: MarkdownInlineNode[] }
  | { type: 'italic'; content: MarkdownInlineNode[] }
  | { type: 'link'; href: string; content: MarkdownInlineNode[] }
  | { type: 'image'; src: string; alt: string };

// eslint-disable-next-line max-lines-per-function
export const parseInlineMarkdown = (input: string): MarkdownInlineNode[] => {
  const result: MarkdownInlineNode[] = [];

  const patterns: [RegExp, (match: RegExpMatchArray) => MarkdownInlineNode][] =
    [
      // images
      [
        /!\[(?<alt>[^\]]*)\]\((?<src>[^)]+)\)/u,
        ({ groups }): MarkdownInlineNode => ({
          type: 'image',
          src: groups?.['src'] ?? '',
          alt: groups?.['alt'] ?? '',
        }),
      ],
      [
        /\[(?<content>[^\]]+)\]\((?<href>[^)]+)\)/u,
        ({ groups }): MarkdownInlineNode => ({
          type: 'link',
          href: groups?.['href'] ?? '',
          content: parseInlineMarkdown(groups?.['content'] ?? ''),
        }),
      ],
      [
        /\*\*\*(?<content>[^*]+)\*\*\*/u,
        ({ groups }): MarkdownInlineNode => ({
          type: 'bold-italic',
          content: parseInlineMarkdown(groups?.['content'] ?? ''),
        }),
      ],
      [
        /\*\*(?<content>[^*]+)\*\*/u,
        ({ groups }): MarkdownInlineNode => ({
          type: 'bold',
          content: parseInlineMarkdown(groups?.['content'] ?? ''),
        }),
      ],
      [
        /\*(?<content>[^*]+)\*/u,
        ({ groups }): MarkdownInlineNode => ({
          type: 'italic',
          content: parseInlineMarkdown(groups?.['content'] ?? ''),
        }),
      ],
      [
        /~~(?<content>[^*]+)~~/u,
        ({ groups }): MarkdownInlineNode => ({
          type: 'del',
          content: parseInlineMarkdown(groups?.['content'] ?? ''),
        }),
      ],
    ];

  let remaining = input;
  while (remaining.length > 0) {
    let matched = false;

    for (const [regex, builder] of patterns) {
      const match = regex.exec(remaining);
      if (match?.index !== undefined) {
        if (match.index > 0) {
          // ajouter le texte avant
          result.push({
            type: 'text',
            content: remaining.slice(0, match.index),
          });
        }

        result.push(builder(match));
        remaining = remaining.slice(match.index + match[0].length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      result.push({ type: 'text', content: remaining });
      break;
    }
  }

  return result;
};

export const renderInlineMarkdownToNodes = (
  nodes: MarkdownInlineNode[],
): Node[] => {
  const result: Node[] = [];

  for (const node of nodes) {
    switch (node.type) {
      case 'text': {
        result.push(document.createTextNode(node.content));
        break;
      }

      case 'del': {
        const el = document.createElement('del');
        el.append(...renderInlineMarkdownToNodes(node.content));
        result.push(el);
        break;
      }

      case 'bold': {
        const el = document.createElement('strong');
        el.append(...renderInlineMarkdownToNodes(node.content));
        result.push(el);
        break;
      }

      case 'bold-italic': {
        const el = document.createElement('strong');
        const i = document.createElement('em');
        el.append(...renderInlineMarkdownToNodes(node.content));
        i.append(el);
        result.push(i);
        break;
      }

      case 'italic': {
        const el = document.createElement('em');
        el.append(...renderInlineMarkdownToNodes(node.content));
        result.push(el);
        break;
      }

      case 'link': {
        const el = document.createElement('a');
        el.href = node.href;
        el.append(...renderInlineMarkdownToNodes(node.content));
        result.push(el);
        break;
      }

      case 'image': {
        const el = document.createElement('img');
        el.src = node.src;
        el.alt = node.alt;
        result.push(el);
        break;
      }

      default:
        break;
    }
  }

  return result;
};
