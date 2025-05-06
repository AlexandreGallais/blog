import type { HeaderModel } from '@alexandregallais/markdown-reader';
import { getElementHeaderLevel } from '@alexandregallais/utils';

export class Header implements HeaderModel {
  public readonly content;
  public readonly element;
  public readonly headerLevel;

  /**
   * Creates a new Header instance from a Markdown header line.
   *
   * @param line - The Markdown header line to parse (e.g., "# Header Text").
   * @throws {Error} When the header format is invalid or doesn't match the expected pattern.
   * @throws {Error} When failed to create the HTML heading element.
   * @throws {Error} When the header content is empty.
   *
   * @example
   * ```TypeScript
   * const header = new Header("# Main Title"); // Creates a h1 element
   * const subHeader = new Header("### Section"); // Creates a h3 element
   * ```
   */
  public constructor(line: string) {
    const match = /^(?<headerLevel>#{1,6})\s(?<headerContent>\S+)/u.exec(line);

    if (match?.groups === undefined) {
      throw new Error(
        'Invalid header format. Expected format: "# Header Text" with 1 to 6 hash symbols.',
        { cause: line },
      );
    }

    const { headerLevel, headerContent } = match.groups;

    const element = document.createElement(`h${headerLevel?.length}`);

    if (!(element instanceof HTMLHeadingElement)) {
      throw new Error(
        `Failed to create heading element of level ${headerLevel?.length}.`,
        { cause: line },
      );
    }

    const validateContent = headerContent?.trim();

    if (validateContent === undefined || validateContent === '') {
      throw new Error('Header content cannot be empty.', {
        cause: line,
      });
    }

    element.textContent = validateContent;

    this.element = element;
    this.content = validateContent;
    this.headerLevel = getElementHeaderLevel(element);
  }
}
