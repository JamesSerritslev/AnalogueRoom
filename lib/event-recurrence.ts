/** Same-day events expire at 11:59 PM America/Los_Angeles. */
export const LA_EVENT_CUTOFF_TIME = "23:59"

const WEEKDAYS = [
  { title: "Sunday", value: "sunday" },
  { title: "Monday", value: "monday" },
  { title: "Tuesday", value: "tuesday" },
  { title: "Wednesday", value: "wednesday" },
  { title: "Thursday", value: "thursday" },
  { title: "Friday", value: "friday" },
  { title: "Saturday", value: "saturday" },
] as const

export type Weekday = (typeof WEEKDAYS)[number]["value"]

const WEEKDAY_INDEX: Record<Weekday, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
}

export function getLosAngelesNowParts(): { todayInLA: string; currentTimeInLA: string } {
  const now = new Date()
  const dateParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now)
  const year = dateParts.find((p) => p.type === "year")?.value ?? "0000"
  const month = dateParts.find((p) => p.type === "month")?.value ?? "00"
  const day = dateParts.find((p) => p.type === "day")?.value ?? "00"
  const todayInLA = `${year}-${month}-${day}`

  const timeParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now)
  const hour = timeParts.find((p) => p.type === "hour")?.value ?? "00"
  const minute = timeParts.find((p) => p.type === "minute")?.value ?? "00"
  const currentTimeInLA = `${hour}:${minute}`
  return { todayInLA, currentTimeInLA }
}

export function isWeekday(value: string | undefined | null): value is Weekday {
  return Boolean(value && value in WEEKDAY_INDEX)
}

function weekdayLabel(happensOn: string): string {
  const match = WEEKDAYS.find((day) => day.value === happensOn)
  return match?.title ?? happensOn
}

export function formatEveryWeekday(happensOn: string): string {
  return `Every ${weekdayLabel(happensOn)}`
}

export function weekdayTitleFromYmd(ymd: string): string {
  const idx = weekdayIndexOfYmd(ymd)
  return WEEKDAYS.find((day) => WEEKDAY_INDEX[day.value] === idx)?.title ?? ""
}

function weekdayIndexOfYmd(ymd: string): number {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd)
  if (!m) return 0
  return new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]))).getUTCDay()
}

function addDaysYmd(ymd: string, days: number): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd)
  if (!m) return ymd
  const dt = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]) + days))
  return dt.toISOString().slice(0, 10)
}

/** Next weekly occurrence in LA, rolling to next week after 11:59pm on the event day. */
export function nextWeeklyOccurrenceYmd(
  happensOn: Weekday,
  todayInLA: string,
  currentTimeInLA: string,
  sameDayCutoff = LA_EVENT_CUTOFF_TIME,
): string {
  const target = WEEKDAY_INDEX[happensOn]
  const todayWeekday = weekdayIndexOfYmd(todayInLA)
  const stillToday = todayWeekday === target && currentTimeInLA <= sameDayCutoff
  if (stillToday) return todayInLA

  let daysAhead = (target - todayWeekday + 7) % 7
  if (daysAhead === 0) daysAhead = 7
  return addDaysYmd(todayInLA, daysAhead)
}

export type RecurrenceFields = {
  date?: string
  recurring?: boolean
  happensOn?: string
}

export function resolveRecurringOccurrenceDate(
  event: RecurrenceFields,
  todayInLA: string,
  currentTimeInLA: string,
): string | null {
  if (!event.recurring || !isWeekday(event.happensOn)) return event.date ?? null
  return nextWeeklyOccurrenceYmd(event.happensOn, todayInLA, currentTimeInLA)
}

/** Weekly events stay on the Events listing with the next upcoming date. */
export function isRecurringListed(event: RecurrenceFields): boolean {
  return Boolean(event.recurring)
}

export function isOneOffListed(
  date: string | undefined,
  todayInLA: string,
  currentTimeInLA: string,
): boolean {
  if (!date) return false
  return date > todayInLA || (date === todayInLA && currentTimeInLA <= LA_EVENT_CUTOFF_TIME)
}
