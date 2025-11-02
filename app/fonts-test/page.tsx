export default function FontsTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <header className="text-center space-y-4 pb-8 border-b-2 border-indigo-200">
          <h1 className="text-5xl font-black text-indigo-900">
            Tipografía Indivisa
          </h1>
          <p className="text-xl text-indigo-600 font-serif italic">
            La familia lasallista mundial unida por el diseño
          </p>
          <p className="text-sm text-gray-600">
            <strong>Indivisa Manent</strong> — Permanecen Indivisos
          </p>
        </header>

        {/* Indivisa Text Sans */}
        <section className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div className="border-b-2 border-blue-200 pb-4">
            <h2 className="text-3xl font-bold text-blue-900">
              Indivisa Text Sans
            </h2>
            <p className="text-sm text-gray-500">Fuente principal del proyecto</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Light (300)</p>
              <p className="text-2xl font-light">
                La Salle Nezahualcóyotl - Preparatoria
              </p>
              <p className="text-2xl font-light italic text-gray-600">
                La Salle Nezahualcóyotl - Cursiva Light
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Regular (400)</p>
              <p className="text-2xl font-normal">
                La Salle Nezahualcóyotl - Preparatoria
              </p>
              <p className="text-2xl font-normal italic text-gray-600">
                La Salle Nezahualcóyotl - Cursiva Regular
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Bold (700)</p>
              <p className="text-2xl font-bold">
                La Salle Nezahualcóyotl - Preparatoria
              </p>
              <p className="text-2xl font-bold italic text-gray-600">
                La Salle Nezahualcóyotl - Cursiva Bold
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Black (900)</p>
              <p className="text-2xl font-black">
                La Salle Nezahualcóyotl - Preparatoria
              </p>
              <p className="text-2xl font-black italic text-gray-600">
                La Salle Nezahualcóyotl - Cursiva Black
              </p>
            </div>
          </div>

          {/* Ejemplo de texto largo */}
          <div className="bg-blue-50 p-6 rounded-lg space-y-3">
            <h3 className="text-lg font-bold text-blue-900">Texto de ejemplo</h3>
            <p className="text-base leading-relaxed">
              LostConnect es una plataforma web moderna desarrollada por estudiantes 
              de La Salle Nezahualcóyotl que permite reportar, buscar y recuperar 
              objetos perdidos mediante una comunidad colaborativa. Este proyecto 
              refleja los valores lasallistas de <strong>servicio comunitario</strong> y{' '}
              <strong>solidaridad</strong>, utilizando la tecnología para ayudar a las 
              personas a recuperar sus objetos perdidos.
            </p>
          </div>
        </section>

        {/* Indivisa Text Serif */}
        <section className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div className="border-b-2 border-green-200 pb-4">
            <h2 className="text-3xl font-bold text-green-900 font-serif">
              Indivisa Text Serif
            </h2>
            <p className="text-sm text-gray-500">Fuente para títulos y encabezados</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Light (300)</p>
              <p className="text-2xl font-serif font-light">
                San Juan Bautista De La Salle
              </p>
              <p className="text-2xl font-serif font-light italic text-gray-600">
                San Juan Bautista De La Salle - Cursiva
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Regular (400)</p>
              <p className="text-2xl font-serif font-normal">
                San Juan Bautista De La Salle
              </p>
              <p className="text-2xl font-serif font-normal italic text-gray-600">
                San Juan Bautista De La Salle - Cursiva
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Bold (700)</p>
              <p className="text-2xl font-serif font-bold">
                San Juan Bautista De La Salle
              </p>
              <p className="text-2xl font-serif font-bold italic text-gray-600">
                San Juan Bautista De La Salle - Cursiva
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Black (900)</p>
              <p className="text-2xl font-serif font-black">
                San Juan Bautista De La Salle
              </p>
              <p className="text-2xl font-serif font-black italic text-gray-600">
                San Juan Bautista De La Salle - Cursiva
              </p>
            </div>
          </div>

          {/* Ejemplo de título */}
          <div className="bg-green-50 p-6 rounded-lg text-center space-y-4">
            <h3 className="text-4xl font-serif font-black text-green-900">
              Valores Lasallistas
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-white p-4 rounded shadow">
                <p className="font-serif font-bold text-green-800">Fe</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <p className="font-serif font-bold text-green-800">Servicio</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <p className="font-serif font-bold text-green-800">Fraternidad</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <p className="font-serif font-bold text-green-800">Justicia</p>
              </div>
            </div>
          </div>
        </section>

        {/* Combinación de ambas */}
        <section className="bg-gradient-to-r from-blue-900 to-green-900 text-white rounded-lg shadow-lg p-8 space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-serif font-black">
              LostConnect
            </h2>
            <p className="text-2xl font-light">
              Red Social de Objetos Perdidos
            </p>
            <p className="text-lg italic opacity-90">
              Un proyecto de La Salle Nezahualcóyotl
            </p>
          </div>

          <div className="border-t-2 border-white/20 pt-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-4xl font-black">80+</p>
                <p className="text-sm font-serif">Países</p>
              </div>
              <div>
                <p className="text-4xl font-black">1,000+</p>
                <p className="text-sm font-serif">Instituciones</p>
              </div>
              <div>
                <p className="text-4xl font-black">1M+</p>
                <p className="text-sm font-serif">Estudiantes</p>
              </div>
            </div>
          </div>
        </section>

        {/* Alfabeto y números */}
        <section className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Juego de caracteres
          </h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Mayúsculas</p>
              <p className="text-2xl tracking-wider">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
              </p>
            </div>
            
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Minúsculas</p>
              <p className="text-2xl tracking-wider">
                abcdefghijklmnopqrstuvwxyz
              </p>
            </div>
            
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Números</p>
              <p className="text-2xl tracking-wider">
                0123456789
              </p>
            </div>
            
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Caracteres especiales</p>
              <p className="text-2xl tracking-wider">
                ¡!¿?@#$%&*()_+-=[]{}|\;:&apos;&quot;,./&lt;&gt;
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Acentos y diéresis</p>
              <p className="text-2xl tracking-wider">
                áéíóú ÁÉÍÓÚ ñÑ üÜ
              </p>
            </div>
          </div>
        </section>

        {/* Footer con información técnica */}
        <footer className="bg-gray-900 text-white rounded-lg shadow-lg p-8 space-y-4">
          <div className="text-center space-y-2">
            <p className="text-sm opacity-75">
              Tipografía oficial de la familia lasallista mundial
            </p>
            <p className="text-xs opacity-60">
              25,000 glifos · 270 idiomas · Premio al Diseño 2018
            </p>
            <p className="text-xs opacity-60">
              Más información: <a href="https://indivisafont.org" className="underline hover:text-blue-300">indivisafont.org</a>
            </p>
          </div>

          <div className="border-t border-gray-700 pt-4 text-center">
            <p className="text-sm font-serif italic">
              Indivisa Manent — Permanecen Indivisos
            </p>
            <p className="text-xs mt-2 opacity-75">
              La Salle Nezahualcóyotl · Preparatoria · Estado de México 🇲🇽
            </p>
          </div>
        </footer>

        {/* Botón para volver */}
        <div className="text-center pb-8">
          <a 
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg"
          >
            ← Volver al inicio
          </a>
        </div>

      </div>
    </div>
  );
}
