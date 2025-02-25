"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Icons } from "@/components/icons"
import { Check, Search } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface NewPaymentFormProps {
  type: "members" | "items"
}

export function NewPaymentForm({ type }: NewPaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<string>("")

  const members = [
    { id: "1", name: "Ana García" },
    { id: "2", name: "Carlos Martínez" },
    { id: "3", name: "Laura Torres" },
    { id: "4", name: "Miguel Ángel Ruiz" },
    { id: "5", name: "Sofia Luna" },
  ]

  const handleSelect = (currentValue: string) => {
    setSelectedMember(currentValue)
    setOpen(false)
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {type === "members" ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="member">Socio</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {selectedMember
                      ? members.find((member) => member.id === selectedMember)?.name
                      : "Buscar socio..."}
                    <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" side="bottom" align="start">
                  <Command>
                    <CommandInput 
                      placeholder="Buscar socio..."
                      className="h-9"
                    />
                    <CommandEmpty>No se encontraron socios.</CommandEmpty>
                    <CommandGroup>
                      {members.map((member) => (
                        <CommandItem
                          key={member.id}
                          value={member.id}
                          onSelect={() => handleSelect(member.id)}
                        >
                          {member.name}
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              selectedMember === member.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Plan</Label>
              <Select required>
                <SelectTrigger id="plan">
                  <SelectValue placeholder="Seleccionar plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2days">2 días - $5000</SelectItem>
                  <SelectItem value="3days">3 días - $6500</SelectItem>
                  <SelectItem value="5days">5 días - $8000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="item">Artículo</Label>
              <Select required>
                <SelectTrigger id="item">
                  <SelectValue placeholder="Seleccionar artículo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="water">Agua mineral - $500</SelectItem>
                  <SelectItem value="protein">Proteína en polvo - $15000</SelectItem>
                  <SelectItem value="towel">Toalla - $2000</SelectItem>
                  <SelectItem value="various">Varios</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Cantidad</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                defaultValue="1"
                required
                className="w-full"
              />
            </div>
          </>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="amount">Monto</Label>
          <Input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            required
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="paymentMethod">Método de Pago</Label>
          <Select required>
            <SelectTrigger id="paymentMethod">
              <SelectValue placeholder="Seleccionar método" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash">Efectivo</SelectItem>
              <SelectItem value="card">Tarjeta</SelectItem>
              <SelectItem value="transfer">Transferencia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Registrar Pago
      </Button>
    </form>
  )
}

