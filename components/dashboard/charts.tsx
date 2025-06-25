"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useCallback } from "react";

interface DashboardChartsProps {
  className?: string;
}

export function DashboardCharts({ className }: DashboardChartsProps) {
  // Dados de faturamento por mês (em R$) - valores mais variados
  const faturamentoData = [
    { month: "Jan", value: 32000, services: 25 }, // Menor valor
    { month: "Fev", value: 48000, services: 38 },
    { month: "Mar", value: 41000, services: 32 },
    { month: "Abr", value: 55000, services: 44 },
    { month: "Mai", value: 62000, services: 50 },
    { month: "Jun", value: 58000, services: 46 },
    { month: "Jul", value: 71000, services: 57 },
    { month: "Ago", value: 67000, services: 54 },
    { month: "Set", value: 59000, services: 47 },
    { month: "Out", value: 64000, services: 51 },
    { month: "Nov", value: 69000, services: 55 },
    { month: "Dez", value: 78000, services: 63 }, // Maior valor
  ];

  const maxValue = Math.max(...faturamentoData.map((d) => d.value));
  const maxServices = Math.max(...faturamentoData.map((d) => d.services));

  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }, []);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Desempenho</CardTitle>
        <CardDescription>
          Análise de faturamento e serviços mensais
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="faturamento">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="faturamento">Faturamento</TabsTrigger>
            <TabsTrigger value="servicos">Serviços</TabsTrigger>
          </TabsList>
          <TabsContent value="faturamento" className="space-y-4">
            <div className="h-[280px] w-full flex items-end justify-between gap-2 p-4 relative">
              {faturamentoData.map((data, i) => {
                const percentage = (data.value / maxValue) * 100;
                const height = Math.max(percentage * 0.85, 8); // Altura proporcional real, mínimo 8%
                const isHovered = hoveredMonth === data.month;

                // Encontrar valores máximo e mínimo para colorir
                const minValue = Math.min(
                  ...faturamentoData.map((d) => d.value),
                );
                const isMaxValue = data.value === maxValue;
                const isMinValue = data.value === minValue;

                let colorClass = "bg-primary";
                if (isMaxValue) colorClass = "bg-green-500";
                else if (isMinValue) colorClass = "bg-red-500";

                return (
                  <div
                    key={i}
                    className="relative flex flex-col items-center group flex-1"
                  >
                    <div
                      className={`w-full max-w-[32px] ${colorClass} rounded-t-md transition-all duration-200 cursor-pointer relative ${
                        isHovered ? "opacity-80 scale-105" : "hover:opacity-80"
                      }`}
                      style={{ height: `${height}%`, minHeight: "20px" }}
                      onMouseEnter={() => setHoveredMonth(data.month)}
                      onMouseLeave={() => setHoveredMonth(null)}
                    >
                      {isHovered && (
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs whitespace-nowrap border shadow-md z-10">
                          {formatCurrency(data.value)}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground mt-2 font-medium">
                      {data.month}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground px-4">
              <span>R$ 0</span>
              <span>{formatCurrency(maxValue)}</span>
            </div>
          </TabsContent>
          <TabsContent value="servicos" className="space-y-4">
            <div className="h-[280px] w-full flex items-end justify-between gap-2 p-4 relative">
              {faturamentoData.map((data, i) => {
                const percentage = (data.services / maxServices) * 100;
                const height = Math.max(percentage * 0.85, 8); // Altura proporcional real, mínimo 8%
                const isHovered = hoveredMonth === data.month;

                // Encontrar valores máximo e mínimo para colorir
                const minServices = Math.min(
                  ...faturamentoData.map((d) => d.services),
                );
                const isMaxServices = data.services === maxServices;
                const isMinServices = data.services === minServices;

                let colorClass = "bg-blue-500";
                if (isMaxServices) colorClass = "bg-green-500";
                else if (isMinServices) colorClass = "bg-red-500";

                return (
                  <div
                    key={i}
                    className="relative flex flex-col items-center group flex-1"
                  >
                    <div
                      className={`w-full max-w-[32px] ${colorClass} rounded-t-md transition-all duration-200 cursor-pointer relative ${
                        isHovered ? "opacity-80 scale-105" : "hover:opacity-80"
                      }`}
                      style={{ height: `${height}%`, minHeight: "20px" }}
                      onMouseEnter={() => setHoveredMonth(data.month)}
                      onMouseLeave={() => setHoveredMonth(null)}
                    >
                      {isHovered && (
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs whitespace-nowrap border shadow-md z-10">
                          {data.services} serviços
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground mt-2 font-medium">
                      {data.month}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground px-4">
              <span>0 serviços</span>
              <span>{maxServices} serviços</span>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
