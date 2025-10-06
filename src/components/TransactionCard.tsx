import { Transaction } from "@/types/transaction";
import { categories } from "@/utils/categories";
import { Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TransactionCardProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export const TransactionCard = ({ transaction, onEdit, onDelete }: TransactionCardProps) => {
  const category = categories[transaction.category];
  const Icon = category.icon;
  const isIncome = transaction.type === "income";

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  return (
    <Card className="p-4 hover:shadow-lg transition-all duration-300 border-0 bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className={`p-3 rounded-xl ${isIncome ? "bg-income-light" : "bg-expense-light"}`}>
            <Icon className={`w-5 h-5 ${isIncome ? "text-income" : "text-expense"}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground truncate">{transaction.description}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted-foreground">{category.label}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{formatDate(transaction.date)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <div className="text-right mr-2">
            <p className={`font-bold text-lg ${isIncome ? "text-income" : "text-expense"}`}>
              {isIncome ? "+" : "-"} {formatCurrency(transaction.amount)}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-secondary"
            onClick={() => onEdit(transaction)}
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
            onClick={() => onDelete(transaction.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
