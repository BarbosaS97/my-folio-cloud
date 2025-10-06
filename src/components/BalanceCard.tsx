import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";

interface BalanceCardProps {
  balance: number;
  income: number;
  expense: number;
}

export const BalanceCard = ({ balance, income, expense }: BalanceCardProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <Card className="p-6 bg-gradient-card shadow-xl border-0 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-primary/10 rounded-2xl">
          <Wallet className="w-6 h-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Saldo Total</p>
          <h2 className="text-3xl font-bold text-foreground">{formatCurrency(balance)}</h2>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-income-light rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-income" />
            <p className="text-xs text-income font-medium">Receitas</p>
          </div>
          <p className="text-lg font-bold text-income">{formatCurrency(income)}</p>
        </div>
        
        <div className="bg-expense-light rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-expense" />
            <p className="text-xs text-expense font-medium">Despesas</p>
          </div>
          <p className="text-lg font-bold text-expense">{formatCurrency(expense)}</p>
        </div>
      </div>
    </Card>
  );
};
