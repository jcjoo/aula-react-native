import { Text, View } from "react-native";
import { styles } from "./style";
import Button from "@/components/Button";
import { Plus } from "lucide-react-native";
import { Input } from "@/components/Input";
import { useState } from "react";
import OrcamentoStorage from "@/storage/orcamentoStorage";
import { Orcamento } from "@/types/Orcamento";

interface Props {
    onAdd: () => void;
}

export default function OrcamentosHeader({ onAdd }: Props) {
    const [title, setTitle] = useState('')
    const [client, setClient] = useState('')
    const [value, setValue] = useState('')

    const handleNewOrcamento = async () => {
        if (!title.trim() || !client.trim()) {
            return alert("Preencha o título e o cliente!");
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
            onAdd();

        } catch (error) {
            console.error(error);
            alert("Erro ao salvar o orçamento.");
        }
    }

    return (
        <View>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Orçamentos</Text>
                    <Text style={styles.subtitle}>Você tem 1 item em rascunho</Text>
                </View>
                <Button title="Novo" icon={<Plus />} onPress={handleNewOrcamento} />
            </View>
            <Input placeholder="Título" value={title} onChangeText={setTitle} />
            <Input placeholder="Cliente" value={client} onChangeText={setClient} />
            <Input placeholder="Valor" value={value} keyboardType="numeric" onChangeText={setValue} />
        </View>
    );
}