"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

interface NewNotificationFormProps {
  type: "general" | "targeted"
}

export function NewNotificationForm({ type }: NewNotificationFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [commandOpen, setCommandOpen] = useState(false) // Added state for Command

  const members = [
    { id: "1", name: "Ana García" },
    { id: "2", name: "Carlos Martínez" },
    { id: "3", name: "Laura Torres" },
    { id: "4", name: "Miguel Ángel Ruiz" },
    { id: "5", name: "Sofia Luna" },
  ]

  const handleSelect = (memberId: string) => {
    setSelectedMembers(current => {
      if (current.includes(memberId)) {
        return current.filter(id => id !== memberId)
      }
      return [...current, memberId]
    })
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            placeholder="Título de la notificación"
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Mensaje</Label>
          <Textarea
            id="message"
            placeholder="Escribe el mensaje de la notificación..."
            required
            disabled={isLoading}
            className="min-h-[100px]"
          />
        </div>
        {type === "targeted" && (
          <div className="space-y-2">
            <Label htmlFor="members">Destinatarios</Label>
            <Command
              className="border rounded-md"
              shouldFilter={true}
            >
              <CommandInput
                placeholder="Buscar socios..."
                className="h-9"
              />
              <CommandEmpty>No se encontraron socios.</CommandEmpty>
              <CommandGroup>
                {members && Array.isArray(members) && members.map((member) => (
                  <CommandItem
                    key={member.id}
                    value={member.id}
                    onSelect={() => handleSelect(member.id)}
                  >
                    {member.name}
                    <Check className="ml-auto h-4 w-4" />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </div>
        )}
        <div className="space-y-2">

        </div>
      </div>
      <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Enviar Notificación
      </Button>
    </form>
  )
}