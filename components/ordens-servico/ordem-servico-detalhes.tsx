"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Car,
  User,
  Calendar,
  Clock,
  PenToolIcon as Tool,
  Package,
  FileText,
  MessageSquare,
  CreditCard,
  Printer,
  Edit,
} from "lucide-react"
import Link from "next/link"

interface OrdemServicoDetalhesProps {
  id: string
}

export function OrdemServicoDetalhes({ id }: OrdemServicoDetalhesProps) {
  // Dados de exemplo - em uma aplicação real, esses dados viriam de uma API
  const os = {
    id,
    numero: "OS-2023-002",
    cliente: {
      nome: "Maria Oliveira",
      telefone: "(11) 98765-4321",
      email: "maria@email.com",
    },
    veiculo: {
      marca: "Volkswagen",
      modelo: "Gol",
      ano: 2018,
      placa: "DEF-5678",
      km: 45000,
    },
    dataEntrada: "2023-05-15",
    dataPrevista: "2023-05-17",
    status: "em_andamento",
    valor: 850.0,
    descricao: "Cliente relatou barulho na suspensão dianteira e falha ao frear.",
    diagnostico: "Identificado desgaste nas pastilhas de freio e problema na suspensão dianteira.",
    servicos: [
      {
        id: "1",
        descricao: "Troca de pastilhas de freio",
        valor: 250.0,
        tempo: "1h",
      },
      {
        id: "2",
        descricao: "Substituição de amortecedores dianteiros",
        valor: 450.0,
        tempo: "2h",
      },
      {
        id: "3",
        descricao: "Alinhamento e balanceamento",
        valor: 150.0,
        tempo: "1h",
      },
    ],
    pecas: [
      {
        id: "1",
        descricao: "Pastilhas de freio dianteiras",
        quantidade: 1,
        valorUnitario: 120.0,
        valorTotal: 120.0,
      },
      {
        id: "2",
        descricao: "Amortecedores dianteiros (par)",
        quantidade: 1,
        valorUnitario: 380.0,
        valorTotal: 380.0,
      },
    ],
    observacoes: "Cliente solicitou verificação dos pneus, mas optou por não fazer a troca no momento.",
    historico: [
      {
        data: "2023-05-15 08:30",
        usuario: "Carlos Silva",
        acao: "Criação da OS",
        descricao: "OS criada com status 'Aguardando aprovação'",
      },
      {
        data: "2023-05-15 14:15",
        usuario: "Maria Oliveira",
        acao: "Aprovação",
        descricao: "Cliente aprovou o orçamento por telefone",
      },
      {
        data: "2023-05-16 09:00",
        usuario: "Pedro Santos",
        acao: "Início do serviço",
        descricao: "Iniciada a substituição das peças",
      },
    ],
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "concluida":
        return <Badge variant="success">Concluída</Badge>
      case "em_andamento":
        return <Badge variant="default">Em andamento</Badge>
      case "aguardando_aprovacao":
        return <Badge variant="outline">Aguardando aprovação</Badge>
      case "aguardando_pecas":
        return <Badge variant="warning">Aguardando peças</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/ordens-servico">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Ordem de Serviço #{os.numero}</h1>
          {getStatusBadge(os.status)}
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Gerar PDF
          </Button>
          <Button>
            <CreditCard className="mr-2 h-4 w-4" />
            Efetuar Pagamento
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Cliente</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-lg">{os.cliente.nome}</p>
            <p className="text-muted-foreground">{os.cliente.telefone}</p>
            <p className="text-muted-foreground">{os.cliente.email}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Veículo</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-lg">
              {os.veiculo.marca} {os.veiculo.modelo} ({os.veiculo.ano})
            </p>
            <p className="text-muted-foreground">Placa: {os.veiculo.placa}</p>
            <p className="text-muted-foreground">Km: {os.veiculo.km.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Datas</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Entrada:</p>
                <p className="font-medium">{new Date(os.dataEntrada).toLocaleDateString("pt-BR")}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Previsão:</p>
                <p className="font-medium">{new Date(os.dataPrevista).toLocaleDateString("pt-BR")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="detalhes" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="detalhes">
            <FileText className="mr-2 h-4 w-4" />
            Detalhes
          </TabsTrigger>
          <TabsTrigger value="servicos">
            <Tool className="mr-2 h-4 w-4" />
            Serviços
          </TabsTrigger>
          <TabsTrigger value="pecas">
            <Package className="mr-2 h-4 w-4" />
            Peças
          </TabsTrigger>
          <TabsTrigger value="historico">
            <Clock className="mr-2 h-4 w-4" />
            Histórico
          </TabsTrigger>
        </TabsList>

        <TabsContent value="detalhes">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes da Ordem de Serviço</CardTitle>
              <CardDescription>Informações detalhadas sobre o serviço</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Descrição do Problema</h3>
                <p className="text-muted-foreground">{os.descricao}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium mb-1">Diagnóstico</h3>
                <p className="text-muted-foreground">{os.diagnostico}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium mb-1">Observações</h3>
                <p className="text-muted-foreground">{os.observacoes}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <div>
                <p className="text-sm text-muted-foreground">Valor Total:</p>
                <p className="text-2xl font-bold">R$ {os.valor.toFixed(2)}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Enviar para Cliente
                </Button>
                <Button>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Efetuar Pagamento
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="servicos">
          <Card>
            <CardHeader>
              <CardTitle>Serviços Realizados</CardTitle>
              <CardDescription>Lista de serviços incluídos na ordem</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Tempo Estimado</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {os.servicos.map((servico) => (
                    <TableRow key={servico.id}>
                      <TableCell className="font-medium">{servico.descricao}</TableCell>
                      <TableCell>{servico.tempo}</TableCell>
                      <TableCell className="text-right">R$ {servico.valor.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-6">
              <div>
                <p className="text-sm text-muted-foreground">Subtotal Serviços:</p>
                <p className="text-xl font-bold">
                  R$ {os.servicos.reduce((acc, item) => acc + item.valor, 0).toFixed(2)}
                </p>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="pecas">
          <Card>
            <CardHeader>
              <CardTitle>Peças Utilizadas</CardTitle>
              <CardDescription>Lista de peças utilizadas no serviço</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-center">Quantidade</TableHead>
                    <TableHead className="text-right">Valor Unitário</TableHead>
                    <TableHead className="text-right">Valor Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {os.pecas.map((peca) => (
                    <TableRow key={peca.id}>
                      <TableCell className="font-medium">{peca.descricao}</TableCell>
                      <TableCell className="text-center">{peca.quantidade}</TableCell>
                      <TableCell className="text-right">R$ {peca.valorUnitario.toFixed(2)}</TableCell>
                      <TableCell className="text-right">R$ {peca.valorTotal.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-6">
              <div>
                <p className="text-sm text-muted-foreground">Subtotal Peças:</p>
                <p className="text-xl font-bold">
                  R$ {os.pecas.reduce((acc, item) => acc + item.valorTotal, 0).toFixed(2)}
                </p>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="historico">
          <Card>
            <CardHeader>
              <CardTitle>Histórico da OS</CardTitle>
              <CardDescription>Registro de atividades e alterações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {os.historico.map((item, index) => (
                  <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                    <div className="w-1/4">
                      <p className="font-medium">{item.data}</p>
                      <p className="text-sm text-muted-foreground">{item.usuario}</p>
                    </div>
                    <div>
                      <p className="font-medium">{item.acao}</p>
                      <p className="text-sm text-muted-foreground">{item.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
