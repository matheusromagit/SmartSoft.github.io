"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, MoreHorizontal, FileText, Edit, Trash, AlertTriangle } from "lucide-react"
import { EstoqueModal } from "@/components/estoque/estoque-modal"
import { MovimentacaoModal } from "@/components/estoque/movimentacao-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

export default function EstoquePage() {
  const { toast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMovimentacaoModalOpen, setIsMovimentacaoModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("todos")

  // Dados simulados para o estoque
  const [estoque, setEstoque] = useState([
    {
      id: "1",
      codigo: "OL-5W30-1L",
      nome: "Óleo de motor 5W30",
      categoria: "Lubrificantes",
      fornecedor: "Auto Peças Brasil",
      quantidade: 25,
      estoqueMinimo: 10,
      valorCompra: 28.5,
      valorVenda: 35.0,
      localizacao: "Prateleira A1",
      ultimaCompra: "15/04/2023",
    },
    {
      id: "2",
      codigo: "FO-HND-001",
      nome: "Filtro de óleo Honda",
      categoria: "Filtros",
      fornecedor: "Honda Peças",
      quantidade: 12,
      estoqueMinimo: 5,
      valorCompra: 18.0,
      valorVenda: 25.0,
      localizacao: "Prateleira B2",
      ultimaCompra: "10/05/2023",
    },
    {
      id: "3",
      codigo: "FA-TOY-002",
      nome: "Filtro de ar Toyota",
      categoria: "Filtros",
      fornecedor: "Toyota Peças",
      quantidade: 8,
      estoqueMinimo: 5,
      valorCompra: 35.0,
      valorVenda: 45.0,
      localizacao: "Prateleira B3",
      ultimaCompra: "22/05/2023",
    },
    {
      id: "4",
      codigo: "PF-FRD-003",
      nome: "Pastilha de freio Ford",
      categoria: "Freios",
      fornecedor: "Ford Peças",
      quantidade: 3,
      estoqueMinimo: 4,
      valorCompra: 65.0,
      valorVenda: 85.0,
      localizacao: "Prateleira C1",
      ultimaCompra: "05/06/2023",
    },
    {
      id: "5",
      codigo: "CD-FT-001",
      nome: "Correia dentada Fiat",
      categoria: "Motor",
      fornecedor: "Fiat Peças",
      quantidade: 6,
      estoqueMinimo: 3,
      valorCompra: 120.0,
      valorVenda: 150.0,
      localizacao: "Prateleira D2",
      ultimaCompra: "18/06/2023",
    },
  ])

  // Histórico de movimentações
  const movimentacoes = [
    {
      id: 1,
      data: "15/04/2023",
      produto: "Óleo de motor 5W30",
      tipo: "Entrada",
      quantidade: 30,
      valor: 28.5,
      responsavel: "João Silva",
      observacao: "Compra mensal",
    },
    {
      id: 2,
      data: "20/04/2023",
      produto: "Óleo de motor 5W30",
      tipo: "Saída",
      quantidade: 5,
      valor: 35.0,
      responsavel: "André Souza",
      observacao: "OS-2023-001",
    },
    {
      id: 3,
      data: "10/05/2023",
      produto: "Filtro de óleo Honda",
      tipo: "Entrada",
      quantidade: 15,
      valor: 18.0,
      responsavel: "João Silva",
      observacao: "Compra mensal",
    },
    {
      id: 4,
      data: "22/05/2023",
      produto: "Filtro de ar Toyota",
      tipo: "Entrada",
      quantidade: 10,
      valor: 35.0,
      responsavel: "João Silva",
      observacao: "Compra mensal",
    },
    {
      id: 5,
      data: "25/05/2023",
      produto: "Filtro de ar Toyota",
      tipo: "Saída",
      quantidade: 2,
      valor: 45.0,
      responsavel: "Ricardo Oliveira",
      observacao: "OS-2023-002",
    },
  ]

  const filteredEstoque = estoque
    .filter(
      (item) =>
        item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.categoria.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((item) => {
      if (activeTab === "todos") return true
      if (activeTab === "baixo-estoque") return item.quantidade <= item.estoqueMinimo
      if (activeTab === "sem-estoque") return item.quantidade === 0
      return true
    })

  const handleAddItem = (newItem: any) => {
    // Simulando adição de item
    const id = (estoque.length + 1).toString()
    setEstoque([...estoque, { ...newItem, id }])
    toast({
      title: "Item adicionado",
      description: `${newItem.nome} foi adicionado ao estoque.`,
    })
  }

  const handleEditItem = (updatedItem: any) => {
    // Simulando edição de item
    setEstoque(estoque.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
    toast({
      title: "Item atualizado",
      description: `${updatedItem.nome} foi atualizado.`,
    })
  }

  const handleDeleteItem = (id: string) => {
    // Simulando exclusão de item
    const itemToDelete = estoque.find((item) => item.id === id)
    setEstoque(estoque.filter((item) => item.id !== id))
    toast({
      title: "Item excluído",
      description: `${itemToDelete?.nome} foi excluído do estoque.`,
    })
  }

  const handleMovimentacao = (movimentacao: any) => {
    // Simulando movimentação de estoque
    const updatedEstoque = estoque.map((estoqueItem) => {
      if (estoqueItem.id === movimentacao.produtoId) {
        return {
          ...estoqueItem,
          quantidade:
            movimentacao.tipo === "entrada"
              ? estoqueItem.quantidade + movimentacao.quantidade
              : estoqueItem.quantidade - movimentacao.quantidade,
        }
      }
      return estoqueItem
    })
    setEstoque(updatedEstoque)
    toast({
      title: `${movimentacao.tipo === "entrada" ? "Entrada" : "Saída"} registrada`,
      description: `${movimentacao.quantidade} unidades de ${
        estoque.find((item) => item.id === movimentacao.produtoId)?.nome
      } foram ${movimentacao.tipo === "entrada" ? "adicionadas ao" : "removidas do"} estoque.`,
    })
  }

  const openMovimentacaoModal = (item: any) => {
    setSelectedItem(item)
    setIsMovimentacaoModalOpen(true)
  }

  const getEstoqueStatus = (item: any) => {
    if (item.quantidade === 0) {
      return <Badge variant="destructive">Sem estoque</Badge>
    } else if (item.quantidade <= item.estoqueMinimo) {
      return (
        <Badge variant="warning" className="bg-yellow-500">
          Estoque baixo
        </Badge>
      )
    } else {
      return <Badge variant="default">Normal</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Estoque</h1>
        <p className="text-muted-foreground">Gerencie o estoque de peças e produtos da sua oficina</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por nome, código ou categoria..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filtrar</span>
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setSelectedItem(null)
              setIsModalOpen(true)
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Item
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedItem(null)
              setIsMovimentacaoModalOpen(true)
            }}
          >
            <FileText className="mr-2 h-4 w-4" />
            Nova Movimentação
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="px-6 py-4">
          <CardTitle>Controle de Estoque</CardTitle>
          <CardDescription>Total de {filteredEstoque.length} itens no estoque</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="todos" value={activeTab} onValueChange={setActiveTab}>
            <div className="px-6 py-2">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="todos">Todos os Itens</TabsTrigger>
                <TabsTrigger value="baixo-estoque">Estoque Baixo</TabsTrigger>
                <TabsTrigger value="sem-estoque">Sem Estoque</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="todos" className="m-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead className="hidden md:table-cell">Categoria</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead className="hidden md:table-cell">Estoque Mínimo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Valor Venda</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEstoque.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.codigo}</TableCell>
                      <TableCell>{item.nome}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.categoria}</TableCell>
                      <TableCell>{item.quantidade}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.estoqueMinimo}</TableCell>
                      <TableCell>{getEstoqueStatus(item)}</TableCell>
                      <TableCell className="hidden md:table-cell">R$ {item.valorVenda.toFixed(2)}</TableCell>
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
                            <DropdownMenuItem onClick={() => openMovimentacaoModal(item)}>
                              <FileText className="mr-2 h-4 w-4" />
                              <span>Registrar Movimentação</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedItem(item)
                                setIsModalOpen(true)
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteItem(item.id)}>
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
            <TabsContent value="baixo-estoque" className="m-0">
              <div className="p-6">
                <div className="mb-4 flex items-center gap-2 rounded-md bg-yellow-50 p-3 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                  <AlertTriangle className="h-5 w-5" />
                  <p>Itens com estoque abaixo do mínimo recomendado. Considere fazer um pedido de reposição.</p>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Estoque Mínimo</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEstoque.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.codigo}</TableCell>
                        <TableCell>{item.nome}</TableCell>
                        <TableCell>{item.quantidade}</TableCell>
                        <TableCell>{item.estoqueMinimo}</TableCell>
                        <TableCell>{getEstoqueStatus(item)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => openMovimentacaoModal(item)}>
                            Registrar Entrada
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="sem-estoque" className="m-0">
              <div className="p-6">
                <div className="mb-4 flex items-center gap-2 rounded-md bg-red-50 p-3 text-red-800 dark:bg-red-900/30 dark:text-red-200">
                  <AlertTriangle className="h-5 w-5" />
                  <p>Itens sem estoque. É necessário fazer um pedido de reposição urgente.</p>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Estoque Mínimo</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEstoque.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.codigo}</TableCell>
                        <TableCell>{item.nome}</TableCell>
                        <TableCell>{item.quantidade}</TableCell>
                        <TableCell>{item.estoqueMinimo}</TableCell>
                        <TableCell>{getEstoqueStatus(item)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => openMovimentacaoModal(item)}>
                            Registrar Entrada
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Movimentações</CardTitle>
          <CardDescription>Últimas movimentações de estoque</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead className="hidden md:table-cell">Valor</TableHead>
                <TableHead className="hidden md:table-cell">Responsável</TableHead>
                <TableHead className="hidden md:table-cell">Observação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movimentacoes.map((mov) => (
                <TableRow key={mov.id}>
                  <TableCell>{mov.data}</TableCell>
                  <TableCell>{mov.produto}</TableCell>
                  <TableCell>
                    <Badge variant={mov.tipo === "Entrada" ? "default" : "secondary"}>{mov.tipo}</Badge>
                  </TableCell>
                  <TableCell>{mov.quantidade}</TableCell>
                  <TableCell className="hidden md:table-cell">R$ {mov.valor.toFixed(2)}</TableCell>
                  <TableCell className="hidden md:table-cell">{mov.responsavel}</TableCell>
                  <TableCell className="hidden md:table-cell">{mov.observacao}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <EstoqueModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={selectedItem ? handleEditItem : handleAddItem}
        itemData={selectedItem}
      />

      <MovimentacaoModal
        isOpen={isMovimentacaoModalOpen}
        onClose={() => setIsMovimentacaoModalOpen(false)}
        onSave={handleMovimentacao}
        itemData={selectedItem}
        produtos={estoque}
      />
    </div>
  )
}
