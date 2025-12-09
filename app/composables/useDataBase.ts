import type { TrackerWithMember } from "~/types/data.types";
import type { Database } from "~/types/database.types"
import type { EventsInsert, MemebersInsert, MemebersUpdate, TrackersInsert, UserInsert, UserUpdate } from "~/types/supabase";

export const useDataBase = () => {
  const client = useSupabaseClient<Database>();

  const handleError = (error: any, context: string) => {
    if (error) {
      console.error(`${context}:${error}`);
      throw new Error(`${context}: ${error.message || error}`);
    }
  };
  
  // --- User ---
  
  const getUser = async(userId: string) => {
    const {data, error} = await client
      .from("users")
      .select("*")
      .eq("id", userId)
      .maybeSingle()
    
    handleError(error, "Error fetching user")

    return data;
  };

  const insertUser = async(userInfo: UserInsert) => {
    const {data, error} = await client
      .from("users")
      .insert(userInfo)
      .select("*")
      .single();

    handleError(error, `Error inserting user.`);
    return data;
  };

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

  // --- Member ---

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

  const getMembers = async() => {
    const {data, error} = await client
      .from("members")
      .select("*")
    
    handleError(error, `Error fetching members.`)
    return data ?? [];
  };

  const insertMember = async(memberInfo: MemebersInsert) => {
    const {data, error} = await client
      .from("members")
      .insert(memberInfo)
      .select('*')
      .single();
    
    handleError(error, `Error inserting member.`)
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

  const rmMember = async(memberId: string) => {
    const {error, status} = await client
      .from("members")
      .delete()
      .eq('id', memberId);

    handleError(error, `Error deleting member.`);
    return status;
  };

  // --- MemberTracker ---

  const getMemberTracker = async(memberId:string) => {
    const {data, error} = await client
      .from("member_tracker")
      .select("*")
      .eq("member_id", memberId)
      .maybeSingle()

      handleError(error, `Error fetching member tracker`);
      return data;
  };

  const getMemberTrackers = async() => {
    const {data, error} = await client
      .from("member_tracker")
      .select("*, members:member_id(name, birthday)")
      .order("contact_date", {ascending: false})

    handleError(error, `Error fetching member trackers.`);
    return (data as unknown as TrackerWithMember[]) ?? [];
  };

  const insertMemberTracker = async(trackerInfo: TrackersInsert) => {
    const {data, error} = await client
      .from("member_tracker")
      .insert(trackerInfo)
      .select()
      .single()

    handleError(error, `Error inserting memberTracker.`)
    return data;
  };

  const rmMemberTracker = async(trackerId: string) => {
    const {error, status} = await client
      .from("member_tracker")
      .delete()
      .eq('id', trackerId);
    
    handleError(error, `Error deleting memberTracker`);
    return status;
  }

  // --- Event ---

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

  const getEvents = async() => {
    const {data, error} = await client
      .from("events")
      .select("*")
      .order("start_at", { ascending: true });
    
    if (error) throw new Error(`Error fetching event: ${error}`);

    return data ?? []
  };

  const insertEvent = async(event: EventsInsert) => {
    const {data, error} = await client
      .from("events")
      .insert(event)
      .select()
    
    handleError(error, `Error inserting event.`);
    return data;
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
    getUser,
    insertUser,
    updateUser,
    getMember,
    getMembers,
    insertMember,
    updateMember,
    rmMember,
    getMemberTracker,
    getMemberTrackers,
    insertMemberTracker,
    rmMemberTracker,
    getEvent,
    getEvents,
    insertEvent,
    rmEvent
  }
}
