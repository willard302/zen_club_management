<script setup lang="ts">
import type { EventInput } from '@fullcalendar/core/index.js';
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import enLocale from '@fullcalendar/core/locales/en-gb';
import twLocale from '@fullcalendar/core/locales/zh-tw';

const mainStore = useMainStore();
const props = defineProps<{
  events: EventInput[],
  onDateClick?: (info:any) => void,
  onEventClick?: (info:any) => void
}>();

const calendarRef = ref<any>(null);

const options = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
  locales: [enLocale, twLocale],
  locale: mainStore.locale === 'tw' ? twLocale : enLocale,
  headerToolbar: {left: 'prev', center: 'title', right: 'next'},
  footerToolbar: {left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',right: 'today'},
  dayHeaderFormat: {weekday: 'narrow' as const},
  initialView: 'dayGridMonth',
  editable: true,
  selectable: true,
  events: props.events,
  contentHeight: 460,
  dateClick: props.onDateClick,
  eventClick: props.onEventClick
}));

</script>

<template>
  <FullCalendar ref="calendarRef" :options="options" />
</template>

<style scoped></style>
