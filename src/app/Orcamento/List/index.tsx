import { FlatList, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Input } from "@/components/Input";
import { theme } from "@/theme";
import { SlidersHorizontal, Search } from "lucide-react-native";
import { Orcamento } from "@/types/Orcamento";
import { Card } from "./Card";


interface Props {
    orcamentos: Orcamento[];
}

export default function OrcamentoList({ orcamentos }: Props) {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Input placeholder="Título ou cliente" icon={<Search color={theme.colors.base.gray500} />} />
                <TouchableOpacity style={styles.circle}>
                    <SlidersHorizontal
                        color={theme.colors.principal.purpleBase}
                        size={24}
                        strokeWidth={2.5}
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                data={orcamentos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Card data={item} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            />
        </View>
    );
}