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

  // Função para calcular cor no degradê verde-vermelho baseado no valor
  const getColorByValue = useCallback(
    (value: number, min: number, max: number) => {
      // Normaliza o valor entre 0 e 1
      const normalized = (value - min) / (max - min);

      // Calcula RGB: verde (0,255,0) para vermelho (255,0,0)
      const red = Math.round(255 * (1 - normalized));
      const green = Math.round(255 * normalized);
      const blue = 0;

      return `rgb(${red}, ${green}, ${blue})`;
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
            <div className="h-[280px] w-full flex items-end justify-between gap-2 p-4 relative">
              {faturamentoData.map((data, i) => {
                const minValue = Math.min(
                  ...faturamentoData.map((d) => d.value),
                );

                // ALGORITMO SIMPLES E CORRETO: altura proporcional direta
                const heightPercent = (data.value / maxValue) * 85; // 85% da altura máxima disponível
                const actualHeight = Math.max(heightPercent, 10); // Mínimo 10%

                const isHovered = hoveredMonth === data.month;
                const barColor = getColorByValue(
                  data.value,
                  minValue,
                  maxValue,
                );

                return (
                  <div
                    key={i}
                    className="relative flex flex-col items-center group flex-1"
                  >
                    <div
                      className={`w-full max-w-[32px] rounded-t-md transition-all duration-200 cursor-pointer relative flex items-end justify-center pb-2 ${
                        isHovered ? "opacity-80 scale-105" : "hover:opacity-80"
                      }`}
                      style={{
                        height: `${actualHeight}%`,
                        backgroundColor: barColor,
                        minHeight: "40px",
                      }}
                      onMouseEnter={() => setHoveredMonth(data.month)}
                      onMouseLeave={() => setHoveredMonth(null)}
                    >
                      {/* VALOR VISÍVEL DENTRO DA COLUNA */}
                      <span className="text-xs font-bold text-white transform -rotate-90 whitespace-nowrap">
                        R$ {(data.value / 1000).toFixed(0)}k
                      </span>

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
                const minServices = Math.min(
                  ...faturamentoData.map((d) => d.services),
                );

                // Calcular altura baseada no valor mínimo como base
                const adjustedServices = data.services - minServices;
                const adjustedMaxServices = maxServices - minServices;
                const heightPercentage =
                  adjustedMaxServices > 0
                    ? (adjustedServices / adjustedMaxServices) * 80
                    : 0;
                const height = Math.max(heightPercentage, 5); // Altura mínima de 5%

                const isHovered = hoveredMonth === data.month;
                const barColor = getColorByValue(
                  data.services,
                  minServices,
                  maxServices,
                );

                return (
                  <div
                    key={i}
                    className="relative flex flex-col items-center group flex-1"
                  >
                    <div
                      className={`w-full max-w-[32px] rounded-t-md transition-all duration-200 cursor-pointer relative ${
                        isHovered ? "opacity-80 scale-105" : "hover:opacity-80"
                      }`}
                      style={{
                        height: `${height + 15}%`, // +15% para base visual
                        backgroundColor: barColor,
                        minHeight: "25px",
                      }}
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
