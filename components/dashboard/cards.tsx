"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Calendar, ClipboardList, DollarSign, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

// Função para determinar o status com base nos valores
const getStatusColor = (current: number, average: number, type: "higher-better" | "lower-better" = "higher-better") => {
  const ratio = current / average

  if (type === "higher-better") {
    if (ratio >= 1.1) return "success" // Acima da média (bom)
    if (ratio >= 0.9) return "normal" // Na média
    return "danger" // Abaixo da média (ruim)
  } else {
    if (ratio <= 0.9) return "success" // Abaixo da média (bom para despesas)
    if (ratio <= 1.1) return "normal" // Na média
    return "danger" // Acima da média (ruim para despesas)
  }
}

// Componente de card com indicador de status
function StatusCard({
  title,
  value,
  description,
  icon: Icon,
  status,
  percentChange,
}: {
  title: string
  value: string
  description: string
  icon: any
  status: "success" | "normal" | "danger"
  percentChange?: number
}) {
  return (
    <Card
      className={cn(
        "overflow-hidden relative border-2",
        status === "success" && "border-green-500/30 dark:border-green-500/50",
        status === "danger" && "border-red-500/30 dark:border-red-500/50",
        status === "normal" && "border-blue-500/20 dark:border-blue-500/30",
        status === "success" &&
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-green-500/10 before:to-transparent before:rounded-lg dark:before:from-green-500/20",
        status === "danger" &&
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-red-500/10 before:to-transparent before:rounded-lg dark:before:from-red-500/20",
        status === "normal" &&
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/5 before:to-transparent before:rounded-lg dark:before:from-blue-500/15",
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon
          className={cn(
            "h-4 w-4",
            status === "success" && "text-green-500 dark:text-green-400",
            status === "danger" && "text-red-500 dark:text-red-400",
            status === "normal" && "text-blue-500 dark:text-blue-400",
          )}
        />
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {percentChange !== undefined && (
            <div
              className={cn(
                "mr-1 flex items-center",
                percentChange > 0 && "text-green-500 dark:text-green-400",
                percentChange < 0 && "text-red-500 dark:text-red-400",
              )}
            >
              {percentChange > 0 ? (
                <TrendingUp className="mr-1 h-3 w-3" />
              ) : percentChange < 0 ? (
                <TrendingDown className="mr-1 h-3 w-3" />
              ) : (
                <Minus className="mr-1 h-3 w-3" />
              )}
              {Math.abs(percentChange)}%
            </div>
          )}
          <span>{description}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardCards() {
  // Dados atuais e médias para comparação
  const data = {
    veiculos: { current: 127, average: 120, percentChange: 5 },
    agendamentos: { current: 8, average: 12, percentChange: -15 },
    ordensServico: { current: 15, average: 18, percentChange: -10 },
    faturamento: { current: 12450, average: 10500, percentChange: 18 },
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatusCard
        title="Veículos Ativos"
        value="127"
        description="comparado à média"
        icon={Car}
        status={getStatusColor(data.veiculos.current, data.veiculos.average)}
        percentChange={data.veiculos.percentChange}
      />

      <StatusCard
        title="Agendamentos"
        value="24"
        description="comparado à média"
        icon={Calendar}
        status={getStatusColor(data.agendamentos.current, data.agendamentos.average)}
        percentChange={data.agendamentos.percentChange}
      />

      <StatusCard
        title="Ordens de Serviço"
        value="15"
        description="comparado à média"
        icon={ClipboardList}
        status={getStatusColor(data.ordensServico.current, data.ordensServico.average)}
        percentChange={data.ordensServico.percentChange}
      />

      <StatusCard
        title="Faturamento"
        value="R$ 12.450"
        description="comparado à média"
        icon={DollarSign}
        status={getStatusColor(data.faturamento.current, data.faturamento.average)}
        percentChange={data.faturamento.percentChange}
      />
    </div>
  )
}
