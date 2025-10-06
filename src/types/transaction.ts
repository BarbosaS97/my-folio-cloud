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
}
