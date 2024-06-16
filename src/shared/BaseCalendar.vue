<script setup>
import { Qalendar } from "qalendar";
import { computed } from 'vue'
import { useEventStore } from '@/app/store/modules/event.js'
import { getDateTimeStringFromDate } from '@/shared/utils/date.js'
import { useDictionaryStore } from '@/app/store/modules/dictionary.js'

const emit = defineEmits(['onEditEvent', 'update:modelValue', 'onDeleteEvent'])


const eventStore = useEventStore()
const dictionaryStore = useDictionaryStore()


const config = {
  week: {
    // Takes the value 'sunday' or 'monday'
    // However, if startsOn is set to 'sunday' and nDays to 5, the week displayed will be Monday - Friday
    startsOn: 'monday',
    // Takes the values 5 or 7.
    nDays: 5,
    // Scroll to a certain hour on mounting a week. Takes any value from 0 to 23.
    // This option is not compatible with the 'dayBoundaries'-option, and will simply be ignored if custom day boundaries are set.
    scrollToHour: 1,
  },

  month: {
    // Hide leading and trailing dates in the month view (defaults to true when not set)
    showTrailingAndLeadingDates: false,
  },
  // Takes any valid locale that the browser understands. However, not all locales have been thorougly tested in Qalendar
  // If no locale is set, the preferred browser locale will be used
  locale: 'ru-RU',
  // if not set, the mode defaults to 'week'. The three available options are 'month', 'week' and 'day'
  // Please note, that only day and month modes are available for the calendar in mobile-sized wrappers (~700px wide or less, depending on your root font-size)
  defaultMode: 'week',
  // The silent flag can be added, to disable the development warnings. This will also bring a slight performance boost
  isSilent: true,
  showCurrentTime: true, // Display a line indicating the current time
  style: {
    colorSchemes: {
      meetings: {
        color: "#fff",
        backgroundColor: "#131313",
      },
      sports: {
        color: "#fff",
        backgroundColor: "#ff4081",
      },
    },
  },
  dayBoundaries: {
    start: 6,// integer between 0 and 24
    end: 20// integer between 0 and 24
  },
}


const onDrag = (e) => {
  console.log(e)
}
const onResize = (e) => {
  console.log(e)
}
const onClick = (e) => {
  console.log(e)
}
const onClickInterval = (e) => {
  console.log(e)
}
const onUpdatePeriod = (e) => {
  console.log(e)
}
const onUpdateMode = (e) => {
  console.log(e)
}
const onEditEvent = (e) => {
  console.log(e)
  emit('onEditEvent', e)
}
const onDeleteEvent = (e) => {
  console.log(e)
  emit('onDeleteEvent', e)
}
const onDatetimeClick = (e) => {
  console.log(e)
}
const onDateClick = (e) => {
  console.log(e)
}

const preparedData = computed(() => {
  return eventStore.eventList.map((el) => ({
    ...el,
    title: el?.name || 'Без названия',
    with: dictionaryStore?.replyStatusList?.find((el) => el.key === el?.status)?.value,
    time: {
      start: getDateTimeStringFromDate(new Date(el?.startAt)),
      end: getDateTimeStringFromDate(new Date(el?.endAt)),
    },
    color: 'blue',
    isEditable: 'true',
  }))
})

</script>

<template>
<Qalendar
  :events="preparedData"
  :config="config"
  @event-was-dragged="onDrag"
  @event-was-resized="onResize"
  @event-was-clicked="onClick"
  @interval-was-clicked="onClickInterval"
  @updated-period="onUpdatePeriod"
  @updated-mode="onUpdateMode"
  @edit-event="onEditEvent"
  @delete-event="onDeleteEvent"
  @datetime-was-clicked="onDatetimeClick"
  @date-was-clicked="onDateClick"
/>
</template>

<style scoped>

</style>