import type { EventInput } from "@fullcalendar/core";
import type { EventsInsert, EventsUpdate } from "~/types/supabase";
import { useConverter } from "./useConverter";

export const useCalendar = () => {

  const { dbToCalendarEvent } = useConverter();

  const loading = ref(false);
  const error = ref<string | null>(null);

  const client = useSupabaseClient();
  const events = ref<EventInput[]>([]);
  
  const fetchEvents = async() => {
    
    loading.value = true;
    error.value = null;

    try {
      const { data, error: supabaseError } = await client
        .from('events')
        .select('*')
        .order('start_at', { ascending: true })
      
      if (supabaseError) throw supabaseError;

      events.value = (data as EventsInsert[]).map(dbToCalendarEvent)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'get event failed';
      console.error(`Error fetching events: ${err}`)
    } finally {
      loading.value = false
    }
  };

  const updateEvent = async(id: string, updates: EventsUpdate) => {
    try {
      const {data, error} = await client
        .from('events')
        .update(updates)
        .eq("id", id)
        .select()
        .single()

      if (error) throw error;

      if (data) {
        const index = events.value.findIndex(event => event.id === id);
        if (index !== -1) {
          events.value[index] = dbToCalendarEvent(data)
        }
      }
    } catch (error) {
      console.error(`Error updating event: ${error}`);
      throw error;
    };
  }

  onMounted(() => {
    fetchEvents()
  })

  return {
    events: readonly(events),
    loading: readonly(loading),
    error: readonly(error),
    fetchEvents,
    updateEvent
  }
}
