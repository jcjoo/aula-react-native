import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { X, Minus, Plus, Trash2, Check, Receipt, Pencil } from 'lucide-react-native';
import { Input } from '@/components/Input';
import { theme } from '@/theme';
import OrcamentoStorage from '@/storage/orcamentoStorage';
import { Orcamento } from '@/types/Orcamento';
import { ItemServico } from '@/types/ItemServico';
import { OrcamentoStatus } from '@/types/OrcamentoStatus';
import styles from './styles';

const STATUS_OPTIONS: { value: OrcamentoStatus; dot: string }[] = [
    { value: 'Rascunho', dot: theme.colors.base.gray400 },
    { value: 'Aprovado', dot: theme.colors.feedback.successBase },
    { value: 'Enviado',  dot: theme.colors.feedback.infoBase },
    { value: 'Recusado', dot: theme.colors.feedback.dangerBase },
];

export default function EditarOrcamento() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const orcamento: Orcamento = route.params?.orcamento;

    const [titulo, setTitulo] = useState(orcamento.titulo);
    const [cliente, setCliente] = useState(orcamento.cliente);
    const [status, setStatus] = useState<OrcamentoStatus>(orcamento.status);
    const [itens, setItens] = useState<ItemServico[]>([...orcamento.itens]);
    const [desconto, setDesconto] = useState(String(orcamento.percentualDesconto ?? 0));

    const [servicoModalVisible, setServicoModalVisible] = useState(false);
    const [editandoServico, setEditandoServico] = useState<ItemServico | null>(null);
    const [servicoNome, setServicoNome] = useState('');
    const [servicoDescricao, setServicoDescricao] = useState('');
    const [servicoPreco, setServicoPreco] = useState('');
    const [servicoQtd, setServicoQtd] = useState(1);

    const descontoNum = parseFloat(desconto.replace(',', '.')) || 0;
    const subtotal = itens.reduce((acc, i) => acc + i.precoUnitario * i.quantidade, 0);
    const descontoValor = subtotal * descontoNum / 100;
    const total = subtotal - descontoValor;
    const fmt = (n: number) => n.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

    const openAddServico = () => {
        setEditandoServico(null);
        setServicoNome('');
        setServicoDescricao('');
        setServicoPreco('');
        setServicoQtd(1);
        setServicoModalVisible(true);
    };

    const openEditServico = (item: ItemServico) => {
        setEditandoServico(item);
        setServicoNome(item.nome ?? '');
        setServicoDescricao(item.descricao);
        setServicoPreco(String(item.precoUnitario));
        setServicoQtd(item.quantidade);
        setServicoModalVisible(true);
    };

    const saveServico = () => {
        const nome = servicoNome.trim();
        const desc = servicoDescricao.trim();
        if (!nome && !desc) {
            Alert.alert('Atenção', 'Preencha ao menos o nome do serviço.');
            return;
        }
        const precoUnitario = parseFloat(servicoPreco.replace(',', '.')) || 0;

        if (editandoServico) {
            setItens(prev =>
                prev.map(i => i.id === editandoServico.id
                    ? { ...i, nome, descricao: desc || nome, precoUnitario, quantidade: servicoQtd }
                    : i
                )
            );
        } else {
            const newItem: ItemServico = {
                id: Date.now().toString(),
                nome,
                descricao: desc || nome,
                precoUnitario,
                quantidade: servicoQtd,
            };
            setItens(prev => [...prev, newItem]);
        }
        setServicoModalVisible(false);
    };

    const deleteServico = () => {
        if (editandoServico) {
            setItens(prev => prev.filter(i => i.id !== editandoServico.id));
        }
        setServicoModalVisible(false);
    };

    const handleSave = async () => {
        if (!titulo.trim() || !cliente.trim()) {
            Alert.alert('Atenção', 'Preencha o título e o cliente.');
            return;
        }
        const updated: Orcamento = {
            ...orcamento,
            titulo: titulo.trim(),
            cliente: cliente.trim(),
            status,
            itens,
            percentualDesconto: descontoNum,
            dataAtualizacao: new Date().toISOString(),
        };
        await OrcamentoStorage.update(updated);
        navigation.goBack();
    };

    return (
        <View style={styles.overlay}>
            <TouchableOpacity
                style={styles.backgroundLink}
                activeOpacity={1}
                onPress={() => navigation.goBack()}
            />
            <View style={styles.modal}>
                <View style={styles.indicator} />
                <Text style={styles.title}>Orçamento</Text>

                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionIcon}>
                            <Receipt color={theme.colors.base.gray500} size={14} />
                        </View>
                        <Text style={styles.sectionTitle}>Informações gerais</Text>
                    </View>
                    <View style={styles.inputGroup}>
                        <Input placeholder="Título" value={titulo} onChangeText={setTitulo} />
                        <Input placeholder="Cliente" value={cliente} onChangeText={setCliente} />
                    </View>

                    <View style={[styles.sectionHeader, { marginTop: 16 }]}>
                        <View style={styles.sectionIcon}>
                            <Receipt color={theme.colors.base.gray500} size={14} />
                        </View>
                        <Text style={styles.sectionTitle}>Status</Text>
                    </View>
                    <View style={styles.statusGrid}>
                        {STATUS_OPTIONS.map(opt => (
                            <TouchableOpacity
                                key={opt.value}
                                style={[styles.statusOption, status === opt.value && styles.statusOptionSelected]}
                                onPress={() => setStatus(opt.value)}
                            >
                                <View style={[styles.statusRadio, status === opt.value && styles.statusRadioSelected]}>
                                    {status === opt.value && <View style={styles.statusRadioInner} />}
                                </View>
                                <View style={[styles.statusDot, { backgroundColor: opt.dot }]} />
                                <Text style={styles.statusOptionText}>{opt.value}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={[styles.sectionHeader, { marginTop: 16 }]}>
                        <View style={styles.sectionIcon}>
                            <Receipt color={theme.colors.base.gray500} size={14} />
                        </View>
                        <Text style={styles.sectionTitle}>Serviços inclusos</Text>
                    </View>
                    {itens.map(item => (
                        <View key={item.id} style={styles.serviceRow}>
                            <View style={styles.serviceInfo}>
                                <Text style={styles.serviceName} numberOfLines={1}>{item.nome ?? item.descricao}</Text>
                                <Text style={styles.serviceDetail} numberOfLines={1}>
                                    R$ {fmt(item.precoUnitario)} · Qt: {item.quantidade}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => openEditServico(item)} hitSlop={10}>
                                <Pencil color={theme.colors.principal.purpleBase} size={18} />
                            </TouchableOpacity>
                        </View>
                    ))}
                    <TouchableOpacity style={styles.addServiceButton} onPress={openAddServico}>
                        <Plus color={theme.colors.principal.purpleBase} size={16} />
                        <Text style={styles.addServiceText}>Adicionar serviço</Text>
                    </TouchableOpacity>

                    <View style={[styles.sectionHeader, { marginTop: 8 }]}>
                        <View style={styles.sectionIcon}>
                            <Receipt color={theme.colors.base.gray500} size={14} />
                        </View>
                        <Text style={styles.sectionTitle}>Investimento</Text>
                    </View>
                    <View style={styles.investimentoCard}>
                        <View style={styles.investRow}>
                            <Text style={styles.investLabel}>Subtotal</Text>
                            <Text style={styles.investValue}>R$ {fmt(subtotal)}</Text>
                        </View>
                        <View style={styles.investRow}>
                            <Text style={styles.investLabel}>Desconto</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <View style={styles.descontoInput}>
                                    <TextInput
                                        style={styles.descontoField}
                                        value={desconto}
                                        onChangeText={setDesconto}
                                        keyboardType="numeric"
                                        maxLength={3}
                                    />
                                    <Text style={styles.descontoPercent}>%</Text>
                                </View>
                                {descontoNum > 0 && (
                                    <Text style={styles.investDiscount}>- R$ {fmt(descontoValor)}</Text>
                                )}
                            </View>
                        </View>
                        <View style={[styles.investRow, styles.investTotalRow]}>
                            <Text style={styles.investTotalLabel}>Valor total</Text>
                            <View style={styles.investTotalValues}>
                                {descontoNum > 0 && (
                                    <Text style={styles.investSubtotalStrike}>R$ {fmt(subtotal)}</Text>
                                )}
                                <Text style={styles.investTotalValue}>R$ {fmt(total)}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.buttonsRow}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Check color="#fff" size={16} />
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal visible={servicoModalVisible} transparent animationType="slide">
                <View style={styles.subOverlay}>
                    <TouchableOpacity
                        style={styles.backgroundLink}
                        activeOpacity={1}
                        onPress={() => setServicoModalVisible(false)}
                    />
                    <View style={styles.subModal}>
                        <View style={styles.indicator} />
                        <View style={styles.subModalHeader}>
                            <Text style={styles.subModalTitle}>Serviço</Text>
                            <TouchableOpacity onPress={() => setServicoModalVisible(false)} hitSlop={10}>
                                <X color={theme.colors.base.gray600} size={20} />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            style={styles.serviceInput}
                            placeholder="Nome do serviço"
                            placeholderTextColor={theme.colors.base.gray400}
                            value={servicoNome}
                            onChangeText={setServicoNome}
                        />
                        <TextInput
                            style={[styles.serviceInput, styles.serviceTextarea]}
                            placeholder="Descrição"
                            placeholderTextColor={theme.colors.base.gray400}
                            value={servicoDescricao}
                            onChangeText={setServicoDescricao}
                            multiline
                            numberOfLines={3}
                            textAlignVertical="top"
                        />
                        <View style={styles.priceQtyRow}>
                            <View style={styles.priceInput}>
                                <Text style={styles.currencyPrefix}>R$</Text>
                                <TextInput
                                    style={styles.priceField}
                                    placeholder="0,00"
                                    placeholderTextColor={theme.colors.base.gray400}
                                    value={servicoPreco}
                                    onChangeText={setServicoPreco}
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={styles.qtdControl}>
                                <TouchableOpacity
                                    style={styles.qtdButton}
                                    onPress={() => setServicoQtd(q => Math.max(1, q - 1))}
                                >
                                    <Minus color={theme.colors.base.gray600} size={14} />
                                </TouchableOpacity>
                                <Text style={styles.qtdValue}>{servicoQtd}</Text>
                                <TouchableOpacity
                                    style={styles.qtdButton}
                                    onPress={() => setServicoQtd(q => q + 1)}
                                >
                                    <Plus color={theme.colors.base.gray600} size={14} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.subModalButtons}>
                            {editandoServico && (
                                <TouchableOpacity style={styles.deleteServiceButton} onPress={deleteServico}>
                                    <Trash2 color={theme.colors.feedback.dangerBase} size={20} />
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity style={[styles.saveButton, { flex: 1 }]} onPress={saveServico}>
                                <Check color="#fff" size={16} />
                                <Text style={styles.saveButtonText}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
