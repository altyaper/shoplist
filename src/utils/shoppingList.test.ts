import { describe, expect, it } from 'vitest';
import { formatShoppingList } from './shoppingList';

describe('formatShoppingList', () => {
  it('formats only pending items for manual LifeBot submission', () => {
    const result = formatShoppingList([
      { text: 'organic eggs', done: false },
      { text: 'milk', done: true },
      { text: 'gluten-free cookies', done: false },
    ]);

    expect(result).toBe(
      'Whole Foods shopping list:\n\n1. organic eggs\n2. gluten-free cookies',
    );
  });

  it('returns an empty string when no items are pending', () => {
    expect(formatShoppingList([{ text: 'milk', done: true }])).toBe('');
  });
});
