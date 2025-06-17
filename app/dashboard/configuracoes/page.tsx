"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Database, Printer, Plus, Edit, Trash, Check, X } from "lucide-react"

export default function ConfiguracoesPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("geral")
  const [isEditing, setIsEditing] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  // Dados de usuários
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nome: "João da Silva",
      email: "admin@autogest.com",
      cargo: "Administrador",
      tipo: "admin",
      ativo: true,
      permissoes: {
        clientes: { visualizar: true, adicionar: true, editar: true, excluir: true },
        veiculos: { visualizar: true, adicionar: true, editar: true, excluir: true },
        agendamentos: { visualizar: true, adicionar: true, editar: true, excluir: true },
        ordens: { visualizar: true, adicionar: true, editar: true, excluir: true },
        estoque: { visualizar: true, adicionar: true, editar: true, excluir: true },
        financeiro: { visualizar: true, adicionar: true, editar: true, excluir: true },
        relatorios: { visualizar: true, adicionar: true, editar: true, excluir: true },
        configuracoes: { visualizar: true, adicionar: true, editar: true, excluir: true },
      },
    },
    {
      id: 2,
      nome: "Maria Oliveira",
      email: "maria@autogest.com",
      cargo: "Recepcionista",
      tipo: "funcionario",
      ativo: true,
      permissoes: {
        clientes: { visualizar: true, adicionar: true, editar: true, excluir: false },
        veiculos: { visualizar: true, adicionar: true, editar: true, excluir: false },
        agendamentos: { visualizar: true, adicionar: true, editar: true, excluir: true },
        ordens: { visualizar: true, adicionar: true, editar: true, excluir: false },
        estoque: { visualizar: true, adicionar: false, editar: false, excluir: false },
        financeiro: { visualizar: false, adicionar: false, editar: false, excluir: false },
        relatorios: { visualizar: false, adicionar: false, editar: false, excluir: false },
        configuracoes: { visualizar: false, adicionar: false, editar: false, excluir: false },
      },
    },
    {
      id: 3,
      nome: "Pedro Santos",
      email: "pedro@autogest.com",
      cargo: "Mecânico",
      tipo: "funcionario",
      ativo: true,
      permissoes: {
        clientes: { visualizar: true, adicionar: false, editar: false, excluir: false },
        veiculos: { visualizar: true, adicionar: false, editar: false, excluir: false },
        agendamentos: { visualizar: true, adicionar: false, editar: false, excluir: false },
        ordens: { visualizar: true, adicionar: true, editar: true, excluir: false },
        estoque: { visualizar: true, adicionar: true, editar: false, excluir: false },
        financeiro: { visualizar: false, adicionar: false, editar: false, excluir: false },
        relatorios: { visualizar: false, adicionar: false, editar: false, excluir: false },
        configuracoes: { visualizar: false, adicionar: false, editar: false, excluir: false },
      },
    },
  ])

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas configurações foram salvas com sucesso.",
    })
  }

  const handleSaveUser = (user: any) => {
    if (selectedUser) {
      // Editar usuário existente
      setUsuarios(usuarios.map((u) => (u.id === user.id ? user : u)))
      toast({
        title: "Usuário atualizado",
        description: `O usuário ${user.nome} foi atualizado com sucesso.`,
      })
    } else {
      // Adicionar novo usuário
      const newUser = {
        ...user,
        id: usuarios.length + 1,
      }
      setUsuarios([...usuarios, newUser])
      toast({
        title: "Usuário adicionado",
        description: `O usuário ${user.nome} foi adicionado com sucesso.`,
      })
    }
    setIsEditing(false)
    setSelectedUser(null)
  }

  const handleDeleteUser = (id: number) => {
    setUsuarios(usuarios.filter((user) => user.id !== id))
    toast({
      title: "Usuário excluído",
      description: "O usuário foi excluído com sucesso.",
    })
  }

  const handleToggleUserStatus = (id: number) => {
    setUsuarios(
      usuarios.map((user) => {
        if (user.id === id) {
          return { ...user, ativo: !user.ativo }
        }
        return user
      }),
    )
    const user = usuarios.find((u) => u.id === id)
    toast({
      title: user?.ativo ? "Usuário desativado" : "Usuário ativado",
      description: `O usuário ${user?.nome} foi ${user?.ativo ? "desativado" : "ativado"} com sucesso.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações do sistema</p>
      </div>

      <Tabs defaultValue="geral" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="usuarios">Usuários</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="aparencia">Aparência</TabsTrigger>
          <TabsTrigger value="sistema">Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="geral" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Empresa</CardTitle>
              <CardDescription>Informações básicas da sua oficina</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nome-empresa">Nome da Empresa</Label>
                  <Input id="nome-empresa" defaultValue="AutoGest Oficina Mecânica" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input id="cnpj" defaultValue="12.345.678/0001-90" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" defaultValue="(11) 98765-4321" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" defaultValue="contato@autogest.com" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input id="endereco" defaultValue="Rua das Oficinas, 123 - Centro - São Paulo/SP" />
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Configurações Fiscais</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="regime-tributario">Regime Tributário</Label>
                    <Select defaultValue="simples">
                      <SelectTrigger id="regime-tributario">
                        <SelectValue placeholder="Selecione o regime tributário" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="simples">Simples Nacional</SelectItem>
                        <SelectItem value="lucro-presumido">Lucro Presumido</SelectItem>
                        <SelectItem value="lucro-real">Lucro Real</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inscricao-estadual">Inscrição Estadual</Label>
                    <Input id="inscricao-estadual" defaultValue="123.456.789" />
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-end">
                <Button onClick={handleSaveSettings}>Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usuarios" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Usuários do Sistema</CardTitle>
                <CardDescription>Gerencie os usuários que têm acesso ao sistema</CardDescription>
              </div>
              <Button
                onClick={() => {
                  setSelectedUser(null)
                  setIsEditing(true)
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Novo Usuário
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usuarios.map((usuario) => (
                    <TableRow key={usuario.id}>
                      <TableCell className="font-medium">{usuario.nome}</TableCell>
                      <TableCell>{usuario.email}</TableCell>
                      <TableCell>{usuario.cargo}</TableCell>
                      <TableCell>
                        <Badge variant={usuario.tipo === "admin" ? "default" : "secondary"}>
                          {usuario.tipo === "admin" ? "Administrador" : "Funcionário"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={usuario.ativo ? "outline" : "destructive"}
                          className={
                            usuario.ativo ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : ""
                          }
                        >
                          {usuario.ativo ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedUser(usuario)
                              setIsEditing(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleToggleUserStatus(usuario.id)}>
                            {usuario.ativo ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                            <span className="sr-only">{usuario.ativo ? "Desativar" : "Ativar"}</span>
                          </Button>
                          {usuario.id !== 1 && (
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(usuario.id)}>
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Excluir</span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {isEditing && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedUser ? "Editar Usuário" : "Novo Usuário"}</CardTitle>
                <CardDescription>
                  {selectedUser
                    ? "Edite as informações e permissões do usuário"
                    : "Preencha as informações para adicionar um novo usuário"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input id="nome" defaultValue={selectedUser?.nome || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" defaultValue={selectedUser?.email || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cargo">Cargo</Label>
                    <Input id="cargo" defaultValue={selectedUser?.cargo || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo de Usuário</Label>
                    <Select defaultValue={selectedUser?.tipo || "funcionario"}>
                      <SelectTrigger id="tipo">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="funcionario">Funcionário</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {!selectedUser && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="senha">Senha</Label>
                        <Input id="senha" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmar-senha">Confirmar Senha</Label>
                        <Input id="confirmar-senha" type="password" />
                      </div>
                    </>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Permissões</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-5 gap-4 font-medium">
                      <div>Módulo</div>
                      <div className="text-center">Visualizar</div>
                      <div className="text-center">Adicionar</div>
                      <div className="text-center">Editar</div>
                      <div className="text-center">Excluir</div>
                    </div>
                    <Separator />
                    {[
                      { id: "clientes", label: "Clientes" },
                      { id: "veiculos", label: "Veículos" },
                      { id: "agendamentos", label: "Agendamentos" },
                      { id: "ordens", label: "Ordens de Serviço" },
                      { id: "estoque", label: "Estoque" },
                      { id: "financeiro", label: "Financeiro" },
                      { id: "relatorios", label: "Relatórios" },
                      { id: "configuracoes", label: "Configurações" },
                    ].map((modulo) => (
                      <div key={modulo.id} className="grid grid-cols-5 gap-4 items-center">
                        <div>{modulo.label}</div>
                        <div className="flex justify-center">
                          <Switch
                            defaultChecked={
                              selectedUser?.permissoes?.[modulo.id as keyof typeof selectedUser.permissoes]?.visualizar
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            defaultChecked={
                              selectedUser?.permissoes?.[modulo.id as keyof typeof selectedUser.permissoes]?.adicionar
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            defaultChecked={
                              selectedUser?.permissoes?.[modulo.id as keyof typeof selectedUser.permissoes]?.editar
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Switch
                            defaultChecked={
                              selectedUser?.permissoes?.[modulo.id as keyof typeof selectedUser.permissoes]?.excluir
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false)
                      setSelectedUser(null)
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={() => handleSaveUser(selectedUser || {})}>Salvar</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="notificacoes" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>Gerencie como e quando você recebe notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notificações do Sistema</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="agendamentos">Novos Agendamentos</Label>
                      <p className="text-sm text-muted-foreground">
                        Receba notificações quando novos agendamentos forem criados
                      </p>
                    </div>
                    <Switch id="agendamentos" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="ordens">Atualizações de Ordens de Serviço</Label>
                      <p className="text-sm text-muted-foreground">
                        Receba notificações quando ordens de serviço forem atualizadas
                      </p>
                    </div>
                    <Switch id="ordens" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="estoque">Alertas de Estoque</Label>
                      <p className="text-sm text-muted-foreground">
                        Receba notificações quando itens do estoque estiverem abaixo do mínimo
                      </p>
                    </div>
                    <Switch id="estoque" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="financeiro">Alertas Financeiros</Label>
                      <p className="text-sm text-muted-foreground">
                        Receba notificações sobre pagamentos pendentes e vencidos
                      </p>
                    </div>
                    <Switch id="financeiro" defaultChecked />
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notificações por E-mail</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-resumo">Resumo Diário</Label>
                      <p className="text-sm text-muted-foreground">Receba um resumo diário das atividades da oficina</p>
                    </div>
                    <Switch id="email-resumo" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-agendamentos">Agendamentos</Label>
                      <p className="text-sm text-muted-foreground">Receba e-mails sobre novos agendamentos</p>
                    </div>
                    <Switch id="email-agendamentos" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-financeiro">Relatórios Financeiros</Label>
                      <p className="text-sm text-muted-foreground">Receba relatórios financeiros semanais por e-mail</p>
                    </div>
                    <Switch id="email-financeiro" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveSettings}>Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aparencia" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Aparência</CardTitle>
              <CardDescription>Personalize a aparência do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tema</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Modo</Label>
                    <Select defaultValue="system">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o modo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Escuro</SelectItem>
                        <SelectItem value="system">Sistema</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Cor Primária</Label>
                    <Select defaultValue="blue">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a cor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blue">Azul</SelectItem>
                        <SelectItem value="green">Verde</SelectItem>
                        <SelectItem value="purple">Roxo</SelectItem>
                        <SelectItem value="red">Vermelho</SelectItem>
                        <SelectItem value="orange">Laranja</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Raio de Borda</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o raio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Pequeno</SelectItem>
                        <SelectItem value="medium">Médio</SelectItem>
                        <SelectItem value="large">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Layout</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sidebar-compact">Barra Lateral Compacta</Label>
                      <p className="text-sm text-muted-foreground">Exibe apenas ícones na barra lateral</p>
                    </div>
                    <Switch id="sidebar-compact" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="animations">Animações</Label>
                      <p className="text-sm text-muted-foreground">Ativa ou desativa animações na interface</p>
                    </div>
                    <Switch id="animations" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveSettings}>Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sistema" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Sistema</CardTitle>
              <CardDescription>Configurações avançadas do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Banco de Dados</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="backup-auto">Backup Automático</Label>
                      <p className="text-sm text-muted-foreground">Realiza backups automáticos do banco de dados</p>
                    </div>
                    <Switch id="backup-auto" defaultChecked />
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Frequência de Backup</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a frequência" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">A cada hora</SelectItem>
                          <SelectItem value="daily">Diário</SelectItem>
                          <SelectItem value="weekly">Semanal</SelectItem>
                          <SelectItem value="monthly">Mensal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Retenção de Backup</Label>
                      <Select defaultValue="30">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o período" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 dias</SelectItem>
                          <SelectItem value="30">30 dias</SelectItem>
                          <SelectItem value="90">90 dias</SelectItem>
                          <SelectItem value="365">365 dias</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline">
                      <Database className="mr-2 h-4 w-4" />
                      Fazer Backup Agora
                    </Button>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Impressão</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Formato Padrão</Label>
                      <Select defaultValue="a4">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o formato" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a4">A4</SelectItem>
                          <SelectItem value="letter">Carta</SelectItem>
                          <SelectItem value="thermal">Térmica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Impressora Padrão</Label>
                      <Select defaultValue="default">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a impressora" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Impressora Padrão do Sistema</SelectItem>
                          <SelectItem value="hp">HP LaserJet Pro</SelectItem>
                          <SelectItem value="epson">Epson L3150</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline">
                      <Printer className="mr-2 h-4 w-4" />
                      Testar Impressão
                    </Button>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Integração</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="api-enabled">API Habilitada</Label>
                      <p className="text-sm text-muted-foreground">
                        Permite que outros sistemas se integrem com o AutoGest
                      </p>
                    </div>
                    <Switch id="api-enabled" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label>Chave da API</Label>
                    <div className="flex gap-2">
                      <Input
                        value="sk_live_51NzT7RJKqJB5gKZoP9HZR5VXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                        type="password"
                        readOnly
                      />
                      <Button variant="outline">Copiar</Button>
                      <Button variant="outline">Gerar Nova</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Mantenha esta chave em segredo. Ela permite acesso completo à sua conta.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveSettings}>Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
