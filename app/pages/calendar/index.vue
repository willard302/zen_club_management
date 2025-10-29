<script setup lang="ts">
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import enLocale from '@fullcalendar/core/locales/en-gb';
import twLocale from '@fullcalendar/core/locales/zh-tw';
import type { EventInput } from '@fullcalendar/core';
import type { ButtonItem, FieldItem, Operation } from "~/types/data.types";
const { insertEvent, getEvents, rmEvent } = useDataBase();
const { dbToCalendarEvent, fieldsToDbEvents } = useConverter();
const mainStore = useMainStore();
const operations: Operation[] = [
  { name: 'month', id: 'dayGridMonth' },
  { name: 'week', id: 'timeGridWeek' },
  { name: 'day', id: 'timeGridDay' },
  { name: 'calendar.list', id: 'listWeek' }
];
const buttonItems: ButtonItem[] = [
  { text: "create", type: "submit", action: "create" },
  { text: "cancel", type: "button", action: "cancel"}
];
const buttonItems_eventAction: ButtonItem[] = [
  { text: "edit", type: "button", to: "/calendar/editor" },
  { text: "delete", type: "button", action: "delete_eventAction" },
  { text: "cancel", type: "button", action: "cancel"}
];
const showNewEventEditor = ref(false);
const showEventAction = ref(false);
const currentEvent = ref("");
const calendarRef = ref<any>(null);
const events = ref<EventInput[]>([]);
const calendaroperations = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
  locales: [enLocale, twLocale],
  locale: mainStore.locale === 'tw' ? twLocale : enLocale,
  initialView: 'dayGridMonth',
  editable: true,
  selectable: true,
  events: events.value,
  contentHeight: 440,
  dateClick: (info: any) => {
    console.log("dateClick: ", info)
  },
  eventClick: async(info: any) => {
    console.log("eventClick", info)
    showEventAction.value = true;
    currentEvent.value = info.event.id;
  },
});
const fieldItems: FieldItem[] = reactive([
  {
    label: "calendar.title",
    value: "",
    name: "title",
    type: "text",
    required: true
  },
  {
    label: "calendar.all_day",
    value: false,
    name: "all_day",
    type: "checkbox"
  },
  {
    label: "calendar.start",
    value: "",
    name: "start",
    type: "datetime-local",
    required: true
  },
  {
    label: "calendar.end",
    value: "",
    name: "end",
    type: "datetime-local",
    required: true
  },
  {
    label: "calendar.recurrence",
    value: "none",
    name: "recurrence",
    type: "text"
  },
  {
    label: "calendar.location",
    value: "",
    name: "location",
    type: "text"
  },
  {
    label: "calendar.description",
    value: "",
    name: "description",
    type: "textarea"
  }
]);
onMounted(async() => {
  await loadEvents();
});
const handleOpenNewEventEditor = () => {
  showNewEventEditor.value = true;
};
const onSubmit = async() => {
  try {
    const newEvent = fieldsToDbEvents(fieldItems);
    
    const result = await insertEvent(newEvent);
    if (!result) return;
    showSuccessToast('Event added successfully');
    await loadEvents();
  } catch (err) {
    showFailToast('Failed to add event');
    console.error(err)
  } finally {
    fieldItems.forEach(element => {
      showNewEventEditor.value = false;
      element.value = ""
    });
  }
};
const changeView = (event:string) => {
  if (!event) throw new Error(`changeView error...`)
  const api = calendarRef.value.getApi();
  api.changeView(event);
};
const loadEvents = async() => {
  showLoadingToast({message: "loading..."})
  const data = await getEvents();
  const result = data.map(event => dbToCalendarEvent(event));
  calendaroperations.value.events = result;
};
const handleOnClick = async(event: string) => {
  switch(event) {
    case "edit_eventAction":
      console.log(event);
      break;
    case "delete_eventAction":
      const result = await rmEvent(currentEvent.value);
      if (result === 204) showSuccessToast("delete event successfully.");
      await loadEvents();
  };
  showNewEventEditor.value = false;
  showEventAction.value = false;
};

watch(
  () => fieldItems.find(f => f.name === 'all_day')?.value,
  (newVal) => {
    const startField = fieldItems.find(f => f.name === 'start');
    const endField = fieldItems.find(f => f.name === 'end');

    if (!startField || !endField) return;

    if (newVal) {
      startField.type = "date";
      endField.type = "date";
    } else {
      startField.type = "datetime-local";
      endField.type = "datetime-local";
    }
  },
  { immediate: true }
);
watch(
  () => mainStore.locale,
  (newVal) => {
    switch(newVal) {
      case "tw":
        calendaroperations.value.locale = twLocale;
        break;
      case "en":
        calendaroperations.value.locale = enLocale;
        break;
    }
    
  }
)

</script>

<template>
  <div class="calendar__container">
    <client-only>
      <FullCalendar 
        ref="calendarRef" 
        :options="calendaroperations" 
      />
      <div class="van-button-group">
        <van-button
          v-for="operation in operations"
          :key="operation.id"
          @click="changeView(operation.id)"
        >
          {{ $t(operation.name) }}
        </van-button>
      </div>
      <van-floating-bubble icon="plus" @click="handleOpenNewEventEditor" />
      <van-popup 
        v-model:show="showNewEventEditor" 
        position="bottom"
        round
      >
        <FieldForm
          custom-class="calendar" 
          :field-items="fieldItems" 
          :button-items="buttonItems"
          @submit="onSubmit"
          @button="handleOnClick"
        />
      </van-popup>
      <van-popup
        v-model:show="showEventAction"
        position="bottom"
        round
      >
        <FieldForm 
          :button-items="buttonItems_eventAction"
          @button="handleOnClick"
        />
      </van-popup>
    </client-only>
  </div>
</template>

<style scoped lang="scss">
:deep(.fc .fc-toolbar-title) {
  font-size: 1.2rem;
}
:deep(.fc-scrollgrid-sync-table tbody tr) {
  height: 84px;
}
:deep(.fc-event-main) {
  font-size: 0.6rem;
}
:deep(.fc table) {
  font-size: 0.8rem;
}
:deep(.fc .fc-button) {
  font-size: 0.8rem;
}
.calendar__container {
  padding-top: 10px;

  .van-button-group {
    .van-button {
    display: flex;
    justify-content: center;
    margin: 10px auto;
  }
  }
}
:deep(.fc .fc-toolbar.fc-header-toolbar) {
  padding: 0 10px;
}
.van-button-group {
  display: flex;
  .van-button {
    width: 24%;
  }
  .van-button-content {
    width: 100%;
  }
}
</style>
