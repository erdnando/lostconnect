'use client';

import { useState, useRef, useCallback } from 'react';
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
export function ImageUploader({
  value = [],
  onChange,
  maxImages = 5,
  maxSizeMB = 5,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    // Validar tamaño
    const maxSize = maxSizeMB * 1024 * 1024; // MB a bytes
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `El archivo es demasiado grande. Máximo ${maxSizeMB}MB`,
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

        // Convertir a base64 para subir
        const base64 = await fileToBase64(file);

        // Subir a Cloudinary
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: base64 }),
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

  return (
    <div className="space-y-4">
      {/* Input oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
        multiple
        onChange={handleFileInput}
        className="hidden"
      />

      {/* Zona de drop */}
      {value.length < maxImages && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileDialog}
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
            dragActive
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50',
            uploading && 'opacity-50 pointer-events-none'
          )}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">Subiendo imágenes...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-gray-400" />
              <p className="text-sm font-medium text-gray-700">
                Arrastra imágenes aquí o haz clic para seleccionar
              </p>
              <p className="text-xs text-gray-500">
                JPG, PNG, WebP, GIF • Máximo {maxSizeMB}MB • Hasta {maxImages} imágenes
              </p>
            </div>
          )}
        </div>
      )}

      {/* Preview de imágenes */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {value.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group"
            >
              <Image
                src={image.preview || image.url}
                alt={`Imagen ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              />

              {/* Botón eliminar */}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Indicador de primera imagen */}
              {index === 0 && (
                <div className="absolute bottom-2 left-2">
                  <span className="text-xs bg-black/70 text-white px-2 py-1 rounded">
                    Principal
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Info */}
      <p className="text-xs text-muted-foreground">
        {value.length} / {maxImages} imágenes
        {value.length > 0 && ' • La primera imagen será la principal'}
      </p>
    </div>
  );
}
