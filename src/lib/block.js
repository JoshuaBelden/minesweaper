class Block {
  constructor(isMine, neighboringMineCount, revealed, flagged) {
    this.isMine = isMine || false;
    this.neighboringMineCount = neighboringMineCount || 0;
    this.revealed = revealed || false;
    this.flagged = flagged || false;
  }

  flag = (value) => this.flagged = value;
  reveal = () => this.revealed = true;
}

export default Block;
