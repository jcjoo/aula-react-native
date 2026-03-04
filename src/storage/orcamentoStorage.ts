import { Orcamento } from "@/types/Orcamento";
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = "@orcamento";

export default class OrcamentoStorage {

    static async get(): Promise<Orcamento[]> {
        try {
            const data = await AsyncStorage.getItem(KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error("Erro ao buscar orçamentos:", error);
            return [];
        }
    }

    static async set(orcamentos: Orcamento[]) {
        try {
            await AsyncStorage.setItem(KEY, JSON.stringify(orcamentos));
        } catch (error) {
            console.error("Erro ao salvar lista de orçamentos:", error);
            throw new Error("Não foi possível salvar os dados.");
        }
    }

    static async add(orcamento: Orcamento) {
        try {
            const orcamentos = await this.get();
            const listaAtualizada = Array.isArray(orcamentos) ? orcamentos : [];

            await this.set([...listaAtualizada, orcamento]);
        } catch (error) {
            console.error("Erro ao adicionar novo orçamento:", error);
            throw error;
        }
    }

    static async clear() {
        try {
            await AsyncStorage.removeItem(KEY);
        } catch (error) {
            console.error("Erro ao limpar storage:", error);
        }
    }
}