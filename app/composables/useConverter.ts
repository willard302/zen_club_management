import type { EventInput } from "@fullcalendar/core/index.js"
import type { FieldItem } from "~/types/data.types";
import type { EventsInsert } from "~/types/supabase"

export const useConverter = () => {
  const mainStore = useMainStore();
  const author = mainStore.user?.name;

  const fieldsToDatabase = (fields: FieldItem[]): EventsInsert => {
    
    const event: any = {};
    fields.forEach(f => {
      switch(f.name) {
        case "start":
          event['start_at'] = f.value;
          break;
        case "end": 
          event['end_at'] = f.value;
          break;
        default:
          event[f.name] = f.value;
          break
      }
    });

    event.created_at = dateToString(Date.now(), true);
    event.created_by = author;
    return event as EventsInsert;
  };

  const fieldsToDbEvents = (fields: FieldItem[]) => {
    const event = fieldsToDatabase(fields);
    event.participants = [author ?? ""];
    event.all_day = true;
    return event;
  };

  const dbToCalendarEvent = (dbEvent: EventsInsert): EventInput => {
    return {
      id: dbEvent.id,
      title: dbEvent.title,
      start: dbEvent.start_at,
      end: dbEvent.end_at,
      allDay: dbEvent.all_day,
      backgroundColor: dbEvent.color,
      borderColor: dbEvent.color,
      extendedProps: {
        location: dbEvent.location,
        description: dbEvent.description,
        created_at: dbEvent.created_at,
        created_by: dbEvent.created_by,
        participants: dbEvent.participants,
        recurrence: dbEvent.recurrence
      }
    }
  };
  
  const dateToString = (timestamp: number, withTime: boolean) => {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const finalDate = `${year}-${month}-${day}`;
    
    if(!withTime) return finalDate;

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${finalDate}T${hours}:${minutes}:${seconds}`;
  };
  

  return {
    fieldsToDatabase,
    fieldsToDbEvents,
    dbToCalendarEvent,
    dateToString
  }
}
