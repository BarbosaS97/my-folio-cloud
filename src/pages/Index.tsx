import { useState, useEffect } from "react";
import { Transaction } from "@/types/transaction";
import { saveTransactions, loadTransactions, clearTransactions } from "@/utils/storage";
import { BalanceCard } from "@/components/BalanceCard";
import { FilterTabs } from "@/components/FilterTabs";
import { TransactionList } from "@/components/TransactionList";
import { TransactionModal } from "@/components/TransactionModal";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [showClearDialog, setShowClearDialog] = useState(false);

  useEffect(() => {
    const loaded = loadTransactions();
    setTransactions(loaded);
  }, []);

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  const handleAddTransaction = (transactionData: Omit<Transaction, "id" | "createdAt">) => {
    if (editingTransaction) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editingTransaction.id
            ? { ...transactionData, id: t.id, createdAt: t.createdAt }
            : t
        )
      );
      toast.success("Transação atualizada com sucesso!");
      setEditingTransaction(null);
    } else {
      const newTransaction: Transaction = {
        ...transactionData,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
      };
      setTransactions((prev) => [newTransaction, ...prev]);
      toast.success("Transação adicionada com sucesso!");
    }
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    toast.success("Transação excluída com sucesso!");
  };

  const handleClearAll = () => {
    clearTransactions();
    setTransactions([]);
    setShowClearDialog(false);
    toast.success("Todos os dados foram limpos!");
  };

  const filteredTransactions = transactions.filter((t) => {
    if (filter === "all") return true;
    return t.type === filter;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <header className="flex items-center justify-between mb-6 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Minhas Finanças</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Gerencie suas receitas e despesas
            </p>
          </div>
          
          {transactions.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowClearDialog(true)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          )}
        </header>

        <BalanceCard balance={balance} income={totalIncome} expense={totalExpense} />

        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <FilterTabs value={filter} onChange={setFilter} />

          <TransactionList
            transactions={sortedTransactions}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
          />
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50 animate-scale-in" style={{ animationDelay: "200ms" }}>
        <Button
          size="lg"
          onClick={() => {
            setEditingTransaction(null);
            setIsModalOpen(true);
          }}
          className="h-14 w-14 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 bg-primary hover:bg-primary/90"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <TransactionModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }}
        onSave={handleAddTransaction}
        transaction={editingTransaction}
      />

      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Limpar todos os dados?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Todas as suas transações serão permanentemente excluídas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearAll}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Limpar tudo
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
