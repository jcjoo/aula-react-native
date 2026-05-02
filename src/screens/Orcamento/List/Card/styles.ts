import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        backgroundColor: theme.colors.base.gray100,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.colors.base.gray200,
        gap: 12,
        marginBottom: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 12,
    },
    title: {
        flex: 1,
        fontFamily: theme.typography.fontFamily.bold,
        fontSize: theme.typography.sizes.titleSm,
        color: theme.colors.base.gray700,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
        gap: 6,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    statusText: {
        fontFamily: theme.typography.fontFamily.bold,
        fontSize: 12,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cliente: {
        fontFamily: theme.typography.fontFamily.regular,
        fontSize: theme.typography.sizes.textSm,
        color: theme.colors.base.gray500,
    },
    total: {
        fontFamily: theme.typography.fontFamily.bold,
        fontSize: theme.typography.sizes.titleMd,
        color: theme.colors.base.gray700,
    },
    currency: {
        fontFamily: theme.typography.fontFamily.regular,
        fontSize: theme.typography.sizes.textXs,
        color: theme.colors.base.gray600,
    },

    statusAprovado: {
        color: theme.colors.feedback.successBase,
    },
    statusEnviado: {
        color: theme.colors.feedback.infoBase,
    },
    statusRecusado: {
        color: theme.colors.feedback.dangerBase,
    },
    statusRascunho: {
        color: theme.colors.base.gray400,
    },

    statusDotAprovado: {
        backgroundColor: theme.colors.feedback.successBase,
    },
    statusDotEnviado: {
        backgroundColor: theme.colors.feedback.infoBase,
    },
    statusDotRecusado: {
        backgroundColor: theme.colors.feedback.dangerBase,
    },
    statusDotRascunho: {
        backgroundColor: theme.colors.base.gray400,
    },

    containerAprovado: {
        backgroundColor: theme.colors.feedback.successLight,
    },
    containerEnviado: {
        backgroundColor: theme.colors.feedback.infoLight,
    },
    containerRecusado: {
        backgroundColor: theme.colors.feedback.dangerLight,
    },
    containerRascunho: {
        backgroundColor: theme.colors.base.gray200,
    },
});
