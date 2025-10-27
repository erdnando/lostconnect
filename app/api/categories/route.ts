import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Category from '@/models/Category';

/**
 * GET /api/categories
 * 
 * Obtiene todas las categorías activas ordenadas
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Obtener todas las categorías activas, ordenadas
    const categories = await Category.find({ active: true })
      .sort({ order: 1 })
      .select('value label icon order')
      .lean();

    return NextResponse.json({
      success: true,
      data: categories,
      count: categories.length,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error al obtener categorías',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/categories
 * 
 * Crea una nueva categoría (solo admin - agregar auth después)
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { value, label, icon, order } = body;

    // Validar campos requeridos
    if (!value || !label) {
      return NextResponse.json(
        {
          success: false,
          error: 'Faltan campos requeridos: value, label',
        },
        { status: 400 }
      );
    }

    // Verificar si ya existe
    const existing = await Category.findOne({ value: value.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: 'Ya existe una categoría con ese valor',
        },
        { status: 409 }
      );
    }

    // Crear categoría
    const category = await Category.create({
      value: value.toLowerCase(),
      label,
      icon: icon || '📦',
      order: order || 0,
      active: true,
    });

    return NextResponse.json(
      {
        success: true,
        data: category,
        message: 'Categoría creada exitosamente',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error al crear categoría',
      },
      { status: 500 }
    );
  }
}
