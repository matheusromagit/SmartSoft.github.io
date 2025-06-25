"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  Edit,
  Printer,
  CreditCard,
  MoreHorizontal,
  FileText,
} from "lucide-react";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface DashboardRecentProps {
  className?: string;
}

export function DashboardRecent({ className }: DashboardRecentProps) {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const router = useRouter();

  const recentOrders = [
    {
      id: "OS-2023-001",
      client: "Carlos Silva",
      vehicle: "Honda Civic 2020",
      status: "Em andamento",
      statusColor: "bg-yellow-500",
      value: 850.0,
      service: "Troca de embreagem",
    },
    {
      id: "OS-2023-002",
      client: "Maria Oliveira",
      vehicle: "Toyota Corolla 2019",
      status: "Concluído",
      statusColor: "bg-green-500",
      value: 1250.0,
      service: "Revisão completa",
    },
    {
      id: "OS-2023-003",
      client: "João Santos",
      vehicle: "Fiat Uno 2018",
      status: "Aguardando peças",
      statusColor: "bg-blue-500",
      value: 680.0,
      service: "Reparo no freio",
    },
    {
      id: "OS-2023-004",
      client: "Ana Pereira",
      vehicle: "Volkswagen Gol 2021",
      status: "Concluído",
      statusColor: "bg-green-500",
      value: 320.0,
      service: "Troca de óleo",
    },
    {
      id: "OS-2023-005",
      client: "Pedro Souza",
      vehicle: "Chevrolet Onix 2022",
      status: "Em andamento",
      statusColor: "bg-yellow-500",
      value: 450.0,
      service: "Alinhamento",
    },
  ];

  const handleViewOrder = (orderId: string) => {
    // Simula navegação para a página da ordem
    window.location.href = `/dashboard/ordens-servico/${orderId}`;
  };

  const handleEditOrder = (orderId: string) => {
    console.log("Editando ordem:", orderId);
    // Implementar lógica de edição
  };

  const handlePrintOrder = (orderId: string) => {
    console.log("Imprimindo ordem:", orderId);
    // Implementar lógica de impressão
  };

  const handlePayment = (orderId: string) => {
    console.log("Processando pagamento:", orderId);
    // Implementar lógica de pagamento
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Ordens Recentes</CardTitle>
        <CardDescription>Últimas ordens de serviço registradas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center gap-4 p-3 rounded-lg border transition-colors hover:bg-accent/50 cursor-pointer group"
              onClick={() => setSelectedOrder(order.id)}
            >
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={`/placeholder.svg?height=36&width=36`}
                  alt={order.client}
                />
                <AvatarFallback>
                  {order.client
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {order.client}
                </p>
                <p className="text-xs text-muted-foreground">{order.vehicle}</p>
                <p className="text-xs text-muted-foreground">{order.service}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${order.statusColor}`}
                  />
                  <span className="text-xs">{order.status}</span>
                </div>
                <span className="text-xs font-medium">
                  R$ {order.value.toFixed(2)}
                </span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Abrir menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Opções da Ordem</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleViewOrder(order.id)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Ver detalhes
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleEditOrder(order.id)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar ordem
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handlePrintOrder(order.id)}>
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimir
                  </DropdownMenuItem>
                  {order.status !== "Concluído" && (
                    <DropdownMenuItem onClick={() => handlePayment(order.id)}>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Processar pagamento
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    Histórico
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
