'use client';

import { useState, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { X, Upload, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Tipo de imagen subida
 */
export interface UploadedImage {
  url: string;
  publicId: string;
  file?: File;
  preview?: string; // URL local para preview
}

/**
 * Props del ImageUploader
 */
interface ImageUploaderProps {
  value: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  maxImages?: number;
  maxSizeMB?: number;
  className?: string;
  /**
   * If provided, enables the capture attribute on the file input.
   * Use 'environment' to prefer back camera, 'user' for front, or boolean true.
   */
  capture?: 'environment' | 'user' | boolean;
}

/**
 * ImageUploader
 * 
 * Componente para subir múltiples imágenes con:
 * - Drag & drop
 * - Click para seleccionar
 * - Preview de imágenes
 * - Validación de tamaño y formato
 * - Upload a Cloudinary
 * - Eliminación de imágenes
 */
export const ImageUploader = forwardRef(function ImageUploader(
  {
    value = [],
    onChange,
    maxImages = 5,
    maxSizeMB = 5,
    className = '',
    capture,
  }: ImageUploaderProps,
  ref
) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Comprime una imagen antes de subirla
   * Reduce el tamaño manteniendo calidad aceptable (estilo WhatsApp)
   */
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target?.result as string;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('No se pudo obtener contexto del canvas'));
            return;
          }

          // Dimensiones máximas (WhatsApp usa ~1600px)
          const MAX_WIDTH = 1600;
          const MAX_HEIGHT = 1600;
          
          let width = img.width;
          let height = img.height;

          // Calcular nuevas dimensiones manteniendo aspect ratio
          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          // Establecer dimensiones del canvas
          canvas.width = width;
          canvas.height = height;

          // Dibujar imagen redimensionada
          ctx.drawImage(img, 0, 0, width, height);

          // Comprimir (0.8 = 80% calidad, buen balance calidad/tamaño)
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
          
          // Log del tamaño para debugging
          const originalSize = (file.size / 1024 / 1024).toFixed(2);
          const compressedSize = (compressedBase64.length * 0.75 / 1024 / 1024).toFixed(2);
          console.log(`📸 Imagen comprimida: ${originalSize}MB → ${compressedSize}MB`);
          
          resolve(compressedBase64);
        };
        
        img.onerror = () => {
          reject(new Error('Error al cargar imagen'));
        };
      };
      
      reader.onerror = () => {
        reject(new Error('Error al leer archivo'));
      };
    });
  };

  /**
   * Convierte un archivo a base64
   */
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  /**
   * Valida un archivo
   */
  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Validar tipo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Tipo de archivo no válido. Solo JPG, PNG, WebP, GIF',
      };
    }

    // Validar tamaño (aumentado a 20MB porque comprimiremos)
    const maxSize = 20 * 1024 * 1024; // 20MB antes de comprimir
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `El archivo es demasiado grande. Máximo 20MB`,
      };
    }

    return { valid: true };
  };

  /**
   * Procesa archivos seleccionados
   */
  const processFiles = async (files: FileList) => {
    // Validar cantidad
    const remainingSlots = maxImages - value.length;
    if (files.length > remainingSlots) {
      alert(`Solo puedes subir ${remainingSlots} imagen(es) más`);
      return;
    }

    setUploading(true);

    try {
      const newImages: UploadedImage[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validar archivo
        const validation = validateFile(file);
        if (!validation.valid) {
          alert(validation.error);
          continue;
        }

        // Crear preview local
        const preview = URL.createObjectURL(file);

        // Comprimir imagen antes de subir
        const compressedBase64 = await compressImage(file);

        // Subir a Cloudinary
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: compressedBase64 }),
        });

        const data = await response.json();

        if (data.success) {
          newImages.push({
            url: data.data.url,
            publicId: data.data.publicId,
            file,
            preview,
          });
        } else {
          alert(`Error al subir ${file.name}: ${data.error}`);
        }
      }

      // Actualizar estado
      onChange([...value, ...newImages]);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error al subir imágenes');
    } finally {
      setUploading(false);
    }
  };

  /**
   * Handler para input file
   */
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  /**
   * Handler para drag & drop
   */
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    },
    [value, maxImages]
  );

  /**
   * Eliminar imagen
   */
  const removeImage = (index: number) => {
    const newImages = [...value];
    const removed = newImages.splice(index, 1)[0];

    // Limpiar preview URL
    if (removed.preview) {
      URL.revokeObjectURL(removed.preview);
    }

    onChange(newImages);
  };

  /**
   * Abrir selector de archivos
   */
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // Expose openFileDialog to parent components via ref
  useImperativeHandle(ref, () => ({
    openFileDialog,
  }));

  return (
    <div className={cn('space-y-3', className)}>
      {/* Input oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInput}
        className="hidden"
        {...(capture ? { capture: typeof capture === 'string' ? capture : true } : {})}
      />

      {/* Preview de imágenes con overlay de opciones (estilo Facebook) */}
      {value.length > 0 ? (
        <div className="relative rounded-lg overflow-hidden border border-gray-300">
          {/* Grid de imágenes */}
          <div className={cn(
            "grid gap-1",
            value.length === 1 && "grid-cols-1",
            value.length === 2 && "grid-cols-2",
            value.length >= 3 && "grid-cols-2"
          )}>
            {value.map((image, index) => {
              // Mostrar máximo 4 imágenes en el preview
              if (index >= 4) return null;
              
              return (
                <div
                  key={index}
                  className={cn(
                    "relative group",
                    value.length === 1 ? "aspect-[4/3]" : "aspect-square",
                    value.length === 3 && index === 0 && "col-span-2"
                  )}
                >
                  <Image
                    src={image.preview || image.url}
                    alt={`Imagen ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />

                  {/* Overlay con botones (visible siempre en móvil) */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors">
                    {/* Botón eliminar */}
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white rounded-full shadow-lg"
                    >
                      <X className="h-4 w-4 text-gray-700" />
                    </button>
                  </div>

                  {/* Mostrar "+N más" si hay más de 4 imágenes */}
                  {index === 3 && value.length > 4 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        +{value.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Botón "Agregar más fotos" (overlay) */}
          {value.length < maxImages && !uploading && (
            <button
              type="button"
              onClick={openFileDialog}
              className="absolute bottom-3 right-3 px-3 py-1.5 bg-white hover:bg-gray-50 rounded-lg shadow-lg border border-gray-200 text-sm font-medium text-gray-700 flex items-center gap-1"
            >
              <Upload className="h-3.5 w-3.5" />
              Agregar fotos
            </button>
          )}

          {/* Loading overlay */}
          {uploading && (
            <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
                <p className="text-sm text-gray-600">Subiendo...</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Botón compacto inicial (sin fotos) */
        <button
          type="button"
          onClick={openFileDialog}
          disabled={uploading}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            'w-full border-2 rounded-lg p-4 text-left transition-colors',
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50',
            uploading && 'opacity-50 cursor-not-allowed'
          )}
        >
          {uploading ? (
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
              <span className="text-sm text-gray-600">Subiendo imágenes...</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Upload className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Agregar fotos</p>
                <p className="text-xs text-gray-500">o arrastra archivos aquí</p>
              </div>
            </div>
          )}
        </button>
      )}
    </div>
  );
});
