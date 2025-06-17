"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { UserPlus, FileText, Send, Paperclip, Bot } from "lucide-react"
import { ClienteModal } from "@/components/clientes/cliente-modal"
import { OrdemServicoModal } from "@/components/ordens-servico/ordem-servico-modal"
import { useToast } from "@/components/ui/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  content: string
  sender: "user" | "agent" | "bot"
  timestamp: string
}

interface WhatsappConversationProps {
  isRegistered: boolean
}

export function WhatsappConversation({ isRegistered }: WhatsappConversationProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Olá, gostaria de agendar uma revisão para meu carro Fiat Uno 2018.",
      sender: "user",
      timestamp: "10:30",
    },
    {
      id: "2",
      content:
        "Olá! Sou o assistente virtual da AutoGest. Entendi que você deseja agendar uma revisão para seu Fiat Uno 2018. Posso ajudar com isso. Você já é cliente da nossa oficina?",
      sender: "bot",
      timestamp: "10:31",
    },
    {
      id: "3",
      content: "Não, é a primeira vez que estou entrando em contato.",
      sender: "user",
      timestamp: "10:32",
    },
    {
      id: "4",
      content:
        "Entendi! Para agendar sua revisão, precisaremos de algumas informações. Poderia me informar seu nome completo?",
      sender: "bot",
      timestamp: "10:33",
    },
    {
      id: "5",
      content: "João da Silva",
      sender: "user",
      timestamp: "10:34",
    },
    {
      id: "6",
      content: "Obrigado, João! Qual seria a quilometragem atual do seu Fiat Uno 2018?",
      sender: "bot",
      timestamp: "10:35",
    },
    {
      id: "7",
      content: "Está com 45.000 km",
      sender: "user",
      timestamp: "10:36",
    },
    {
      id: "8",
      content:
        "Perfeito! Para a revisão de 45.000 km do Fiat Uno 2018, recomendamos os seguintes serviços:\n\n- Troca de óleo e filtro\n- Verificação dos freios\n- Alinhamento e balanceamento\n- Verificação da suspensão\n- Verificação dos sistemas elétricos\n\nTemos disponibilidade para a próxima semana. Qual seria o melhor dia para você?",
      sender: "bot",
      timestamp: "10:37",
    },
    {
      id: "9",
      content: "Pode ser na terça-feira pela manhã?",
      sender: "user",
      timestamp: "10:38",
    },
    {
      id: "10",
      content: "Momento, vou verificar a disponibilidade...",
      sender: "bot",
      timestamp: "10:39",
    },
    {
      id: "11",
      content: "Temos horário disponível na terça-feira às 9h. Seria bom para você?",
      sender: "bot",
      timestamp: "10:40",
    },
    {
      id: "12",
      content: "Sim, perfeito!",
      sender: "user",
      timestamp: "10:41",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [isClienteModalOpen, setIsClienteModalOpen] = useState(false)
  const [isOrdemServicoModalOpen, setIsOrdemServicoModalOpen] = useState(false)
  const { toast } = useToast()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    // Adicionar mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "agent",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    // Simular resposta do bot após 1 segundo
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Mensagem recebida! Um atendente entrará em contato em breve.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 overflow-hidden">
        <ScrollArea className="h-[calc(70vh-180px)]">
          <div className="space-y-4 px-1">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender !== "user" ? "justify-start" : "justify-end"}`}>
                {message.sender !== "user" && (
                  <div className="flex-shrink-0 mr-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={
                          message.sender === "bot"
                            ? "/placeholder.svg?height=32&width=32"
                            : "/placeholder.svg?height=32&width=32"
                        }
                      />
                      <AvatarFallback>{message.sender === "bot" ? "BOT" : "AG"}</AvatarFallback>
                    </Avatar>
                  </div>
                )}

                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : message.sender === "bot"
                        ? "bg-accent border border-accent"
                        : "bg-muted"
                  }`}
                >
                  {message.sender === "bot" && (
                    <div className="flex items-center gap-1 mb-1">
                      <Bot className="h-3 w-3" />
                      <span className="text-xs font-medium">Assistente IA</span>
                    </div>
                  )}
                  <div className="whitespace-pre-line">{message.content}</div>
                  <div className="text-xs mt-1 opacity-70 text-right">{message.timestamp}</div>
                </div>

                {message.sender === "user" && (
                  <div className="flex-shrink-0 ml-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {!isRegistered && (
        <Card className="mx-4 mb-4 bg-blue-500/10 border-blue-500/20">
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">Cliente não cadastrado no sistema</span>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="gap-1 border-blue-500/20 hover:border-blue-500/40"
              onClick={() => setIsClienteModalOpen(true)}
            >
              <UserPlus className="h-4 w-4" />
              Cadastrar Cliente
            </Button>
          </div>
        </Card>
      )}

      <Card className="mx-4 mb-4 bg-green-500/10 border-green-500/20">
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">Serviço identificado: Revisão para Fiat Uno 2018</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="gap-1 border-green-500/20 hover:border-green-500/40"
            onClick={() => setIsOrdemServicoModalOpen(true)}
          >
            <FileText className="h-4 w-4" />
            Gerar OS
          </Button>
        </div>
      </Card>

      <div className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="flex-shrink-0">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Textarea
            placeholder="Digite sua mensagem..."
            className="min-h-10 resize-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
          />
          <Button variant="default" size="icon" className="flex-shrink-0" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isClienteModalOpen && (
        <ClienteModal
          isOpen={isClienteModalOpen}
          onClose={() => setIsClienteModalOpen(false)}
          onSave={() => {
            setIsClienteModalOpen(false)
            toast({
              title: "Cliente cadastrado",
              description: "O cliente foi cadastrado com sucesso.",
            })
          }}
          initialData={{
            nome: "João da Silva",
            telefone: "(11) 98765-4321",
            email: "",
            cpf: "",
            endereco: "",
          }}
        />
      )}

      {isOrdemServicoModalOpen && (
        <OrdemServicoModal
          isOpen={isOrdemServicoModalOpen}
          onClose={() => setIsOrdemServicoModalOpen(false)}
          onSave={() => {
            setIsOrdemServicoModalOpen(false)
            toast({
              title: "Ordem de serviço gerada",
              description: "A ordem de serviço foi gerada com sucesso.",
            })
          }}
        />
      )}
    </div>
  )
}
