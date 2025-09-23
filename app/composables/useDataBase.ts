import type { User, Post } from "../types/database.types";
export const useDataBase = () => {
  const client = useSupabaseClient();
  const authStore = useAuthStore();

  const getUser = async() => {
    if(!authStore.userId) return {data: null, error: null};

    return await client
      .from('users')
      .select('*')
      .eq('uuid', authStore.userId)
      .single();
  };

  const updateUser = async(
    userId: string, 
    updateData: Partial<User>
  ) => {
    return await (client as any)
      .from('users')
      .update(updateData)
      .eq('uuid', userId)
      .select()
  };

  const getPost = async<K extends keyof Post>(
    docId: number, 
    attribute?: K
  ): Promise<Pick<Post, K> | Post> => {
    let query = client
      .from("posts")
      .select(attribute ? attribute : "*")
      .eq("id", docId)
      .single();
    const {data, error} = await query;
    if (error) throw error;
    return data;
  };

  const getPosts = async(userId?: number) => {
    let query = client.from("posts").select("*");

    if (userId) query.eq('id', userId);

    return await query;
  };

  const getPostComments = async(postId: number) => {
    if (!postId) return;

    let query = client
      .from("postComments")
      .select("*")
      .eq('id', postId);

    return await query;
  }

  const updatePost = async(
    postId: number, 
    updateData: Partial<Post>
  ) => {
    return await (client as any)
      .from('posts')
      .update(updateData)
      .eq('id', postId)
      .select()
  };

  const deletePost = async(postId: number) => {
    const response = await client
      .from('posts')
      .delete()
      .eq('id', postId)
  }

  return {
    getUser,
    updateUser,
    getPost,
    getPostComments,
    getPosts,
    updatePost,
    deletePost
  }
}
