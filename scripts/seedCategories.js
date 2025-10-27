/**
 * Script para poblar categorías iniciales en la base de datos
 * 
 * Ejecutar con: node scripts/seedCategories.js
 * O desde package.json: npm run seed:categories
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Leer .env.local manualmente
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};

envContent.split('\n').forEach((line) => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

const MONGODB_URI = envVars.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Por favor define MONGODB_URI en .env.local');
}

// Schema de Category (copia del modelo)
const CategorySchema = new mongoose.Schema(
  {
    value: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    icon: { type: String, required: true },
    order: { type: Number, required: true, default: 0 },
    active: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

// Categorías iniciales
const categories = [
  { value: 'electronics', label: 'Electrónicos', icon: '📱', order: 1, active: true },
  { value: 'clothing', label: 'Ropa', icon: '👕', order: 2, active: true },
  { value: 'accessories', label: 'Accesorios', icon: '👜', order: 3, active: true },
  { value: 'documents', label: 'Documentos', icon: '📄', order: 4, active: true },
  { value: 'pets', label: 'Mascotas', icon: '🐾', order: 5, active: true },
  { value: 'vehicles', label: 'Vehículos', icon: '🚗', order: 6, active: true },
  { value: 'jewelry', label: 'Joyería', icon: '💎', order: 7, active: true },
  { value: 'keys', label: 'Llaves', icon: '🔑', order: 8, active: true },
  { value: 'bags', label: 'Bolsos/Mochilas', icon: '🎒', order: 9, active: true },
  { value: 'other', label: 'Otro', icon: '📦', order: 10, active: true },
];

async function seedCategories() {
  try {
    console.log('🔌 Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    console.log('\n🌱 Sembrando categorías...');
    
    // Limpiar categorías existentes (opcional - comentar si no quieres limpiar)
    await Category.deleteMany({});
    console.log('🗑️  Categorías existentes eliminadas');

    // Insertar categorías
    const result = await Category.insertMany(categories);
    console.log(`✅ ${result.length} categorías creadas exitosamente`);

    // Mostrar categorías creadas
    console.log('\n📋 Categorías en la base de datos:');
    result.forEach((cat) => {
      console.log(`   ${cat.icon} ${cat.label} (${cat.value})`);
    });

    console.log('\n✨ Seed completado exitosamente');
  } catch (error) {
    console.error('❌ Error al sembrar categorías:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Desconectado de MongoDB');
  }
}

// Ejecutar seed
seedCategories();
