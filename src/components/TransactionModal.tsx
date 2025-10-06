import { useState, useEffect } from "react";
import { Transaction, TransactionType, TransactionCategory } from "@/types/transaction";
import { categories, incomeCategories, expenseCategories } from "@/utils/categories";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Repeat, CreditCard } from "lucide-react";

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (transaction: Omit<Transaction, "id" | "createdAt">) => void;
  transaction?: Transaction | null;
}

export const TransactionModal = ({ open, onClose, onSave, transaction }: TransactionModalProps) => {
  const [type, setType] = useState<TransactionType>("expense");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<TransactionCategory>("food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [installments, setInstallments] = useState("1");
  const [isRecurring, setIsRecurring] = useState(false);

  useEffect(() => {
    if (transaction) {
      setType(transaction.type);
      setDescription(transaction.description);
      setAmount(transaction.amount.toString());
      setCategory(transaction.category);
      setDate(transaction.date);
      setInstallments((transaction.installments || 1).toString());
      setIsRecurring(transaction.isRecurring || false);
    } else {
      resetForm();
    }
  }, [transaction, open]);

  const resetForm = () => {
    setType("expense");
    setDescription("");
    setAmount("");
    setCategory("food");
    setDate(new Date().toISOString().split("T")[0]);
    setInstallments("1");
    setIsRecurring(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim() || !amount || parseFloat(amount) <= 0) {
      return;
    }

    const installmentsNum = parseInt(installments);
    if (installmentsNum < 1 || installmentsNum > 120) {
      return;
    }

    onSave({
      description: description.trim(),
      amount: parseFloat(amount),
      category,
      type,
      date,
      installments: installmentsNum,
      isRecurring,
    });

    resetForm();
    onClose();
  };

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    if (newType === "income") {
      setCategory("salary");
    } else {
      setCategory("food");
    }
  };

  const availableCategories = type === "income" ? incomeCategories : expenseCategories;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {transaction ? "Editar Transação" : "Nova Transação"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <Tabs value={type} onValueChange={(v) => handleTypeChange(v as TransactionType)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="expense" className="data-[state=active]:bg-expense data-[state=active]:text-white">
                Despesa
              </TabsTrigger>
              <TabsTrigger value="income" className="data-[state=active]:bg-income data-[state=active]:text-white">
                Receita
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Ex: Almoço, Salário, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Valor (R$)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as TransactionCategory)}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map((cat) => {
                  const Icon = categories[cat].icon;
                  return (
                    <SelectItem key={cat} value={cat}>
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {categories[cat].label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="h-12"
            />
          </div>

          <div className="space-y-4 border-t pt-4">
            <div className="space-y-2">
              <Label htmlFor="installments" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Parcelas
              </Label>
              <Select 
                value={installments} 
                onValueChange={setInstallments}
                disabled={isRecurring}
              >
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">À vista (1x)</SelectItem>
                  {Array.from({ length: 23 }, (_, i) => i + 2).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}x parcelas
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {parseInt(installments) > 1 && (
                <p className="text-xs text-muted-foreground">
                  Serão criadas {installments} transações nos próximos meses
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="recurring"
                checked={isRecurring}
                onCheckedChange={(checked) => {
                  setIsRecurring(checked as boolean);
                  if (checked) setInstallments("1");
                }}
              />
              <Label
                htmlFor="recurring"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 cursor-pointer"
              >
                <Repeat className="w-4 h-4" />
                Transação fixa (aparece em todos os meses)
              </Label>
            </div>
            {isRecurring && (
              <p className="text-xs text-muted-foreground">
                Esta transação aparecerá automaticamente em todos os meses
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className={`flex-1 h-12 ${type === "income" ? "bg-income hover:bg-income/90" : "bg-expense hover:bg-expense/90"} text-white`}
            >
              {transaction ? "Salvar" : "Adicionar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
