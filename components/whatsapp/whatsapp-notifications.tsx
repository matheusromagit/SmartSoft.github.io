"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { UserPlus, FileText, MessageSquare, AlertCircle, CheckCircle2 } from "lucide-react"
import { ClienteModal } from "@/components/clientes/cliente-modal"
import { OrdemServicoModal } from "@/components/ordens-servico/ordem-servico-modal"
import { useToast } from "@/components/ui/use-toast"

// Tipos de notificações
type NotificationType = "new_user" | "service_request" | "question" | "feedback"

// Interface para as notificações
interface Notification {
  id: string
  type: NotificationType
  phone: string
  name?: string
  message: string
  timestamp: string
  isRegistered: boolean
  summary?: string
  serviceType?: string
  vehicle?: string
  status: "pending" | "processing" | "resolved"
}

// Dados de exemplo
const notificationsData: Notification[] = [
  {
    id: "1",
    type: "new_user",
    phone: "(11) 98765-4321",
    name: undefined,
    message: "Olá, gostaria de agendar uma revisão para meu carro.",
    timestamp: "Hoje, 10:30",
    isRegistered: false,
    summary: "Novo cliente deseja agendar uma revisão para seu veículo Fiat Uno 2018.",
    vehicle: "Fiat Uno 2018",
    serviceType: "Revisão",
    status: "pending",
  },
  {
    id: "2",
    type: "service_request",
    phone: "(11) 97654-3210",
    name: "Maria Rodrigues",
    message: "Bom dia, preciso trocar os amortecedores do meu Honda Civic.",
    timestamp: "Hoje, 09:15",
    isRegistered: true,
    summary: "Cliente solicita troca de amortecedores para Honda Civic 2020.",
    vehicle: "Honda Civic 2020",
    serviceType: "Troca de amortecedores",
    status: "pending",
  },
  {
    id: "3",
    type: "question",
    phone: "(11) 96543-2109",
    name: "Carlos Mendes",
    message: "Qual o prazo para troca de óleo e filtros?",
    timestamp: "Ontem, 16:45",
    isRegistered: true,
    summary: "Cliente pergunta sobre prazo para serviço de troca de óleo e filtros.",
    status: "pending",
  },
  {
    id: "4",
    type: "feedback",
    phone: "(11) 95432-1098",
    name: "Ana Beatriz",
    message: "Gostaria de agradecer pelo excelente serviço!",
    timestamp: "Ontem, 14:20",
    isRegistered: true,
    summary: "Cliente enviou feedback positivo sobre serviço realizado.",
    status: "pending",
  },
]

