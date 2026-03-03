import React from 'react';
import { Text, View } from 'react-native';
import { Orcamento } from '@/types/Orcamento';
import styles from './styles';

interface Props {
    data: Orcamento;
}

export function Card({ data }: Props) {
    const total = data.itens.reduce((acc: number, item) => acc + (item.precoUnitario * item.quantidade), 0);
    const totalComDesconto = total * (1 - (data.percentualDesconto || 0) / 100);

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
                <Text style={styles.cliente}>{data.cliente}</Text>
                <Text style={styles.total}>
                    <Text style={styles.currency}>R$ </Text>
                    {totalComDesconto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
            </View>
        </View>
    );
}
