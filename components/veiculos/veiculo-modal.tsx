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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Search } from "lucide-react"

interface VeiculoModalProps {
  isOpen: boolean
  onClose: () => void
  veiculoData?: any
}

const formSchema = z.object({
  placa: z.string().min(7, "Placa inválida").max(8, "Placa inválida"),
  marca: z.string().min(2, "Marca deve ter pelo menos 2 caracteres"),
  modelo: z.string().min(2, "Modelo deve ter pelo menos 2 caracteres"),
  ano: z.string().min(4, "Ano inválido").max(4, "Ano inválido"),
  cor: z.string().min(3, "Cor deve ter pelo menos 3 caracteres"),
  cliente: z.string().min(1, "Cliente é obrigatório"),
  km: z.string().min(1, "Quilometragem é obrigatória"),
  chassi: z.string().min(17, "Chassi inválido").max(17, "Chassi inválido"),
})

export function VeiculoModal({ isOpen, onClose, veiculoData }: VeiculoModalProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [clienteSearch, setClienteSearch] = useState("")

  const clientes = [
    { id: 1, nome: "Carlos Silva" },
    { id: 2, nome: "Maria Oliveira" },
    { id: 3, nome: "João Santos" },
    { id: 4, nome: "Ana Pereira" },
    { id: 5, nome: "Pedro Souza" },
  ]

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(clienteSearch.toLowerCase()),
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      placa: veiculoData?.placa || "",
      marca: veiculoData?.marca || "",
      modelo: veiculoData?.modelo || "",
      ano: veiculoData?.ano ? String(veiculoData.ano) : "",
      cor: veiculoData?.cor || "",
      cliente: veiculoData?.cliente || "",
      km: veiculoData?.km || "",
      chassi: veiculoData?.chassi || "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    // Simulando envio para API
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: veiculoData ? "Veículo atualizado" : "Veículo cadastrado",
        description: `${values.marca} ${values.modelo} (${values.placa}) foi ${veiculoData ? "atualizado" : "cadastrado"} com sucesso.`,
      })
      onClose()
      form.reset()
    }, 1500)
  }

  // Formatação de placa
  const formatPlaca = (value: string) => {
    return value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .replace(/([A-Z]{3})(\d{4})/, "$1-$2")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{veiculoData ? "Editar Veículo" : "Novo Veículo"}</DialogTitle>
          <DialogDescription>
            {veiculoData
              ? "Edite as informações do veículo abaixo."
              : "Preencha as informações para cadastrar um novo veículo."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="placa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Placa</FormLabel>
                    <FormControl>
                      <Input placeholder="ABC-1234" {...field} value={formatPlaca(field.value)} autoFocus />
                    </FormControl>
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
                    <div className="relative">
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
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="marca"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marca</FormLabel>
                    <FormControl>
                      <Input placeholder="Marca do veículo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="modelo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modelo</FormLabel>
                    <FormControl>
                      <Input placeholder="Modelo do veículo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ano"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ano</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="2023"
                        {...field}
                        maxLength={4}
                        onKeyPress={(e) => {
                          if (!/[0-9]/.test(e.key)) {
                            e.preventDefault()
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cor</FormLabel>
                    <FormControl>
                      <Input placeholder="Cor do veículo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="km"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quilometragem</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0"
                        {...field}
                        onKeyPress={(e) => {
                          if (!/[0-9]/.test(e.key)) {
                            e.preventDefault()
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="chassi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chassi</FormLabel>
                    <FormControl>
                      <Input placeholder="Número do chassi" {...field} maxLength={17} />
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
