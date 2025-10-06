import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, List } from "lucide-react";

interface FilterTabsProps {
  value: string;
  onChange: (value: string) => void;
}

export const FilterTabs = ({ value, onChange }: FilterTabsProps) => {
  return (
    <Tabs value={value} onValueChange={onChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3 h-12">
        <TabsTrigger value="all" className="flex items-center gap-2">
          <List className="w-4 h-4" />
          <span className="hidden sm:inline">Todas</span>
        </TabsTrigger>
        <TabsTrigger value="income" className="flex items-center gap-2 data-[state=active]:bg-income data-[state=active]:text-white">
          <TrendingUp className="w-4 h-4" />
          <span className="hidden sm:inline">Receitas</span>
        </TabsTrigger>
        <TabsTrigger value="expense" className="flex items-center gap-2 data-[state=active]:bg-expense data-[state=active]:text-white">
          <TrendingDown className="w-4 h-4" />
          <span className="hidden sm:inline">Despesas</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
