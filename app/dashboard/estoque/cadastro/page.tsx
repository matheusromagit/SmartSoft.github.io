"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Search, Filter, MoreHorizontal, Upload, Download } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

// Dados de exemplo
const pecas = [
  {
    id: "1",
    codigo: "P001",
    nome: "Filtro de Óleo",
    categoria: "Filtros",
    fornecedor: "Auto Peças Ltda",
    precoCompra: 25.0,
    precoVenda: 45.0,
    estoque: 15,
    estoqueMinimo: 5,
    ativo: true,
  },
  {
    id: "2",
    codigo: "P002",
    nome: "Pastilha de Freio",
    categoria: "Freios",
    fornecedor: "Freios Express",
    precoCompra: 80.0,
    precoVenda: 150.0,
    estoque: 8,
    estoqueMinimo: 4,
    ativo: true,
  },
  {
    id: "3",
    codigo: "P003",
    nome: "Óleo Motor 5W30",
    categoria: "Lubrificantes",
    fornecedor: "Lubrax Distribuidora",
    precoCompra: 22.0,
    precoVenda: 35.0,
    estoque: 20,
    estoqueMinimo: 10,
    ativo: true,
  },
  {
    id: "4",
    codigo: "P004",
    nome: "Bateria 60Ah",
    categoria: "Elétrica",
    fornecedor: "Baterias Power",
    precoCompra: 250.0,
    precoVenda: 350.0,
    estoque: 6,
    estoqueMinimo: 3,
    ativo: false,
  },
]

export default function CadastroPecasPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Cadastro de Peças</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Importar
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Peça
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total de Peças</CardTitle>
            <CardDescription>Quantidade de itens cadastrados</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">152</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Valor em Estoque</CardTitle>
            <CardDescription>Valor total do estoque (custo)</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">R$ 45.320,00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Itens Abaixo do Mínimo</CardTitle>
            <CardDescription>Peças com estoque crítico</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-destructive">12</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Peças Cadastradas</CardTitle>
              <CardDescription>Gerencie o cadastro de peças e produtos</CardDescription>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar peça..." className="w-full sm:w-[250px] pl-8" />
              </div>
              <Select>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas</SelectItem>
                  <SelectItem value="filtros">Filtros</SelectItem>
                  <SelectItem value="freios">Freios</SelectItem>
                  <SelectItem value="lubrificantes">Lubrificantes</SelectItem>
                  <SelectItem value="eletrica">Elétrica</SelectItem>
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
                <TableHead>Código</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead className="text-right">Preço Compra</TableHead>
                <TableHead className="text-right">Preço Venda</TableHead>
                <TableHead className="text-center">Estoque</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pecas.map((peca) => (
                <TableRow key={peca.id}>
                  <TableCell className="font-medium">{peca.codigo}</TableCell>
                  <TableCell>{peca.nome}</TableCell>
                  <TableCell>{peca.categoria}</TableCell>
                  <TableCell>{peca.fornecedor}</TableCell>
                  <TableCell className="text-right">R$ {peca.precoCompra.toFixed(2)}</TableCell>
                  <TableCell className="text-right">R$ {peca.precoVenda.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={peca.estoque <= peca.estoqueMinimo ? "destructive" : "outline"}>
                      {peca.estoque}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Switch checked={peca.ativo} />
                  </TableCell>
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
                        <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Adicionar estoque</DropdownMenuItem>
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
    </div>
  )
}
