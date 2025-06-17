"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Calendar } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface LancamentoModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  lancamentoData?: any
}

const formSchema = z.object({
  data: z.date({
    required_error: "Data é obrigatória",
  }),
  descricao: z.string().min(3, "Descrição deve ter pelo menos 3 caracteres"),
  categoria: z.string().min(1, "Categoria é obrigatória"),
  tipo: z.enum(["Receita", "Despesa"], {
    required_error: "Tipo de lançamento é obrigatório",
  }),
  valor: z.coerce.number().min(0.01, "Valor deve ser maior que zero"),
  status: z.enum(["Pago", "Pendente"], {
    required_error: "Status é obrigatório",
  }),
  formaPagamento: z.string().min(1, "Forma de pagamento é obrigatória"),
  cliente: z.string().optional(),
  fornecedor: z.string().optional(),
  observacao: z.string().optional(),
})

export function LancamentoModal({ isOpen, onClose, onSave, lancamentoData }: LancamentoModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      data: new Date(),
      descricao: "",
      categoria: "",
      tipo: "Receita",
      valor: 0,
      status: "Pendente",
      formaPagamento: "",
      cliente: "",
      fornecedor: "",
      observacao: "",
    },
  })

  useEffect(() => {
    if (lancamentoData) {
      // Converter a string de data para objeto Date
      const dataParts = lancamentoData.data.split("/")
      const dataObj = new Date(
        Number.parseInt(dataParts[2], 10),
        Number.parseInt(dataParts[1], 10) - 1,
        Number.parseInt(dataParts[0], 10),
      )

      form.reset({
        data: dataObj,
        descricao: lancamentoData.descricao,
        categoria: lancamentoData.categoria,
        tipo: lancamentoData.tipo,
        valor: lancamentoData.valor,
        status: lancamentoData.status,
        formaPagamento: lancamentoData.formaPagamento,
        cliente: lancamentoData.cliente || "",
        fornecedor: lancamentoData.fornecedor || "",
        observacao: lancamentoData.observacao || "",
      })
    } else {
      form.reset({
        data: new Date(),
        descricao: "",
        categoria: "",
        tipo: "Receita",
        valor: 0,
        status: "Pendente",
        formaPagamento: "",
        cliente: "",
        fornecedor: "",
        observacao: "",
      })
    }
  }, [lancamentoData, form, isOpen])

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    // Formatar a data para string no formato dd/mm/yyyy
    const dataFormatada = format(values.data, "dd/MM/yyyy")

    // Simulando envio para API
    setTimeout(() => {
      setIsSubmitting(false)
      onSave(
        lancamentoData ? { ...values, id: lancamentoData.id, data: dataFormatada } : { ...values, data: dataFormatada },
      )
      onClose()
    }, 1000)
  }

  const categorias = {
    Receita: ["Serviços", "Vendas de Peças", "Outros"],
    Despesa: ["Estoque", "Despesas Fixas", "Salários", "Impostos", "Outros"],
  }

  const formasPagamento = [
    "Dinheiro",
    "Cartão de Débito",
    "Cartão de Crédito",
    "Transferência",
    "PIX",
    "Boleto",
    "Cheque",
  ]

  const watchTipo = form.watch("tipo")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{lancamentoData ? "Editar Lançamento" : "Novo Lançamento"}</DialogTitle>
          <DialogDescription>
            {lancamentoData
              ? "Edite as informações do lançamento financeiro."
              : "Preencha as informações para adicionar um novo lançamento financeiro."}
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
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy", { locale: ptBR })
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
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
                name="tipo"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Tipo de Lançamento</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Receita" />
                          </FormControl>
                          <FormLabel className="font-normal">Receita</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Despesa" />
                          </FormControl>
                          <FormLabel className="font-normal">Despesa</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input placeholder="Descrição do lançamento" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categorias[watchTipo as keyof typeof categorias].map((categoria) => (
                          <SelectItem key={categoria} value={categoria}>
                            {categoria}
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
                name="valor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor (R$)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0.01" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Pago">Pago</SelectItem>
                        <SelectItem value="Pendente">Pendente</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="formaPagamento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Forma de Pagamento</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma forma de pagamento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {formasPagamento.map((forma) => (
                          <SelectItem key={forma} value={forma}>
                            {forma}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {watchTipo === "Receita" && (
                <FormField
                  control={form.control}
                  name="cliente"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cliente</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do cliente" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {watchTipo === "Despesa" && (
                <FormField
                  control={form.control}
                  name="fornecedor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fornecedor</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do fornecedor" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="observacao"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Observação</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Observações adicionais" className="resize-none" {...field} />
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
