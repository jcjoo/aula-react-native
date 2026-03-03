import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.principal.purpleBase,
        color: theme.colors.base.gray100,
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        borderRadius: 100,
        gap: 8,
    },
    title: {
        color: theme.colors.base.gray100,
        fontFamily: theme.typography.fontFamily.bold,
        fontSize: theme.typography.sizes.textSm,
    },
});