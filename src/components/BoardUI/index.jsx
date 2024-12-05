/* eslint-disable react/prop-types */
import BlockUI from '../BlockUI';
import './style.scss';

function BoardUI({ board, onBlockClicked, onBlockRightClicked }) {
  return (
    <div className="board">
      {board.grid.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((block, colIdx) => (
            <BlockUI
              key={colIdx}
              board={board}
              block={block}
              onBlockClicked={onBlockClicked}
              onBlockRightClicked={onBlockRightClicked}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default BoardUI;
