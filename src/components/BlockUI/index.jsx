/* eslint-disable react/prop-types */
import './style.scss';

function BlockUI({ board, block, onBlockClicked, onBlockRightClicked }) {
  const getLabel = () => {
    if (block.revealed) {
      if (block.isMine) {
        return '💣';
      }

      return block.neighboringMineCount > 0 ? block.neighboringMineCount : '';
    }

    if (block.flagged) {
      return '🚩';
    }
  };

  const handleClick = () => {
    if (board.gameOver) {
      return;
    }

    onBlockClicked(block);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    if (board.gameOver) {
      return;
    }
    
    onBlockRightClicked(block);
  };

  return (
    <div className="block">
      <button
        className={`${block.revealed ? 'revealed':''}`}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
      >
        {getLabel()}
      </button>
    </div>
  );
}

export default BlockUI;
