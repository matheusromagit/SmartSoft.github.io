"use client"

import { useState, useEffect } from "react"
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
import { Loader2 } from "lucide-react"

interface EstoqueModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  itemData?: any
}

const formSchema = z.object({
  codigo: z.string().min(3, "Código deve ter pelo menos 3 caracteres"),
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  categoria: z.string().min(1, "Categoria é obrigatória"),
  fornecedor: z.string().min(1, "Fornecedor é obrigatório"),
  quantidade: z.coerce.number().min(0, "Quantidade não pode ser negativa"),
  estoqueMinimo: z.coerce.number().min(0, "Estoque mínimo não pode ser negativo"),
  valorCompra: z.coerce.number().min(0, "Valor de compra não pode ser negativo"),
  valorVenda: z.coerce.number().min(0, "Valor de venda não pode ser negativo"),
  localizacao: z.string().optional(),
})

export function EstoqueModal({ isOpen, onClose, onSave, itemData }: EstoqueModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigo: "",
      nome: "",
      categoria: "",
      fornecedor: "",
      quantidade: 0,
      estoqueMinimo: 0,
      valorCompra: 0,
      valorVenda: 0,
      localizacao: "",
    },
  })

  useEffect(() => {
    if (itemData) {
      form.reset({
        codigo: itemData.codigo,
        nome: itemData.nome,
        categoria: itemData.categoria,
        fornecedor: itemData.fornecedor,
        quantidade: itemData.quantidade,
        estoqueMinimo: itemData.estoqueMinimo,
        valorCompra: itemData.valorCompra,
        valorVenda: itemData.valorVenda,
        localizacao: itemData.localizacao || "",
      })
    } else {
      form.reset({
        codigo: "",
        nome: "",
        categoria: "",
        fornecedor: "",
        quantidade: 0,
        estoqueMinimo: 0,
        valorCompra: 0,
        valorVenda: 0,
        localizacao: "",
      })
    }
  }, [itemData, form, isOpen])

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    // Simulando envio para API
    setTimeout(() => {
      setIsSubmitting(false)
      onSave(itemData ? { ...values, id: itemData.id } : values)
      onClose()
    }, 1000)
  }

  const categorias = ["Lubrificantes", "Filtros", "Freios", "Motor", "Suspensão", "Elétrica", "Acessórios", "Outros"]

  const fornecedores = [
    "Auto Peças Brasil",
    "Honda Peças",
    "Toyota Peças",
    "Ford Peças",
    "Fiat Peças",
    "Volkswagen Peças",
    "Chevrolet Peças",
    "Distribuidora Nacional",
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{itemData ? "Editar Item" : "Novo Item"}</DialogTitle>
          <DialogDescription>
            {itemData
              ? "Edite as informações do item abaixo."
              : "Preencha as informações para adicionar um novo item ao estoque."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="codigo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: OL-5W30-1L" {...field} autoFocus />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do produto" {...field} />
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
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categorias.map((categoria) => (
                            <SelectItem key={categoria} value={categoria}>
                              {categoria}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fornecedor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fornecedor</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um fornecedor" />
                        </SelectTrigger>
                        <SelectContent>
                          {fornecedores.map((fornecedor) => (
                            <SelectItem key={fornecedor} value={fornecedor}>
                              {fornecedor}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="estoqueMinimo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estoque Mínimo</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="valorCompra"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor de Compra (R$)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="valorVenda"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor de Venda (R$)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="localizacao"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Localização</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Prateleira A1" {...field} />
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
