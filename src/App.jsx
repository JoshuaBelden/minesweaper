import { useState } from 'react';
import Board from './lib/board';
import BoardUI from './components/BoardUI';

import './App.css';

function App() {
  const [board, setBoard] = useState(new Board(20, 10));

  const onBlockClicked = (block) => {
    board.revealBlock(block);
    setBoard({ ...board });
  };

  const onBlockRightClicked = (block) => {
    board.flagBlock(block);
    setBoard({ ...board });
  };

  return (
    <div className="app">
      <BoardUI
        board={board}
        onBlockClicked={onBlockClicked}
        onBlockRightClicked={onBlockRightClicked}
      />
      <div>{board.isGameOver() ? board.isWinner() ? 'Winner' : 'Loser' : ' '}</div>
    </div>
  );
}

export default App;
