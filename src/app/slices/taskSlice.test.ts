// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from 'vitest';
import taskReducer, { addTasks } from './taskSlice';

describe('taskSlice addTasks', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('adds all imported tasks in one action', () => {
    const importedTasks = [
      {
        idx: 1,
        text: '2 Milk',
        done: false,
        deleteOnComplete: true,
        createdAt: '2026-08-08T20:00:00.000Z',
      },
      {
        idx: 2,
        text: 'Bananas',
        done: false,
        deleteOnComplete: true,
        createdAt: '2026-08-08T20:00:00.000Z',
      },
    ];

    const state = taskReducer({ tasksList: [] }, addTasks(importedTasks));

    expect(state.tasksList).toEqual(importedTasks);
    expect(JSON.parse(window.localStorage.getItem('todo') ?? '{}').tasks).toEqual(importedTasks);
  });
});
