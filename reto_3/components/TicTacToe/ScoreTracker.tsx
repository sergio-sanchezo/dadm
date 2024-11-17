import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ScoreTrackerProps {
    score: { human: number; computer: number; draws: number };
}

const ScoreTracker: React.FC<ScoreTrackerProps> = ({ score }) => (
    <View style={styles.container}>
        <Text style={styles.title}>Marcador</Text>
        <View style={styles.scoreContainer}>
            <View style={styles.scoreItem}>
                <Text style={styles.label}>👤 Victorias Humanas:</Text>
                <Text style={styles.value}>{score.human}</Text>
            </View>
            <View style={styles.scoreItem}>
                <Text style={styles.label}>🤖 Victorias de la Maquina:</Text>
                <Text style={styles.value}>{score.computer}</Text>
            </View>
            <View style={styles.scoreItem}>
                <Text style={styles.label}>⚖️ Empates:</Text>
                <Text style={styles.value}>{score.draws}</Text>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        padding: 20,
        backgroundColor: '#e0e5ec',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
        width: '90%',
        maxWidth: 350,
        alignSelf: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        marginBottom: 16,
    },
    scoreContainer: {
        width: '100%',
    },
    scoreItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginHorizontal: 10,
    },
    label: {
        fontSize: 16,
        color: '#444',
    },
    value: {
        fontSize: 16,
        fontWeight: '600',
        color: '#007bff',
    },
});

export default ScoreTracker;
