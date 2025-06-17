"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { User, Bell, Shield, LogOut } from "lucide-react"

export default function PerfilPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("perfil")

  const handleSaveProfile = () => {
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso.",
    })
  }

  const handleChangePassword = () => {
    toast({
      title: "Senha alterada",
      description: "Sua senha foi alterada com sucesso.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
        <p className="text-muted-foreground">Gerencie suas informações pessoais e preferências</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Avatar" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-bold">João da Silva</h2>
                <p className="text-sm text-muted-foreground">Administrador</p>
              </div>
              <Button variant="outline" className="w-full">
                Alterar Foto
              </Button>
            </div>

            <Separator className="my-6" />

            <nav className="flex flex-col space-y-1">
              <Button
                variant={activeTab === "perfil" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("perfil")}
              >
                <User className="mr-2 h-4 w-4" />
                Informações Pessoais
              </Button>
              <Button
                variant={activeTab === "seguranca" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("seguranca")}
              >
                <Shield className="mr-2 h-4 w-4" />
                Segurança
              </Button>
              <Button
                variant={activeTab === "notificacoes" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("notificacoes")}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notificações
              </Button>
              <Button variant="ghost" className="justify-start text-red-500 hover:bg-red-100 hover:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </nav>
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          {activeTab === "perfil" && (
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>Atualize suas informações pessoais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input id="nome" defaultValue="João da Silva" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" defaultValue="joao@autogest.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" defaultValue="(11) 98765-4321" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cargo">Cargo</Label>
                    <Input id="cargo" defaultValue="Administrador" readOnly disabled />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input id="endereco" defaultValue="Rua das Flores, 123" />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input id="cidade" defaultValue="São Paulo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Input id="estado" defaultValue="SP" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP</Label>
                    <Input id="cep" defaultValue="01234-567" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveProfile}>Salvar Alterações</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "seguranca" && (
            <Card>
              <CardHeader>
                <CardTitle>Segurança</CardTitle>
                <CardDescription>Gerencie sua senha e configurações de segurança</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Alterar Senha</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="senha-atual">Senha Atual</Label>
                      <Input id="senha-atual" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nova-senha">Nova Senha</Label>
                      <Input id="nova-senha" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                      <Input id="confirmar-senha" type="password" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Autenticação de Dois Fatores</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="2fa">Ativar Autenticação de Dois Fatores</Label>
                      <p className="text-sm text-muted-foreground">
                        Adicione uma camada extra de segurança à sua conta
                      </p>
                    </div>
                    <Switch id="2fa" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Sessões Ativas</h3>
                  <div className="rounded-md border">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">Chrome em Windows</p>
                          <p className="text-sm text-muted-foreground">São Paulo, Brasil • Ativo agora</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Encerrar
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">Safari em iPhone</p>
                          <p className="text-sm text-muted-foreground">São Paulo, Brasil • 2 horas atrás</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Encerrar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleChangePassword}>Salvar Alterações</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "notificacoes" && (
            <Card>
              <CardHeader>
                <CardTitle>Notificações</CardTitle>
                <CardDescription>Gerencie suas preferências de notificação</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notificações do Sistema</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notif-agendamentos">Agendamentos</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba notificações sobre novos agendamentos e alterações
                        </p>
                      </div>
                      <Switch id="notif-agendamentos" defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notif-ordens">Ordens de Serviço</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba notificações sobre atualizações em ordens de serviço
                        </p>
                      </div>
                      <Switch id="notif-ordens" defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notif-estoque">Estoque</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba notificações sobre itens com estoque baixo
                        </p>
                      </div>
                      <Switch id="notif-estoque" defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notif-financeiro">Financeiro</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba notificações sobre pagamentos pendentes e vencidos
                        </p>
                      </div>
                      <Switch id="notif-financeiro" defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notificações por E-mail</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-resumo">Resumo Diário</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba um resumo diário das atividades da oficina
                        </p>
                      </div>
                      <Switch id="email-resumo" defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-marketing">Marketing</Label>
                        <p className="text-sm text-muted-foreground">
                          Receba e-mails sobre novidades, dicas e promoções
                        </p>
                      </div>
                      <Switch id="email-marketing" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveProfile}>Salvar Preferências</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
