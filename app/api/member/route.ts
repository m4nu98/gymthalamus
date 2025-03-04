import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { Prisma } from '@prisma/client'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log('Datos recibidos:', JSON.stringify(data, null, 2))
    
    // Validar que todos los campos requeridos estén presentes
    const requiredFields = ['nombre', 'apellido', 'email', 'telefono', 'fecha_nacimiento', 'genero', 'sucursal_id', 'plan']
    const missingFields = requiredFields.filter(field => !data[field])
    
    if (missingFields.length > 0) {
      console.log('Campos faltantes:', missingFields)
      return NextResponse.json(
        { error: `Faltan campos requeridos: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Validar el estado de pago
    if (!data.paymentStatus) {
      console.log('Falta estado de pago')
      return NextResponse.json(
        { error: 'El estado de pago es requerido' },
        { status: 400 }
      )
    }

    try {
      // Validar fecha de nacimiento
      const fecha_nacimiento = new Date(data.fecha_nacimiento)
      if (isNaN(fecha_nacimiento.getTime())) {
        throw new Error('Fecha de nacimiento inválida')
      }

      // Verificar que la sucursal existe
      const sucursal = await db.sucursal.findUnique({
        where: {
          id: data.sucursal_id
        }
      })

      if (!sucursal) {
        return NextResponse.json(
          { error: 'La sucursal seleccionada no existe' },
          { status: 400 }
        )
      }
      
      // Validar fecha de pago si existe
      let fechaPago = null
      if (data.paymentStatus === 'paid' && data.fechaPago) {
        fechaPago = new Date(data.fechaPago)
        if (isNaN(fechaPago.getTime())) {
          throw new Error('Fecha de pago inválida')
        }
        if (fechaPago > new Date()) {
          throw new Error('La fecha de pago no puede ser futura')
        }
      }

      // Verificar si el email ya existe
      const existingMember = await db.member.findUnique({
        where: {
          email: data.email
        }
      })

      if (existingMember) {
        return NextResponse.json(
          { error: 'El email ya está registrado' },
          { status: 400 }
        )
      }

      // Preparar los datos para la creación
      const memberData = {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        telefono: data.telefono,
        fecha_nacimiento,
        genero: data.genero,
        sucursal_id: data.sucursal_id,
        plan: data.plan,
        estado: data.paymentStatus,
        metodoPago: data.metodoPago || null,
        fechaPago
      }

      console.log('Intentando crear miembro con datos:', JSON.stringify(memberData, null, 2))

      const newMember = await db.member.create({
        data: memberData,
        include: {
          sucursal: true
        }
      })

      console.log('Miembro creado exitosamente:', newMember)
      return NextResponse.json(newMember)
    } catch (error) {
      console.error('Error específico:', error)
      
      // Manejar error de email duplicado de Prisma
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
          return NextResponse.json(
            { error: 'El email ya está registrado' },
            { status: 400 }
          )
        }
      }
      
      throw error
    }
  } catch (error) {
    console.error('Error no manejado:', error)
    return NextResponse.json(
      { 
        error: 'Error al crear el nuevo miembro',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    console.log('Iniciando búsqueda de datos...')
    
    const sucursales = await db.sucursal.findMany({
      orderBy: {
        nombre: 'asc'
      }
    })
    
    console.log('Datos de sucursales encontradas:', JSON.stringify(sucursales, null, 2))
    
    const members = await db.member.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        sucursal: true
      }
    })
    
    const response = { members, sucursales }
    console.log('Respuesta completa:', JSON.stringify(response, null, 2))
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error detallado al obtener datos:', error)
    return NextResponse.json(
      { error: 'Error al obtener los datos' },
      { status: 500 }
    )
  }
}