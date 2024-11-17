import React from 'react';
import { View, StyleSheet } from 'react-native';
import Cell from './Cell';

interface BoardProps {
    board: string[][];
    makeMove: (row: number, col: number) => void;
    winner: string | null;
}

const Board: React.FC<BoardProps> = ({ board, makeMove, winner }) => {
    return (
        <View style={styles.board}>
            {board.map((row, rowIndex) => (
                <View key={`row-${rowIndex}`} style={styles.row}>
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            value={cell}
                            onPress={() =>
                                !winner && makeMove(rowIndex, colIndex)
                            }
                        />
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    board: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 16,
    },
    row: {
        flexDirection: 'row',
    },
});

export default Board;
