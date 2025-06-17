"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Bell, Clock, Package, ClipboardList } from "lucide-react"
import { useRouter } from "next/navigation"

interface NotificationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NotificationModal({ open, onOpenChange }: NotificationModalProps) {
  const router = useRouter()

  const alerts = [
    {
      id: 1,
      title: "Estoque crítico",
      description: "5 itens com estoque abaixo do mínimo",
      icon: Package,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
      action: () => {
        router.push("/dashboard/estoque?tab=baixo-estoque")
        onOpenChange(false)
      },
    },
    {
      id: 2,
      title: "Ordens de serviço atrasadas",
      description: "3 ordens de serviço estão atrasadas",
      icon: ClipboardList,
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-950/30",
      action: () => {
        router.push("/dashboard/ordens-servico")
        onOpenChange(false)
      },
    },
    {
      id: 3,
      title: "Agendamentos para hoje",
      description: "8 agendamentos programados para hoje",
      icon: Clock,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      action: () => {
        router.push("/dashboard/agendamentos")
        onOpenChange(false)
      },
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Bell className="h-5 w-5 text-primary" />
            Itens que precisam de atenção hoje
          </DialogTitle>
          <DialogDescription>Os seguintes itens requerem sua atenção imediata</DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className={`flex items-start gap-3 rounded-lg p-3 ${alert.bgColor}`}>
              <alert.icon className={`mt-0.5 h-5 w-5 shrink-0 ${alert.color}`} />
              <div className="flex-1">
                <h3 className="font-medium">{alert.title}</h3>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={alert.action}>
                Ver
              </Button>
            </div>
          ))}
        </div>

        <DialogFooter className="mt-4 flex justify-between sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          <Button onClick={() => onOpenChange(false)}>Entendi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
