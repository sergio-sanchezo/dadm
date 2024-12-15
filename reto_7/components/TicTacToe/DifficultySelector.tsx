import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from 'react-native';

interface DifficultySelectorProps {
    visible: boolean;
    onClose: () => void;
    setDifficulty: (level: 'easy' | 'medium' | 'hard') => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
    visible,
    onClose,
    setDifficulty,
}) => {
    const difficulties = [
        {
            label: 'Fácil',
            value: 'easy',
            color: '#4CAF50',
            description: 'Perfecto para principiantes',
        },
        {
            label: 'Medio',
            value: 'medium',
            color: '#2196F3',
            description: 'Un desafío moderado',
        },
        {
            label: 'Experto',
            value: 'hard',
            color: '#FF5722',
            description: 'Extremadamente difícil',
        },
    ];

    const handleSelectDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
        setDifficulty(difficulty);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            statusBarTranslucent
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Seleccionar Dificultad</Text>
                    {difficulties.map((diff) => (
                        <TouchableOpacity
                            key={diff.value}
                            style={[
                                styles.button,
                                { backgroundColor: diff.color },
                            ]}
                            onPress={() =>
                                handleSelectDifficulty(
                                    diff.value as 'easy' | 'medium' | 'hard'
                                )
                            }
                        >
                            <Text style={styles.buttonText}>{diff.label}</Text>
                            <Text style={styles.buttonDescription}>
                                {diff.description}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        style={[styles.button, styles.closeButton]}
                        onPress={onClose}
                    >
                        <Text style={styles.buttonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        width: '85%',
        maxWidth: 400,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#2c3e50',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 16,
        borderRadius: 12,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    buttonDescription: {
        color: '#f0f0f0',
        fontSize: 14,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#DC3545',
        marginTop: 16,
    },
});

export default DifficultySelector;
