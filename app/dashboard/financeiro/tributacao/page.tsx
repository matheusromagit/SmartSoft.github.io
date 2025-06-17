"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Search, Filter, MoreHorizontal, Save, Info } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"

// Dados de exemplo
const tributacaoProdutos = [
  {
    id: "1",
    nome: "Peças Automotivas",
    icms: 18,
    ipi: 5,
    pis: 1.65,
    cofins: 7.6,
    cst: "000",
    ncm: "8708.99.90",
    ativo: true,
  },
  {
    id: "2",
    nome: "Óleos Lubrificantes",
    icms: 18,
    ipi: 0,
    pis: 1.65,
    cofins: 7.6,
    cst: "020",
    ncm: "2710.19.32",
    ativo: true,
  },
  {
    id: "3",
    nome: "Ferramentas",
    icms: 12,
    ipi: 10,
    pis: 1.65,
    cofins: 7.6,
    cst: "000",
    ncm: "8205.59.00",
    ativo: false,
  },
]

const tributacaoServicos = [
  {
    id: "1",
    nome: "Serviços Mecânicos",
    iss: 5,
    pis: 0.65,
    cofins: 3,
    cst: "01",
    codigoServico: "14.01",
    ativo: true,
  },
  {
    id: "2",
    nome: "Serviços Elétricos",
    iss: 5,
    pis: 0.65,
    cofins: 3,
    cst: "01",
    codigoServico: "14.01",
    ativo: true,
  },
  {
    id: "3",
    nome: "Serviços de Pintura",
    iss: 5,
    pis: 0.65,
    cofins: 3,
    cst: "01",
    codigoServico: "14.05",
    ativo: false,
  },
]

export default function TributacaoPage() {
  const [regimeTributario, setRegimeTributario] = useState("simples")

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Configuração de Tributação</h1>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Configurações Gerais</CardTitle>
          <CardDescription>Configure o regime tributário da empresa</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="regime">Regime Tributário</Label>
              <Select value={regimeTributario} onValueChange={setRegimeTributario}>
                <SelectTrigger id="regime" className="mt-1">
                  <SelectValue placeholder="Selecione o regime tributário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simples">Simples Nacional</SelectItem>
                  <SelectItem value="lucro_presumido">Lucro Presumido</SelectItem>
                  <SelectItem value="lucro_real">Lucro Real</SelectItem>
                  <SelectItem value="mei">MEI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="cnae">CNAE Principal</Label>
              <div className="flex gap-2 mt-1">
                <Input id="cnae" placeholder="Ex: 4520-0/01" />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>CNAE: Classificação Nacional de Atividades Econômicas</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Salvar Configurações
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="produtos" className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
          <TabsList>
            <TabsTrigger value="produtos">Produtos</TabsTrigger>
            <TabsTrigger value="servicos">Serviços</TabsTrigger>
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

        <TabsContent value="produtos">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Tributação de Produtos</CardTitle>
                  <CardDescription>Configure as alíquotas e códigos fiscais para produtos</CardDescription>
                </div>
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nova Configuração
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>ICMS (%)</TableHead>
                    <TableHead>IPI (%)</TableHead>
                    <TableHead>PIS (%)</TableHead>
                    <TableHead>COFINS (%)</TableHead>
                    <TableHead>CST</TableHead>
                    <TableHead>NCM</TableHead>
                    <TableHead>Ativo</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tributacaoProdutos.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell>{item.icms}%</TableCell>
                      <TableCell>{item.ipi}%</TableCell>
                      <TableCell>{item.pis}%</TableCell>
                      <TableCell>{item.cofins}%</TableCell>
                      <TableCell>{item.cst}</TableCell>
                      <TableCell>{item.ncm}</TableCell>
                      <TableCell>
                        <Switch checked={item.ativo} />
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

        <TabsContent value="servicos">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Tributação de Serviços</CardTitle>
                  <CardDescription>Configure as alíquotas e códigos fiscais para serviços</CardDescription>
                </div>
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nova Configuração
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>ISS (%)</TableHead>
                    <TableHead>PIS (%)</TableHead>
                    <TableHead>COFINS (%)</TableHead>
                    <TableHead>CST</TableHead>
                    <TableHead>Código Serviço</TableHead>
                    <TableHead>Ativo</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tributacaoServicos.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell>{item.iss}%</TableCell>
                      <TableCell>{item.pis}%</TableCell>
                      <TableCell>{item.cofins}%</TableCell>
                      <TableCell>{item.cst}</TableCell>
                      <TableCell>{item.codigoServico}</TableCell>
                      <TableCell>
                        <Switch checked={item.ativo} />
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
    </div>
  )
}
