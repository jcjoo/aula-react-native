import { Text, View } from "react-native";
import { styles } from "./styles";
import OrcamentosHeader from "./Header";
import OrcamentoList from "./List";

export default function Orcamento() {
    return (
        <View style={styles.container}>
            <OrcamentosHeader />
            <OrcamentoList />
        </View>
    );
}