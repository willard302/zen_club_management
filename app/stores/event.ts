import type { EventStoreState } from "~/types/data.types";
import type { EventsUpdate } from "~/types/supabase";

export const useEventStore = defineStore('event', {
  state: (): EventStoreState => ({
    event: {}
  }),
  actions: {
    setEvent(updatedData: EventsUpdate){
      this.event = {...this.event, ...updatedData}
    }
  },
  persist: true
})