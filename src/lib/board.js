import Block from './block';

class Board {
  constructor(size, mineOccurrencePercentage, predefinedGrid) {
    this.gameOver = false;
    this.winner = false;
    this.size = predefinedGrid?.length || size;
    this.grid =
      predefinedGrid ||
      Array.from({ length: size }, () =>
        Array.from({ length: size }, () =>
          this.createBlock(mineOccurrencePercentage)
        )
      );
    this.calculateNeighboringMineCount(this.grid);
  }

  createBlock = (mineOccurrencePercentage) => {
    const isMine = Math.random() * 100 < mineOccurrencePercentage;
    return new Block(isMine);
  };

  calculateNeighboringMineCount = (grid) => {
    grid.forEach((row, rowIdx) => {
      row.forEach((block, colIdx) => {
        if (block.isMine) {
          return;
        }

        block.neighboringMineCount = this.minesNextTo(rowIdx, colIdx);
      });
    });
  };

  blockCoords = (block) => {
    return this.grid.reduce((acc, row, rowIdx) => {
      const colIdx = row.indexOf(block);

      if (colIdx > -1) {
        acc = { rowIdx, colIdx };
      }

      return acc;
    }, {});
  };

  coordsOutOfBounds = (rowIdx, colIdx) => {
    return (
      rowIdx < 0 ||
      colIdx < 0 ||
      rowIdx > this.size - 1 ||
      colIdx > this.size - 1
    );
  };

  blockAt = (rowIdx, colIdx) => {
    if (this.coordsOutOfBounds(rowIdx, colIdx)) {
      throw new Error('Block out of bounds');
    }

    return this.grid[rowIdx][colIdx];
  };

  isMineAt = (rowIdx, colIdx) => {
    return this.coordsOutOfBounds(rowIdx, colIdx)
      ? false
      : this.blockAt(rowIdx, colIdx).isMine;
  };

  minesNextTo = (rowIdx, colIdx) => {
    return [
      this.isMineAt(rowIdx - 1, colIdx - 1),
      this.isMineAt(rowIdx - 1, colIdx),
      this.isMineAt(rowIdx - 1, colIdx + 1),
      this.isMineAt(rowIdx, colIdx - 1),
      this.isMineAt(rowIdx, colIdx + 1),
      this.isMineAt(rowIdx + 1, colIdx - 1),
      this.isMineAt(rowIdx + 1, colIdx),
      this.isMineAt(rowIdx + 1, colIdx + 1),
    ].reduce((sum, value) => sum + (value ? 1 : 0));
  };

  revealBlock = (block) => {
    const { rowIdx, colIdx } = this.blockCoords(block);
    if (block.isMine) {
      this.revealAll();
      this.gameOver = true;
    } else {
      this.revealNeighbors(rowIdx, colIdx);
      this.checkEndGame();
    }
  };

  flagBlock = (block) => {
    block.flag(!block.flagged);
    this.checkEndGame();
  };

  revealMines = () => {
    this.grid.forEach((row) =>
      row.forEach((block) => {
        if (block.isMine) {
          block.reveal();
        }
      })
    );
  };

  revealNeighbors = (rowIdx, colIdx) => {
    if (this.coordsOutOfBounds(rowIdx, colIdx)) {
      return;
    }

    const block = this.blockAt(rowIdx, colIdx);
    if (block.revealed || block.isMine) {
      return;
    }

    block.reveal();

    if (block.neighboringMineCount > 0) {
      return;
    }

    this.revealNeighbors(rowIdx - 1, colIdx - 1);
    this.revealNeighbors(rowIdx - 1, colIdx);
    this.revealNeighbors(rowIdx - 1, colIdx + 1);
    this.revealNeighbors(rowIdx, colIdx - 1);
    this.revealNeighbors(rowIdx, colIdx + 1);
    this.revealNeighbors(rowIdx + 1, colIdx - 1);
    this.revealNeighbors(rowIdx + 1, colIdx);
    this.revealNeighbors(rowIdx + 1, colIdx + 1);
  };

  revealAll = () => {
    this.grid.forEach((row) =>
      row.forEach((block) => {
        block.reveal();
      })
    );
  };

  checkEndGame = () => {
    const allMinesFlagged = this.grid.every((row) =>
      row.every((block) => block.revealed || (block.isMine && block.flagged))
    );

    if (allMinesFlagged) {
      this.gameOver = true;
      this.winner = true;
      this.revealAll();
    }
  };

  isGameOver = () => {
    return this.gameOver;
  };

  isWinner = () => {
    return this.winner;
  };
}

export default Board;
