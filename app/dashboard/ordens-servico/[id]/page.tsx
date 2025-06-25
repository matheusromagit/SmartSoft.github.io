"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Edit,
  Printer,
  CreditCard,
  Clock,
  User,
  Car,
  Wrench,
} from "lucide-react";

export default function OrdemServicoDetalhes() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  // Dados simulados da ordem de serviço
  const ordemServico = {
    id: orderId,
    numero: orderId,
    cliente: {
      nome: "Carlos Silva",
      telefone: "(11) 98765-4321",
      email: "carlos.silva@email.com",
    },
    veiculo: {
      marca: "Honda",
      modelo: "Civic",
      ano: 2020,
      placa: "ABC-1234",
      cor: "Preto",
    },
    dataEntrada: "15/06/2023",
    dataPrevista: "17/06/2023",
    dataFinalizacao: null,
    status: "Em andamento",
    statusColor: "bg-yellow-500",
    mecanico: "André Souza",
    descricaoProblema:
      "Cliente relatou ruído estranho ao frear e pedal mole. Necessário verificação completa do sistema de freios.",
    observacoes:
      "Verificar também alinhamento, pois cliente mencionou que o carro está puxando para a esquerda.",
    servicos: [
      {
        id: 1,
        descricao: "Troca de pastilhas de freio dianteiras",
        quantidade: 1,
        valorUnitario: 180.0,
        valorTotal: 180.0,
        concluido: true,
      },
      {
        id: 2,
        descricao: "Troca de fluido de freio",
        quantidade: 1,
        valorUnitario: 45.0,
        valorTotal: 45.0,
        concluido: true,
      },
      {
        id: 3,
        descricao: "Alinhamento e balanceamento",
        quantidade: 1,
        valorUnitario: 80.0,
        valorTotal: 80.0,
        concluido: false,
      },
    ],
    pecas: [
      {
        id: 1,
        codigo: "PF-HND-001",
        nome: "Pastilha de freio Honda Civic",
        quantidade: 4,
        valorUnitario: 35.0,
        valorTotal: 140.0,
      },
      {
        id: 2,
        codigo: "FL-DOT4-500",
        nome: "Fluido de freio DOT 4 - 500ml",
        quantidade: 1,
        valorUnitario: 25.0,
        valorTotal: 25.0,
      },
    ],
    valorServicos: 305.0,
    valorPecas: 165.0,
    valorTotal: 470.0,
    desconto: 0.0,
    valorFinal: 470.0,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Em andamento":
        return <Badge className="bg-yellow-500">Em andamento</Badge>;
      case "Concluído":
        return <Badge className="bg-green-500">Concluído</Badge>;
      case "Aguardando peças":
        return <Badge className="bg-blue-500">Aguardando peças</Badge>;
      case "Aguardando aprovação":
        return <Badge variant="outline">Aguardando aprovação</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleEdit = () => {
    console.log("Editando ordem:", orderId);
    // Implementar lógica de edição
  };

  const handlePrint = () => {
    console.log("Imprimindo ordem:", orderId);
    // Implementar lógica de impressão
    window.print();
  };

  const handlePayment = () => {
    console.log("Processando pagamento:", orderId);
    // Implementar lógica de pagamento
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Ordem de Serviço {ordemServico.numero}
          </h1>
          <p className="text-muted-foreground">
            Detalhes completos da ordem de serviço
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          {ordemServico.status !== "Concluído" && (
            <Button onClick={handlePayment}>
              <CreditCard className="mr-2 h-4 w-4" />
              Processar Pagamento
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              Status da Ordem
            </CardTitle>
            <Clock className="ml-auto h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getStatusBadge(ordemServico.status)}
              <div className="text-sm text-muted-foreground">
                <p>Entrada: {ordemServico.dataEntrada}</p>
                <p>Previsão: {ordemServico.dataPrevista}</p>
                {ordemServico.dataFinalizacao && (
                  <p>Finalização: {ordemServico.dataFinalizacao}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Cliente</CardTitle>
            <User className="ml-auto h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="font-medium">{ordemServico.cliente.nome}</p>
              <p className="text-sm text-muted-foreground">
                {ordemServico.cliente.telefone}
              </p>
              <p className="text-sm text-muted-foreground">
                {ordemServico.cliente.email}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Veículo</CardTitle>
            <Car className="ml-auto h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="font-medium">
                {ordemServico.veiculo.marca} {ordemServico.veiculo.modelo}
              </p>
              <p className="text-sm text-muted-foreground">
                Ano: {ordemServico.veiculo.ano}
              </p>
              <p className="text-sm text-muted-foreground">
                Placa: {ordemServico.veiculo.placa}
              </p>
              <p className="text-sm text-muted-foreground">
                Cor: {ordemServico.veiculo.cor}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Descrição do Problema</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {ordemServico.descricaoProblema}
          </p>
          <Separator />
          <div className="mt-4">
            <h4 className="font-medium mb-2">Observações:</h4>
            <p className="text-sm text-muted-foreground">
              {ordemServico.observacoes}
            </p>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center gap-2">
            <Wrench className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Mecânico responsável: <strong>{ordemServico.mecanico}</strong>
            </span>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="servicos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="servicos">Serviços</TabsTrigger>
          <TabsTrigger value="pecas">Peças</TabsTrigger>
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
        </TabsList>

        <TabsContent value="servicos">
          <Card>
            <CardHeader>
              <CardTitle>Serviços Realizados</CardTitle>
              <CardDescription>
                Lista de serviços incluídos nesta ordem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Qtd</TableHead>
                    <TableHead className="text-right">Valor Unit.</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordemServico.servicos.map((servico) => (
                    <TableRow key={servico.id}>
                      <TableCell>{servico.descricao}</TableCell>
                      <TableCell>{servico.quantidade}</TableCell>
                      <TableCell className="text-right">
                        R$ {servico.valorUnitario.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        R$ {servico.valorTotal.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={servico.concluido ? "default" : "secondary"}
                        >
                          {servico.concluido ? "Concluído" : "Pendente"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pecas">
          <Card>
            <CardHeader>
              <CardTitle>Peças Utilizadas</CardTitle>
              <CardDescription>
                Lista de peças e materiais utilizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Qtd</TableHead>
                    <TableHead className="text-right">Valor Unit.</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordemServico.pecas.map((peca) => (
                    <TableRow key={peca.id}>
                      <TableCell className="font-medium">
                        {peca.codigo}
                      </TableCell>
                      <TableCell>{peca.nome}</TableCell>
                      <TableCell>{peca.quantidade}</TableCell>
                      <TableCell className="text-right">
                        R$ {peca.valorUnitario.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        R$ {peca.valorTotal.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financeiro">
          <Card>
            <CardHeader>
              <CardTitle>Resumo Financeiro</CardTitle>
              <CardDescription>Breakdown completo dos valores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Valor dos Serviços:</span>
                  <span>R$ {ordemServico.valorServicos.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Valor das Peças:</span>
                  <span>R$ {ordemServico.valorPecas.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>R$ {ordemServico.valorTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Desconto:</span>
                  <span>- R$ {ordemServico.desconto.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>R$ {ordemServico.valorFinal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
