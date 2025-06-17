"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Search, FileDown, Filter, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ContaModal } from "@/components/financeiro/conta-modal"

// Dados de exemplo
const contasReceber = [
  {
    id: "1",
    descricao: "Serviço de troca de óleo",
    cliente: "João Silva",
    valor: 150.0,
    vencimento: "2023-06-15",
    status: "pendente",
  },
  {
    id: "2",
    descricao: "Reparo no motor",
    cliente: "Maria Oliveira",
    valor: 850.0,
    vencimento: "2023-06-20",
    status: "pago",
  },
  {
    id: "3",
    descricao: "Troca de pastilhas de freio",
    cliente: "Carlos Santos",
    valor: 320.0,
    vencimento: "2023-06-25",
    status: "atrasado",
  },
]

const contasPagar = [
  {
    id: "1",
    descricao: "Fornecedor de peças",
    fornecedor: "Auto Peças Ltda",
    valor: 1200.0,
    vencimento: "2023-06-18",
    status: "pendente",
  },
  {
    id: "2",
    descricao: "Aluguel da oficina",
    fornecedor: "Imobiliária Central",
    valor: 2500.0,
    vencimento: "2023-06-10",
    status: "pago",
  },
  {
    id: "3",
    descricao: "Conta de energia",
    fornecedor: "Companhia Elétrica",
    valor: 450.0,
    vencimento: "2023-06-22",
    status: "atrasado",
  },
]

export default function ContasPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"receber" | "pagar">("receber")

  const openModal = (type: "receber" | "pagar") => {
    setModalType(type)
    setIsModalOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendente":
        return <Badge variant="outline">Pendente</Badge>
      case "pago":
        return <Badge variant="success">Pago</Badge>
      case "atrasado":
        return <Badge variant="destructive">Atrasado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Contas a Pagar e Receber</h1>
      </div>

      <Tabs defaultValue="receber" className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
          <TabsList>
            <TabsTrigger value="receber">Contas a Receber</TabsTrigger>
            <TabsTrigger value="pagar">Contas a Pagar</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar..." className="w-full sm:w-[200px] pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="receber">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Contas a Receber</CardTitle>
                  <CardDescription>Gerencie os valores a receber de clientes</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileDown className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                  <Button size="sm" onClick={() => openModal("receber")}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nova Conta
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contasReceber.map((conta) => (
                    <TableRow key={conta.id}>
                      <TableCell className="font-medium">{conta.descricao}</TableCell>
                      <TableCell>{conta.cliente}</TableCell>
                      <TableCell className="text-right">R$ {conta.valor.toFixed(2)}</TableCell>
                      <TableCell>{new Date(conta.vencimento).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell>{getStatusBadge(conta.status)}</TableCell>
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
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Marcar como pago</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pagar">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Contas a Pagar</CardTitle>
                  <CardDescription>Gerencie os valores a pagar a fornecedores</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileDown className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                  <Button size="sm" onClick={() => openModal("pagar")}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nova Conta
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contasPagar.map((conta) => (
                    <TableRow key={conta.id}>
                      <TableCell className="font-medium">{conta.descricao}</TableCell>
                      <TableCell>{conta.fornecedor}</TableCell>
                      <TableCell className="text-right">R$ {conta.valor.toFixed(2)}</TableCell>
                      <TableCell>{new Date(conta.vencimento).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell>{getStatusBadge(conta.status)}</TableCell>
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
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Marcar como pago</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ContaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} tipo={modalType} />
    </div>
  )
}
