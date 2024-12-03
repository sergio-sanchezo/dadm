import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';

interface AboutModalProps {
    visible: boolean;
    onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ visible, onClose }) => (
    <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Image
                    source={require('../../assets/images/triqui.png')}
                    style={styles.image}
                />
                <Text style={styles.title}>TRIQUI UN</Text>
                <Text style={styles.text}>Por Sergio Sanchez, UN</Text>
                <TouchableOpacity style={styles.button} onPress={onClose}>
                    <Text style={styles.buttonText}>Cerrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        width: '80%',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#2196F3',
        padding: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
});

export default AboutModal;
