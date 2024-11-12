import { useState } from 'react';
import { Alert } from 'react-native';

export const useTicTacToe = () => {
  const [board, setBoard] = useState<string[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState("none");
  const [winner, setWinner] = useState<string | null>(null);
  const [score, setScore] = useState({ human: 0, computer: 0, draws: 0 });
  const [isHumanTurn, setIsHumanTurn] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  const resetGame = () => {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setWinner(null);
    setCurrentPlayer("none");
    setIsHumanTurn(true);
    setGameStarted(false);
  };

  const checkWinner = (newBoard: string[][]) => {
    const lines = [
      [newBoard[0][0], newBoard[0][1], newBoard[0][2]],
      [newBoard[1][0], newBoard[1][1], newBoard[1][2]],
      [newBoard[2][0], newBoard[2][1], newBoard[2][2]],
      [newBoard[0][0], newBoard[1][0], newBoard[2][0]],
      [newBoard[0][1], newBoard[1][1], newBoard[2][1]],
      [newBoard[0][2], newBoard[1][2], newBoard[2][2]],
      [newBoard[0][0], newBoard[1][1], newBoard[2][2]],
      [newBoard[0][2], newBoard[1][1], newBoard[2][0]],
    ];
    for (let line of lines) {
      if (line[0] !== '' && line[0] === line[1] && line[1] === line[2]) {
        return line[0];
      }
    }
    if (newBoard.every(row => row.every(cell => cell !== ''))) {
      return 'draw';
    }
    return null;
  };

  const makeMove = (row: number, col: number) => {
    if (board[row][col] || winner || !isHumanTurn || !gameStarted) return;
    const newBoard = board.map((r, i) => (i === row ? r.map((c, j) => (j === col ? currentPlayer : c)) : r));
    setBoard(newBoard);
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      handleWinner(newWinner);
    } else {
      toggleTurn();
      if (currentPlayer === 'X') {
        makeComputerMove(newBoard);
      }
    }
  };

  const handleWinner = (newWinner: string) => {
    setWinner(newWinner);
    setGameStarted(false);

    let winnerName = newWinner === 'X' ? 'Jugador' : 'Maquina';

    Alert.alert(
      newWinner === 'draw' ? '¡Es un empate!' : `¡${winnerName} gana!`,
      'Presiona reiniciar para jugar de nuevo.',
      [{ text: 'OK' }]
    );
    
    if (newWinner === 'draw') {
      setScore(prev => ({ ...prev, draws: prev.draws + 1 }));
    } else if (newWinner === 'X') {
      setScore(prev => ({ ...prev, human: prev.human + 1 }));
    } else {
      setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
    }
  };

  const toggleTurn = () => {
    setCurrentPlayer(prev => (prev === 'X' ? 'O' : 'X'));
    setIsHumanTurn(prev => !prev);
  };

  const makeComputerMove = (newBoard: string[][]) => {
    // Random AI
    // Basic AI move logic
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!newBoard[i][j]) {
                const updatedBoard = newBoard.map((r, rowIndex) =>
                rowIndex === i ? r.map((cell, colIndex) => (colIndex === j ? 'O' : cell)) : r
                );
                setBoard(updatedBoard);
                const newWinner = checkWinner(updatedBoard);
                if (newWinner) {
                handleWinner(newWinner);
                } else {
                toggleTurn();
                }
            return;
            }
        }
    }    
  };


  const chooseStartingPlayer = (player: string) => {
    resetGame();
    setCurrentPlayer(player);
    setIsHumanTurn(player === 'X');
    setGameStarted(true);
    if (player === 'O') {
      makeComputerMove([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ]);
    }
  };

  return { board, makeMove, resetGame, currentPlayer, winner, score, chooseStartingPlayer };
};
