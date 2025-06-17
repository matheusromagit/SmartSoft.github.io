"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, MoreHorizontal, FileText, User, Edit, Trash } from "lucide-react"
import { VeiculoModal } from "@/components/veiculos/veiculo-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function VeiculosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const veiculos = [
    {
      id: 1,
      placa: "ABC-1234",
      marca: "Honda",
      modelo: "Civic",
      ano: 2020,
      cor: "Preto",
      cliente: "Carlos Silva",
      ultimaManutencao: "10/04/2023",
      status: "Regular",
    },
    {
      id: 2,
      placa: "DEF-5678",
      marca: "Toyota",
      modelo: "Corolla",
      ano: 2019,
      cor: "Prata",
      cliente: "Maria Oliveira",
      ultimaManutencao: "22/05/2023",
      status: "Regular",
    },
    {
      id: 3,
      placa: "GHI-9012",
      marca: "Fiat",
      modelo: "Uno",
      ano: 2018,
      cor: "Branco",
      cliente: "João Santos",
      ultimaManutencao: "05/03/2023",
      status: "Atrasado",
    },
    {
      id: 4,
      placa: "JKL-3456",
      marca: "Volkswagen",
      modelo: "Gol",
      ano: 2021,
      cor: "Vermelho",
      cliente: "Ana Pereira",
      ultimaManutencao: "18/06/2023",
      status: "Regular",
    },
    {
      id: 5,
      placa: "MNO-7890",
      marca: "Chevrolet",
      modelo: "Onix",
      ano: 2022,
      cor: "Azul",
      cliente: "Pedro Souza",
      ultimaManutencao: "30/05/2023",
      status: "Regular",
    },
  ]

  const filteredVeiculos = veiculos.filter(
    (veiculo) =>
      veiculo.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      veiculo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      veiculo.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      veiculo.cliente.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Veículos</h1>
        <p className="text-muted-foreground">Gerencie os veículos cadastrados na sua oficina</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por placa, marca, modelo ou cliente..."
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
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Veículo
        </Button>
      </div>

      <Card>
        <CardHeader className="px-6 py-4">
          <CardTitle>Lista de Veículos</CardTitle>
          <CardDescription>Total de {filteredVeiculos.length} veículos cadastrados</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Placa</TableHead>
                <TableHead>Marca/Modelo</TableHead>
                <TableHead className="hidden md:table-cell">Ano</TableHead>
                <TableHead className="hidden md:table-cell">Cor</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="hidden md:table-cell">Última Manutenção</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVeiculos.map((veiculo) => (
                <TableRow key={veiculo.id}>
                  <TableCell className="font-medium">{veiculo.placa}</TableCell>
                  <TableCell>
                    {veiculo.marca} {veiculo.modelo}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{veiculo.ano}</TableCell>
                  <TableCell className="hidden md:table-cell">{veiculo.cor}</TableCell>
                  <TableCell>{veiculo.cliente}</TableCell>
                  <TableCell className="hidden md:table-cell">{veiculo.ultimaManutencao}</TableCell>
                  <TableCell>
                    <Badge variant={veiculo.status === "Regular" ? "default" : "destructive"}>{veiculo.status}</Badge>
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
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          <span>Ver Cliente</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>Histórico</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
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
        </CardContent>
      </Card>

      <VeiculoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
