import type { HeaderModel } from '@alexandregallais/markdown-reader';

export class Header implements HeaderModel {
  public content: string;
  public element: HTMLHeadingElement;

  /**
   * @param line - The Markdown header line to parse (e.g., "# Header Text").
   * @throws {Error} When the header format is invalid or doesn't match the expected pattern.
   * @throws {Error} When failed to create the HTML heading element.
   *
   * @example
   * ```TypeScript
   * const header = new Header("# Main Title"); // Creates an h1 element
   * const subHeader = new Header("### Section"); // Creates an h3 element
   * ```
   */
  public constructor(line: string) {
    const match = /^(?<headerLevel>#{1,6})\s+(?<headerContent>.*)/u.exec(line);

    if (match?.groups === undefined) {
      throw new Error(
        'Invalid header format. Expected format: "# Header Text" with 1-6 hash symbols.',
        { cause: line },
      );
    }

    const { headerLevel, headerContent } = match.groups;
    const element = document.createElement(`h${headerLevel?.length}`);

    if (!(element instanceof HTMLHeadingElement)) {
      throw new Error(
        `Failed to create heading element of level ${headerLevel?.length}`,
        { cause: element },
      );
    }

    const validateContent = headerContent?.trim();

    if (validateContent === undefined || validateContent.length === 0) {
      throw new Error('Header content cannot be empty.', {
        cause: validateContent,
      });
    }

    this.element = element;
    this.content = validateContent;
  }
}
