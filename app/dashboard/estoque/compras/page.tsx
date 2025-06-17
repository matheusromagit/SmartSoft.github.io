"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Search, Filter, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Dados de exemplo
const compras = [
  {
    id: "1",
    numero: "CP001",
    fornecedor: "Auto Peças Ltda",
    data: "2023-05-15",
    valor: 1250.0,
    status: "finalizada",
    itens: 8,
  },
  {
    id: "2",
    numero: "CP002",
    fornecedor: "Distribuidora de Peças ABC",
    data: "2023-05-20",
    valor: 3450.0,
    status: "pendente",
    itens: 15,
  },
  {
    id: "3",
    numero: "CP003",
    fornecedor: "Lubrax Distribuidora",
    data: "2023-05-25",
    valor: 850.0,
    status: "finalizada",
    itens: 5,
  },
  {
    id: "4",
    numero: "CP004",
    fornecedor: "Baterias Power",
    data: "2023-05-28",
    valor: 2100.0,
    status: "cancelada",
    itens: 10,
  },
]

export default function ComprasPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "finalizada":
        return <Badge variant="success">Finalizada</Badge>
      case "pendente":
        return <Badge variant="outline">Pendente</Badge>
      case "cancelada":
        return <Badge variant="destructive">Cancelada</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Compras de Peças</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Compra
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total de Compras</CardTitle>
            <CardDescription>Quantidade de compras no mês</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Valor Total</CardTitle>
            <CardDescription>Valor total das compras no mês</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">R$ 15.320,00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Compras Pendentes</CardTitle>
            <CardDescription>Compras aguardando recebimento</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-500">3</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Histórico de Compras</CardTitle>
              <CardDescription>Gerencie as compras de peças e produtos</CardDescription>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar compra..." className="w-full sm:w-[250px] pl-8" />
              </div>
              <Select>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="finalizada">Finalizada</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="text-center">Itens</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {compras.map((compra) => (
                <TableRow key={compra.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{compra.numero}</TableCell>
                  <TableCell>{compra.fornecedor}</TableCell>
                  <TableCell>{new Date(compra.data).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell className="text-right">R$ {compra.valor.toFixed(2)}</TableCell>
                  <TableCell className="text-center">{compra.itens}</TableCell>
                  <TableCell>{getStatusBadge(compra.status)}</TableCell>
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
                        <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Finalizar recebimento</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Cancelar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
