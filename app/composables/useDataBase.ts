import type { Database } from "~/types/database.types"
import type { EventsInsert, MemebersInsert, MemebersUpdate, UserInsert, UserRow, UserUpdate } from "~/types/supabase";

export const useDataBase = () => {
  const client = useSupabaseClient<Database>();

  const handleError = (error: any, context: string) => {
    if (error) {
      console.error(`${context}:${error}`);
      throw new Error(`${context}: ${error.message || error}`);
    }
  };

  // --- GET (Read) ---
  
  const getUser = async(userId: string) => {
    const {data, error} = await client
      .from("users")
      .select("*")
      .eq("id", userId)
      .maybeSingle()
    
    handleError(error, "Error fetching user")

    return data;
  };

  const getMember = async(memberId: string) => {
    const {data, error} = await client
      .from("members")
      .select("*")
      .eq("id", memberId)
      .maybeSingle()
    
    handleError(error, "Error fetching member");
    if(!data) throw new Error(`Member not found with ID: ${memberId}`);

    return data;
  };

  const getMemberTracker = async(memberId:string) => {
    const {data, error} = await client
      .from("member_tracker")
      .select("*")
      .eq("member_id", memberId)
      .maybeSingle()

      handleError(error, `Error fetching member tracker`);

      return data;
  };

  const getEvent = async(eventId: string) => {
    const {data, error} = await client
      .from("events")
      .select("*")
      .eq("id", eventId)
      .maybeSingle()

    handleError(error, "Error fetching event");
    if (!data) throw new Error(`Event not found with ID: ${eventId}`);

    return data;
  };

  const getMembers = async() => {
    const {data, error} = await client
      .from("members")
      .select("*")
    
    handleError(error, `Error fetching members.`)
    return data ?? [];
  };

  const getMemberTrackers = async() => {
    const {data, error} = await client
      .from("member_tracker")
      .select("*")

    handleError(error, `Error fetching member trackers.`);
    return data ?? [];
  }

  const getEvents = async() => {
    const {data, error} = await client
      .from("events")
      .select("*")
      .order("start_at", { ascending: true });
    
    if (error) throw new Error(`Error fetching event: ${error}`);

    return data ?? []
  };

  // --- INSERT (Create) ---

  const insertUser = async(userInfo: UserInsert) => {
    const {data, error} = await client
      .from("users")
      .insert(userInfo)
      .select("*")
      .single();

    handleError(error, `Error inserting user.`);
    return data;
  }

  const insertMember = async(memberInfo: MemebersInsert) => {
    const {data, error} = await client
      .from("members")
      .insert(memberInfo)
      .select('*')
      .single();
    
    handleError(error, `Error inserting member.`)
    return data;
  };

  const insertEvent = async(event: EventsInsert) => {
    const {data, error} = await client
      .from("events")
      .insert(event)
      .select()
    
    handleError(error, `Error inserting event.`);
    return data;
  };

  // --- UPDATE ---

  const updateUser = async(userId: string, updateData: UserUpdate) => {
    const {data, error} = await client
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single()

    handleError(error, `Error updating user.`);
    return data;
  };

  const updateMember = async(memberId: string, updateData: MemebersUpdate) => {
    const {data, error} = await client
      .from('members')
      .update(updateData)
      .eq('id', memberId)
      .select()
      .single()

    handleError(error, `Error updating member.`);
    return data;
  };

  // --- DELETE ---

  const rmMember = async(memberId: string) => {
    const {error, status} = await client
      .from("members")
      .delete()
      .eq('id', memberId);

    handleError(error, `Error deleting member.`);
    return status;
  };

  const rmEvent = async(event_id: string) => {
    const {error, status} = await client
      .from('events')
      .delete()
      .eq('id', event_id);
    
    handleError(error, `Error deleting event.`);
    return status;
  };

  return {
    getMember,
    getMembers,
    getMemberTracker,
    getMemberTrackers,
    getUser,
    getEvent,
    getEvents,
    insertUser,
    insertMember,
    insertEvent,
    updateUser,
    updateMember,
    rmMember,
    rmEvent
  }
}
