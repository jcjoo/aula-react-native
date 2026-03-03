import { FlatList, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Input } from "@/components/Input";
import { theme } from "@/theme";
import { SlidersHorizontal, Search } from "lucide-react-native";
import { Orcamento } from "@/types/Orcamento";
import { Card } from "./Card";

const MOCK_ORCAMENTOS: Orcamento[] = [
    {
        id: '1',
        cliente: 'Soluções Tecnológicas Beta',
        titulo: 'Desenvolvimento de aplicativo de loja online',
        status: 'Aprovado',
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString(),
        itens: [{ id: '1', descricao: 'Dev App', quantidade: 1, precoUnitario: 22300 }],
    },
    {
        id: '2',
        cliente: 'Marketing Wizards',
        titulo: 'Consultoria em marketing digital',
        status: 'Rascunho',
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString(),
        itens: [{ id: '2', descricao: 'Consultoria', quantidade: 1, precoUnitario: 4000 }],
    },
    {
        id: '3',
        cliente: 'SEO Masters',
        titulo: 'Serviços de SEO',
        status: 'Enviado',
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString(),
        itens: [{ id: '3', descricao: 'SEO', quantidade: 1, precoUnitario: 3500 }],
    },
    {
        id: '4',
        cliente: 'Content Creators',
        titulo: 'Criação de conteúdo',
        status: 'Rascunho',
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString(),
        itens: [{ id: '4', descricao: 'Conteúdo', quantidade: 1, precoUnitario: 2500 }],
    },
    {
        id: '5',
        cliente: 'Social Experts',
        titulo: 'Gestão de redes sociais',
        status: 'Recusado',
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString(),
        itens: [{ id: '5', descricao: 'Redes Sociais', quantidade: 1, precoUnitario: 1800 }],
    },
    {
        id: '6',
        cliente: 'UI/UX Designers',
        titulo: 'Design de interface',
        status: 'Aprovado',
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString(),
        itens: [{ id: '6', descricao: 'Design', quantidade: 1, precoUnitario: 5200 }],
    }
];

export default function OrcamentoList() {
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
                data={MOCK_ORCAMENTOS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Card data={item} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            />
        </View>
    );
}