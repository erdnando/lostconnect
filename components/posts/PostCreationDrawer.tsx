'use client';

import { useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ImageUploader, UploadedImage } from '@/components/posts/ImageUploader';
import { X, Loader2, ImageIcon, MapPin, Tag as TagIcon, Plus, Camera, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Schema de validación
 */
const postSchema = z.object({
  type: z.enum(['lost', 'found']),
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres').max(50, 'El título no puede exceder 50 caracteres'),
  description: z.string().min(20, 'La descripción debe tener al menos 20 caracteres').max(255, 'La descripción no puede exceder 255 caracteres'),
  category: z.string().min(1, 'Selecciona una categoría'),
  tags: z.array(z.string()).optional(),
  location: z.object({
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
});

type PostFormData = z.infer<typeof postSchema>;

/**
 * Props del PostCreationDrawer
 */
interface PostCreationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Categorías disponibles
 */
const CATEGORIES = [
  { value: 'electronics', label: 'Electrónicos', icon: '📱' },
  { value: 'clothing', label: 'Ropa', icon: '👕' },
  { value: 'accessories', label: 'Accesorios', icon: '👜' },
  { value: 'documents', label: 'Documentos', icon: '📄' },
  { value: 'pets', label: 'Mascotas', icon: '🐾' },
  { value: 'vehicles', label: 'Vehículos', icon: '🚗' },
  { value: 'jewelry', label: 'Joyería', icon: '💎' },
  { value: 'keys', label: 'Llaves', icon: '🔑' },
  { value: 'bags', label: 'Bolsos/Mochilas', icon: '🎒' },
  { value: 'other', label: 'Otro', icon: '📦' },
];

/**
 * PostCreationDrawer
 * 
 * Modal/Drawer estilo Facebook para crear publicaciones.
 * Reemplaza la página /post/new con una experiencia más moderna.
 */
export function PostCreationDrawer({ open, onOpenChange }: PostCreationDrawerProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showTypePicker, setShowTypePicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const imageUploaderRef = useRef<any>(null);
  const [currentTag, setCurrentTag] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      type: 'lost',
      tags: [],
    },
  });

  const selectedType = watch('type');
  const selectedCategory = watch('category');
  const tags = watch('tags') || [];
  const description = watch('description') || '';
  const title = watch('title') || '';

  // Validar si el formulario está completo para habilitar el botón "Publicar"
  const isFormValid = 
    description.trim().length >= 20 &&
    title.trim().length >= 5 &&
    images.length > 0 &&
    selectedCategory && selectedCategory.trim().length > 0;

  /**
   * Manejar intento de publicar (puede fallar validaciones)
   */
  const handlePublishClick = () => {
    // Limpiar error previo
    setCategoryError(false);

    // Validar campos uno por uno con feedback visual
    if (!description || description.trim().length < 20) {
      alert('Por favor, escribe una descripción de al menos 20 caracteres.');
      return;
    }

    if (!title || title.trim().length < 5) {
      alert('Por favor, escribe un título de al menos 5 caracteres.');
      return;
    }

    if (images.length === 0) {
      alert('Por favor, agrega al menos una foto de tu objeto.');
      return;
    }

    if (!selectedCategory || selectedCategory.trim().length === 0) {
      // Activar efecto de error en categoría
      setCategoryError(true);
      
      // Quitar el error después de la animación
      setTimeout(() => setCategoryError(false), 820);
      
      return;
    }

    // Si todo está bien, proceder con el submit
    handleSubmit(onSubmit)();
  };

  /**
   * Manejar envío del formulario
   */
  const onSubmit = async (data: PostFormData) => {

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          images: images.map((img) => ({ url: img.url, publicId: img.publicId })),
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Reset form
        reset();
        setImages([]);
        onOpenChange(false);
        
        // Redirigir al post creado
        router.push(`/post/${result.post._id}`);
        router.refresh();
      } else {
        alert(result.error || 'Error al crear publicación');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error al crear publicación');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Agregar tag
   */
  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setValue('tags', [...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  /**
   * Remover tag
   */
  const removeTag = (tagToRemove: string) => {
    setValue('tags', tags.filter((t) => t !== tagToRemove));
  };

  if (!session?.user) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="h-[92vh] overflow-y-auto bg-white border-t rounded-t-2xl"
      >
        <SheetHeader className="border-b pb-4 mb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold text-gray-900">
              Crear Publicación
            </SheetTitle>
            {/* Botón Post a la derecha */}
            <Button
              onClick={handlePublishClick}
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publicando...
                </>
              ) : (
                'Publicar'
              )}
            </Button>
          </div>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          {/* Descripción principal (estilo "What's on your mind?" de Facebook) */}
          <div className="space-y-2">
            <Textarea
              id="description"
              {...register('description')}
              placeholder="¿Qué pasó? Describe el objeto con detalles: color, marca, modelo, lugar donde lo perdiste o encontraste..."
              rows={4}
              maxLength={255}
              className="resize-none border-0 focus:ring-0 text-gray-900 placeholder:text-gray-500 text-base p-0"
            />
            {/* Contador de caracteres */}
            <div className="flex items-center justify-between text-xs">
              {errors.description && (
                <p className="text-red-600">{errors.description.message}</p>
              )}
              <p className={`ml-auto ${
                description.length < 20 
                  ? 'text-red-500' 
                  : description.length > 255 
                  ? 'text-red-500' 
                  : 'text-green-600'
              }`}>
                {description.length}/255 caracteres {description.length < 20 && `(mínimo 20)`}
              </p>
            </div>
          </div>

          {/* Área de imagen con overlays (estilo Facebook) */}
          <div className="relative">
            {/* Imagen o placeholder - CLICKEABLE para abrir cámara */}
            <div 
              className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 border border-gray-300 cursor-pointer"
              onClick={() => {
                if (images.length === 0) {
                  setShowImageUploader(true);
                  setTimeout(() => imageUploaderRef.current?.openFileDialog?.(), 80);
                }
              }}
            >
              {images.length > 0 ? (
                /* Grid de imágenes cuando hay fotos subidas */
                <div className={cn(
                  "grid gap-1 h-full",
                  images.length === 1 && "grid-cols-1",
                  images.length === 2 && "grid-cols-2",
                  images.length >= 3 && "grid-cols-2"
                )}>
                  {images.slice(0, 4).map((image, index) => (
                    <div
                      key={index}
                      className={cn(
                        "relative",
                        images.length === 3 && index === 0 && "col-span-2"
                      )}
                    >
                      <Image
                        src={image.preview || image.url}
                        alt={`Imagen ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      
                      {/* Botón eliminar en cada imagen */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const newImages = [...images];
                          const removed = newImages.splice(index, 1)[0];
                          if (removed.preview) {
                            URL.revokeObjectURL(removed.preview);
                          }
                          setImages(newImages);
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white rounded-full shadow-lg z-10"
                      >
                        <X className="h-4 w-4 text-gray-700" />
                      </button>

                      {/* Mostrar "+N más" si hay más de 4 imágenes */}
                      {index === 3 && images.length > 4 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">
                            +{images.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                /* Placeholder cuando no hay fotos - CLICKEABLE */
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 transition-colors">
                  <div className="text-center">
                    <Camera className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 font-medium">Agrega fotos de tu objeto</p>
                    <p className="text-xs text-gray-400 mt-1">Toca para tomar foto o seleccionar</p>
                  </div>
                </div>
              )}
            </div>

            {/* Loading overlay durante upload */}
            {isUploading && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center z-30 rounded-lg">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-900">Subiendo imágenes...</p>
                  <p className="text-xs text-gray-500 mt-1">Comprimiendo y optimizando</p>
                </div>
              </div>
            )}

            {/* Overlays de opciones (estilo Facebook - encima de la imagen) */}
            <div className="absolute bottom-3 left-3 right-3 flex gap-2 z-20">
              {/* Tipo de publicación - Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTypePicker(!showTypePicker);
                    setShowCategoryPicker(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white rounded-lg shadow-lg text-sm font-medium transition-all hover:bg-gray-800"
                >
                  <span>
                    {selectedType === 'lost' ? 'Perdido' : 'Encontrado'}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>

                {/* Dropdown de tipo */}
                {showTypePicker && (
                  <div className="absolute bottom-full mb-2 left-0 w-40 bg-black text-white rounded-lg shadow-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setValue('type', 'lost');
                        setShowTypePicker(false);
                      }}
                      className={`w-full px-3 py-2 text-sm text-left transition-colors ${
                        selectedType === 'lost' ? 'bg-gray-700' : 'hover:bg-gray-800'
                      }`}
                    >
                      Perdido
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setValue('type', 'found');
                        setShowTypePicker(false);
                      }}
                      className={`w-full px-3 py-2 text-sm text-left transition-colors border-t border-gray-700 ${
                        selectedType === 'found' ? 'bg-gray-700' : 'hover:bg-gray-800'
                      }`}
                    >
                      Encontrado
                    </button>
                  </div>
                )}
              </div>

              {/* Categoría - Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCategoryPicker(!showCategoryPicker);
                    setShowTypePicker(false);
                    setCategoryError(false); // Limpiar error al interactuar
                  }}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 bg-black text-white rounded-lg shadow-lg text-sm font-medium transition-all hover:bg-gray-800",
                    categoryError && "border-2 border-red-500 animate-shake"
                  )}
                >
                  <span>
                    {selectedCategory
                      ? CATEGORIES.find((c) => c.value === selectedCategory)?.label
                      : 'Categoría...'}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>

                {/* Dropdown de categorías */}
                {showCategoryPicker && (
                  <div className="absolute bottom-full mb-2 left-0 w-48 max-h-64 overflow-y-auto bg-black text-white rounded-lg shadow-xl">
                    {CATEGORIES.map((cat, idx) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setValue('category', cat.value);
                          setShowCategoryPicker(false);
                          setCategoryError(false); // Limpiar error al seleccionar
                        }}
                        className={`w-full px-3 py-2 text-sm text-left transition-colors ${
                          selectedCategory === cat.value
                            ? 'bg-gray-700'
                            : 'hover:bg-gray-800'
                        } ${idx > 0 ? 'border-t border-gray-700' : ''}`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Botón agregar fotos - Icon button solo */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowImageUploader(true);
                  setTimeout(() => imageUploaderRef.current?.openFileDialog?.(), 80);
                }}
                className="ml-auto p-2 bg-white/95 hover:bg-white rounded-full shadow-lg border border-gray-200 transition-all"
                title="Agregar fotos"
              >
                <Plus className="h-5 w-5 text-gray-700" />
              </button>
            </div>

            {/* Validación de errores */}
            {errors.category && (
              <p className="text-sm text-red-600 mt-2">{errors.category.message}</p>
            )}
          </div>

          {/* ImageUploader oculto (solo para funcionalidad) */}
          <div className="hidden">
            <ImageUploader
              ref={imageUploaderRef}
              capture="environment"
              value={images}
              onChange={setImages}
              onUploadingChange={setIsUploading}
            />
          </div>

          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm text-gray-700">Título *</Label>
            <input
              id="title"
              {...register('title')}
              placeholder="Ej: Perdí mi mochila azul en el parque"
              maxLength={50}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-500 text-sm"
            />
            {/* Contador de caracteres */}
            <div className="flex items-center justify-between text-xs">
              {errors.title && (
                <p className="text-red-600">{errors.title.message}</p>
              )}
              <p className={`ml-auto ${
                title.length < 5 
                  ? 'text-red-500' 
                  : title.length > 50 
                  ? 'text-red-500' 
                  : 'text-green-600'
              }`}>
                {title.length}/50 caracteres {title.length < 5 && `(mínimo 5)`}
              </p>
            </div>
          </div>

          {/* Opciones adicionales */}
          <div className="space-y-2 border-t pt-3">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Opciones adicionales</p>
            
            {/* Ubicación */}
            <button
              type="button"
              onClick={() => setShowLocationPicker(!showLocationPicker)}
              className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">Agregar ubicación</span>
            </button>

            {/* Location picker simple */}
            {showLocationPicker && (
              <div className="space-y-2 pl-6">
                <input
                  type="text"
                  placeholder="Ciudad"
                  {...register('location.city')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 text-sm"
                />
                <input
                  type="text"
                  placeholder="Estado/Provincia"
                  {...register('location.state')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 text-sm"
                />
                <input
                  type="text"
                  placeholder="País"
                  {...register('location.country')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 text-sm"
                />
              </div>
            )}

            {/* Tags */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {}}
                className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <TagIcon className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">Agregar etiquetas</span>
              </button>
              
              <div className="pl-6 space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Ej: urgente, recompensa, centro..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm placeholder:text-gray-400"
                  />
                  <Button type="button" onClick={addTag} size="sm" variant="outline">
                    +
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1 bg-blue-100 text-blue-700 text-xs">
                        #{tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-0.5 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
