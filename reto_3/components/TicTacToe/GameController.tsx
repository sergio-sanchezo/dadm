import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Vibration,
    Alert,
    AccessibilityInfo,
} from 'react-native';

type Player = 'X' | 'O' | 'none';

interface GameControllerProps {
    currentPlayer: string;
    resetGame: () => void;
    chooseStartingPlayer: (player: Player) => void;
}

const GameController: React.FC<GameControllerProps> = ({
    currentPlayer,
    resetGame,
    chooseStartingPlayer,
}) => {
    const handlePlayerChoice = (player: Player) => {
        resetGame();
        chooseStartingPlayer(player);
        Vibration.vibrate(200);
    };

    return (
        <View style={styles.container}>
            {currentPlayer === 'none' && (
                <Text style={styles.text}>Elige quién empieza el juego:</Text>
            )}
            <TouchableOpacity
                style={[styles.button, styles.resetButton]}
                onPress={() => {
                    resetGame();
                }}
            >
                <Text style={styles.buttonText}>Reiniciar Juego</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button]}
                onPress={() => handlePlayerChoice('X')}
                accessibilityLabel="El jugador empieza el juego"
                accessible
            >
                <Text style={styles.buttonText}>El Jugador Empieza</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button]}
                onPress={() => handlePlayerChoice('O')}
                accessibilityLabel="La máquina empieza el juego"
                accessible
            >
                <Text style={styles.buttonText}>La Máquina Empieza</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    text: {
        fontSize: 18,
        marginBottom: 16,
        fontWeight: '500',
        color: '#555',
    },
    button: {
        backgroundColor: '#0056b3',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginVertical: 6,
        alignItems: 'center',
        width: 220,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resetButton: {
        backgroundColor: '#DC3545',
    },
});

export default GameController;
