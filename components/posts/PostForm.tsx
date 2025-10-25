'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ImageUploader, UploadedImage } from '@/components/posts/ImageUploader';
import { Loader2, X } from 'lucide-react';

/**
 * Schema de validación del formulario
 */
const postFormSchema = z.object({
  type: z.enum(['lost', 'found'], {
    message: 'Debes seleccionar un tipo',
  }),
  title: z
    .string()
    .min(5, 'El título debe tener al menos 5 caracteres')
    .max(100, 'El título no puede tener más de 100 caracteres'),
  description: z
    .string()
    .min(20, 'La descripción debe tener al menos 20 caracteres')
    .max(2000, 'La descripción no puede tener más de 2000 caracteres'),
  category: z.enum([
    'electronics',
    'clothing',
    'accessories',
    'documents',
    'pets',
    'vehicles',
    'jewelry',
    'keys',
    'bags',
    'other',
  ]),
  images: z.array(z.any()).min(1, 'Debes subir al menos 1 imagen').max(5, 'Máximo 5 imágenes'),
  tags: z.array(z.string()).optional(),
});

type PostFormValues = z.infer<typeof postFormSchema>;

/**
 * Props del PostForm
 */
interface PostFormProps {
  initialData?: Partial<PostFormValues>;
  postId?: string; // Si existe, estamos editando
}

/**
 * Categorías disponibles
 */
const CATEGORIES = [
  { value: 'electronics', label: 'Electrónicos' },
  { value: 'clothing', label: 'Ropa' },
  { value: 'accessories', label: 'Accesorios' },
  { value: 'documents', label: 'Documentos' },
  { value: 'pets', label: 'Mascotas' },
  { value: 'vehicles', label: 'Vehículos' },
  { value: 'jewelry', label: 'Joyería' },
  { value: 'keys', label: 'Llaves' },
  { value: 'bags', label: 'Bolsos/Mochilas' },
  { value: 'other', label: 'Otro' },
];

/**
 * PostForm
 * 
 * Formulario completo para crear/editar posts con:
 * - Validación con Zod + React Hook Form
 * - Upload de imágenes
 * - Sistema de tags
 * - Estados de carga
 * - Manejo de errores
 */
export function PostForm({ initialData, postId }: PostFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      type: initialData?.type || 'lost',
      title: initialData?.title || '',
      description: initialData?.description || '',
      category: initialData?.category || 'other',
      images: initialData?.images || [],
      tags: initialData?.tags || [],
    },
  });

  const images = watch('images');
  const tags = watch('tags') || [];
  const type = watch('type');

  /**
   * Agregar tag
   */
  const addTag = () => {
    const trimmed = tagInput.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed) && tags.length < 10) {
      setValue('tags', [...tags, trimmed]);
      setTagInput('');
    }
  };

  /**
   * Eliminar tag
   */
  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setValue('tags', newTags);
  };

  /**
   * Submit del formulario
   */
  const onSubmit = async (data: PostFormValues) => {
    try {
      setIsSubmitting(true);

      // Preparar datos para el API
      const postData = {
        type: data.type,
        title: data.title,
        description: data.description,
        category: data.category,
        images: images.map((img) => ({
          url: img.url,
          publicId: img.publicId,
        })),
        tags: data.tags || [],
      };

      // Llamar al API
      const url = postId ? `/api/posts/${postId}` : '/api/posts';
      const method = postId ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const result = await response.json();

      if (result.success) {
        // Redirigir al post creado/editado
        router.push(`/post/${result.post._id}`);
        router.refresh();
      } else {
        alert(result.error || 'Error al guardar el post');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error al guardar el post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Tipo de Post */}
      <div className="space-y-2">
        <Label className="text-gray-900 font-semibold">Tipo de publicación *</Label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setValue('type', 'lost')}
            className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
              type === 'lost'
                ? 'border-red-500 bg-red-50 text-red-700'
                : 'border-gray-300 hover:border-red-300 text-gray-700 hover:bg-red-50'
            }`}
          >
            🔍 Objeto Perdido
          </button>
          <button
            type="button"
            onClick={() => setValue('type', 'found')}
            className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
              type === 'found'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-300 hover:border-green-300 text-gray-700 hover:bg-green-50'
            }`}
          >
            ✅ Objeto Encontrado
          </button>
        </div>
        {errors.type && (
          <p className="text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      {/* Título */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-gray-900 font-semibold">Título *</Label>
        <Input
          id="title"
          {...register('title')}
          placeholder={
            type === 'lost'
              ? 'Ej: Perdí mi mochila azul en el parque'
              : 'Ej: Encontré unas llaves en el centro comercial'
          }
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && (
          <p className="text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-gray-900 font-semibold">Descripción *</Label>
        <Textarea
          id="description"
          {...register('description')}
          rows={6}
          placeholder="Describe el objeto con el mayor detalle posible: color, marca, modelo, características especiales, lugar donde lo perdiste/encontraste..."
          className={errors.description ? 'border-red-500' : ''}
        />
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        )}
        <p className="text-xs text-gray-600">
          Mínimo 20 caracteres
        </p>
      </div>

      {/* Categoría */}
      <div className="space-y-2">
        <Label htmlFor="category" className="text-gray-900 font-semibold">Categoría *</Label>
        <select
          id="category"
          {...register('category')}
          className="flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-900 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      {/* Imágenes */}
      <div className="space-y-2">
        <Label className="text-gray-900 font-semibold">Imágenes * (1-5)</Label>
        <ImageUploader
          value={images}
          onChange={(newImages) => setValue('images', newImages)}
          maxImages={5}
          maxSizeMB={5}
        />
        {errors.images && (
          <p className="text-sm text-red-600">{errors.images.message}</p>
        )}
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags" className="text-gray-900 font-semibold">Etiquetas (opcional)</Label>
        <div className="flex gap-2">
          <Input
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTag();
              }
            }}
            placeholder="Ej: mochila, azul, nike"
            disabled={tags.length >= 10}
          />
          <Button
            type="button"
            onClick={addTag}
            disabled={!tagInput.trim() || tags.length >= 10}
            variant="outline"
            className="text-gray-900 font-medium"
          >
            Agregar
          </Button>
        </div>

        {/* Tags añadidos */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="gap-1">
                #{tag}
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-600">
          Máximo 10 etiquetas. Presiona Enter para agregar.
        </p>
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="flex-1 text-gray-900 font-medium border-gray-300 hover:bg-gray-100"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting
            ? 'Guardando...'
            : postId
            ? 'Actualizar'
            : 'Publicar'}
        </Button>
      </div>
    </form>
  );
}
