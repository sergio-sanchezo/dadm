import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Board from '@/components/TicTacToe/Board';
import GameController from '@/components/TicTacToe/GameController';
import ScoreTracker from '@/components/TicTacToe/ScoreTracker';
import { useTicTacToe } from '@/hooks/useTicTacToe';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainMenu from '@/components/TicTacToe/MainMenu';

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
        setDifficulty,
    } = useTicTacToe();

    // Render different content based on game state
    const renderContent = () => {
        // If game hasn't started, show the game controller for player/difficulty selection
        if (!gameStarted && !winner) {
            return (
                <GameController
                    chooseStartingPlayer={chooseStartingPlayer}
                    currentPlayer={currentPlayer}
                    winner={winner}
                    gameStarted={gameStarted}
                    resetGame={resetGame}
                />
            );
        }

        // If game has started or there's a winner, show the game board
        return (
            <View style={styles.gameContainer}>
                <GameController
                    chooseStartingPlayer={chooseStartingPlayer}
                    currentPlayer={currentPlayer}
                    winner={winner}
                    gameStarted={gameStarted}
                    resetGame={resetGame}
                />
                <Board board={board} makeMove={makeMove} winner={winner} />
                <ScoreTracker score={score} />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    {renderContent()}
                    <MainMenu
                        gameStarted={gameStarted}
                        onNewGame={resetGame}
                        setDifficulty={setDifficulty}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f4f8',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f8',
    },
    container: {
        width: '100%',
        maxWidth: 500,
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    gameContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 16,
        padding: 16,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
});

export default TicTacToeScreen;
