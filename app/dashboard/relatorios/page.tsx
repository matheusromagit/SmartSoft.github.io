"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, subMonths } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { CalendarIcon, Download, Printer } from "lucide-react"

export default function RelatoriosPage() {
  const [activeTab, setActiveTab] = useState("financeiro")
  const [periodoFiltro, setPeriodoFiltro] = useState("ultimo-mes")
  const [dataInicio, setDataInicio] = useState<Date>(subMonths(new Date(), 1))
  const [dataFim, setDataFim] = useState<Date>(new Date())

  // Dados simulados para os relatórios - mais detalhados
  const dadosFinanceiros = {
    receitas: [
      { mes: "Jan", valor: 15200, ano: 2023 },
      { mes: "Fev", valor: 18500, ano: 2023 },
      { mes: "Mar", valor: 16800, ano: 2023 },
      { mes: "Abr", valor: 19200, ano: 2023 },
      { mes: "Mai", valor: 21500, ano: 2023 },
      { mes: "Jun", valor: 23000, ano: 2023 },
      { mes: "Jul", valor: 24500, ano: 2023 },
      { mes: "Ago", valor: 26000, ano: 2023 },
      { mes: "Set", valor: 25800, ano: 2023 },
      { mes: "Out", valor: 27500, ano: 2023 },
      { mes: "Nov", valor: 28200, ano: 2023 },
      { mes: "Dez", valor: 30000, ano: 2023 },
    ],
    despesas: [
      { mes: "Jan", valor: 12800, ano: 2023 },
      { mes: "Fev", valor: 13200, ano: 2023 },
      { mes: "Mar", valor: 13500, ano: 2023 },
      { mes: "Abr", valor: 14000, ano: 2023 },
      { mes: "Mai", valor: 14500, ano: 2023 },
      { mes: "Jun", valor: 15000, ano: 2023 },
      { mes: "Jul", valor: 15500, ano: 2023 },
      { mes: "Ago", valor: 16000, ano: 2023 },
      { mes: "Set", valor: 16200, ano: 2023 },
      { mes: "Out", valor: 16800, ano: 2023 },
      { mes: "Nov", valor: 17500, ano: 2023 },
      { mes: "Dez", valor: 18000, ano: 2023 },
    ],
    lucro: [
      { mes: "Jan", valor: 2400, ano: 2023 },
      { mes: "Fev", valor: 5300, ano: 2023 },
      { mes: "Mar", valor: 3300, ano: 2023 },
      { mes: "Abr", valor: 5200, ano: 2023 },
      { mes: "Mai", valor: 7000, ano: 2023 },
      { mes: "Jun", valor: 8000, ano: 2023 },
      { mes: "Jul", valor: 9000, ano: 2023 },
      { mes: "Ago", valor: 10000, ano: 2023 },
      { mes: "Set", valor: 9600, ano: 2023 },
      { mes: "Out", valor: 10700, ano: 2023 },
      { mes: "Nov", valor: 10700, ano: 2023 },
      { mes: "Dez", valor: 12000, ano: 2023 },
    ],
    // Dados históricos para comparação
    historico: {
      receitas: [
        { ano: 2021, total: 180000 },
        { ano: 2022, total: 220000 },
        { ano: 2023, total: 276200 },
      ],
      despesas: [
        { ano: 2021, total: 150000 },
        { ano: 2022, total: 170000 },
        { ano: 2023, total: 183000 },
      ],
      lucro: [
        { ano: 2021, total: 30000 },
        { ano: 2022, total: 50000 },
        { ano: 2023, total: 93200 },
      ],
    },
  }

  const dadosServicos = [
    { tipo: "Troca de óleo e filtros", quantidade: 450, percentual: 30, valorMedio: 180 },
    { tipo: "Revisão completa", quantidade: 250, percentual: 16.7, valorMedio: 450 },
    { tipo: "Alinhamento e balanceamento", quantidade: 200, percentual: 13.3, valorMedio: 120 },
    { tipo: "Diagnóstico eletrônico", quantidade: 150, percentual: 10, valorMedio: 150 },
    { tipo: "Troca de pastilhas de freio", quantidade: 180, percentual: 12, valorMedio: 220 },
    { tipo: "Outros", quantidade: 270, percentual: 18, valorMedio: 280 },
  ]

  const dadosClientes = [
    { mes: "Jan", novos: 12, recorrentes: 35, ano: 2023 },
    { mes: "Fev", novos: 15, recorrentes: 38, ano: 2023 },
    { mes: "Mar", novos: 10, recorrentes: 42, ano: 2023 },
    { mes: "Abr", novos: 18, recorrentes: 45, ano: 2023 },
    { mes: "Mai", novos: 20, recorrentes: 48, ano: 2023 },
    { mes: "Jun", novos: 22, recorrentes: 52, ano: 2023 },
    { mes: "Jul", novos: 25, recorrentes: 55, ano: 2023 },
    { mes: "Ago", novos: 28, recorrentes: 58, ano: 2023 },
    { mes: "Set", novos: 24, recorrentes: 62, ano: 2023 },
    { mes: "Out", novos: 30, recorrentes: 65, ano: 2023 },
    { mes: "Nov", novos: 32, recorrentes: 68, ano: 2023 },
    { mes: "Dez", novos: 35, recorrentes: 72, ano: 2023 },
  ]

  const dadosEstoque = [
    { categoria: "Lubrificantes", quantidade: 85, valor: 2975, giro: 15 },
    { categoria: "Filtros", quantidade: 120, valor: 3600, giro: 20 },
    { categoria: "Freios", quantidade: 45, valor: 3825, giro: 30 },
    { categoria: "Motor", quantidade: 30, valor: 4500, giro: 45 },
    { categoria: "Suspensão", quantidade: 25, valor: 3750, giro: 60 },
    { categoria: "Elétrica", quantidade: 60, valor: 2400, giro: 25 },
  ]

  // Histórico de movimentações de estoque
  const historicoEstoque = [
    { mes: "Jan", entradas: 120, saidas: 100, ano: 2023 },
    { mes: "Fev", entradas: 150, saidas: 130, ano: 2023 },
    { mes: "Mar", entradas: 130, saidas: 140, ano: 2023 },
    { mes: "Abr", entradas: 160, saidas: 150, ano: 2023 },
    { mes: "Mai", entradas: 180, saidas: 170, ano: 2023 },
    { mes: "Jun", entradas: 200, saidas: 190, ano: 2023 },
    { mes: "Jul", entradas: 190, saidas: 200, ano: 2023 },
    { mes: "Ago", entradas: 210, saidas: 220, ano: 2023 },
    { mes: "Set", entradas: 200, saidas: 210, ano: 2023 },
    { mes: "Out", entradas: 230, saidas: 240, ano: 2023 },
    { mes: "Nov", entradas: 250, saidas: 260, ano: 2023 },
    { mes: "Dez", entradas: 270, saidas: 280, ano: 2023 },
  ]

  // Função para renderizar o gráfico de barras
  const renderBarChart = (data: any[], keyName: string, valueName: string, color: string) => {
    const maxValue = Math.max(...data.map((item) => item[valueName]))

    return (
      <div className="h-[300px] w-full flex items-end justify-between gap-1 pt-6">
        {data.map((item, i) => {
          const height = (item[valueName] / maxValue) * 100
          return (
            <div key={i} className="relative flex flex-col items-center flex-1">
              <div
                className={`w-full max-w-[40px] mx-auto ${color} rounded-t-md`}
                style={{ height: `${Math.max(height, 1)}%` }}
              ></div>
              <span className="text-xs text-muted-foreground mt-2 truncate w-full text-center">{item[keyName]}</span>
            </div>
          )
        })}
      </div>
    )
  }

  // Função para renderizar o gráfico de barras históricas
  const renderHistoricalBarChart = (data: any[], keyName: string, valueName: string) => {
    const maxValue = Math.max(...data.map((item) => item[valueName]))

    return (
      <div className="h-[200px] w-full flex items-end justify-center gap-8 pt-6">
        {data.map((item, i) => {
          const height = (item[valueName] / maxValue) * 100
          return (
            <div key={i} className="relative flex flex-col items-center">
              <div className="w-24 bg-primary rounded-t-md" style={{ height: `${Math.max(height, 1)}%` }}></div>
              <div className="text-center mt-2">
                <span className="text-sm font-medium">{item[keyName]}</span>
                <p className="text-xs text-muted-foreground">R$ {item[valueName].toLocaleString("pt-BR")}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // Função para renderizar o gráfico de pizza
  const renderPieChart = (data: any[]) => {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="relative h-64 w-64">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            {data.map((item, index) => {
              const startAngle =
                index > 0 ? data.slice(0, index).reduce((sum, curr) => sum + curr.percentual, 0) * 3.6 : 0
              const endAngle = startAngle + item.percentual * 3.6

              const x1 = 50 + 40 * Math.cos(((startAngle - 90) * Math.PI) / 180)
              const y1 = 50 + 40 * Math.sin(((startAngle - 90) * Math.PI) / 180)
              const x2 = 50 + 40 * Math.cos(((endAngle - 90) * Math.PI) / 180)
              const y2 = 50 + 40 * Math.sin(((endAngle - 90) * Math.PI) / 180)

              const largeArcFlag = item.percentual > 50 ? 1 : 0

              const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#6b7280"]

              return (
                <path
                  key={index}
                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={colors[index % colors.length]}
                  stroke="white"
                  strokeWidth="0.5"
                />
              )
            })}
          </svg>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {data.map((item, index) => {
            const colors = [
              "bg-blue-500",
              "bg-green-500",
              "bg-yellow-500",
              "bg-red-500",
              "bg-purple-500",
              "bg-gray-500",
            ]
            return (
              <div key={index} className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${colors[index % colors.length]}`}></div>
                <span className="text-sm">
                  {item.tipo} ({item.percentual}%)
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-muted-foreground">Visualize relatórios e análises da sua oficina</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Select value={periodoFiltro} onValueChange={setPeriodoFiltro}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="este-mes">Este mês</SelectItem>
              <SelectItem value="ultimo-mes">Último mês</SelectItem>
              <SelectItem value="ultimos-3-meses">Últimos 3 meses</SelectItem>
              <SelectItem value="ultimos-6-meses">Últimos 6 meses</SelectItem>
              <SelectItem value="este-ano">Este ano</SelectItem>
              <SelectItem value="personalizado">Personalizado</SelectItem>
            </SelectContent>
          </Select>

          {periodoFiltro === "personalizado" && (
            <>
              <div className="flex items-center gap-2">
                <span className="text-sm">De:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[180px] justify-start text-left font-normal",
                        !dataInicio && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dataInicio ? (
                        format(dataInicio, "dd/MM/yyyy", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dataInicio}
                      onSelect={(date) => date && setDataInicio(date)}
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm">Até:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[180px] justify-start text-left font-normal",
                        !dataFim && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dataFim ? format(dataFim, "dd/MM/yyyy", { locale: ptBR }) : <span>Selecione uma data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dataFim}
                      onSelect={(date) => date && setDataFim(date)}
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="financeiro" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          <TabsTrigger value="servicos">Serviços</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
          <TabsTrigger value="estoque">Estoque</TabsTrigger>
        </TabsList>

        <TabsContent value="financeiro" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Receitas</CardTitle>
                <CardDescription>Total de receitas por mês</CardDescription>
              </CardHeader>
              <CardContent>
                {renderBarChart(dadosFinanceiros.receitas, "mes", "valor", "bg-green-500")}
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Total: R${" "}
                    {dadosFinanceiros.receitas.reduce((sum, item) => sum + item.valor, 0).toLocaleString("pt-BR")}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Despesas</CardTitle>
                <CardDescription>Total de despesas por mês</CardDescription>
              </CardHeader>
              <CardContent>
                {renderBarChart(dadosFinanceiros.despesas, "mes", "valor", "bg-red-500")}
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Total: R${" "}
                    {dadosFinanceiros.despesas.reduce((sum, item) => sum + item.valor, 0).toLocaleString("pt-BR")}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Lucro</CardTitle>
                <CardDescription>Lucro mensal (Receitas - Despesas)</CardDescription>
              </CardHeader>
              <CardContent>
                {renderBarChart(dadosFinanceiros.lucro, "mes", "valor", "bg-blue-500")}
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Total: R${" "}
                    {dadosFinanceiros.lucro.reduce((sum, item) => sum + item.valor, 0).toLocaleString("pt-BR")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Histórico Financeiro</CardTitle>
              <CardDescription>Comparativo anual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h3 className="mb-4 text-lg font-medium text-center">Receitas</h3>
                  {renderHistoricalBarChart(dadosFinanceiros.historico.receitas, "ano", "total")}
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-medium text-center">Despesas</h3>
                  {renderHistoricalBarChart(dadosFinanceiros.historico.despesas, "ano", "total")}
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-medium text-center">Lucro</h3>
                  {renderHistoricalBarChart(dadosFinanceiros.historico.lucro, "ano", "total")}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Análise Financeira</CardTitle>
              <CardDescription>Resumo financeiro do período selecionado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Indicadores Financeiros</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b pb-2">
                      <span>Total de Receitas:</span>
                      <span className="font-medium text-green-500 dark:text-green-400">
                        R${" "}
                        {dadosFinanceiros.receitas.reduce((sum, item) => sum + item.valor, 0).toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Total de Despesas:</span>
                      <span className="font-medium text-red-500 dark:text-red-400">
                        R${" "}
                        {dadosFinanceiros.despesas.reduce((sum, item) => sum + item.valor, 0).toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Lucro Total:</span>
                      <span className="font-medium text-blue-500 dark:text-blue-400">
                        R$ {dadosFinanceiros.lucro.reduce((sum, item) => sum + item.valor, 0).toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Margem de Lucro:</span>
                      <span className="font-medium">
                        {(
                          (dadosFinanceiros.lucro.reduce((sum, item) => sum + item.valor, 0) /
                            dadosFinanceiros.receitas.reduce((sum, item) => sum + item.valor, 0)) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ticket Médio:</span>
                      <span className="font-medium">R$ 350,00</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-medium">Comparativo com Período Anterior</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b pb-2">
                      <span>Receitas:</span>
                      <span className="font-medium text-green-500 dark:text-green-400">+12,5%</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Despesas:</span>
                      <span className="font-medium text-red-500 dark:text-red-400">+5,2%</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Lucro:</span>
                      <span className="font-medium text-blue-500 dark:text-blue-400">+18,7%</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Margem de Lucro:</span>
                      <span className="font-medium">+2,3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ticket Médio:</span>
                      <span className="font-medium">+5,8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="servicos" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Serviços Realizados</CardTitle>
                <CardDescription>Distribuição de serviços por tipo</CardDescription>
              </CardHeader>
              <CardContent>{renderPieChart(dadosServicos)}</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Análise de Serviços</CardTitle>
                <CardDescription>Detalhamento dos serviços realizados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <span>Total de Serviços:</span>
                    <span className="font-medium">{dadosServicos.reduce((sum, item) => sum + item.quantidade, 0)}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Serviço Mais Comum:</span>
                    <span className="font-medium">Troca de óleo e filtros</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Média Diária:</span>
                    <span className="font-medium">5 serviços</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Tempo Médio por Serviço:</span>
                    <span className="font-medium">1h 45min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Satisfação do Cliente:</span>
                    <span className="font-medium">4.8/5.0</span>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="mb-4 text-lg font-medium">Serviços por Mecânico</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>André Souza:</span>
                      <span className="font-medium">420 serviços</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ricardo Oliveira:</span>
                      <span className="font-medium">380 serviços</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Marcos Lima:</span>
                      <span className="font-medium">350 serviços</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Paulo Ferreira:</span>
                      <span className="font-medium">300 serviços</span>
                    </div>
                    <div className="flex justify-between">
                      <span>José Almeida:</span>
                      <span className="font-medium">250 serviços</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Desempenho de Serviços</CardTitle>
              <CardDescription>Análise detalhada por tipo de serviço</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 text-left">Tipo de Serviço</th>
                      <th className="pb-2 text-center">Quantidade</th>
                      <th className="pb-2 text-center">Tempo Médio</th>
                      <th className="pb-2 text-center">Valor Médio</th>
                      <th className="pb-2 text-center">Satisfação</th>
                      <th className="pb-2 text-right">Faturamento</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Troca de óleo e filtros</td>
                      <td className="py-2 text-center">450</td>
                      <td className="py-2 text-center">45min</td>
                      <td className="py-2 text-center">R$ 180,00</td>
                      <td className="py-2 text-center">4.9/5.0</td>
                      <td className="py-2 text-right">R$ 81.000,00</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Revisão completa</td>
                      <td className="py-2 text-center">250</td>
                      <td className="py-2 text-center">3h 30min</td>
                      <td className="py-2 text-center">R$ 450,00</td>
                      <td className="py-2 text-center">4.7/5.0</td>
                      <td className="py-2 text-right">R$ 112.500,00</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Alinhamento e balanceamento</td>
                      <td className="py-2 text-center">200</td>
                      <td className="py-2 text-center">1h 15min</td>
                      <td className="py-2 text-center">R$ 120,00</td>
                      <td className="py-2 text-center">4.8/5.0</td>
                      <td className="py-2 text-right">R$ 24.000,00</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Diagnóstico eletrônico</td>
                      <td className="py-2 text-center">150</td>
                      <td className="py-2 text-center">1h</td>
                      <td className="py-2 text-center">R$ 150,00</td>
                      <td className="py-2 text-center">4.6/5.0</td>
                      <td className="py-2 text-right">R$ 22.500,00</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Troca de pastilhas de freio</td>
                      <td className="py-2 text-center">180</td>
                      <td className="py-2 text-center">1h 30min</td>
                      <td className="py-2 text-center">R$ 220,00</td>
                      <td className="py-2 text-center">4.8/5.0</td>
                      <td className="py-2 text-right">R$ 39.600,00</td>
                    </tr>
                    <tr>
                      <td className="py-2">Outros</td>
                      <td className="py-2 text-center">270</td>
                      <td className="py-2 text-center">2h</td>
                      <td className="py-2 text-center">R$ 280,00</td>
                      <td className="py-2 text-center">4.7/5.0</td>
                      <td className="py-2 text-right">R$ 75.600,00</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t">
                      <td className="pt-2 font-medium">Total</td>
                      <td className="pt-2 text-center font-medium">1.500</td>
                      <td className="pt-2 text-center">-</td>
                      <td className="pt-2 text-center">-</td>
                      <td className="pt-2 text-center font-medium">4.8/5.0</td>
                      <td className="pt-2 text-right font-medium">R$ 355.200,00</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clientes" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Evolução de Clientes</CardTitle>
                <CardDescription>Novos clientes vs. recorrentes por mês</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <div className="flex h-full items-end">
                    {dadosClientes.map((item, i) => (
                      <div key={i} className="flex-1 space-y-2">
                        <div className="flex flex-col items-center">
                          <div
                            className="w-full max-w-[40px] mx-auto bg-blue-500 rounded-t-md"
                            style={{ height: `${(item.recorrentes / 80) * 100}%` }}
                          ></div>
                          <div
                            className="w-full max-w-[40px] mx-auto bg-green-500 rounded-t-md"
                            style={{ height: `${(item.novos / 80) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-center">
                          <span className="text-xs text-muted-foreground">{item.mes}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Recorrentes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Novos</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Análise de Clientes</CardTitle>
                <CardDescription>Estatísticas e métricas de clientes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <span>Total de Clientes:</span>
                    <span className="font-medium">250</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Novos Clientes (período):</span>
                    <span className="font-medium">22</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Taxa de Retenção:</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Valor Médio por Cliente:</span>
                    <span className="font-medium">R$ 350,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frequência Média de Visitas:</span>
                    <span className="font-medium">3,2 meses</span>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="mb-4 text-lg font-medium">Top 5 Clientes</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Carlos Silva:</span>
                      <span className="font-medium">R$ 2.850,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Maria Oliveira:</span>
                      <span className="font-medium">R$ 2.450,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>João Santos:</span>
                      <span className="font-medium">R$ 1.980,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ana Pereira:</span>
                      <span className="font-medium">R$ 1.750,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pedro Souza:</span>
                      <span className="font-medium">R$ 1.620,00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Segmentação de Clientes</CardTitle>
              <CardDescription>Análise por perfil de cliente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Por Frequência</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Alta (mensal):</span>
                      <span>15%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Média (trimestral):</span>
                      <span>45%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Baixa (semestral+):</span>
                      <span>40%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-yellow-500" style={{ width: "40%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Por Valor</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Premium (R$500+):</span>
                      <span>20%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-purple-500" style={{ width: "20%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Médio (R$200-500):</span>
                      <span>50%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: "50%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Básico (até R$200):</span>
                      <span>30%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: "30%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Por Tipo de Veículo</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Carros Populares:</span>
                      <span>65%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>SUVs:</span>
                      <span>20%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: "20%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Veículos Premium:</span>
                      <span>15%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-purple-500" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estoque" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Valor em Estoque</CardTitle>
                <CardDescription>Valor por categoria de produtos</CardDescription>
              </CardHeader>
              <CardContent>
                {renderBarChart(dadosEstoque, "categoria", "valor", "bg-blue-500")}
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Valor Total: R$ {dadosEstoque.reduce((sum, item) => sum + item.valor, 0).toLocaleString("pt-BR")}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quantidade em Estoque</CardTitle>
                <CardDescription>Quantidade por categoria de produtos</CardDescription>
              </CardHeader>
              <CardContent>
                {renderBarChart(dadosEstoque, "categoria", "quantidade", "bg-green-500")}
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Quantidade Total: {dadosEstoque.reduce((sum, item) => sum + item.quantidade, 0)} itens
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Movimentação de Estoque</CardTitle>
              <CardDescription>Entradas e saídas por mês</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <div className="flex h-full items-end">
                  {historicoEstoque.map((item, i) => (
                    <div key={i} className="flex-1 space-y-2">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-full max-w-[40px] mx-auto bg-green-500 rounded-t-md"
                          style={{ height: `${(item.entradas / 300) * 100}%` }}
                        ></div>
                        <div
                          className="w-full max-w-[40px] mx-auto bg-red-500 rounded-t-md"
                          style={{ height: `${(item.saidas / 300) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-muted-foreground">{item.mes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Entradas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">Saídas</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Análise de Estoque</CardTitle>
              <CardDescription>Estatísticas e métricas de estoque</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Indicadores de Estoque</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b pb-2">
                      <span>Total de Itens:</span>
                      <span className="font-medium">
                        {dadosEstoque.reduce((sum, item) => sum + item.quantidade, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Valor Total em Estoque:</span>
                      <span className="font-medium">
                        R$ {dadosEstoque.reduce((sum, item) => sum + item.valor, 0).toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Itens com Estoque Baixo:</span>
                      <span className="font-medium text-yellow-500 dark:text-yellow-400">12</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Itens sem Estoque:</span>
                      <span className="font-medium text-red-500 dark:text-red-400">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Giro de Estoque Médio:</span>
                      <span className="font-medium">45 dias</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-medium">Movimentações</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b pb-2">
                      <span>Entradas no Período:</span>
                      <span className="font-medium">850 itens</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Saídas no Período:</span>
                      <span className="font-medium">1200 itens</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Valor de Compras:</span>
                      <span className="font-medium">R$ 85.000,00</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Valor de Vendas:</span>
                      <span className="font-medium">R$ 128.000,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Margem Média:</span>
                      <span className="font-medium">33,5%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="mb-4 text-lg font-medium">Produtos com Estoque Crítico</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-2 text-left">Produto</th>
                        <th className="pb-2 text-center">Código</th>
                        <th className="pb-2 text-center">Quantidade</th>
                        <th className="pb-2 text-center">Estoque Mínimo</th>
                        <th className="pb-2 text-center">Status</th>
                        <th className="pb-2 text-right">Valor Unitário</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Pastilha de freio Ford</td>
                        <td className="py-2 text-center">PF-FRD-003</td>
                        <td className="py-2 text-center">3</td>
                        <td className="py-2 text-center">4</td>
                        <td className="py-2 text-center">
                          <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                            Estoque Baixo
                          </span>
                        </td>
                        <td className="py-2 text-right">R$ 85,00</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Filtro de ar Toyota</td>
                        <td className="py-2 text-center">FA-TOY-002</td>
                        <td className="py-2 text-center">2</td>
                        <td className="py-2 text-center">5</td>
                        <td className="py-2 text-center">
                          <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                            Estoque Baixo
                          </span>
                        </td>
                        <td className="py-2 text-right">R$ 45,00</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Vela de ignição VW</td>
                        <td className="py-2 text-center">VI-VW-005</td>
                        <td className="py-2 text-center">0</td>
                        <td className="py-2 text-center">10</td>
                        <td className="py-2 text-center">
                          <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-800 dark:bg-red-900/30 dark:text-red-200">
                            Sem Estoque
                          </span>
                        </td>
                        <td className="py-2 text-right">R$ 25,00</td>
                      </tr>
                      <tr>
                        <td className="py-2">Amortecedor dianteiro Fiat</td>
                        <td className="py-2 text-center">AD-FT-008</td>
                        <td className="py-2 text-center">1</td>
                        <td className="py-2 text-center">2</td>
                        <td className="py-2 text-center">
                          <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                            Estoque Baixo
                          </span>
                        </td>
                        <td className="py-2 text-right">R$ 180,00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