export function WhatsappNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(notificationsData)
  const [isClienteModalOpen, setIsClienteModalOpen] = useState(false)
  const [isOrdemServicoModalOpen, setIsOrdemServicoModalOpen] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const { toast } = useToast()

  const handleCreateClient = (notification: Notification) => {
    setSelectedNotification(notification)
    setIsClienteModalOpen(true)
  }

  const handleCreateOS = (notification: Notification) => {
    setSelectedNotification(notification)
    setIsOrdemServicoModalOpen(true)
  }

  const handleResolveNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, status: "resolved" as const } : notification,
      ),
    )

    toast({
      title: "Notificação resolvida",
      description: "A notificação foi marcada como resolvida.",
    })
  }

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "new_user":
        return <UserPlus className="h-5 w-5 text-blue-500" />
      case "service_request":
        return <FileText className="h-5 w-5 text-green-500" />
      case "question":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "feedback":
        return <CheckCircle2 className="h-5 w-5 text-purple-500" />
      default:
        return <MessageSquare className="h-5 w-5" />
    }
  }

  const getNotificationTitle = (notification: Notification) => {
    switch (notification.type) {
      case "new_user":
        return "Novo Cliente Potencial"
      case "service_request":
        return "Solicitação de Serviço"
      case "question":
        return "Pergunta de Cliente"
      case "feedback":
        return "Feedback de Cliente"
      default:
        return "Notificação"
    }
  }

  const getNotificationBadge = (notification: Notification) => {
    if (!notification.isRegistered) {
      return (
        <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
          Não Cadastrado
        </Badge>
      )
    }

    switch (notification.type) {
      case "service_request":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            Serviço
          </Badge>
        )
      case "question":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
            Pergunta
          </Badge>
        )
      case "feedback":
        return (
          <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
            Feedback
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {notifications
        .filter((n) => n.status === "pending")
        .map((notification) => (
          <Card key={notification.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 flex gap-4">
                <div className="flex-shrink-0">
                  <Avatar>
                    <AvatarImage src={notification.isRegistered ? "/placeholder.svg?height=40&width=40" : undefined} />
                    <AvatarFallback>
                      {notification.name ? notification.name.substring(0, 2).toUpperCase() : "NC"}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        {getNotificationIcon(notification.type)}
                        <h4 className="font-semibold">{getNotificationTitle(notification)}</h4>
                        {getNotificationBadge(notification)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.name || "Número não cadastrado"} • {notification.phone} • {notification.timestamp}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="text-sm font-medium">Mensagem do cliente:</p>
                    <p className="text-sm mt-1 p-2 bg-accent/50 rounded-md">{notification.message}</p>
                  </div>

                  <div className="mt-3">
                    <p className="text-sm font-medium">Análise do Agente IA:</p>
                    <div className="text-sm mt-1 p-2 bg-primary/5 border border-primary/10 rounded-md">
                      <p>{notification.summary}</p>
                      {notification.vehicle && (
                        <p className="mt-1">
                          <span className="font-medium">Veículo identificado:</span> {notification.vehicle}
                        </p>
                      )}
                      {notification.serviceType && (
                        <p className="mt-1">
                          <span className="font-medium">Serviço solicitado:</span> {notification.serviceType}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <CardFooter className="p-3 flex justify-end gap-2 bg-muted/20">
                {!notification.isRegistered && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={() => handleCreateClient(notification)}
                  >
                    <UserPlus className="h-4 w-4" />
                    Cadastrar Cliente
                  </Button>
                )}

                {notification.serviceType && (
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => handleCreateOS(notification)}>
                    <FileText className="h-4 w-4" />
                    Gerar OS
                  </Button>
                )}

                <Button variant="default" size="sm" onClick={() => handleResolveNotification(notification.id)}>
                  Resolver
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        ))}

      {notifications.filter((n) => n.status === "pending").length === 0 && (
        <div className="text-center py-8">
          <CheckCircle2 className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-medium">Nenhuma notificação pendente</h3>
          <p className="text-sm text-muted-foreground">Todas as notificações foram resolvidas.</p>
        </div>
      )}

      {isClienteModalOpen && selectedNotification && (
        <ClienteModal
          isOpen={isClienteModalOpen}
          onClose={() => setIsClienteModalOpen(false)}
          onSave={() => {
            setIsClienteModalOpen(false)
            toast({
              title: "Cliente cadastrado",
              description: "O cliente foi cadastrado com sucesso.",
            })
            handleResolveNotification(selectedNotification.id)
          }}
          initialData={{
            nome: "",
            telefone: selectedNotification.phone,
            email: "",
            cpf: "",
            endereco: "",
          }}
        />
      )}

      {isOrdemServicoModalOpen && selectedNotification && (
        <OrdemServicoModal
          isOpen={isOrdemServicoModalOpen}
          onClose={() => setIsOrdemServicoModalOpen(false)}
          onSave={() => {
            setIsOrdemServicoModalOpen(false)
            toast({
              title: "Ordem de serviço gerada",
              description: "A ordem de serviço foi gerada com sucesso.",
            })
            handleResolveNotification(selectedNotification.id)
          }}
        />
      )}
    </div>
  )
}
