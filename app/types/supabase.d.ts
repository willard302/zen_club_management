import type { Database } from "./database.types";

declare module '#supabase/schema' {
  interface DatabaseDefinition extends Database {};
};

export type User = Database['public']['Tables']['users']['Row'];
export type UserInsert = Database['public']['Tables']['users']['Insert'];
export type UserUpdate = Database['public']['Tables']['users']['Update'];
export type UserPrivate = Database['public']['Tables']['user_private']['Row'];
export type UserPrivateInsert = Database['public']['Tables']['user_private']['Insert'];
export type UserPrivateUpdate = Database['public']['Tables']['user_private']['Update'];
export type Post = Database['public']['Tables']['posts']['Row'] & {
  comments?: PostComment[];
  isFavorite?: Boolean
};
export type PostInsert = Database['public']['Tables']['posts']['Insert'] & {
  comments?: PostComment[];
  isFavorite?: Boolean
};
export type PostUpdate = Database['public']['Tables']['posts']['Update'] & {
  comments?: PostComment[];
  isFavorite?: Boolean
};
export type PostComment = Database['public']['Tables']['post_comments']['Row'];
export type PostCommentInsert = Database['public']['Tables']['post_comments']['Insert'];
export type PostCommentUpdate = Database['public']['Tables']['post_comments']['Update'];
export type Friend = Database['public']['Tables']['friends']['Row'];
export type FriendInsert = Database['public']['Tables']['friends']['Insert'];