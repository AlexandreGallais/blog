# Sample Markdown Document

## Introduction

This is a sample markdown document demonstrating various markdown features.

## Text Formatting

**Bold text** and *italic text* are common formatting options.
You can also use ~~strikethrough~~ text.

Multi lines\
text

## Lists

### Unordered List

- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

### Ordered List

1. First item
2. Second item
3. Third item

## Table

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |

## Code Examples

Inline code: `const example = "hello world";`

### HTML Example

```html
<h1>Hello</h1>
```

### CSS Example

```scss
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 20px;
}

h1 {
  color: #333;
  text-align: center;
}

button {
  background-color: #007BFF;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
```

### TypeScript Example

```typescript
type User = { id: number; name: string; email: string; };

function greet(user: User): string {
  return `Hello, ${user.name}! Your email is ${user.email}.`;
}

const sampleUser: User = {id: 1, name: "John Doe", email: "johndoe@example.com"};
console.log(greet(sampleUser));
```

```typescript
type User = { id: number; name: string; email: string; };

function greet(user: User): string {
  return `Hello, ${user.name}! Your email is ${user.email}.`;
}

const sampleUser: User = {id: 1, name: "John Doe", email: "johndoe@example.com"};
console.log(greet(sampleUser));
```
