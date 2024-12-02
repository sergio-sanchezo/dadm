import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CellProps {
    value: string;
    onPress: () => void;
}

const Cell: React.FC<CellProps> = ({ value, onPress }) => (
    <TouchableOpacity style={styles.cell} onPress={onPress}>
        <Text style={styles.text}>{value}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    cell: {
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#ffffff',
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
    },
});

export default Cell;
