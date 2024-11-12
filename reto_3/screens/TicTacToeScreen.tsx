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
  } = useTicTacToe();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <GameController chooseStartingPlayer={chooseStartingPlayer} currentPlayer={currentPlayer} resetGame={resetGame} />
          <Board board={board} makeMove={makeMove} winner={winner} />
          <ScoreTracker score={score} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
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
  },
});

export default TicTacToeScreen;
