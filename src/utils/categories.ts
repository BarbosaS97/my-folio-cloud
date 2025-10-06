import { TransactionCategory } from "@/types/transaction";
import { 
  Wallet, 
  Briefcase, 
  TrendingUp, 
  Gift,
  Utensils,
  Car,
  Home,
  Gamepad2,
  Heart,
  ShoppingBag,
  Receipt,
  MoreHorizontal
} from "lucide-react";

export const categories: Record<TransactionCategory, { label: string; icon: any }> = {
  // Receitas
  salary: { label: "Salário", icon: Wallet },
  freelance: { label: "Freelance", icon: Briefcase },
  investment: { label: "Investimentos", icon: TrendingUp },
  "other-income": { label: "Outros", icon: Gift },
  
  // Despesas
  food: { label: "Alimentação", icon: Utensils },
  transport: { label: "Transporte", icon: Car },
  housing: { label: "Moradia", icon: Home },
  entertainment: { label: "Lazer", icon: Gamepad2 },
  health: { label: "Saúde", icon: Heart },
  shopping: { label: "Compras", icon: ShoppingBag },
  bills: { label: "Contas", icon: Receipt },
  "other-expense": { label: "Outros", icon: MoreHorizontal },
};

export const incomeCategories: TransactionCategory[] = [
  "salary",
  "freelance",
  "investment",
  "other-income",
];

export const expenseCategories: TransactionCategory[] = [
  "food",
  "transport",
  "housing",
  "entertainment",
  "health",
  "shopping",
  "bills",
  "other-expense",
];
