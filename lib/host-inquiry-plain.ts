/** Plain-text body for Web3Forms `message` (structured inquiry copy). */

export type HostInquiryFields = {
  firstName: string
  lastName: string
  email: string
  phone: string
  eventType: string
  guestCount: string
  preferredDate: string
  preferredTime: string
  message: string
}

export function formatHostInquiryPlain(fields: HostInquiryFields): string {
  const {
    firstName,
    lastName,
    email,
    phone,
    eventType,
    guestCount,
    preferredDate,
    preferredTime,
    message,
  } = fields
  const dash = "—"
  return [
    "THE ANALOGUE ROOM — Host event inquiry",
    "═".repeat(42),
    "",
    "GUEST NAME",
    `${firstName} ${lastName}`.trim() || dash,
    "",
    "EMAIL",
    email || dash,
    "",
    "PHONE",
    phone.trim() || dash,
    "",
    "EVENT TYPE",
    eventType || dash,
    "",
    "GUEST COUNT",
    guestCount || dash,
    "",
    "PREFERRED DATE",
    preferredDate.trim() || dash,
    "",
    "PREFERRED TIME",
    preferredTime.trim() || dash,
    "",
    "MESSAGE",
    message.trim() || dash,
    "",
    "—",
    "Reply using the guest email above.",
  ].join("\n")
}
