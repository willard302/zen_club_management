import type { User, Post, PostComment, PostInsert } from "../types/database.types";
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
    const {data, error} = await client
      .from("posts")
      .select(attribute ? attribute : "*")
      .eq("id", docId)
      .single();

    if (error) throw error;
    return data;
  };

  const getPosts = async(userId?: number) => {
    let query = client.from("posts").select("*");

    if (userId) query.eq('id', userId);

    return await query;
  };

  const getPostComments = async(
    postId: number
  ): Promise<PostComment[]> => {
      const {data, error} = await client
        .from("post_comments")
        .select("*")
        .eq('id', postId)

      if(error) throw error;
      return data;
  };

  const insertPost = async(
    postData: PostInsert
  ) => {
    const {data, error} = await (client as any)
      .from('posts')
      .insert(postData)

    if (error) throw error;
    return data;
  };

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

  const updatePostComment = async(
    postId: number,
    updateData: PostComment
  ) => {
    return await (client as any)
      .from("post_comments")
      .update(updateData)
      .eq('id', postId)
      .select()
  }

  const deletePost = async(postId: number) => {
    await client
      .from('posts')
      .delete()
      .eq('id', postId)
      .select()
  }

  return {
    getUser,
    getPost,
    getPostComments,
    getPosts,
    updateUser,
    insertPost,
    updatePost,
    updatePostComment,
    deletePost
  }
}
