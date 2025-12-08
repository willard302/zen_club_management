<script setup lang="ts">
import Calendar from "./components/Calendar.vue";
import CalendarEditor from "./components/CalendarEditor.vue";
import { useCalendarUI } from "~/composables/useCalendarUI";
import type { ButtonItem, FieldItem } from "~/types/data.types";
const { insertEvent } = useDataBase();
const { fieldsToDbEvents } = useConverter();
const {
  events, 
  showNewEventEditor, 
  showEventAction,
  loadEvents,
  handleOpenNewEventEditor, 
  handleEventClick,
  handleDateClick,
  handleDeleteEvent
} = useCalendarUI();

const buttonItems_newEvent: ButtonItem[] = [
  { text: "create", type: "submit", action: "create" },
  { text: "cancel", type: "button", action: "cancel"}
];
const buttonItems_eventAction: ButtonItem[] = [
  { text: "edit", type: "button", to: "/home/eventData" },
  { text: "delete", type: "button", action: "delete_eventAction" },
  { text: "cancel", type: "button", action: "cancel"}
];
const selectEventTitle = ref("");

const fieldItems = reactive<FieldItem[]>([
  {
    label: "Calendar.title",
    value: "",
    name: "title",
    type: "text",
    required: true
  },
  {
    label: "Calendar.all_day",
    value: false,
    name: "all_day",
    type: "checkbox"
  },
  {
    label: "Calendar.start",
    value: "",
    name: "start",
    type: "datetime-local",
    required: true
  },
  {
    label: "Calendar.end",
    value: "",
    name: "end",
    type: "datetime-local",
    required: true
  },
  {
    label: "Calendar.recurrence",
    value: "none",
    name: "recurrence",
    type: "text"
  },
  {
    label: "Calendar.location",
    value: "",
    name: "location",
    type: "text"
  },
  {
    label: "Calendar.description",
    value: "",
    name: "description",
    type: "textarea"
  }
]);

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
    case "edit_eventAction":

      break;
    case "delete_eventAction":
      await handleDeleteEvent();
      break;
    case "cancel":
      showNewEventEditor.value = false;
      showEventAction.value = false;
      break;
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

onMounted(()=>{
  loadEvents();
});

</script>

<template>
  <div class="calendar__container">
      <!-- FullCalendar -->
      <Calendar
        ref="calendarRef"
        :events="events"
        :on-date-click="(info:any) => handleDateClick(info)"
        :on-event-click="handleEventClick"
      />
      
      <!-- Floating button -->
      <van-floating-bubble icon="plus" @click="handleOpenNewEventEditor" />

      <!-- New event -->
      <CalendarEditor 
        v-model:modelValue="showNewEventEditor"
        :field-items="fieldItems"
        :button-items="buttonItems_newEvent"
        :title="$t('Calendar.new_event')"
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
