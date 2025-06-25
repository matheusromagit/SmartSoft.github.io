"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Edit,
  Printer,
  CreditCard,
  Clock,
  User,
  Car,
  Wrench,
  X,
} from "lucide-react";

interface OrdemModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

export function OrdemModal({ isOpen, onClose, orderId }: OrdemModalProps) {
  // Dados simulados da ordem de serviço baseados no ID
  const getOrdemServico = (id: string) => {
    const ordensData: Record<string, any> = {
      "OS-2023-001": {
        id: "OS-2023-001",
        numero: "OS-2023-001",
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
        status: "Em andamento",
        mecanico: "André Souza",
        descricaoProblema:
          "Cliente relatou ruído estranho ao frear e pedal mole.",
        servicos: [
          {
            id: 1,
            descricao: "Troca de pastilhas de freio",
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
            concluido: false,
          },
        ],
        pecas: [
          {
            id: 1,
            codigo: "PF-HND-001",
            nome: "Pastilha de freio Honda",
            quantidade: 4,
            valorUnitario: 35.0,
            valorTotal: 140.0,
          },
        ],
        valorServicos: 225.0,
        valorPecas: 140.0,
        valorTotal: 365.0,
      },
      "OS-2023-002": {
        id: "OS-2023-002",
        numero: "OS-2023-002",
        cliente: {
          nome: "Maria Oliveira",
          telefone: "(11) 91234-5678",
          email: "maria.oliveira@email.com",
        },
        veiculo: {
          marca: "Toyota",
          modelo: "Corolla",
          ano: 2019,
          placa: "DEF-5678",
          cor: "Prata",
        },
        dataEntrada: "20/06/2023",
        dataPrevista: "22/06/2023",
        status: "Concluído",
        mecanico: "Ricardo Oliveira",
        descricaoProblema: "Revisão completa do veículo conforme manual.",
        servicos: [
          {
            id: 1,
            descricao: "Troca de óleo e filtros",
            quantidade: 1,
            valorUnitario: 120.0,
            valorTotal: 120.0,
            concluido: true,
          },
          {
            id: 2,
            descricao: "Verificação geral",
            quantidade: 1,
            valorUnitario: 80.0,
            valorTotal: 80.0,
            concluido: true,
          },
        ],
        pecas: [
          {
            id: 1,
            codigo: "OL-5W30-4L",
            nome: "Óleo motor 5W30 4L",
            quantidade: 1,
            valorUnitario: 45.0,
            valorTotal: 45.0,
          },
          {
            id: 2,
            codigo: "FO-TOY-001",
            nome: "Filtro óleo Toyota",
            quantidade: 1,
            valorUnitario: 25.0,
            valorTotal: 25.0,
          },
        ],
        valorServicos: 200.0,
        valorPecas: 70.0,
        valorTotal: 270.0,
      },
    };

    return ordensData[id] || ordensData["OS-2023-001"]; // Fallback para primeira ordem
  };

  const ordemServico = getOrdemServico(orderId);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Em andamento":
        return <Badge className="bg-yellow-500">Em andamento</Badge>;
      case "Concluído":
        return <Badge className="bg-green-500">Concluído</Badge>;
      case "Aguardando peças":
        return <Badge className="bg-blue-500">Aguardando peças</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleEdit = () => {
    console.log("Editando ordem:", orderId);
    onClose();
  };

  const handlePrint = () => {
    console.log("Imprimindo ordem:", orderId);
    window.print();
  };

  const handlePayment = () => {
    console.log("Processando pagamento:", orderId);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>Ordem de Serviço {ordemServico.numero}</DialogTitle>
              <DialogDescription>
                Detalhes completos da ordem de serviço
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Imprimir
              </Button>
              {ordemServico.status !== "Concluído" && (
                <Button size="sm" onClick={handlePayment}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pagamento
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <CardTitle className="text-base font-medium">Status</CardTitle>
                <Clock className="ml-auto h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {getStatusBadge(ordemServico.status)}
                  <div className="text-sm text-muted-foreground">
                    <p>Entrada: {ordemServico.dataEntrada}</p>
                    <p>Previsão: {ordemServico.dataPrevista}</p>
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
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Descrição do Problema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {ordemServico.descricaoProblema}
              </p>
              <Separator />
              <div className="mt-4">
                <span className="text-sm">
                  Mecânico responsável: <strong>{ordemServico.mecanico}</strong>
                </span>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="servicos" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="servicos">Serviços</TabsTrigger>
              <TabsTrigger value="pecas">Peças</TabsTrigger>
              <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
            </TabsList>

            <TabsContent value="servicos">
              <Card>
                <CardHeader>
                  <CardTitle>Serviços</CardTitle>
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
                        <TableHead className="text-right">
                          Valor Unit.
                        </TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ordemServico.servicos.map((servico: any) => (
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
                              variant={
                                servico.concluido ? "default" : "secondary"
                              }
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
                  <CardTitle>Peças</CardTitle>
                  <CardDescription>Lista de peças utilizadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Qtd</TableHead>
                        <TableHead className="text-right">
                          Valor Unit.
                        </TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ordemServico.pecas.map((peca: any) => (
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
                  <CardDescription>Breakdown dos valores</CardDescription>
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
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>R$ {ordemServico.valorTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
