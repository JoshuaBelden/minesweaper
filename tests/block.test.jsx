// import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Block from '../src/lib/block';

describe('Block', () => {
  test('Can be instantiated', () => {
    const block = new Block();
    expect(block).instanceOf(Block);
    expect(block.isMine).toBe(false);
    expect(block.neighboringMineCount).toBe(0);
    expect(block.revealed).toBe(false);
    expect(block.flagged).toBe(false);
  });

  test('Can be a mine', () => {
    const block = new Block(true);
    expect(block.isMine).toBe(true);
  })

  test('Can be flagged', () => {
    const block = new Block();
    block.flag(true);
    expect(block.flagged).toBe(true);

    block.flag(false);
    expect(block.flagged).toBe(false);
  });

  test('Can be revealed', () => {
    const block = new Block();
    block.reveal();
    expect(block.revealed).toBe(true);
  });
});
