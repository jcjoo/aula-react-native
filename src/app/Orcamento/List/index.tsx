import { FlatList, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Input } from "@/components/Input";
import { theme } from "@/theme";
import { SlidersHorizontal, Search } from "lucide-react-native";
import { Orcamento } from "@/types/Orcamento";
import { Card } from "./Card";
import { useState } from "react";


interface Props {
    orcamentos: Orcamento[];
    onDelete: (id: string) => void;
}

export default function OrcamentoList({ orcamentos, onDelete }: Props) {
    const [search, setSearch] = useState("");

    const filteredOrcamentos = orcamentos.filter(orcamento =>
        orcamento.titulo.toLowerCase().includes(search.toLowerCase()) ||
        orcamento.cliente.toLowerCase().includes(search.toLowerCase()) ||
        orcamento.status.toLowerCase().includes(search.toLowerCase()) ||
        orcamento.itens.reduce((acc: number, item) => acc + (item.precoUnitario * item.quantidade), 0).toString().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Input
                    placeholder="Título ou cliente"
                    icon={<Search color={theme.colors.base.gray500} />}
                    value={search}
                    onChangeText={setSearch}
                />
                <TouchableOpacity style={styles.circle}>
                    <SlidersHorizontal
                        color={theme.colors.principal.purpleBase}
                        size={24}
                        strokeWidth={2.5}
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                data={filteredOrcamentos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card
                        data={item}
                        onDelete={() => onDelete(item.id)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            />
        </View>
    );
}