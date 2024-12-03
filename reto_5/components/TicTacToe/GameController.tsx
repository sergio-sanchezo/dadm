import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Vibration,
    Platform,
    Animated,
} from 'react-native';

type Player = 'X' | 'O' | 'none';

interface GameControllerProps {
    currentPlayer: Player;
    winner: string | null;
    gameStarted: boolean;
    resetGame: () => void;
    chooseStartingPlayer: (player: Player) => void;
}

const GameController: React.FC<GameControllerProps> = ({
    currentPlayer,
    winner,
    gameStarted,
    resetGame,
    chooseStartingPlayer,
}) => {
    // Animation state for button presses
    const [playerButtonScale] = useState(new Animated.Value(1));
    const [computerButtonScale] = useState(new Animated.Value(1));

    // Animate button press effect
    const animateButtonPress = (buttonScale: Animated.Value) => {
        Animated.sequence([
            Animated.timing(buttonScale, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(buttonScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handlePlayerChoice = (player: Player) => {
        chooseStartingPlayer(player);

        // Animate the pressed button
        const buttonScale =
            player === 'X' ? playerButtonScale : computerButtonScale;
        animateButtonPress(buttonScale);

        // Vibration feedback
        if (Platform.OS === 'android') {
            Vibration.vibrate(50);
        }
    };

    const handleReset = () => {
        resetGame();
        if (Platform.OS === 'android') {
            Vibration.vibrate(100);
        }
    };

    // Determine winner text and color
    const getWinnerTextStyle = () => {
        if (winner === 'draw') return styles.drawText;
        return winner === 'X' ? styles.playerWinText : styles.computerWinText;
    };

    return (
        <View style={styles.container}>
            {!gameStarted && !winner && (
                <View style={styles.startContainer}>
                    <Text style={styles.title}>Triqui UN</Text>
                    <Text style={styles.subtitle}>
                        Elige quién empieza el juego
                    </Text>
                    <View style={styles.buttonGroup}>
                        <Animated.View
                            style={{
                                transform: [{ scale: playerButtonScale }],
                            }}
                        >
                            <TouchableOpacity
                                style={[styles.button, styles.playerButton]}
                                onPress={() => handlePlayerChoice('X')}
                                accessibilityLabel="El jugador empieza el juego"
                            >
                                <Text style={styles.buttonText}>
                                    Jugador (X)
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                        <Animated.View
                            style={{
                                transform: [{ scale: computerButtonScale }],
                            }}
                        >
                            <TouchableOpacity
                                style={[styles.button, styles.computerButton]}
                                onPress={() => handlePlayerChoice('O')}
                                accessibilityLabel="La máquina empieza el juego"
                            >
                                <Text style={styles.buttonText}>
                                    Máquina (O)
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </View>
            )}

            {gameStarted && !winner && (
                <View style={styles.gameInfo}>
                    <View style={styles.turnContainer}>
                        <Text style={styles.turnText}>Turno:</Text>
                        <Text
                            style={[styles.turnText, styles.currentPlayerText]}
                        >
                            {currentPlayer === 'X'
                                ? 'Jugador (X)'
                                : 'Máquina (O)'}
                        </Text>
                    </View>
                </View>
            )}

            {winner && (
                <View style={styles.gameInfo}>
                    <Text style={[styles.winnerText, getWinnerTextStyle()]}>
                        {winner === 'draw'
                            ? '¡Empate!'
                            : winner === 'X'
                              ? '¡Ganaste!'
                              : '¡Perdiste!'}
                    </Text>
                    <TouchableOpacity
                        style={[styles.button, styles.playAgainButton]}
                        onPress={handleReset}
                    >
                        <Text style={styles.buttonText}>Jugar de Nuevo</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 16,
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    startContainer: {
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: '500',
        color: '#34495e',
        textAlign: 'center',
    },
    buttonGroup: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    button: {
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 16,
        marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 160,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    playerButton: {
        backgroundColor: '#4CAF50',
    },
    computerButton: {
        backgroundColor: '#2196F3',
    },
    resetButton: {
        backgroundColor: '#DC3545',
    },
    playAgainButton: {
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    gameInfo: {
        alignItems: 'center',
        gap: 16,
        width: '100%',
    },
    turnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    turnText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#34495e',
    },
    currentPlayerText: {
        color: '#2980b9',
        fontWeight: 'bold',
    },
    winnerText: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    playerWinText: {
        color: '#4CAF50',
    },
    computerWinText: {
        color: '#2196F3',
    },
    drawText: {
        color: '#95a5a6',
    },
});

export default GameController;
