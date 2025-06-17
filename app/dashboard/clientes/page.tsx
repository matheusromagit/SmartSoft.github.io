"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, MoreHorizontal, FileText, Car, Edit, Trash } from "lucide-react"
import { ClienteModal } from "@/components/clientes/cliente-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ClientesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const clientes = [
    {
      id: 1,
      nome: "Carlos Silva",
      email: "carlos.silva@email.com",
      telefone: "(11) 98765-4321",
      cpf: "123.456.789-00",
      veiculos: 2,
      ultimaVisita: "10/04/2023",
      status: "Ativo",
    },
    {
      id: 2,
      nome: "Maria Oliveira",
      email: "maria.oliveira@email.com",
      telefone: "(11) 91234-5678",
      cpf: "987.654.321-00",
      veiculos: 1,
      ultimaVisita: "22/05/2023",
      status: "Ativo",
    },
    {
      id: 3,
      nome: "João Santos",
      email: "joao.santos@email.com",
      telefone: "(11) 99876-5432",
      cpf: "456.789.123-00",
      veiculos: 3,
      ultimaVisita: "05/03/2023",
      status: "Inativo",
    },
    {
      id: 4,
      nome: "Ana Pereira",
      email: "ana.pereira@email.com",
      telefone: "(11) 95678-1234",
      cpf: "789.123.456-00",
      veiculos: 1,
      ultimaVisita: "18/06/2023",
      status: "Ativo",
    },
    {
      id: 5,
      nome: "Pedro Souza",
      email: "pedro.souza@email.com",
      telefone: "(11) 92345-6789",
      cpf: "321.654.987-00",
      veiculos: 2,
      ultimaVisita: "30/05/2023",
      status: "Ativo",
    },
  ]

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.cpf.includes(searchTerm),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
        <p className="text-muted-foreground">Gerencie os clientes da sua oficina</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por nome, email ou CPF..."
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
          Adicionar Cliente
        </Button>
      </div>

      <Card>
        <CardHeader className="px-6 py-4">
          <CardTitle>Lista de Clientes</CardTitle>
          <CardDescription>Total de {filteredClientes.length} clientes cadastrados</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead className="hidden md:table-cell">CPF</TableHead>
                <TableHead className="hidden md:table-cell">Veículos</TableHead>
                <TableHead className="hidden md:table-cell">Última Visita</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell className="font-medium">{cliente.nome}</TableCell>
                  <TableCell className="hidden md:table-cell">{cliente.email}</TableCell>
                  <TableCell>{cliente.telefone}</TableCell>
                  <TableCell className="hidden md:table-cell">{cliente.cpf}</TableCell>
                  <TableCell className="hidden md:table-cell">{cliente.veiculos}</TableCell>
                  <TableCell className="hidden md:table-cell">{cliente.ultimaVisita}</TableCell>
                  <TableCell>
                    <Badge variant={cliente.status === "Ativo" ? "default" : "secondary"}>{cliente.status}</Badge>
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
                          <Car className="mr-2 h-4 w-4" />
                          <span>Ver Veículos</span>
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

      <ClienteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
