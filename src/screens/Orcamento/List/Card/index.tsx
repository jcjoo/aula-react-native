import React from 'react';
import { Text, TouchableOpacity, View, Alert, Platform } from 'react-native';
import { Orcamento } from '@/types/Orcamento';
import styles from './styles';
import { Trash2 } from 'lucide-react-native';
import { theme } from '@/theme';

interface Props {
    data: Orcamento;
    onDelete: () => void;
}

export function Card({ data, onDelete }: Props) {
    const total = data.itens.reduce((acc: number, item) => acc + (item.precoUnitario * item.quantidade), 0);
    const totalComDesconto = total * (1 - (data.percentualDesconto || 0) / 100);

    const handleDelete = () => {
        if (Platform.OS === 'web') {
            const confirmed = window.confirm(`Deseja realmente remover o orçamento "${data.titulo}"?`);
            if (confirmed) {
                onDelete();
            }
        } else {
            Alert.alert(
                "Remover Orçamento",
                `Deseja realmente remover o orçamento "${data.titulo}"?`,
                [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Remover", onPress: onDelete, style: "destructive" }
                ]
            );
        }
    };

    const getStatusDotStyles = (status: string) => {
        switch (status) {
            case 'Aprovado':
                return styles.statusDotAprovado;
            case 'Enviado':
                return styles.statusDotEnviado;
            case 'Recusado':
                return styles.statusDotRecusado;
            default:
                return styles.statusDotRascunho;
        }
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Aprovado':
                return styles.statusAprovado;
            case 'Enviado':
                return styles.statusEnviado;
            case 'Recusado':
                return styles.statusRecusado;
            default:
                return styles.statusRascunho;
        }
    };

    const getStatusContainerStyles = (status: string) => {
        switch (status) {
            case 'Aprovado':
                return styles.containerAprovado;
            case 'Enviado':
                return styles.containerEnviado;
            case 'Recusado':
                return styles.containerRecusado;
            default:
                return styles.containerRascunho;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title} numberOfLines={2}>{data.titulo}</Text>
                <View style={[styles.statusBadge, getStatusContainerStyles(data.status)]}>
                    <View style={[styles.statusDot, getStatusDotStyles(data.status)]} />
                    <Text style={[styles.statusText, getStatusStyles(data.status)]}>{data.status}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <View style={styles.clientInfo}>
                    <Text style={styles.cliente}>{data.cliente}</Text>
                    <TouchableOpacity onPress={handleDelete} hitSlop={10}>
                        <Trash2 size={20} color={theme.colors.feedback.dangerBase} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.total}>
                    <Text style={styles.currency}>R$ </Text>
                    {totalComDesconto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
            </View>
        </View>
    );
}
