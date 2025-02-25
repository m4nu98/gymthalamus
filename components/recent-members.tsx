import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User } from 'lucide-react'

export function RecentMembers() {
  const recentMembers = [
    {
      name: "Ana García",
      email: "ana.garcia@email.com",
      plan: "3 días",
      date: "15 Dic 2023"
    },
    {
      name: "Carlos Martínez",
      email: "carlos.martinez@email.com",
      plan: "5 días",
      date: "14 Dic 2023"
    },
    {
      name: "Laura Torres",
      email: "laura.torres@email.com",
      plan: "2 días",
      date: "14 Dic 2023"
    },
    {
      name: "Miguel Ángel Ruiz",
      email: "miguel.ruiz@email.com",
      plan: "3 días",
      date: "13 Dic 2023"
    },
    {
      name: "Sofia Luna",
      email: "sofia.luna@email.com",
      plan: "5 días",
      date: "13 Dic 2023"
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nuevos Socios</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {recentMembers.map((member) => (
            <div key={member.email} className="flex items-center">
              <User className="h-8 w-8 text-muted-foreground mr-4 flex-shrink-0" />
              <div className="space-y-1 min-w-0 flex-1">
                <p className="text-sm font-medium leading-none truncate">{member.name}</p>
                <p className="text-sm text-muted-foreground truncate">{member.email}</p>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <Badge variant="secondary">{member.plan}</Badge>
                <div className="text-sm text-muted-foreground">{member.date}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

