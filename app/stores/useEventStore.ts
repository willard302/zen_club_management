import type { EventsInsert, EventsUpdate } from "~/types/supabase";

export const useEventStore = defineStore('event', () => {
  const event = ref<EventsInsert | EventsUpdate>({});

  const setEvent = (updatedData: EventsUpdate) => {
    event.value = {...event.value, ...updatedData}
  };

  return {
    event,
    setEvent
  }
},{
  persist: true
})