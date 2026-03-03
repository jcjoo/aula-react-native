import { Text, View } from "react-native";
import { styles } from "./style";
import Button from "@/components/Button";
import { Plus } from "lucide-react-native";

export default function OrcamentosHeader() {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Orçamentos</Text>
                <Text style={styles.subtitle}>Você tem 1 item em rascunho</Text>
            </View>
            <Button title="Novo" icon={<Plus />} />
        </View>
    );
}