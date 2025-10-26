'use client';

import { useState } from 'react';
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
import { X, Loader2, ImageIcon, MapPin, Tag as TagIcon } from 'lucide-react';

/**
 * Schema de validación
 */
const postSchema = z.object({
  type: z.enum(['lost', 'found']),
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  description: z.string().min(20, 'La descripción debe tener al menos 20 caracteres'),
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
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
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

  /**
   * Manejar envío del formulario
   */
  const onSubmit = async (data: PostFormData) => {
    if (images.length === 0) {
      alert('Debes agregar al menos una imagen');
      return;
    }

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
        className="h-[95vh] sm:h-[90vh] overflow-y-auto bg-white border-t"
      >
        <SheetHeader className="border-b pb-4 mb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold text-gray-900">
              Crear Publicación
            </SheetTitle>
            {/* Botón Post a la derecha */}
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting || images.length === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-2">
          {/* Tipo: Lost/Found como chips */}
          <div className="space-y-2">
            <Label className="text-gray-900">Tipo de publicación *</Label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setValue('type', 'lost')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  selectedType === 'lost'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">🔍</span>
                  <span className="font-medium">Perdido</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setValue('type', 'found')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                  selectedType === 'found'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">✅</span>
                  <span className="font-medium">Encontrado</span>
                </div>
              </button>
            </div>
          </div>

          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-900">Título *</Label>
            <input
              id="title"
              {...register('title')}
              placeholder="Ej: Perdí mi mochila azul"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-500"
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Descripción - "What's on your mind?" */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-900">¿Qué pasó? *</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Describe el objeto con el mayor detalle posible: color, marca, modelo, características especiales, lugar donde se perdió/encontró..."
              rows={5}
              className="resize-none"
            />
            <div className="flex items-center justify-between">
              {errors.description && (
                <p className="text-sm text-red-600">{errors.description.message}</p>
              )}
              <p className="text-xs text-gray-500 ml-auto">
                {description.length} caracteres
              </p>
            </div>
          </div>

          {/* Bottom Sheet - Opciones */}
          <div className="space-y-3 border-t pt-4">
            <p className="text-sm font-medium text-gray-900">Agregar a tu publicación</p>

            {/* Fotos */}
            <button
              type="button"
              onClick={() => setShowCategoryPicker(false)}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <ImageIcon className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Foto/video</p>
                <p className="text-xs text-gray-600">
                  {images.length > 0 ? `${images.length} imagen(es)` : 'Agregar imágenes'}
                </p>
              </div>
            </button>

            {/* Mostrar ImageUploader */}
            <div className="mt-2">
              <ImageUploader value={images} onChange={setImages} />
            </div>

            {/* Categoría */}
            <button
              type="button"
              onClick={() => setShowCategoryPicker(!showCategoryPicker)}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <TagIcon className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Categoría</p>
                <p className="text-xs text-gray-600">
                  {selectedCategory
                    ? CATEGORIES.find((c) => c.value === selectedCategory)?.label
                    : 'Seleccionar categoría'}
                </p>
              </div>
            </button>

            {/* Selector de categorías */}
            {showCategoryPicker && (
              <div className="grid grid-cols-2 gap-2 p-2 bg-gray-50 rounded-lg">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => {
                      setValue('category', cat.value);
                      setShowCategoryPicker(false);
                    }}
                    className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                      selectedCategory === cat.value
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : 'bg-white hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <span className="text-xl">{cat.icon}</span>
                    <span className="text-sm font-medium text-gray-900">{cat.label}</span>
                  </button>
                ))}
              </div>
            )}
            {errors.category && (
              <p className="text-sm text-red-600 px-3">{errors.category.message}</p>
            )}

            {/* Ubicación (Check-in) - Placeholder por ahora */}
            <button
              type="button"
              onClick={() => setShowLocationPicker(!showLocationPicker)}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Ubicación</p>
                <p className="text-xs text-gray-600">Agregar ubicación (opcional)</p>
              </div>
            </button>

            {/* Location picker simple */}
            {showLocationPicker && (
              <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                <input
                  type="text"
                  placeholder="Ciudad"
                  {...register('location.city')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-500"
                />
                <input
                  type="text"
                  placeholder="Estado/Provincia"
                  {...register('location.state')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-500"
                />
                <input
                  type="text"
                  placeholder="País"
                  {...register('location.country')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-500"
                />
              </div>
            )}

            {/* Tags */}
            <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
              <Label className="text-gray-900">Etiquetas (opcional)</Label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Agregar etiqueta..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm placeholder:text-gray-500"
                />
                <Button type="button" onClick={addTag} size="sm">
                  Agregar
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1 bg-gray-200 text-gray-900">
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
