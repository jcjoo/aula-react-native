import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { styles } from "./styles";

type Props = TouchableOpacityProps & {
    title: string;
    height?: number;
    icon?: React.ReactNode;
}

export default function Button({ title, icon, ...rest }: Props) {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            {icon}
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
}