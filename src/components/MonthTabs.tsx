import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface MonthTabsProps {
  months: string[]; // Array de meses no formato "YYYY-MM"
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

export const MonthTabs = ({ months, selectedMonth, onMonthChange }: MonthTabsProps) => {
  const currentIndex = months.indexOf(selectedMonth);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < months.length - 1;

  const handlePrevious = () => {
    if (canGoPrevious) {
      onMonthChange(months[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onMonthChange(months[currentIndex + 1]);
    }
  };

  const formatMonth = (monthStr: string) => {
    try {
      const date = parseISO(`${monthStr}-01`);
      return format(date, "MMM/yyyy", { locale: ptBR });
    } catch {
      return monthStr;
    }
  };

  if (months.length === 0) return null;

  return (
    <div className="flex items-center gap-2 animate-fade-in">
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePrevious}
        disabled={!canGoPrevious}
        className="h-10 w-10 flex-shrink-0"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <ScrollArea className="flex-1">
        <div className="flex gap-2 pb-2">
          {months.map((month) => (
            <Button
              key={month}
              variant={month === selectedMonth ? "default" : "outline"}
              onClick={() => onMonthChange(month)}
              className={`flex-shrink-0 capitalize ${
                month === selectedMonth 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "hover:bg-secondary"
              }`}
            >
              {formatMonth(month)}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleNext}
        disabled={!canGoNext}
        className="h-10 w-10 flex-shrink-0"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};
