/**
 * API Response Types
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: PaginationMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface PaginationMeta {
  cursor?: string;
  nextCursor?: string;
  hasMore: boolean;
  total?: number;
  limit?: number;
}

/**
 * User Types
 */
export interface UserType {
  _id: string;
  name: string;
  email: string;
  image?: string;
  emailVerified?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends UserType {
  postsCount: number;
  commentsCount: number;
}

/**
 * Post Types
 */
export type PostStatus = 'active' | 'resolved' | 'closed';
export type PostType = 'lost' | 'found';
export type PostCategory = 'electronics' | 'documents' | 'pets' | 'clothing' | 'accessories' | 'other';

export interface PostImage {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
}

export interface PostLocation {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
  address?: string;
  city?: string;
  country?: string;
}

export interface Post {
  _id: string;
  userId: string;
  type: PostType;
  title: string;
  description: string;
  category: PostCategory;
  images: PostImage[];
  location?: PostLocation;
  status: PostStatus;
  tags: string[];
  commentsCount: number;
  reactionsCount: {
    like: number;
    helpful: number;
    found: number;
  };
  createdAt: Date;
  updatedAt: Date;
  // Populated fields (when fetched with user info)
  user?: {
    _id: string;
    name: string;
    image?: string;
  };
}

/**
 * Comment Types
 */
export interface CommentImage {
  url: string;
  publicId: string;
}

export interface CommentLocation {
  type: 'Point';
  coordinates: [number, number];
  address?: string;
}

export interface Comment {
  _id: string;
  postId: string;
  userId: string;
  content: string;
  parentCommentId?: string;
  replyToUserId?: string;
  images?: CommentImage[];
  location?: CommentLocation;
  repliesCount: number;
  createdAt: Date;
  updatedAt: Date;
  // Populated fields
  user?: {
    _id: string;
    name: string;
    image?: string;
  };
  replyToUser?: {
    _id: string;
    name: string;
  };
  replies?: Comment[];
}

/**
 * Reaction Types
 */
export type ReactionType = 'like' | 'helpful' | 'found';

export interface Reaction {
  _id: string;
  userId: string;
  postId: string;
  type: ReactionType;
  createdAt: Date;
}

export interface ReactionSummary {
  type: ReactionType;
  count: number;
  hasReacted: boolean;
}
