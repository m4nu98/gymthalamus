import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Validar que todos los campos requeridos estén presentes
    const requiredFields = ['nombre', 'apellido', 'email', 'telefono', 'sucursal', 'plan', 'fechaInicio']
    const missingFields = requiredFields.filter(field => !data[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Faltan campos requeridos: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Crear el nuevo miembro en la base de datos
    const newMember = await db.member.create({
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        telefono: data.telefono,
        sucursal: data.sucursal,
        plan: data.plan,
        fechaInicio: new Date(data.fechaInicio),
        estado: data.paymentStatus || 'pending',
        metodoPago: data.metodoPago || null,
        fechaPago: data.fechaPago ? new Date(data.fechaPago) : null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(newMember)
  } catch (error) {
    console.error('Error al crear nuevo miembro:', error)
    return NextResponse.json(
      { error: 'Error al crear el nuevo miembro' },
      { status: 500 }
    )
  }
}