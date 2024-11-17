import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Vibration,
    Platform,
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
    const handlePlayerChoice = (player: Player) => {
        chooseStartingPlayer(player);
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

    return (
        <View style={styles.container}>
            {!gameStarted && !winner && (
                <>
                    <Text style={styles.title}>Triqui UN</Text>
                    <Text style={styles.text}>
                        Elige quién empieza el juego:
                    </Text>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={[styles.button, styles.playerButton]}
                            onPress={() => handlePlayerChoice('X')}
                            accessibilityLabel="El jugador empieza el juego"
                        >
                            <Text style={styles.buttonText}>Jugador (X)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.computerButton]}
                            onPress={() => handlePlayerChoice('O')}
                            accessibilityLabel="La máquina empieza el juego"
                        >
                            <Text style={styles.buttonText}>Máquina (O)</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

            {gameStarted && !winner && (
                <View style={styles.gameInfo}>
                    <Text style={styles.turnText}>
                        Turno:{' '}
                        {currentPlayer === 'X' ? 'Jugador (X)' : 'Máquina (O)'}
                    </Text>
                    <TouchableOpacity
                        style={[styles.button, styles.resetButton]}
                        onPress={handleReset}
                    >
                        <Text style={styles.buttonText}>Reiniciar Juego</Text>
                    </TouchableOpacity>
                </View>
            )}

            {winner && (
                <View style={styles.gameInfo}>
                    <Text style={styles.winnerText}>
                        {winner === 'draw'
                            ? '¡Empate!'
                            : `¡${winner === 'X' ? 'Jugador' : 'Máquina'} Gana!`}
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
        backgroundColor: '#fff',
        borderRadius: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    text: {
        fontSize: 18,
        marginBottom: 16,
        fontWeight: '500',
        color: '#666',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginVertical: 6,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 150,
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
        fontSize: 16,
        fontWeight: 'bold',
    },
    gameInfo: {
        alignItems: 'center',
        gap: 12,
    },
    turnText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    winnerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 16,
    },
});

export default GameController;
