"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Loader2, Search } from "lucide-react"

interface AgendamentoModalProps {
  isOpen: boolean
  onClose: () => void
  agendamentoData?: any
  selectedDate?: Date
}

const formSchema = z.object({
  data: z.date({
    required_error: "Data é obrigatória",
  }),
  hora: z.string().min(1, "Hora é obrigatória"),
  cliente: z.string().min(1, "Cliente é obrigatório"),
  veiculo: z.string().min(1, "Veículo é obrigatório"),
  servico: z.string().min(1, "Serviço é obrigatório"),
  observacoes: z.string().optional(),
})

export function AgendamentoModal({ isOpen, onClose, agendamentoData, selectedDate }: AgendamentoModalProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [clienteSearch, setClienteSearch] = useState("")
  const [veiculoSearch, setVeiculoSearch] = useState("")

  const clientes = [
    { id: 1, nome: "Carlos Silva" },
    { id: 2, nome: "Maria Oliveira" },
    { id: 3, nome: "João Santos" },
    { id: 4, nome: "Ana Pereira" },
    { id: 5, nome: "Pedro Souza" },
  ]

  const veiculos = [
    { id: 1, nome: "Honda Civic (ABC-1234)" },
    { id: 2, nome: "Toyota Corolla (DEF-5678)" },
    { id: 3, nome: "Fiat Uno (GHI-9012)" },
    { id: 4, nome: "Volkswagen Gol (JKL-3456)" },
    { id: 5, nome: "Chevrolet Onix (MNO-7890)" },
  ]

  const servicos = [
    "Troca de óleo e filtros",
    "Revisão completa",
    "Alinhamento e balanceamento",
    "Diagnóstico eletrônico",
    "Troca de pastilhas de freio",
    "Troca de correia dentada",
    "Reparo no sistema de freios",
    "Troca de embreagem",
    "Manutenção do ar condicionado",
    "Outro",
  ]

  const horarios = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ]

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(clienteSearch.toLowerCase()),
  )

  const filteredVeiculos = veiculos.filter((veiculo) =>
    veiculo.nome.toLowerCase().includes(veiculoSearch.toLowerCase()),
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      data: agendamentoData?.data || selectedDate || new Date(),
      hora: agendamentoData?.hora || "",
      cliente: agendamentoData?.cliente || "",
      veiculo: agendamentoData?.veiculo || "",
      servico: agendamentoData?.servico || "",
      observacoes: agendamentoData?.observacoes || "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    // Simulando envio para API
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: agendamentoData ? "Agendamento atualizado" : "Agendamento criado",
        description: `Agendamento para ${values.cliente} em ${format(values.data, "dd/MM/yyyy")} às ${values.hora} foi ${agendamentoData ? "atualizado" : "criado"} com sucesso.`,
      })
      onClose()
      form.reset()
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{agendamentoData ? "Editar Agendamento" : "Novo Agendamento"}</DialogTitle>
          <DialogDescription>
            {agendamentoData
              ? "Edite as informações do agendamento abaixo."
              : "Preencha as informações para criar um novo agendamento."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="data"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" className="w-full pl-3 text-left font-normal">
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy", { locale: ptBR })
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                          locale={ptBR}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hora"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um horário" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {horarios.map((horario) => (
                          <SelectItem key={horario} value={horario}>
                            {horario}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cliente"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um cliente" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <div className="flex items-center px-3 pb-2">
                          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                          <Input
                            placeholder="Buscar cliente..."
                            className="h-8 w-full"
                            value={clienteSearch}
                            onChange={(e) => setClienteSearch(e.target.value)}
                          />
                        </div>
                        {filteredClientes.map((cliente) => (
                          <SelectItem key={cliente.id} value={cliente.nome}>
                            {cliente.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="veiculo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Veículo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um veículo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <div className="flex items-center px-3 pb-2">
                          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                          <Input
                            placeholder="Buscar veículo..."
                            className="h-8 w-full"
                            value={veiculoSearch}
                            onChange={(e) => setVeiculoSearch(e.target.value)}
                          />
                        </div>
                        {filteredVeiculos.map((veiculo) => (
                          <SelectItem key={veiculo.id} value={veiculo.nome}>
                            {veiculo.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="servico"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Serviço</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um serviço" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {servicos.map((servico) => (
                          <SelectItem key={servico} value={servico}>
                            {servico}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="observacoes"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Input placeholder="Observações adicionais" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Salvar"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
