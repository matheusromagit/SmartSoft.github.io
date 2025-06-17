import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MessageSquare } from "lucide-react"

export default function AjudaPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Ajuda</h1>
        <p className="text-muted-foreground">Encontre respostas para suas dúvidas</p>
      </div>

      <Tabs defaultValue="faq">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">Perguntas Frequentes</TabsTrigger>
          <TabsTrigger value="tutoriais">Tutoriais</TabsTrigger>
          <TabsTrigger value="contato">Contato</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
              <CardDescription>Respostas para as dúvidas mais comuns</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Como cadastrar um novo cliente?</AccordionTrigger>
                  <AccordionContent>
                    Para cadastrar um novo cliente, acesse o menu "Clientes" e clique no botão "Novo Cliente". Preencha
                    todos os campos obrigatórios e clique em "Salvar".
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Como criar uma ordem de serviço?</AccordionTrigger>
                  <AccordionContent>
                    Para criar uma ordem de serviço, acesse o menu "Ordens de Serviço" e clique no botão "Nova Ordem".
                    Selecione o cliente, o veículo, adicione os serviços e peças necessárias e clique em "Salvar".
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Como registrar um pagamento?</AccordionTrigger>
                  <AccordionContent>
                    Para registrar um pagamento, acesse o menu "Financeiro" e clique no botão "Novo Lançamento".
                    Selecione o tipo "Receita", preencha os dados do pagamento e clique em "Salvar".
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Como agendar um serviço?</AccordionTrigger>
                  <AccordionContent>
                    Para agendar um serviço, acesse o menu "Agendamentos" e clique no botão "Novo Agendamento".
                    Selecione o cliente, o veículo, a data e hora desejada, adicione uma descrição do serviço e clique
                    em "Salvar".
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Como gerenciar o estoque?</AccordionTrigger>
                  <AccordionContent>
                    Para gerenciar o estoque, acesse o menu "Estoque". Você pode adicionar novos itens, registrar
                    entradas e saídas, e visualizar o histórico de movimentações. Para adicionar um novo item, clique em
                    "Novo Item". Para registrar uma movimentação, selecione o item e clique em "Movimentar".
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tutoriais" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tutoriais em Vídeo</CardTitle>
              <CardDescription>Aprenda a utilizar o sistema com nossos tutoriais</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Primeiros Passos</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <span className="text-muted-foreground">Vídeo Tutorial</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Aprenda os conceitos básicos para começar a utilizar o sistema.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Gerenciando Clientes</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <span className="text-muted-foreground">Vídeo Tutorial</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Aprenda a cadastrar, editar e gerenciar seus clientes.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Ordens de Serviço</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <span className="text-muted-foreground">Vídeo Tutorial</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Aprenda a criar e gerenciar ordens de serviço.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Controle Financeiro</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <span className="text-muted-foreground">Vídeo Tutorial</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Aprenda a gerenciar as finanças da sua oficina.</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contato" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Entre em Contato</CardTitle>
              <CardDescription>Estamos aqui para ajudar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="flex items-center text-lg">
                      <Phone className="mr-2 h-5 w-5" />
                      Telefone
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">Atendimento de segunda a sexta, das 8h às 18h</p>
                    <p className="mt-2 font-medium">(11) 4002-8922</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="flex items-center text-lg">
                      <Mail className="mr-2 h-5 w-5" />
                      E-mail
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">Resposta em até 24 horas úteis</p>
                    <p className="mt-2 font-medium">suporte@autogest.com</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="flex items-center text-lg">
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Chat
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">Atendimento online em tempo real</p>
                    <Button className="mt-2 w-full">Iniciar Chat</Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Envie uma Mensagem</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <form className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="nome" className="text-sm font-medium">
                          Nome
                        </label>
                        <input
                          id="nome"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          placeholder="Seu nome"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          E-mail
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="assunto" className="text-sm font-medium">
                        Assunto
                      </label>
                      <input
                        id="assunto"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="Assunto da mensagem"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="mensagem" className="text-sm font-medium">
                        Mensagem
                      </label>
                      <textarea
                        id="mensagem"
                        className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="Digite sua mensagem"
                      />
                    </div>
                    <Button className="w-full">Enviar Mensagem</Button>
                  </form>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
