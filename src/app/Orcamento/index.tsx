import { Text, View } from "react-native";
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

    useEffect(() => {
        fetchOrcamentos();
    }, [fetchOrcamentos]);

    return (
        <View style={styles.container}>
            <OrcamentosHeader onAdd={fetchOrcamentos} />
            <OrcamentoList orcamentos={orcamentos} />
        </View>
    );
}