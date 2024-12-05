// import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Board from '../src/lib/board';
import Block from '../src/lib/block';

describe('Board', () => {
  test('Can be created', () => {
    const board = new Board(5);
    expect(board).instanceOf(Board);
    expect(board.size).toBe(5);
    expect(board.grid.length).toBe(5);
  });

  test('Can access blocks', () => {
    const board = new Board(5);
    expect(board.blockAt(1, 1)).instanceOf(Block);
  });

  test('Has mines', () => {
    const board = new Board(5, 50);
    expect(
      board.grid.flat().filter((block) => block.isMine).length
    ).toBeGreaterThan(0);
  });

  test('Can determine where a block is', () => {
    const grid = [
      [new Block(), new Block()],
      [new Block(), new Block(true)],
    ];
    const board = new Board(0, 0, grid);
    expect(board.blockAt(0, 0)).toBeInstanceOf(Block);
    expect(board.blockAt(1, 1)).toBeInstanceOf(Block);
    expect(() => {
      board.blockAt(-1, -1);
    }).toThrow();
    expect(() => {
      board.blockAt(2, 2);
    }).toThrow();
  });

    test('Can determine coordinates of a block', () => {
      const grid = [
        [new Block(), new Block()],
        [new Block(), new Block(true)],
      ];
      const board = new Board(0, 0, grid);
      const block = board.blockAt(1, 1);
      const result = board.blockCoords(block);
      expect(result.rowIdx).toBe(1);
      expect(result.colIdx).toBe(1);
    });

  test('Can determine where a mine is', () => {
    const grid = [
      [new Block(), new Block()],
      [new Block(), new Block(true)],
    ];
    const board = new Board(0, 0, grid);
    expect(board.isMineAt(0, 0)).toEqual(false);
    expect(board.isMineAt(0, 1)).toEqual(false);
    expect(board.isMineAt(1, 0)).toEqual(false);
    expect(board.isMineAt(1, 1)).toEqual(true);
  });

  test('Can determine neighboring mine count', () => {
    const grid = [
      [new Block(), new Block(true), new Block()],
      [new Block(), new Block(), new Block(true)],
      [new Block(), new Block(), new Block()],
    ];
    const board = new Board(0, 0, grid);
    expect(board.minesNextTo(0, 0)).toBe(1);
    expect(board.minesNextTo(2, 0)).toBe(0);
    expect(board.minesNextTo(0, 2)).toBe(2);
  });
});
