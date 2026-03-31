import { StyleSheet } from "react-native";

export default StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end', // Alinha ao fundo
    },
    backgroundLink: {
        ...StyleSheet.absoluteFillObject,
    },
    modal: {
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        paddingBottom: 40,
        gap: 16, // Espaçamento entre inputs e botão
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    indicator: {
        width: 40,
        height: 6,
        backgroundColor: '#E5E5E5',
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    }
});