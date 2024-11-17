import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Board from '@/components/TicTacToe/Board';
import GameController from '@/components/TicTacToe/GameController';
import ScoreTracker from '@/components/TicTacToe/ScoreTracker';
import { useTicTacToe } from '@/hooks/useTicTacToe';
import { SafeAreaView } from 'react-native-safe-area-context';

const TicTacToeScreen = () => {
    const {
        board,
        makeMove,
        resetGame,
        currentPlayer,
        winner,
        score,
        chooseStartingPlayer,
        gameStarted,
    } = useTicTacToe();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                bounces={false}
            >
                <View style={styles.container}>
                    <GameController
                        chooseStartingPlayer={chooseStartingPlayer}
                        currentPlayer={currentPlayer}
                        winner={winner}
                        gameStarted={gameStarted}
                        resetGame={resetGame}
                    />
                    {(gameStarted || winner) && (
                        <>
                            <Board 
                                board={board} 
                                makeMove={makeMove} 
                                winner={winner} 
                            />
                            <ScoreTracker score={score} />
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        width: '100%',
        maxWidth: 500,
    },
});

export default TicTacToeScreen;