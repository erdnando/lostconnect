// Script para actualizar el status de un post a 'resolved'
require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

async function updatePostStatus() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ Conectado a MongoDB');
    
    const database = client.db('lostconnect');
    const posts = database.collection('posts');
    
    // Actualizar el post "Cuaderno planeación" a resolved
    const result = await posts.updateOne(
      { title: 'Cuaderno planeación' },
      { $set: { status: 'resolved' } }
    );
    
    console.log('📝 Resultado:', result);
    console.log(`✅ ${result.modifiedCount} post(s) actualizado(s) a status: resolved`);
    
    // Verificar el cambio
    const updatedPost = await posts.findOne({ title: 'Cuaderno planeación' });
    console.log('📊 Post actualizado:', {
      title: updatedPost.title,
      status: updatedPost.status,
      type: updatedPost.type
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('🔌 Conexión cerrada');
  }
}

updatePostStatus();
