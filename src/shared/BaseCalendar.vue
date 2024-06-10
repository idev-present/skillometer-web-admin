<script setup>
import { Qalendar } from "qalendar";

const events = [
  {
    title: "Meeting with Dora",
    with: "Albert Einstein",
    time: { start: "2024-06-10 04:52", end: "2024-06-10 05:37" },
    color: "green",
    isEditable: true,
    id: "de471c78cb5c",
    description:
      "Think of me as Yoda. Only instead of being little and green, I wear suites and I'm awesome.",
  },
  {
    title: "Advanced algebra",
    with: "Pheobe Buffay",
    time: { start: "2024-06-10 20:05", end: "2024-06-10 21:35" },
    colorScheme: "sports",
    isEditable: true,
    id: "6d3c0980a5cf",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!",
  },
  {
    title: "Break",
    with: "Marshall Eriksen",
    time: { start: "2024-06-10 22:10", end: "2024-06-10 22:55" },
    colorScheme: "meetings",
    isEditable: true,
    id: "9f1b209982f1",
    location: "Zoom",
  },
  // ... and more
]

const config = {
  week: {
    // Takes the value 'sunday' or 'monday'
    // However, if startsOn is set to 'sunday' and nDays to 5, the week displayed will be Monday - Friday
    startsOn: 'monday',
    // Takes the values 5 or 7.
    nDays: 7,
    // Scroll to a certain hour on mounting a week. Takes any value from 0 to 23.
    // This option is not compatible with the 'dayBoundaries'-option, and will simply be ignored if custom day boundaries are set.
    scrollToHour: 5,
  },
  month: {
    // Hide leading and trailing dates in the month view (defaults to true when not set)
    showTrailingAndLeadingDates: false,
  },
  // Takes any valid locale that the browser understands. However, not all locales have been thorougly tested in Qalendar
  // If no locale is set, the preferred browser locale will be used
  locale: 'ru-Ru',
  // if not set, the mode defaults to 'week'. The three available options are 'month', 'week' and 'day'
  // Please note, that only day and month modes are available for the calendar in mobile-sized wrappers (~700px wide or less, depending on your root font-size)
  defaultMode: 'day',
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
}
const onDeleteEvent = (e) => {
  console.log(e)
}
const onDatetimeClick = (e) => {
  console.log(e)
}
const onDateClick = (e) => {
  console.log(e)
}

</script>

<template>
<Qalendar
  :events="events"
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