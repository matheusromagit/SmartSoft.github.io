"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  FileText,
  Edit,
  Trash,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Calendar,
} from "lucide-react"
import { LancamentoModal } from "@/components/financeiro/lancamento-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FinanceiroPage() {
  const { toast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLancamento, setSelectedLancamento] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("todos")
  const [periodoFiltro, setPeriodoFiltro] = useState("este-mes")

  // Dados simulados para o financeiro
  const [lancamentos, setLancamentos] = useState([
    {
      id: 1,
      data: "05/06/2023",
      descricao: "Pagamento OS-2023-002",
      categoria: "Serviços",
      tipo: "Receita",
      valor: 1250.0,
      status: "Pago",
      cliente: "Maria Oliveira",
      formaPagamento: "Cartão de Crédito",
      observacao: "Pagamento em 3x",
    },
    {
      id: 2,
      data: "10/06/2023",
      descricao: "Compra de peças",
      categoria: "Estoque",
      tipo: "Despesa",
      valor: 3500.0,
      status: "Pago",
      fornecedor: "Auto Peças Brasil",
      formaPagamento: "Transferência",
      observacao: "Compra mensal",
    },
    {
      id: 3,
      data: "15/06/2023",
      descricao: "Pagamento OS-2023-004",
      categoria: "Serviços",
      tipo: "Receita",
      valor: 320.0,
      status: "Pago",
      cliente: "Ana Pereira",
      formaPagamento: "Dinheiro",
      observacao: "",
    },
    {
      id: 4,
      data: "20/06/2023",
      descricao: "Aluguel",
      categoria: "Despesas Fixas",
      tipo: "Despesa",
      valor: 2800.0,
      status: "Pendente",
      fornecedor: "Imobiliária Central",
      formaPagamento: "Boleto",
      observacao: "Vencimento dia 20",
    },
    {
      id: 5,
      data: "25/06/2023",
      descricao: "Pagamento OS-2023-003",
      categoria: "Serviços",
      tipo: "Receita",
      valor: 480.0,
      status: "Pendente",
      cliente: "João Santos",
      formaPagamento: "Boleto",
      observacao: "Vencimento dia 30",
    },
    {
      id: 6,
      data: "28/06/2023",
      descricao: "Conta de energia",
      categoria: "Despesas Fixas",
      tipo: "Despesa",
      valor: 450.0,
      status: "Pendente",
      fornecedor: "Companhia Elétrica",
      formaPagamento: "Boleto",
      observacao: "Vencimento dia 28",
    },
  ])

  const filteredLancamentos = lancamentos
    .filter(
      (lancamento) =>
        lancamento.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lancamento.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lancamento.cliente && lancamento.cliente.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (lancamento.fornecedor && lancamento.fornecedor.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    .filter((lancamento) => {
      if (activeTab === "todos") return true
      if (activeTab === "receitas") return lancamento.tipo === "Receita"
      if (activeTab === "despesas") return lancamento.tipo === "Despesa"
      if (activeTab === "pendentes") return lancamento.status === "Pendente"
      return true
    })

  const handleAddLancamento = (newLancamento: any) => {
    // Simulando adição de lançamento
    const id = lancamentos.length + 1
    setLancamentos([...lancamentos, { ...newLancamento, id }])
    toast({
      title: "Lançamento adicionado",
      description: `${newLancamento.descricao} foi adicionado com sucesso.`,
    })
  }

  const handleEditLancamento = (updatedLancamento: any) => {
    // Simulando edição de lançamento
    setLancamentos(lancamentos.map((item) => (item.id === updatedLancamento.id ? updatedLancamento : item)))
    toast({
      title: "Lançamento atualizado",
      description: `${updatedLancamento.descricao} foi atualizado.`,
    })
  }

  const handleDeleteLancamento = (id: number) => {
    // Simulando exclusão de lançamento
    const lancamentoToDelete = lancamentos.find((item) => item.id === id)
    setLancamentos(lancamentos.filter((item) => item.id !== id))
    toast({
      title: "Lançamento excluído",
      description: `${lancamentoToDelete?.descricao} foi excluído.`,
    })
  }

  const handleStatusChange = (id: number, newStatus: string) => {
    // Simulando mudança de status
    setLancamentos(lancamentos.map((item) => (item.id === id ? { ...item, status: newStatus } : item)))
    toast({
      title: "Status atualizado",
      description: `Lançamento atualizado para "${newStatus}".`,
    })
  }

  const getTotalReceitas = () => {
    return lancamentos.filter((item) => item.tipo === "Receita").reduce((total, item) => total + item.valor, 0)
  }

  const getTotalDespesas = () => {
    return lancamentos.filter((item) => item.tipo === "Despesa").reduce((total, item) => total + item.valor, 0)
  }

  const getTotalPendentes = () => {
    return lancamentos.filter((item) => item.status === "Pendente").reduce((total, item) => total + item.valor, 0)
  }

  const getSaldo = () => {
    return getTotalReceitas() - getTotalDespesas()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pago":
        return <Badge className="bg-green-500">Pago</Badge>
      case "Pendente":
        return <Badge variant="outline">Pendente</Badge>
      case "Atrasado":
        return <Badge variant="destructive">Atrasado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "Receita":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            <ArrowUpRight className="mr-1 h-3 w-3" />
            Receita
          </Badge>
        )
      case "Despesa":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            <ArrowDownLeft className="mr-1 h-3 w-3" />
            Despesa
          </Badge>
        )
      default:
        return <Badge variant="outline">{tipo}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
        <p className="text-muted-foreground">Gerencie as finanças da sua oficina</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">R$ {getTotalReceitas().toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total de receitas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
            <ArrowDownLeft className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">R$ {getTotalDespesas().toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total de despesas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getSaldo() >= 0 ? "text-green-500" : "text-red-500"}`}>
              R$ {getSaldo().toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Receitas - Despesas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {getTotalPendentes().toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Lançamentos pendentes</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por descrição, categoria, cliente..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={periodoFiltro} onValueChange={setPeriodoFiltro}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hoje">Hoje</SelectItem>
              <SelectItem value="esta-semana">Esta semana</SelectItem>
              <SelectItem value="este-mes">Este mês</SelectItem>
              <SelectItem value="ultimo-mes">Último mês</SelectItem>
              <SelectItem value="este-ano">Este ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filtrar</span>
          </Button>
        </div>
        <Button
          onClick={() => {
            setSelectedLancamento(null)
            setIsModalOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo Lançamento
        </Button>
      </div>

      <Card>
        <CardHeader className="px-6 py-4">
          <CardTitle>Lançamentos Financeiros</CardTitle>
          <CardDescription>Gerencie receitas e despesas da sua oficina</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="todos" value={activeTab} onValueChange={setActiveTab}>
            <div className="px-6 py-2">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="receitas">Receitas</TabsTrigger>
                <TabsTrigger value="despesas">Despesas</TabsTrigger>
                <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="todos" className="m-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="hidden md:table-cell">Categoria</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLancamentos.map((lancamento) => (
                    <TableRow key={lancamento.id}>
                      <TableCell>{lancamento.data}</TableCell>
                      <TableCell className="font-medium">{lancamento.descricao}</TableCell>
                      <TableCell className="hidden md:table-cell">{lancamento.categoria}</TableCell>
                      <TableCell>{getTipoBadge(lancamento.tipo)}</TableCell>
                      <TableCell className={lancamento.tipo === "Receita" ? "text-green-500" : "text-red-500"}>
                        R$ {lancamento.valor.toFixed(2)}
                      </TableCell>
                      <TableCell>{getStatusBadge(lancamento.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Abrir menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedLancamento(lancamento)
                                setIsModalOpen(true)
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(lancamento.id, lancamento.status === "Pago" ? "Pendente" : "Pago")
                              }
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              <span>{lancamento.status === "Pago" ? "Marcar como Pendente" : "Marcar como Pago"}</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteLancamento(lancamento.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Excluir</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="receitas" className="m-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="hidden md:table-cell">Categoria</TableHead>
                    <TableHead className="hidden md:table-cell">Cliente</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLancamentos.map((lancamento) => (
                    <TableRow key={lancamento.id}>
                      <TableCell>{lancamento.data}</TableCell>
                      <TableCell className="font-medium">{lancamento.descricao}</TableCell>
                      <TableCell className="hidden md:table-cell">{lancamento.categoria}</TableCell>
                      <TableCell className="hidden md:table-cell">{lancamento.cliente || "-"}</TableCell>
                      <TableCell className="text-green-500">R$ {lancamento.valor.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(lancamento.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedLancamento(lancamento)
                            setIsModalOpen(true)
                          }}
                        >
                          Editar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="despesas" className="m-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="hidden md:table-cell">Categoria</TableHead>
                    <TableHead className="hidden md:table-cell">Fornecedor</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLancamentos.map((lancamento) => (
                    <TableRow key={lancamento.id}>
                      <TableCell>{lancamento.data}</TableCell>
                      <TableCell className="font-medium">{lancamento.descricao}</TableCell>
                      <TableCell className="hidden md:table-cell">{lancamento.categoria}</TableCell>
                      <TableCell className="hidden md:table-cell">{lancamento.fornecedor || "-"}</TableCell>
                      <TableCell className="text-red-500">R$ {lancamento.valor.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(lancamento.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedLancamento(lancamento)
                            setIsModalOpen(true)
                          }}
                        >
                          Editar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="pendentes" className="m-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead className="hidden md:table-cell">Forma Pagamento</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLancamentos.map((lancamento) => (
                    <TableRow key={lancamento.id}>
                      <TableCell>{lancamento.data}</TableCell>
                      <TableCell className="font-medium">{lancamento.descricao}</TableCell>
                      <TableCell>{getTipoBadge(lancamento.tipo)}</TableCell>
                      <TableCell className={lancamento.tipo === "Receita" ? "text-green-500" : "text-red-500"}>
                        R$ {lancamento.valor.toFixed(2)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{lancamento.formaPagamento}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleStatusChange(lancamento.id, "Pago")}>
                          Marcar como Pago
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <LancamentoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={selectedLancamento ? handleEditLancamento : handleAddLancamento}
        lancamentoData={selectedLancamento}
      />
    </div>
  )
}
