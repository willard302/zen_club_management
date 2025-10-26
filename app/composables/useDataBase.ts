import type { Database } from "~/types/database.types"
import type { MemebersInsert, UserRow, UserUpdate } from "~/types/supabase";

export const useDataBase = () => {
  const client = useSupabaseClient<Database>();
  
  const getUser = async<K extends keyof UserRow>(
    userId: string,
    attribute?: K
  ) => {
    const {data, error} = await client
      .from("users")
      .select(attribute ? attribute : "*")
      .eq("id", userId)
      .maybeSingle()
    
    if (error) throw new Error(`Error fetching user: ${error}`);

    if (!data) throw new Error("No User found.");

    return data;
  }

  const getMembers = async() => {
    const {data, error} = await client
      .from("members")
      .select("*")
    
    if(error) throw new Error(`Error fetching user: ${error}`);

    return data ?? [];
  }

  const insertMember = async(
    memberInfo: MemebersInsert
  ) => {
    const {data, error} = await client
      .from("members")
      .insert(memberInfo)
    
    if(error) throw new Error(`Error posting member: ${error}`);
  
    if(!data) return console.warn('No member insert.');

    return data;
  }

  const updateUser = async(
    userId: string,
    updateData: UserUpdate
  ) => {
    return await client
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .select()
  }

  return {
    getMembers,
    getUser,
    insertMember,
    updateUser
  }
}
