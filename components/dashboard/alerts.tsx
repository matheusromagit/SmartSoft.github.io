"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  Clock,
  Package,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function DashboardAlerts() {
  const router = useRouter();

  const alerts = [
    {
      id: 1,
      title: "Estoque crítico",
      description: "5 itens com estoque abaixo do mínimo",
      icon: Package,
      color: "text-yellow-500",
      action: () => router.push("/dashboard/estoque?tab=baixo-estoque"),
    },
    {
      id: 2,
      title: "Ordens de serviço atrasadas",
      description: "3 ordens de serviço estão atrasadas",
      icon: ClipboardList,
      color: "text-red-500",
      action: () => router.push("/dashboard/ordens-servico"),
    },
    {
      id: 3,
      title: "Agendamentos para hoje",
      description: "8 agendamentos programados para hoje",
      icon: Clock,
      color: "text-blue-500",
      action: () => router.push("/dashboard/agendamentos"),
    },
  ];

  return (
    <Card className="border-l-4 border-l-yellow-500">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-lg font-medium">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          <span>Itens que precisam de atenção</span>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex flex-col rounded-lg border p-4 transition-all hover:shadow-md hover:bg-accent/50 cursor-pointer group"
              onClick={alert.action}
            >
              <div className="flex items-center gap-2">
                <alert.icon className={`h-5 w-5 ${alert.color}`} />
                <h3 className="font-medium">{alert.title}</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {alert.description}
              </p>
              <div className="mt-2 flex items-center justify-start gap-1 text-sm font-medium text-primary group-hover:text-primary/80">
                Ver detalhes
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
