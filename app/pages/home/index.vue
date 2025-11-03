<script setup lang="ts">
import Calendar from "./components/Calendar.vue";
import CalendarEditor from "./components/CalendarEditor.vue";
import { useCalendarUI } from "~/composables/useCalendarUI";
import type { ButtonItem, FieldItem } from "~/types/data.types";
const { insertEvent } = useDataBase();
const { fieldsToDbEvents, calendarToDbEvent } = useConverter();
const {
  event, 
  events, 
  showNewEventEditor, 
  showEventAction,
  loadEvents,
  handleOpenNewEventEditor, 
  handleEventClick,
  handleDeleteEvent
} = useCalendarUI();

const buttonItems_newEvent: ButtonItem[] = [
  { text: "create", type: "submit", action: "create" },
  { text: "cancel", type: "button", action: "cancel"}
];
const buttonItems_eventAction: ButtonItem[] = [
  { text: "edit", type: "button", to: "/calendar/editor" },
  { text: "delete", type: "button", action: "delete_eventAction" },
  { text: "cancel", type: "button", action: "cancel"}
];
const selectEventTitle = ref("");
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

onMounted(loadEvents);

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

const handleOnClick = async(action: string) => {
  switch(action) {
    case "delete_eventAction":
      await handleDeleteEvent()
    case "cancel":
      showNewEventEditor.value = false;
      showEventAction.value = false;
  };
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
watch(event, (newVal) => {
  selectEventTitle.value = newVal.find((val:Partial<FieldItem>) => val.name === 'title').value
})


</script>

<template>
  <div class="calendar__container">
    <client-only>

      <!-- FullCalendar -->
      <Calendar
        ref="calendarRef"
        :events="events"
        :on-date-click="(info:any) => console.log('dateClick', info)"
        :on-event-click="handleEventClick"
      />
      
      <!-- Floating button -->
      <van-floating-bubble icon="plus" @click="handleOpenNewEventEditor" />

      <!-- New event -->
      <CalendarEditor 
        v-model:modelValue="showNewEventEditor"
        :field-items="fieldItems"
        :button-items="buttonItems_newEvent"
        title="calendar.new_event"
        button-class="d-flex-40"
        @submit="onSubmit"
        @button="handleOnClick"
      />

      <!-- Event action -->
      <CalendarEditor 
        v-model:modelValue="showEventAction"
        :button-items="buttonItems_eventAction"
        :title="selectEventTitle"
        @button="handleOnClick"
      />
      
    </client-only>
  </div>
</template>
<style lang="scss">
.calendar__container {
  .fc {
    .fc-toolbar-title {
      font-size: 1.2rem;
    }
  }
}
</style>

<style scoped lang="scss">
.calendar__container {
  padding: 10px 6px 60px;
}
:deep(.fc .fc-toolbar.fc-header-toolbar) {
  margin-bottom: 10px;
}
:deep(.fc .fc-toolbar.fc-footer-toolbar) {
  margin-top: 10px;
}
:deep(.fc-scrollgrid-sync-table tbody tr) {
  height: 87px;
}
:deep(.fc table) {
  font-size: 0.8rem;
}
:deep(.fc .fc-button) {
  font-size: 0.8rem;
}
</style>
