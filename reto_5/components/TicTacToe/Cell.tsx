import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

interface CellProps {
    value: string;
    onPress: () => void;
}

const Cell: React.FC<CellProps> = ({ value, onPress }) => {
    // Determine the source image based on the value
    let imageSource;
    if (value === 'X') {
        imageSource = require('../../assets/images/x.png'); // Adjust path as needed
    } else if (value === 'O') {
        imageSource = require('../../assets/images/o.png'); // Adjust path as needed
    }

    return (
        <TouchableOpacity style={styles.cell} onPress={onPress}>
            {imageSource ? (
                <Image source={imageSource} style={styles.image} />
            ) : null}
        </TouchableOpacity>
    );
};

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
    image: {
        width: 70, // Adjust size as needed
        height: 70, // Adjust size as needed
        resizeMode: 'contain',
    },
});

export default Cell;
