import type { Database } from "~/types/database.types";
import type { UserInsert, PostInsert, UserUpdate, PostUpdate, PostCommentUpdate, User, UserPrivate } from "../types/supabase";

export const useDataBase = () => {
  const client = useSupabaseClient<Database>();

  const getUser = async<K extends keyof User>(
    userId: string,
    attribute?: K
  ) => {

    const {data, error} = await client
      .from('users')
      .select(attribute ? attribute : "*")
      .eq('id', String(userId))
      .maybeSingle();

    if (error) throw new Error(`Error fetching user: ${error}`);

    if (!data) throw new Error("No User found.");

    return data;
  };

  const getUserPrivate = async<K extends keyof UserPrivate>(
    userId: string,
    attribute?: K
  ) => {
    const { data, error } = await client
      .from('user_private')
      .select(attribute ? attribute : "*")
      .eq('id', userId)
      .maybeSingle()
    
    if (error) throw new Error(`Error fetching user: ${error}`);

    if (!data) throw new Error(`No user found.`);

    return data;
  };


  const getUsers = async() => {
    const { data, error } = await client
      .from('users')
      .select()
    if (error) throw new Error(`Error fetching users: ${error}`);

    if (!data) throw new Error(`No user found.`);

    return data;
  };

  const getPost = async(
    docId: number, 
    attribute?: string
  ) => {
    const {data, error} = await client
      .from("posts")
      .select(attribute ? attribute : "*")
      .eq("id", docId)
      .single();

    if (error) throw new Error(`Error fetching posts: ${error}`);

    if (!data) throw `No posts found.`;

    return data;
  };

  const getPostTrackers = async(
    docId: number
  ) => {
    const {data, error} = await client
      .from("posts")
      .select("trackers_id")
      .eq("id", docId)
      .single()

    if (error) throw new Error(`Error fetching trackers: ${error}`);

    if (!data) throw new Error(`No trackers found.`);

    return data;
  }

  const getPosts = async() => {
    const {data, error} = await client
      .from("posts")
      .select("*")
      .order('created_at', {ascending: false});

    if (error) throw new Error(`Error fetching posts: ${error}`);

    if (!data) throw new Error(`No posts found.`);

    return data;
  };

  const getFriends = async(
    userId: string
  ) => {
    const {data, error} = await client
      .from("friends")
      .select("*")
      .eq('user_id', String(userId));
    
    if(error) throw new Error(`Error fetching friends: ${error}`);

    if(!data) throw new Error(`No friends found.`);

    return data;
  }

  const getPostComments = async(
    postId: number
  ) => {
    const {data, error} = await client
      .from("post_comments")
      .select("*")
      .eq('id', postId)
      .order('created_at', {ascending: false});

    if(error) throw new Error(`Error fetching comments: ${error}`);

    if(!data) throw new Error(`No comments found.`);
    
    return data;
  };

  const insertUser = async(
    userData: UserInsert
  ) => {
    const {data, error} = await client
      .from('users')
      .insert(userData);

    if (error) throw new Error(`Error posting user: ${error}`);

    if (!data) throw new Error(`No user insert.`);

    return data;
  };

  const insertPost = async(
    postData: PostInsert
  ) => {
    const {data, error} = await client
      .from('posts')
      .insert(postData)

    if (error) throw new Error(`Error posting post. ${error} `) ;

    if (!data) throw new Error(`No post insert`)

    return data;
  };

  const updateUser = async(
    userId: string, 
    updateData: UserUpdate
  ) => {
    return await client
      .from('users')
      .update(updateData)
      .eq('uuid', userId)
      .select()
  };

  const updatePost = async(
    postId: number, 
    updateData: PostUpdate
  ) => {
    return await client
      .from('posts')
      .update(updateData)
      .eq('id', postId)
      .select()
  };

  const updatePostComment = async(
    postId: number,
    updateData: PostCommentUpdate
  ) => {
    return await client
      .from("post_comments")
      .update(updateData)
      .eq('id', postId)
      .select()
  }

  const deletePost = async(
    postId: number
  ) => {
    await client
      .from('posts')
      .delete()
      .eq('id', postId)
      .select()
  }

  return {
    getUser,
    getUserPrivate,
    getUsers,
    getFriends,
    getPost,
    getPostTrackers,
    getPostComments,
    getPosts,
    updateUser,
    insertUser,
    insertPost,
    updatePost,
    updatePostComment,
    deletePost
  }
}
