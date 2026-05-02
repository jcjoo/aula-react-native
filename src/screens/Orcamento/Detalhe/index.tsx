import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Share, Platform } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { ChevronLeft, Trash2, Copy, Pencil, Send, Receipt } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';
import { theme } from '@/theme';
import OrcamentoStorage from '@/storage/orcamentoStorage';
import { Orcamento } from '@/types/Orcamento';
import styles from './styles';

const STATUS_COLORS = {
    Aprovado: { bg: theme.colors.feedback.successLight, dot: theme.colors.feedback.successBase },
    Enviado:  { bg: theme.colors.feedback.infoLight,    dot: theme.colors.feedback.infoBase    },
    Recusado: { bg: theme.colors.feedback.dangerLight,  dot: theme.colors.feedback.dangerBase  },
    Rascunho: { bg: theme.colors.base.gray200,          dot: theme.colors.base.gray400         },
} as const;

export default function DetalheOrcamento() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const [orcamento, setOrcamento] = useState<Orcamento | null>(route.params?.orcamento ?? null);

    useFocusEffect(
        useCallback(() => {
            const id = orcamento?.id ?? route.params?.orcamento?.id;
            if (!id) return;
            OrcamentoStorage.get().then(all => {
                const found = all.find(o => o.id === id);
                if (found) setOrcamento(found);
                else navigation.goBack();
            });
        }, [orcamento?.id])
    );

    if (!orcamento) return null;

    const subtotal = orcamento.itens.reduce((acc, i) => acc + i.precoUnitario * i.quantidade, 0);
    const descontoValor = subtotal * (orcamento.percentualDesconto ?? 0) / 100;
    const total = subtotal - descontoValor;
    const statusColors = STATUS_COLORS[orcamento.status] ?? STATUS_COLORS.Rascunho;

    const fmt = (n: number) => n.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    const fmtDate = (d: string) => new Date(d).toLocaleDateString('pt-BR');

    const confirmDelete = () => {
        const doDelete = async () => {
            await OrcamentoStorage.remove(orcamento.id);
            navigation.goBack();
        };
        if (Platform.OS === 'web') {
            if (window.confirm(`Remover "${orcamento.titulo}"?`)) doDelete();
        } else {
            Alert.alert('Remover Orçamento', `Deseja remover "${orcamento.titulo}"?`, [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Remover', style: 'destructive', onPress: doDelete },
            ]);
        }
    };

    const handleCopy = async () => {
        const servicos = orcamento.itens
            .map(i => `- ${i.nome ?? i.descricao}: R$ ${fmt(i.precoUnitario)} x ${i.quantidade}`)
            .join('\n');
        const texto = `Orçamento: ${orcamento.titulo}\nCliente: ${orcamento.cliente}\nStatus: ${orcamento.status}\n\nServiços:\n${servicos}\n\nTotal: R$ ${fmt(total)}`;
        await Clipboard.setStringAsync(texto);
        Alert.alert('Copiado!', 'Orçamento copiado para a área de transferência.');
    };

    const handleShare = async () => {
        const servicos = orcamento.itens
            .map(i => `- ${i.nome ?? i.descricao}: R$ ${fmt(i.precoUnitario)} x ${i.quantidade}`)
            .join('\n');
        await Share.share({
            message: `Orçamento: ${orcamento.titulo}\nCliente: ${orcamento.cliente}\nStatus: ${orcamento.status}\n\nServiços:\n${servicos}\n\nTotal: R$ ${fmt(total)}`,
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={10}>
                    <ChevronLeft color={theme.colors.base.gray700} size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Orçamento</Text>
                <View style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}>
                    <View style={[styles.statusDot, { backgroundColor: statusColors.dot }]} />
                    <Text style={[styles.statusText, { color: statusColors.dot }]}>{orcamento.status}</Text>
                </View>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.infoCard}>
                    <View style={styles.iconCircle}>
                        <Receipt color={theme.colors.base.gray400} size={22} />
                    </View>
                    <Text style={styles.titulo}>{orcamento.titulo}</Text>
                    <View>
                        <Text style={styles.label}>Cliente</Text>
                        <Text style={styles.value}>{orcamento.cliente}</Text>
                    </View>
                    <View style={styles.datesRow}>
                        <View>
                            <Text style={styles.label}>Criado em</Text>
                            <Text style={styles.value}>{fmtDate(orcamento.dataCriacao)}</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Atualizado em</Text>
                            <Text style={styles.value}>{fmtDate(orcamento.dataAtualizacao)}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.servicesCard}>
                    <View style={styles.sectionHeader}>
                        <View style={[styles.sectionIcon, { backgroundColor: theme.colors.base.gray200 }]}>
                            <Receipt color={theme.colors.base.gray500} size={14} />
                        </View>
                        <Text style={styles.sectionTitle}>Serviços inclusos</Text>
                    </View>
                    {orcamento.itens.map((item, idx) => (
                        <View
                            key={item.id}
                            style={[styles.serviceItem, idx < orcamento.itens.length - 1 && styles.serviceItemBorder]}
                        >
                            <View style={styles.serviceInfo}>
                                <Text style={styles.serviceName}>{item.nome ?? item.descricao}</Text>
                                {item.nome ? (
                                    <Text style={styles.serviceDescription} numberOfLines={2}>{item.descricao}</Text>
                                ) : null}
                            </View>
                            <View style={styles.serviceValues}>
                                <Text style={styles.servicePrice}>R$ {fmt(item.precoUnitario)}</Text>
                                <Text style={styles.serviceQty}>Qt: {item.quantidade}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.totalsCard}>
                    <View style={styles.totalsIconRow}>
                        <View style={[styles.sectionIcon, { backgroundColor: theme.colors.principal.purpleLight }]}>
                            <Receipt color={theme.colors.principal.purpleBase} size={14} />
                        </View>
                        <View style={styles.totalsRows}>
                            <View style={styles.totalRow}>
                                <Text style={styles.totalLabel}>Subtotal</Text>
                                <Text style={styles.totalValue}>R$ {fmt(subtotal)}</Text>
                            </View>
                            {(orcamento.percentualDesconto ?? 0) > 0 && (
                                <View style={styles.totalRow}>
                                    <View style={styles.discountLabelRow}>
                                        <Text style={styles.totalLabel}>Desconto</Text>
                                        <View style={styles.discountBadge}>
                                            <Text style={styles.discountBadgeText}>{orcamento.percentualDesconto}% off</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.discountValue}>- R$ {fmt(descontoValor)}</Text>
                                </View>
                            )}
                            <View style={styles.totalFinalDivider} />
                            <View style={styles.totalRow}>
                                <Text style={styles.totalFinalLabel}>Investimento total</Text>
                                <Text style={styles.totalFinalValue}>R$ {fmt(total)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.actionIconButton} onPress={confirmDelete}>
                    <Trash2 color={theme.colors.feedback.dangerBase} size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionIconButton} onPress={handleCopy}>
                    <Copy color={theme.colors.base.gray600} size={20} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionIconButton}
                    onPress={() => navigation.navigate('EditarOrcamento', { orcamento })}
                >
                    <Pencil color={theme.colors.base.gray600} size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                    <Send color="#fff" size={16} />
                    <Text style={styles.shareButtonText}>Compartilhar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
