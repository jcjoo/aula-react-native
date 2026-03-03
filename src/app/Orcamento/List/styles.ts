import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.base.gray100,
        padding: 24,
        gap: 16,
    },
    title: {
        fontFamily: theme.typography.fontFamily.bold,
        fontSize: theme.typography.sizes.titleMd,
        color: theme.colors.base.gray700,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    circle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: theme.colors.base.gray200,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.colors.base.gray300,
    },
});