import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Alert,
    BackHandler,
    Platform,
    Animated,
} from 'react-native';
import DifficultySelector from './DifficultySelector';
import AboutModal from './AboutModal';

interface MainMenuProps {
    onNewGame: () => void;
    setDifficulty: (level: 'easy' | 'medium' | 'hard') => void;
    gameStarted: boolean;
}

const MainMenu: React.FC<MainMenuProps> = ({
    onNewGame,
    setDifficulty,
    gameStarted,
}) => {
    const [difficultyModalVisible, setDifficultyModalVisible] = useState(false);
    const [aboutModalVisible, setAboutModalVisible] = useState(false);

    // Animation states for button presses
    const [buttonAnimations] = useState({
        newGame: new Animated.Value(1),
        difficulty: new Animated.Value(1),
        about: new Animated.Value(1),
        exit: new Animated.Value(1),
    });

    // Button press animation
    const animateButtonPress = (buttonAnimation: Animated.Value) => {
        Animated.sequence([
            Animated.timing(buttonAnimation, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(buttonAnimation, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleExit = () => {
        Alert.alert('Salir de la App', '¿Estás seguro de que deseas salir?', [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'Salir',
                style: 'destructive',
                onPress: () => {
                    if (Platform.OS === 'android') {
                        BackHandler.exitApp();
                    } else {
                        Alert.alert(
                            'No se puede cerrar',
                            'Esta acción no está permitida en iOS.',
                            [{ text: 'OK' }]
                        );
                    }
                },
            },
        ]);
    };

    // Render animated button with common press handling
    const renderAnimatedButton = (
        title: string,
        onPress: () => void,
        animationValue: Animated.Value,
        style?: any
    ) => (
        <Animated.View
            style={{
                transform: [{ scale: animationValue }],
                width: '100%',
            }}
        >
            <TouchableOpacity
                style={[styles.button, style]}
                onPress={() => {
                    animateButtonPress(animationValue);
                    onPress();
                }}
            >
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <View style={styles.container}>
            {gameStarted &&
                renderAnimatedButton(
                    'Nuevo Juego',
                    onNewGame,
                    buttonAnimations.newGame,
                    styles.newGameButton
                )}

            {renderAnimatedButton(
                'Seleccionar Dificultad',
                () => setDifficultyModalVisible(true),
                buttonAnimations.difficulty,
                styles.difficultyButton
            )}

            {renderAnimatedButton(
                'Acerca de',
                () => setAboutModalVisible(true),
                buttonAnimations.about,
                styles.aboutButton
            )}

            {renderAnimatedButton(
                'Salir',
                handleExit,
                buttonAnimations.exit,
                styles.exitButton
            )}

            {/* Modals */}
            <DifficultySelector
                visible={difficultyModalVisible}
                onClose={() => setDifficultyModalVisible(false)}
                setDifficulty={(level) => {
                    setDifficulty(level);
                }}
            />
            <AboutModal
                visible={aboutModalVisible}
                onClose={() => setAboutModalVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 24,
        paddingVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 16,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    newGameButton: {
        backgroundColor: '#4CAF50',
    },
    difficultyButton: {
        backgroundColor: '#2196F3',
    },
    aboutButton: {
        backgroundColor: '#FFC107',
    },
    exitButton: {
        backgroundColor: '#DC3545',
    },
});

export default MainMenu;
