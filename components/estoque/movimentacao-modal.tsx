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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"

interface MovimentacaoModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  itemData?: any
  produtos: any[]
}

const formSchema = z.object({
  tipo: z.enum(["entrada", "saida"], {
    required_error: "Tipo de movimentação é obrigatório",
  }),
  quantidade: z.coerce
    .number()
    .min(1, "Quantidade deve ser pelo menos 1")
    .refine((val) => Number.isInteger(val), {
      message: "Quantidade deve ser um número inteiro",
    }),
  observacao: z.string().optional(),
})

export function MovimentacaoModal({ isOpen, onClose, onSave, itemData, produtos = [] }: MovimentacaoModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipo: "entrada",
      quantidade: 1,
      observacao: "",
    },
  })

  useEffect(() => {
    if (isOpen) {
      form.reset({
        tipo: "entrada",
        quantidade: 1,
        observacao: "",
      })
    }
  }, [isOpen, form])

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!itemData) return

    // Validação adicional para saída
    if (values.tipo === "saida" && values.quantidade > itemData.quantidade) {
      form.setError("quantidade", {
        type: "manual",
        message: `Quantidade não pode ser maior que o estoque atual (${itemData.quantidade})`,
      })
      return
    }

    setIsSubmitting(true)

    // Simulando envio para API
    setTimeout(() => {
      setIsSubmitting(false)
      onSave({
        produtoId: itemData.id,
        ...values,
      })
      onClose()
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Registrar Movimentação</DialogTitle>
          <DialogDescription>
            {itemData ? (
              <>
                Registre uma entrada ou saída para o item <strong>{itemData.nome}</strong>
              </>
            ) : (
              "Registre uma entrada ou saída de estoque"
            )}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {itemData && (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="info-codigo"
                  render={() => (
                    <FormItem>
                      <FormLabel>Código</FormLabel>
                      <FormControl>
                        <Input value={itemData.codigo} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="info-quantidade"
                  render={() => (
                    <FormItem>
                      <FormLabel>Estoque Atual</FormLabel>
                      <FormControl>
                        <Input value={itemData.quantidade} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Tipo de Movimentação</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="entrada" />
                        </FormControl>
                        <FormLabel className="font-normal">Entrada</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="saida" />
                        </FormControl>
                        <FormLabel className="font-normal">Saída</FormLabel>
                      </FormItem>
                    </RadioGroup>
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
                    <Input type="number" min="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="observacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observação</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ex: Compra mensal, OS-2023-001, etc." className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
