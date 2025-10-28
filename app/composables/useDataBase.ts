import type { Database } from "~/types/database.types"
import type { EventsInsert, MemebersInsert, UserRow, UserUpdate } from "~/types/supabase";

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
  };

  const getMembers = async() => {
    const {data, error} = await client
      .from("members")
      .select("*")
    
    if(error) throw new Error(`Error fetching user: ${error}`);

    return data ?? [];
  };

  const getEvents = async() => {
    const {data, error} = await client
      .from("events")
      .select("*")
      .order("start_at", { ascending: true });
    
    if (error) throw new Error(`Error fetching event: ${error}`);

    return data ?? []
  };

  const insertMember = async(
    memberInfo: MemebersInsert
  ) => {
    const {data, error} = await client
      .from("members")
      .insert(memberInfo)
    
    if(error) throw new Error(`Error posting member: ${error}`);
  
    if(!data) return console.warn('No member insert.');

    return data;
  };

  const insertEvent = async(
    event: EventsInsert
  ) => {
    const {data, error} = await client
      .from("events")
      .insert(event)
      .select()
    
    if(error) throw new Error(`Error insert event: ${error}`);

    if(!data) {
      console.warn('No event insert.');
      return;
    };

    return data;
  };

  const updateUser = async(
    userId: string,
    updateData: UserUpdate
  ) => {
    return await client
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .select()
  };

  const rmEvent = async(event_id: string) => {
    const response = await client
      .from('events')
      .delete()
      .eq('id', event_id);
    
    return response.status;
  };

  return {
    getMembers,
    getUser,
    getEvents,
    insertMember,
    insertEvent,
    updateUser,
    rmEvent
  }
}
