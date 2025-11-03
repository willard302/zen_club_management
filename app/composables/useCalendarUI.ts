import type { EventInput } from "@fullcalendar/core/index.js";

export const useCalendarUI = () => {
  const showNewEventEditor = ref(false);
  const showEventAction = ref(false);
  const currentEvent = ref("");
  const events = ref<EventInput[]>([]);
  const event = ref<EventInput>({});

  const { getEvents, rmEvent } = useDataBase();
  const { dbToCalendarEvent, calendarToDbEvent, calendarToFields } = useConverter();

  const loadEvents = async() => {
    showLoadingToast({message: "Loading..."});
    const data = await getEvents();
    events.value = data.map(dbToCalendarEvent)
  };

  const handleOpenNewEventEditor = () => {
    showNewEventEditor.value = true;
  };

  const handleEventClick = (info: any) => {
    event.value = calendarToFields(info.event);
    showEventAction.value = true;
    currentEvent.value = info.event.id;
  };

  const handleDeleteEvent = async() => {
    const result = await rmEvent(currentEvent.value);
    if (result === 204) showSuccessToast("Delete event successfully.");
    await loadEvents();
    showEventAction.value = false;
  };

  return {
    event,
    events,
    showNewEventEditor,
    showEventAction,
    loadEvents,
    handleOpenNewEventEditor,
    handleEventClick,
    handleDeleteEvent
  }
}
