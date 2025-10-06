export type TransactionType = "income" | "expense";

export type TransactionCategory = 
  | "salary"
  | "freelance"
  | "investment"
  | "other-income"
  | "food"
  | "transport"
  | "housing"
  | "entertainment"
  | "health"
  | "shopping"
  | "bills"
  | "other-expense";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: TransactionCategory;
  type: TransactionType;
  date: string;
  createdAt: number;
  
  // Campos para parcelas
  installments?: number; // Número total de parcelas (ex: 12x)
  currentInstallment?: number; // Parcela atual (ex: 1 de 12)
  parentId?: string; // ID da transação original (para parcelas relacionadas)
  
  // Campo para transações fixas/recorrentes
  isRecurring?: boolean; // Se true, aparece em todos os meses
}

