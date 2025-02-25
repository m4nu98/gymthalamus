"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PaymentHistoryProps {
  type: "members" | "items"
}

export function PaymentHistory({ type }: PaymentHistoryProps) {
  const payments = type === "members" ? memberPayments : itemPayments

  return (
    <>
      {/* Tabla para pantallas medianas y grandes */}
      <div className="hidden md:block">
        <Card>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  {type === "members" ? (
                    <>
                      <TableHead>Socio</TableHead>
                      <TableHead>Plan</TableHead>
                    </>
                  ) : (
                    <>
                      <TableHead>Artículo</TableHead>
                      <TableHead>Cantidad</TableHead>
                    </>
                  )}
                  <TableHead>Monto</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.name}</TableCell>
                    <TableCell>{payment.detail}</TableCell>
                    <TableCell>${payment.amount}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>
                      <Badge variant="success">Completado</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Vista de tarjetas para móviles */}
      <div className="grid gap-4 md:hidden">
        {payments.map((payment) => (
          <Card key={payment.id} className="p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="font-medium">{payment.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {type === "members" ? "Plan: " : "Cantidad: "}
                    {payment.detail}
                  </p>
                </div>
                <Badge variant="success">Completado</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <span>{payment.date}</span>
                <span>·</span>
                <span>${payment.amount}</span>
                <span>·</span>
                <span className="text-muted-foreground">{payment.method}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}

const memberPayments = [
  {
    id: 1,
    date: "20/12/2023",
    name: "Ana García",
    detail: "3 días",
    amount: "6500",
    method: "Tarjeta"
  },
  {
    id: 2,
    date: "20/12/2023",
    name: "Carlos Martínez",
    detail: "5 días",
    amount: "8000",
    method: "Efectivo"
  },
  {
    id: 3,
    date: "19/12/2023",
    name: "Laura Torres",
    detail: "2 días",
    amount: "5000",
    method: "Transferencia"
  }
]

const itemPayments = [
  {
    id: 1,
    date: "20/12/2023",
    name: "Agua mineral",
    detail: "2",
    amount: "1000",
    method: "Efectivo"
  },
  {
    id: 2,
    date: "20/12/2023",
    name: "Proteína en polvo",
    detail: "1",
    amount: "15000",
    method: "Tarjeta"
  },
  {
    id: 3,
    date: "19/12/2023",
    name: "Varios",
    detail: "1",
    amount: "2500",
    method: "Efectivo"
  }
]

