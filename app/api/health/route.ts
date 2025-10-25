import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import mongoose from 'mongoose';

/**
 * Health check endpoint
 * GET /api/health
 * 
 * Verifica que:
 * - El servidor está funcionando
 * - MongoDB está conectado
 * - Variables de entorno están cargadas
 */
export async function GET() {
  try {
    // Intentar conectar a MongoDB
    await connectDB();

    // Verificar el estado de la conexión
    const dbStatus = mongoose.connection.readyState;
    const dbStates: Record<number, string> = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };

    // Recopilar información del sistema
    const healthCheck = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: {
        status: dbStates[dbStatus] || 'unknown',
        connected: dbStatus === 1,
        name: mongoose.connection.name || 'N/A',
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasMongoUri: !!process.env.MONGODB_URI,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
        hasCloudinary: !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      },
    };

    return NextResponse.json(healthCheck, { status: 200 });
  } catch (error) {
    console.error('❌ Error en health check:', error);
    
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
        database: {
          connected: false,
        },
      },
      { status: 503 }
    );
  }
}
