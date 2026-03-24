import { Alert, Text, View } from "react-native";
import { styles } from "./styles";
import OrcamentosHeader from "./Header";
import OrcamentoList from "./List";
import { useEffect, useState, useCallback } from "react";
import OrcamentoStorage from "@/storage/orcamentoStorage";
import { Orcamento as OrcamentoType } from "@/types/Orcamento";

export default function Orcamento() {
    const [orcamentos, setOrcamentos] = useState<OrcamentoType[]>([]);

    const fetchOrcamentos = useCallback(async () => {
        const data = await OrcamentoStorage.get();
        setOrcamentos(data);
    }, []);

    const handleDelete = async (id: string) => {
        console.log("Deletando orçamento:", id);
        try {
            await OrcamentoStorage.remove(id);
            await fetchOrcamentos();
        } catch (error) {
            console.error("Erro ao deletar:", error);
            Alert.alert("Erro", "Não foi possível deletar o orçamento.");
        }
    };

    useEffect(() => {
        fetchOrcamentos();
    }, [fetchOrcamentos]);

    return (
        <View style={styles.container}>
            <OrcamentosHeader onAdd={fetchOrcamentos} />
            <OrcamentoList orcamentos={orcamentos} onDelete={handleDelete} />
        </View>
    );
}