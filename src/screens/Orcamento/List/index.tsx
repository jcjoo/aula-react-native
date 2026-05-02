import { FlatList, Modal, TouchableOpacity, View, Text } from "react-native";
import { styles } from "./styles";
import { Input } from "@/components/Input";
import { theme } from "@/theme";
import { SlidersHorizontal, Search, X, Check } from "lucide-react-native";
import { Orcamento } from "@/types/Orcamento";
import { OrcamentoStatus } from "@/types/OrcamentoStatus";
import { Card } from "./Card";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

type Ordenacao = 'maisRecente' | 'maisAntigo' | 'maiorValor' | 'menorValor';

interface Props {
    orcamentos: Orcamento[];
}

const STATUS_LIST: OrcamentoStatus[] = ['Rascunho', 'Enviado', 'Aprovado', 'Recusado'];

const STATUS_COLORS: Record<OrcamentoStatus, string> = {
    Rascunho: theme.colors.base.gray400,
    Enviado:  theme.colors.feedback.infoBase,
    Aprovado: theme.colors.feedback.successBase,
    Recusado: theme.colors.feedback.dangerBase,
};

const ORDENACAO_OPTIONS: { key: Ordenacao; label: string }[] = [
    { key: 'maisRecente', label: 'Mais recente' },
    { key: 'maisAntigo',  label: 'Mais antigo' },
    { key: 'maiorValor',  label: 'Maior valor' },
    { key: 'menorValor',  label: 'Menor valor' },
];

export default function OrcamentoList({ orcamentos }: Props) {
    const navigation = useNavigation<any>();
    const [search, setSearch] = useState('');
    const [filterModal, setFilterModal] = useState(false);
    const [statusFiltros, setStatusFiltros] = useState<OrcamentoStatus[]>([]);
    const [ordenacao, setOrdenacao] = useState<Ordenacao>('maisRecente');
    const [tempStatus, setTempStatus] = useState<OrcamentoStatus[]>([]);
    const [tempOrdenacao, setTempOrdenacao] = useState<Ordenacao>('maisRecente');

    const openFilter = () => {
        setTempStatus([...statusFiltros]);
        setTempOrdenacao(ordenacao);
        setFilterModal(true);
    };

    const applyFilter = () => {
        setStatusFiltros(tempStatus);
        setOrdenacao(tempOrdenacao);
        setFilterModal(false);
    };

    const resetFilter = () => {
        setTempStatus([]);
        setTempOrdenacao('maisRecente');
    };

    const toggleTempStatus = (s: OrcamentoStatus) => {
        setTempStatus(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
    };

    const getTotal = (o: Orcamento) =>
        o.itens.reduce((acc, i) => acc + i.precoUnitario * i.quantidade, 0);

    const filtered = orcamentos
        .filter(o => {
            const matchSearch =
                o.titulo.toLowerCase().includes(search.toLowerCase()) ||
                o.cliente.toLowerCase().includes(search.toLowerCase()) ||
                o.status.toLowerCase().includes(search.toLowerCase());
            const matchStatus = statusFiltros.length === 0 || statusFiltros.includes(o.status);
            return matchSearch && matchStatus;
        })
        .sort((a, b) => {
            switch (ordenacao) {
                case 'maisAntigo':
                    return new Date(a.dataCriacao).getTime() - new Date(b.dataCriacao).getTime();
                case 'maiorValor':
                    return getTotal(b) - getTotal(a);
                case 'menorValor':
                    return getTotal(a) - getTotal(b);
                default:
                    return new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime();
            }
        });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Input
                    placeholder="Título ou cliente"
                    icon={<Search color={theme.colors.base.gray500} />}
                    value={search}
                    onChangeText={setSearch}
                />
                <TouchableOpacity style={styles.circle} onPress={openFilter}>
                    <SlidersHorizontal
                        color={statusFiltros.length > 0
                            ? theme.colors.principal.purpleBase
                            : theme.colors.principal.purpleBase}
                        size={24}
                        strokeWidth={2.5}
                    />
                </TouchableOpacity>
            </View>

            <FlatList
                data={filtered}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Card
                        data={item}
                        onPress={() => navigation.navigate('DetalheOrcamento', { orcamento: item })}
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            />

            <Modal visible={filterModal} transparent animationType="slide">
                <View style={styles.filterOverlay}>
                    <TouchableOpacity
                        style={styles.filterBackground}
                        activeOpacity={1}
                        onPress={() => setFilterModal(false)}
                    />
                    <View style={styles.filterModal}>
                        <View style={styles.filterIndicator} />
                        <View style={styles.filterHeader}>
                            <Text style={styles.filterTitle}>Filtrar e ordenar</Text>
                            <TouchableOpacity onPress={() => setFilterModal(false)} hitSlop={10}>
                                <X color={theme.colors.base.gray600} size={20} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.filterSectionTitle}>Status</Text>
                        <View style={styles.checkboxGrid}>
                            {STATUS_LIST.map(s => (
                                <TouchableOpacity
                                    key={s}
                                    style={styles.checkboxItem}
                                    onPress={() => toggleTempStatus(s)}
                                >
                                    <View style={[styles.checkbox, tempStatus.includes(s) && styles.checkboxChecked]}>
                                        {tempStatus.includes(s) && <View style={styles.checkboxInner} />}
                                    </View>
                                    <View style={[styles.checkboxDot, { backgroundColor: STATUS_COLORS[s] }]} />
                                    <Text style={styles.checkboxLabel}>{s}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={[styles.filterSectionTitle, { marginTop: 4 }]}>Ordenação</Text>
                        <View style={styles.radioGroup}>
                            {ORDENACAO_OPTIONS.map(opt => (
                                <TouchableOpacity
                                    key={opt.key}
                                    style={styles.radioItem}
                                    onPress={() => setTempOrdenacao(opt.key)}
                                >
                                    <View style={[styles.radio, tempOrdenacao === opt.key && styles.radioSelected]}>
                                        {tempOrdenacao === opt.key && <View style={styles.radioInner} />}
                                    </View>
                                    <Text style={styles.radioLabel}>{opt.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.filterButtons}>
                            <TouchableOpacity style={styles.resetButton} onPress={resetFilter}>
                                <Text style={styles.resetButtonText}>Resetar filtros</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
                                <Check color="#fff" size={14} />
                                <Text style={styles.applyButtonText}>Aplicar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
