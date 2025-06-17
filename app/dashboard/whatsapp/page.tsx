import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { WhatsappNotifications } from "@/components/whatsapp/whatsapp-notifications"
import { WhatsappConversation } from "@/components/whatsapp/whatsapp-conversation"
import { Separator } from "@/components/ui/separator"
import { PlusCircle, MessageSquare, Users, Clock, Bot } from "lucide-react"

export default function WhatsappPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">WhatsApp</h2>
          <p className="text-muted-foreground">Gerencie suas conversas e solicitações recebidas via WhatsApp.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-1">
            <Bot className="h-4 w-4" />
            Status do Agente: Ativo
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Mensagem
          </Button>
        </div>
      </div>

      <Tabs defaultValue="notificacoes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notificacoes" className="gap-1">
            <MessageSquare className="h-4 w-4" />
            Notificações
            <Badge variant="destructive" className="ml-1">
              4
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="conversas" className="gap-1">
            <Users className="h-4 w-4" />
            Conversas Ativas
          </TabsTrigger>
          <TabsTrigger value="historico" className="gap-1">
            <Clock className="h-4 w-4" />
            Histórico
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notificacoes" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Novas Solicitações</CardTitle>
              <CardDescription>Solicitações recebidas via WhatsApp que precisam de sua atenção.</CardDescription>
            </CardHeader>
            <CardContent>
              <WhatsappNotifications />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversas" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Conversas Ativas</CardTitle>
                  <CardDescription>Conversas em andamento com clientes.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-3 p-2 rounded-md bg-accent/50 cursor-pointer">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">João da Silva</p>
                        <Badge>Cliente</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">Última msg: 5 min atrás</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2 rounded-md hover:bg-accent/50 cursor-pointer">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">Maria Rodrigues</p>
                        <Badge>Cliente</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">Última msg: 20 min atrás</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2 rounded-md hover:bg-accent/50 cursor-pointer">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>NC</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">Número não cadastrado</p>
                        <Badge variant="outline">Novo</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">Última msg: 32 min atrás</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card className="h-full flex flex-col">
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <CardTitle>João da Silva</CardTitle>
                      <Badge>Cliente</Badge>
                    </div>
                    <CardDescription>(11) 98765-4321 • Última visita: 15/04/2025</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Ver Perfil
                    </Button>
                    <Button variant="outline" size="sm">
                      Ver Veículos
                    </Button>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="flex-1 p-0">
                  <WhatsappConversation isRegistered={true} />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="historico" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Histórico de Conversas</CardTitle>
              <CardDescription>Histórico de todas as conversas finalizadas.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Histórico de conversas aqui */}
                <p className="text-center text-muted-foreground py-8">Funcionalidade em desenvolvimento.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
