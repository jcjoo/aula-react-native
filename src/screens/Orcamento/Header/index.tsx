import { Text, View } from "react-native";
import { styles } from "./style";
import Button from "@/components/Button";
import { Plus } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";


export default function OrcamentosHeader() {
    const navigation = useNavigation<any>();

    return (
        <View>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Orçamentos</Text>
                    <Text style={styles.subtitle}>Você tem 1 item em rascunho</Text>
                </View>
                <Button
                    title="Novo"
                    icon={<Plus color="#fff" size={20} />}
                    onPress={() => navigation.navigate('NovoOrcamento')}
                />
            </View>

        </View>
    );
}