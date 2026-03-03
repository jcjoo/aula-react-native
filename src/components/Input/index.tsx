import { theme } from "@/theme";
import { ReactNode } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";


interface InputProps extends TextInputProps {
    icon?: ReactNode;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: theme.colors.base.gray300,
        backgroundColor: theme.colors.base.gray200,
    },
    input: {
        flex: 1,
        fontFamily: theme.typography.fontFamily.regular,
        fontSize: theme.typography.sizes.textMd,
        color: theme.colors.base.gray600,
    }
})

export function Input({ icon, ...rest }: InputProps) {
    return (
        <View style={styles.container}>
            {icon}
            <TextInput style={styles.input} {...rest} />
        </View>
    );
}   