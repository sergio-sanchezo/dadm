import { useState } from 'react';
import { Alert } from 'react-native';
import { Audio } from 'expo-av';

type Board = string[][];
type Player = 'X' | 'O' | 'none';
type GameState = {
    board: Board;
    score: number;
};
type Difficulty = 'easy' | 'medium' | 'hard';

export const useTicTacToe = () => {
    const [board, setBoard] = useState<Board>([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]);
    const [currentPlayer, setCurrentPlayer] = useState<Player>('none');
    const [winner, setWinner] = useState<string | null>(null);
    const [score, setScore] = useState({ human: 0, computer: 0, draws: 0 });
    const [isHumanTurn, setIsHumanTurn] = useState(true);
    const [gameStarted, setGameStarted] = useState(false);
    const [difficulty, setDifficulty] = useState<Difficulty>('easy');

    const audioMapping: Record<string, any> = {
        player: require('../assets/sounds/player-move.mp3'),
        computer: require('../assets/sounds/computer-move.mp3'),
    };

    const playAudio = async (soundKey: string) => {
        const soundFile = audioMapping[soundKey];
        if (!soundFile) {
            console.error(`Sound file for key "${soundKey}" not found.`);
            return;
        }

        const { sound } = await Audio.Sound.createAsync(soundFile);
        await sound.playAsync();
        return sound;
    };

    // Optimized winner check using pre-computed win patterns
    const WIN_PATTERNS = [
        [
            [0, 0],
            [0, 1],
            [0, 2],
        ], // Top row
        [
            [1, 0],
            [1, 1],
            [1, 2],
        ], // Middle row
        [
            [2, 0],
            [2, 1],
            [2, 2],
        ], // Bottom row
        [
            [0, 0],
            [1, 0],
            [2, 0],
        ], // Left column
        [
            [0, 1],
            [1, 1],
            [2, 1],
        ], // Middle column
        [
            [0, 2],
            [1, 2],
            [2, 2],
        ], // Right column
        [
            [0, 0],
            [1, 1],
            [2, 2],
        ], // Diagonal
        [
            [0, 2],
            [1, 1],
            [2, 0],
        ], // Anti-diagonal
    ];

    const checkWinner = (gameBoard: Board): string | null => {
        for (const pattern of WIN_PATTERNS) {
            const [a, b, c] = pattern;
            const value = gameBoard[a[0]][a[1]];
            if (
                value &&
                value === gameBoard[b[0]][b[1]] &&
                value === gameBoard[c[0]][c[1]]
            ) {
                return value;
            }
        }

        return gameBoard.every((row) => row.every((cell) => cell !== ''))
            ? 'draw'
            : null;
    };

    const getEmptyCells = (gameBoard: Board): [number, number][] => {
        const cells: [number, number][] = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!gameBoard[i][j]) cells.push([i, j]);
            }
        }
        return cells;
    };

    // Minimax algorithm implementation
    const minimax = (
        gameBoard: Board,
        depth: number,
        isMaximizing: boolean,
        alpha: number = -Infinity,
        beta: number = Infinity
    ): GameState => {
        const result = checkWinner(gameBoard);

        if (result === 'O') return { board: gameBoard, score: 10 - depth };
        if (result === 'X') return { board: gameBoard, score: depth - 10 };
        if (result === 'draw') return { board: gameBoard, score: 0 };

        const emptyCells = getEmptyCells(gameBoard);

        if (isMaximizing) {
            let bestScore = -Infinity;
            let bestBoard = gameBoard;

            for (const [i, j] of emptyCells) {
                const newBoard = gameBoard.map((row) => [...row]);
                newBoard[i][j] = 'O';
                const { score } = minimax(
                    newBoard,
                    depth + 1,
                    false,
                    alpha,
                    beta
                );

                if (score > bestScore) {
                    bestScore = score;
                    bestBoard = newBoard;
                }
                alpha = Math.max(alpha, bestScore);
                if (beta <= alpha) break;
            }

            return { board: bestBoard, score: bestScore };
        } else {
            let bestScore = Infinity;
            let bestBoard = gameBoard;

            for (const [i, j] of emptyCells) {
                const newBoard = gameBoard.map((row) => [...row]);
                newBoard[i][j] = 'X';
                const { score } = minimax(
                    newBoard,
                    depth + 1,
                    true,
                    alpha,
                    beta
                );

                if (score < bestScore) {
                    bestScore = score;
                    bestBoard = newBoard;
                }
                beta = Math.min(beta, bestScore);
                if (beta <= alpha) break;
            }

            return { board: bestBoard, score: bestScore };
        }
    };

    const makeMove = (row: number, col: number) => {
        if (board[row][col] || winner || !isHumanTurn || !gameStarted) return;

        const newBoard = board.map((r, i) =>
            i === row ? r.map((c, j) => (j === col ? currentPlayer : c)) : r
        );
        setBoard(newBoard);

        playAudio('player');

        const newWinner = checkWinner(newBoard);
        if (newWinner) {
            handleWinner(newWinner);
        } else {
            toggleTurn();
            if (currentPlayer === 'X') {
                setTimeout(() => makeComputerMove(newBoard), 700);
            }
        }
    };

    const makeComputerMove = (currentBoard: Board) => {
        let nextBoard: Board;

        if (difficulty === 'easy') {
            // Movimiento aleatorio
            const emptyCells = getEmptyCells(currentBoard);
            const randomCell =
                emptyCells[Math.floor(Math.random() * emptyCells.length)];
            nextBoard = currentBoard.map((row) => [...row]);
            nextBoard[randomCell[0]][randomCell[1]] = 'O';
        } else if (difficulty === 'medium') {
            // Mezcla de estrategia básica y aleatoria
            if (Math.random() < 0.4) {
                const emptyCells = getEmptyCells(currentBoard);
                const randomCell =
                    emptyCells[Math.floor(Math.random() * emptyCells.length)];
                nextBoard = currentBoard.map((row) => [...row]);
                nextBoard[randomCell[0]][randomCell[1]] = 'O';
            } else {
                // MiniMax con profundidad 0
                const { board: minimaxBoard } = minimax(currentBoard, 0, true);
                nextBoard = minimaxBoard;
            }
        } else {
            // Dificultad "hard" usa minimax completo
            const { board: minimaxBoard } = minimax(currentBoard, 0, true);
            nextBoard = minimaxBoard;
        }

        setBoard(nextBoard);

        playAudio('computer');

        const newWinner = checkWinner(nextBoard);
        if (newWinner) {
            handleWinner(newWinner);
        } else {
            toggleTurn();
        }
    };

    const handleWinner = (newWinner: string) => {
        setWinner(newWinner);
        setGameStarted(false);

        const winnerName = newWinner === 'X' ? 'Jugador' : 'Maquina';

        Alert.alert(
            newWinner === 'draw' ? '¡Es un empate!' : `¡${winnerName} gana!`,
            'Presiona jugar de nuevo para reiniciar.',
            [{ text: 'OK' }]
        );

        setScore((prev) => ({
            ...prev,
            ...(newWinner === 'draw'
                ? { draws: prev.draws + 1 }
                : newWinner === 'X'
                  ? { human: prev.human + 1 }
                  : { computer: prev.computer + 1 }),
        }));
    };

    const toggleTurn = () => {
        setCurrentPlayer((prev) => (prev === 'X' ? 'O' : 'X'));
        setIsHumanTurn((prev) => !prev);
    };

    const resetGame = () => {
        setBoard([
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ]);
        setWinner(null);
        setCurrentPlayer('none');
        setIsHumanTurn(true);
        setGameStarted(false);
    };

    const chooseStartingPlayer = (player: Player) => {
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

    return {
        board,
        makeMove,
        resetGame,
        currentPlayer,
        winner,
        score,
        chooseStartingPlayer,
        gameStarted,
        setDifficulty,
    };
};