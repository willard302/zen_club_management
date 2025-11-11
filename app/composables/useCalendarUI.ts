import type { EventInput } from "@fullcalendar/core/index.js";
import type { FieldItem } from "~/types/data.types";

let _calendarUI: ReturnType<typeof createCalendarUI> | null = null;

const createCalendarUI = () => {
  const eventStore = useEventStore();

  const showNewEventEditor = ref(false);
  const showEventAction = ref(false);

  const events = ref<EventInput[]>([]);
  const fields = ref<FieldItem[]>([]);

  const { getEvent, getEvents, rmEvent } = useDataBase();
  const { dbToCalendarEvent, calendarToFields } = useConverter();

  const loadEvents = async() => {
    showLoadingToast({message: "Loading..."});
    try {
      const data = await getEvents();
      events.value = data.map(dbToCalendarEvent)
    } finally {
      closeToast();
    }
  };

  const handleOpenNewEventEditor = () => {
    showNewEventEditor.value = true;
  };

  const handleEventClick = async(info: any) => {
    const event_id = info.event.id;
    const result = await getEvent(event_id);
    if (!result) return;

    fields.value = calendarToFields(result);
    eventStore.setEvent(result);
    showEventAction.value = true;
  };

  const handleDateClick = (info: any) => {
    console.log('handleDateClick: ', info);
  };

  const handleDeleteEvent = async() => {
    if (!eventStore.event.id) return;
    const result = await rmEvent(eventStore.event.id);
    if (result === 204) showSuccessToast("Delete event successfully.");
    await loadEvents();
    showEventAction.value = false;
  };

  return {
    fields,
    events,
    showNewEventEditor,
    showEventAction,

    loadEvents,
    handleOpenNewEventEditor,
    handleEventClick,
    handleDateClick,
    handleDeleteEvent
  }
}

export const useCalendarUI = () => {
  if (!_calendarUI) {
    _calendarUI = createCalendarUI();
  };
  return _calendarUI;
}
