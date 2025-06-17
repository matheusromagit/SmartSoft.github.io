"use client"

import { useState } from "react"
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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Plus, Search, X } from "lucide-react"
import { Label } from "@/components/ui/label"

interface OrdemServicoModalProps {
  isOpen: boolean
  onClose: () => void
  ordemServicoData?: any
}

interface Servico {
  nome: string
  valor: number
  quantidade: number
}

const formSchema = z.object({
  cliente: z.string().min(1, "Cliente é obrigatório"),
  veiculo: z.string().min(1, "Veículo é obrigatório"),
  servicos: z
    .array(
      z.object({
        nome: z.string(),
        valor: z.number().min(0, "Valor deve ser maior ou igual a zero"),
        quantidade: z.number().min(1, "Quantidade deve ser pelo menos 1"),
      }),
    )
    .min(1, "Pelo menos um serviço é obrigatório"),
  mecanico: z.string().min(1, "Mecânico é obrigatório"),
  observacoes: z.string().optional(),
})

export function OrdemServicoModal({ isOpen, onClose, ordemServicoData }: OrdemServicoModalProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [clienteSearch, setClienteSearch] = useState("")
  const [veiculoSearch, setVeiculoSearch] = useState("")
  const [servicosList, setServicosList] = useState<Servico[]>(
    ordemServicoData?.servicos?.map((s: any) => ({
      nome: s.nome || s,
      valor: s.valor || 0,
      quantidade: s.quantidade || 1,
    })) || [],
  )
  const [novoServico, setNovoServico] = useState("")
  const [novoServicoValor, setNovoServicoValor] = useState<number>(0)
  const [novoServicoQuantidade, setNovoServicoQuantidade] = useState<number>(1)
  const [clienteSelecionado, setClienteSelecionado] = useState<string>("")

  const clientes = [
    {
      id: 1,
      nome: "Carlos Silva",
      veiculos: [
        { id: 1, nome: "Honda Civic (ABC-1234)" },
        { id: 2, nome: "Fiat Uno (MNO-7890)" },
      ],
    },
    {
      id: 2,
      nome: "Maria Oliveira",
      veiculos: [{ id: 3, nome: "Toyota Corolla (DEF-5678)" }],
    },
    {
      id: 3,
      nome: "João Santos",
      veiculos: [{ id: 4, nome: "Fiat Uno (GHI-9012)" }],
    },
    {
      id: 4,
      nome: "Ana Pereira",
      veiculos: [{ id: 5, nome: "Volkswagen Gol (JKL-3456)" }],
    },
    {
      id: 5,
      nome: "Pedro Souza",
      veiculos: [{ id: 6, nome: "Chevrolet Onix (MNO-7890)" }],
    },
  ]

  const veiculos = [
    { id: 1, nome: "Honda Civic (ABC-1234)" },
    { id: 2, nome: "Toyota Corolla (DEF-5678)" },
    { id: 3, nome: "Fiat Uno (GHI-9012)" },
    { id: 4, nome: "Volkswagen Gol (JKL-3456)" },
    { id: 5, nome: "Chevrolet Onix (MNO-7890)" },
  ]

  const mecanicos = [
    { id: 1, nome: "André Souza" },
    { id: 2, nome: "Ricardo Oliveira" },
    { id: 3, nome: "Marcos Lima" },
    { id: 4, nome: "Paulo Ferreira" },
    { id: 5, nome: "José Almeida" },
  ]

  const servicosSugeridos = [
    "Troca de óleo e filtros",
    "Revisão completa",
    "Alinhamento e balanceamento",
    "Diagnóstico eletrônico",
    "Troca de pastilhas de freio",
    "Troca de correia dentada",
    "Reparo no sistema de freios",
    "Troca de embreagem",
    "Manutenção do ar condicionado",
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
      cliente: ordemServicoData?.cliente || "",
      veiculo: ordemServicoData?.veiculo || "",
      servicos: ordemServicoData?.servicos || [],
      mecanico: ordemServicoData?.mecanico || "",
      observacoes: ordemServicoData?.observacoes || "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    // Simulando envio para API
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: ordemServicoData ? "Ordem de serviço atualizada" : "Ordem de serviço criada",
        description: `Ordem de serviço para ${values.cliente} foi ${ordemServicoData ? "atualizada" : "criada"} com sucesso.`,
      })
      onClose()
      form.reset()
      setServicosList([])
    }, 1500)
  }

  const adicionarServico = () => {
    if (novoServico && !servicosList.some((s) => s.nome === novoServico)) {
      const novoItem: Servico = {
        nome: novoServico,
        valor: novoServicoValor,
        quantidade: novoServicoQuantidade,
      }
      const novosServicos = [...servicosList, novoItem]
      setServicosList(novosServicos)
      form.setValue("servicos", novosServicos)
      setNovoServico("")
      setNovoServicoValor(0)
      setNovoServicoQuantidade(1)
    }
  }

  const removerServico = (servico: string) => {
    const novosServicos = servicosList.filter((s) => s.nome !== servico)
    setServicosList(novosServicos)
    form.setValue("servicos", novosServicos)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{ordemServicoData ? "Editar Ordem de Serviço" : "Nova Ordem de Serviço"}</DialogTitle>
          <DialogDescription>
            {ordemServicoData
              ? "Edite as informações da ordem de serviço abaixo."
              : "Preencha as informações para criar uma nova ordem de serviço."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="cliente"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        setClienteSelecionado(value)
                        // Limpar o veículo selecionado quando o cliente muda
                        form.setValue("veiculo", "")
                      }}
                      defaultValue={field.value}
                    >
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
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!clienteSelecionado}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={clienteSelecionado ? "Selecione um veículo" : "Selecione um cliente primeiro"}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clienteSelecionado ? (
                          <>
                            {clientes
                              .find((c) => c.nome === clienteSelecionado)
                              ?.veiculos.map((veiculo) => (
                                <SelectItem key={veiculo.id} value={veiculo.nome}>
                                  {veiculo.nome}
                                </SelectItem>
                              ))}
                          </>
                        ) : (
                          <div className="p-2 text-sm text-muted-foreground">Selecione um cliente primeiro</div>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="servicos"
                render={() => (
                  <FormItem className="col-span-2">
                    <FormLabel>Serviços</FormLabel>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
                        <div className="md:col-span-2">
                          <Select onValueChange={setNovoServico} value={novoServico}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um serviço" />
                            </SelectTrigger>
                            <SelectContent>
                              {servicosSugeridos.map((servico) => (
                                <SelectItem key={servico} value={servico}>
                                  {servico}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <Label htmlFor="valor">Valor R$</Label>
                            <Input
                              id="valor"
                              type="number"
                              min="0"
                              step="0.01"
                              value={novoServicoValor}
                              onChange={(e) => setNovoServicoValor(Number.parseFloat(e.target.value) || 0)}
                              className="w-full"
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center space-x-2 flex-1">
                            <Label htmlFor="quantidade">Qtd</Label>
                            <Input
                              id="quantidade"
                              type="number"
                              min="1"
                              value={novoServicoQuantidade}
                              onChange={(e) => setNovoServicoQuantidade(Number.parseInt(e.target.value) || 1)}
                              className="w-full"
                            />
                          </div>
                          <Button
                            type="button"
                            onClick={adicionarServico}
                            disabled={!novoServico || novoServicoValor <= 0}
                          >
                            <Plus className="h-4 w-4" />
                            <span className="sr-only">Adicionar serviço</span>
                          </Button>
                        </div>
                      </div>

                      {servicosList.length > 0 && (
                        <div className="rounded-md border">
                          <div className="grid grid-cols-12 gap-2 p-2 font-medium text-sm bg-muted">
                            <div className="col-span-5">Serviço</div>
                            <div className="col-span-2 text-right">Valor</div>
                            <div className="col-span-2 text-center">Qtd</div>
                            <div className="col-span-2 text-right">Total</div>
                            <div className="col-span-1"></div>
                          </div>
                          {servicosList.map((servico, index) => (
                            <div key={index} className="grid grid-cols-12 gap-2 p-2 border-t items-center">
                              <div className="col-span-5 truncate">{servico.nome}</div>
                              <div className="col-span-2 text-right">R$ {servico.valor.toFixed(2)}</div>
                              <div className="col-span-2 text-center">{servico.quantidade}</div>
                              <div className="col-span-2 text-right font-medium">
                                R$ {(servico.valor * servico.quantidade).toFixed(2)}
                              </div>
                              <div className="col-span-1 text-right">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => removerServico(servico.nome)}
                                >
                                  <X className="h-4 w-4" />
                                  <span className="sr-only">Remover {servico.nome}</span>
                                </Button>
                              </div>
                            </div>
                          ))}
                          <div className="grid grid-cols-12 gap-2 p-2 border-t bg-muted font-medium">
                            <div className="col-span-9 text-right">Valor Total:</div>
                            <div className="col-span-2 text-right">
                              R${" "}
                              {servicosList
                                .reduce((total, servico) => total + servico.valor * servico.quantidade, 0)
                                .toFixed(2)}
                            </div>
                            <div className="col-span-1"></div>
                          </div>
                        </div>
                      )}

                      {servicosList.length === 0 && (
                        <p className="text-sm text-muted-foreground">Nenhum serviço adicionado</p>
                      )}
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mecanico"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Mecânico Responsável</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um mecânico" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mecanicos.map((mecanico) => (
                          <SelectItem key={mecanico.id} value={mecanico.nome}>
                            {mecanico.nome}
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
                      <Textarea placeholder="Observações adicionais" {...field} rows={3} />
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
              <Button type="submit" disabled={isSubmitting || servicosList.length === 0}>
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
