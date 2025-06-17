"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DashboardChartsProps {
  className?: string
}

export function DashboardCharts({ className }: DashboardChartsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Desempenho</CardTitle>
        <CardDescription>Análise de faturamento e serviços</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="faturamento">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="faturamento">Faturamento</TabsTrigger>
            <TabsTrigger value="servicos">Serviços</TabsTrigger>
          </TabsList>
          <TabsContent value="faturamento" className="space-y-4">
            <div className="h-[300px] w-full flex items-end justify-between gap-2 pt-6">
              {Array.from({ length: 12 }).map((_, i) => {
                // Gera valores aleatórios para o gráfico
                const height = 30 + Math.random() * 70
                return (
                  <div key={i} className="relative flex flex-col items-center">
                    <div className="w-12 bg-primary rounded-t-md" style={{ height: `${height}%` }}></div>
                    <span className="text-xs text-muted-foreground mt-2">
                      {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][i]}
                    </span>
                  </div>
                )
              })}
            </div>
          </TabsContent>
          <TabsContent value="servicos" className="space-y-4">
            <div className="h-[300px] w-full flex items-end justify-between gap-2 pt-6">
              {Array.from({ length: 12 }).map((_, i) => {
                // Gera valores aleatórios para o gráfico
                const height = 30 + Math.random() * 70
                return (
                  <div key={i} className="relative flex flex-col items-center">
                    <div className="w-12 bg-green-500 rounded-t-md" style={{ height: `${height}%` }}></div>
                    <span className="text-xs text-muted-foreground mt-2">
                      {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][i]}
                    </span>
                  </div>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
