/** Session key for restoring vertical scroll on `/` after visiting `/menu`. */
export const HOME_SCROLL_STORAGE_KEY = "ar-home-scroll-y"

/** Element id scrolled to when returning from `/menu` via “Back to home” (`#offerings-intro`). */
export const HOME_MENU_SCROLL_TARGET_ID = "offerings-intro"

/** Hash fragment for that anchor (offerings eyebrow: “DRINKS & LISTENING”, …). */
export const HOME_MENU_SECTION_HASH = `#${HOME_MENU_SCROLL_TARGET_ID}`
