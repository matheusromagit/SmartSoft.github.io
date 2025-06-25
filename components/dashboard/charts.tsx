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
  // Dados com valores MUITO diferentes para garantir visibilidade
  const faturamentoData = [
    { month: "Jan", value: 25000, services: 20 }, // MENOR
    { month: "Fev", value: 35000, services: 28 },
    { month: "Mar", value: 42000, services: 34 },
    { month: "Abr", value: 38000, services: 30 },
    { month: "Mai", value: 55000, services: 44 },
    { month: "Jun", value: 48000, services: 38 },
    { month: "Jul", value: 62000, services: 50 },
    { month: "Ago", value: 58000, services: 46 },
    { month: "Set", value: 45000, services: 36 },
    { month: "Out", value: 68000, services: 54 },
    { month: "Nov", value: 72000, services: 58 },
    { month: "Dez", value: 85000, services: 68 }, // MAIOR
  ];

  const maxValue = Math.max(...faturamentoData.map((d) => d.value)); // 85000
  const minValue = Math.min(...faturamentoData.map((d) => d.value)); // 25000
  const maxServices = Math.max(...faturamentoData.map((d) => d.services)); // 68
  const minServices = Math.min(...faturamentoData.map((d) => d.services)); // 20

  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }, []);

  // Função para calcular cor baseada no valor
  const getColorByValue = useCallback(
    (value: number, min: number, max: number) => {
      const normalized = (value - min) / (max - min);
      const red = Math.round(255 * (1 - normalized));
      const green = Math.round(255 * normalized);
      return `rgb(${red}, ${green}, 0)`;
    },
    [],
  );

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
            <div className="h-[300px] w-full flex items-end justify-center gap-4 px-4 pt-20 pb-4 relative">
              {faturamentoData.map((data, i) => {
                // ALTURA DIRETA E SIMPLES: valor/máximo * altura disponível
                const heightPx = (data.value / maxValue) * 250; // 250px máximo
                const finalHeight = Math.max(heightPx, 30); // Mínimo 30px

                const isHovered = hoveredMonth === data.month;
                const barColor = getColorByValue(
                  data.value,
                  minValue,
                  maxValue,
                );

                return (
                  <div
                    key={i}
                    className="relative flex flex-col items-center group"
                  >
                    {/* Valor ACIMA da barra */}
                    <span className="text-xs font-bold text-foreground mb-1">
                      {Math.round(data.value / 1000)}k
                    </span>

                    <div
                      className={`w-8 rounded-t-md transition-all duration-200 cursor-pointer relative ${
                        isHovered ? "opacity-80 scale-105" : "hover:opacity-80"
                      }`}
                      style={{
                        height: `${finalHeight}px`,
                        backgroundColor: barColor,
                      }}
                      onMouseEnter={() => setHoveredMonth(data.month)}
                      onMouseLeave={() => setHoveredMonth(null)}
                    >
                      {isHovered && (
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10">
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
          </TabsContent>

          <TabsContent value="servicos" className="space-y-4">
            <div className="h-[300px] w-full flex items-end justify-center gap-4 px-4 pt-12 pb-4 relative">
              {faturamentoData.map((data, i) => {
                // ALTURA DIRETA E SIMPLES: valor/máximo * altura disponível
                const heightPx = (data.services / maxServices) * 250; // 250px máximo
                const finalHeight = Math.max(heightPx, 30); // Mínimo 30px

                const isHovered = hoveredMonth === data.month;
                const barColor = getColorByValue(
                  data.services,
                  minServices,
                  maxServices,
                );

                return (
                  <div
                    key={i}
                    className="relative flex flex-col items-center group"
                  >
                    {/* Valor ACIMA da barra */}
                    <span className="text-xs font-bold text-foreground mb-1">
                      {data.services}
                    </span>

                    <div
                      className={`w-8 rounded-t-md transition-all duration-200 cursor-pointer relative ${
                        isHovered ? "opacity-80 scale-105" : "hover:opacity-80"
                      }`}
                      style={{
                        height: `${finalHeight}px`,
                        backgroundColor: barColor,
                      }}
                      onMouseEnter={() => setHoveredMonth(data.month)}
                      onMouseLeave={() => setHoveredMonth(null)}
                    >
                      {isHovered && (
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10">
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
