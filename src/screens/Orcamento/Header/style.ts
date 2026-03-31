import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.base.gray200,
    },
    title: {
        fontFamily: theme.typography.fontFamily.bold,
        fontSize: theme.typography.sizes.titleLg,
        color: theme.colors.principal.purpleBase,
    },
    subtitle: {
        fontFamily: theme.typography.fontFamily.regular,
        fontSize: theme.typography.sizes.textMd,
        color: theme.colors.base.gray500,
    },
});