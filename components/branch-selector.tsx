"use client"

import { Building2 } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function BranchSelector() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <Building2 className="h-5 w-5 text-muted-foreground" />
          <div className="grid gap-1.5 flex-1">
            <Label htmlFor="branch">Seleccionar Sucursal</Label>
            <Select defaultValue="total">
              <SelectTrigger id="branch">
                <SelectValue placeholder="Seleccionar sucursal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="total">Total</SelectItem>
                <SelectItem value="norte">Sucursal Norte</SelectItem>
                <SelectItem value="sur">Sucursal Sur</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

