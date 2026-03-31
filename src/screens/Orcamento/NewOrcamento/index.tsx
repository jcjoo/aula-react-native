import { Input } from "@/components/Input";
import Button from "@/components/Button";
import OrcamentoStorage from "@/storage/orcamentoStorage";
import { Orcamento } from "@/types/Orcamento";
import { useState } from "react";
import { Alert, View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";


export default function NewOrcamento() {
    const navigation = useNavigation();
    const [title, setTitle] = useState('')
    const [client, setClient] = useState('')
    const [value, setValue] = useState('')

    const handleNewOrcamento = async () => {
        if (!title.trim() || !client.trim()) {
            return Alert.alert("Atenção", "Preencha o título e o cliente!");
        }

        const orcamento: Orcamento = {
            id: Date.now().toString(),
            titulo: title,
            cliente: client,
            itens: [{
                id: (Date.now() + 1).toString(),
                descricao: 'Item 1',
                quantidade: 1,
                precoUnitario: Number(value) || 0,
            }],
            dataCriacao: new Date().toISOString(),
            dataAtualizacao: new Date().toISOString(),
            status: 'Enviado',
        }

        try {
            await OrcamentoStorage.add(orcamento);
            setTitle('');
            setClient('');
            setValue('');
            navigation.goBack();
        } catch (error) {
            console.error(error);
            alert("Erro ao salvar o orçamento.");
        }
    }

    return (
        <View style={styles.overlay}>
            <TouchableOpacity
                style={styles.backgroundLink}
                activeOpacity={1}
                onPress={() => navigation.goBack()}
            />
            <View style={styles.modal}>
                <View style={styles.indicator} />
                
                <Text style={styles.title}>Novo Orçamento</Text>

                <Input placeholder="Título" value={title} onChangeText={setTitle} />
                <Input placeholder="Cliente" value={client} onChangeText={setClient} />
                <Input placeholder="Valor" value={value} keyboardType="numeric" onChangeText={setValue} />
                
                <Button title="Criar" onPress={handleNewOrcamento} />
            </View>
        </View>
    );
}


