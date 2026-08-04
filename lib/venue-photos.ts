/**
 * Venue photos for About collage + homepage placement.
 * Dimensions are the native pixel sizes as provided (long edge ≈ 1024).
 */
export type VenuePhoto = {
  src: string
  alt: string
  width: number
  height: number
}

export const VENUE_PHOTOS = {
  blueVinyl: {
    src: "/images/about/01-blue-vinyl.jpg",
    alt: "Blue marble vinyl spinning on a turntable at The Analogue Room vinyl lounge in Solvang",
    width: 682,
    height: 1024,
  },
  djRecords: {
    src: "/images/about/02-dj-records.jpg",
    alt: "DJ spinning records at The Analogue Room bar and vinyl lounge in Solvang",
    width: 855,
    height: 1024,
  },
  barNight: {
    src: "/images/about/03-bar-night.jpg",
    alt: "Nightlife and guests at The Analogue Room bar in Solvang",
    width: 1024,
    height: 682,
  },
  craftBeer: {
    src: "/images/about/04-craft-beer.jpg",
    alt: "Craft beer at The Analogue Room wine and beer bar in Solvang",
    width: 1024,
    height: 682,
  },
  storefront: {
    src: "/images/about/05-storefront.jpg",
    alt: "The Analogue Room bar and vinyl lounge storefront in Solvang at night",
    width: 1024,
    height: 682,
  },
  boothWine: {
    src: "/images/about/06-booth-wine.jpg",
    alt: "DJ booth with turntables and wine at The Analogue Room wine bar in Solvang",
    width: 1024,
    height: 701,
  },
  analoguePint: {
    src: "/images/about/07-analogue-pint.jpg",
    alt: "Analogue Room pint glass at the Solvang vinyl lounge and beer bar",
    width: 682,
    height: 1024,
  },
  decksOverhead: {
    src: "/images/about/08-decks-overhead.jpg",
    alt: "Turntables and mixer at The Analogue Room listening lounge in Solvang",
    width: 1024,
    height: 685,
  },
  teamBar: {
    src: "/images/about/09-team-bar.jpg",
    alt: "The Analogue Room team behind the bar in Solvang",
    width: 762,
    height: 1024,
  },
  recordWall: {
    src: "/images/about/10-record-wall.jpg",
    alt: "Vinyl record wall inside The Analogue Room listening lounge in Solvang",
    width: 1024,
    height: 682,
  },
  shelfGear: {
    src: "/images/about/11-shelf-gear.jpg",
    alt: "Vinyl shelves and hi-fi gear at The Analogue Room vinyl lounge in Solvang",
    width: 682,
    height: 1024,
  },
  fullBooth: {
    src: "/images/about/12-full-booth.jpg",
    alt: "DJ booth and record wall at The Analogue Room bar in Solvang",
    width: 1024,
    height: 682,
  },
  nightCrowd: {
    src: "/images/about/13-night-crowd.jpg",
    alt: "Guests and vinyl nightlife at The Analogue Room bar in Solvang",
    width: 1024,
    height: 682,
  },
  analogueWine: {
    src: "/images/about/14-analogue-wine.jpg",
    alt: "Wine poured at The Analogue Room wine bar in Solvang",
    width: 1024,
    height: 682,
  },
  browsingRecords: {
    src: "/images/about/15-browsing-records.jpg",
    alt: "Browsing vinyl records at The Analogue Room vinyl lounge in Solvang",
    width: 1024,
    height: 756,
  },
  djDuo: {
    src: "/images/about/16-dj-duo.jpg",
    alt: "DJs at the booth inside The Analogue Room vinyl lounge and bar in Solvang",
    width: 682,
    height: 1024,
  },
  wineShelf: {
    src: "/images/about/17-wine-shelf.jpg",
    alt: "Wine bottles and Analogue glasses on the backlit shelf at The Analogue Room wine bar in Solvang",
    width: 1024,
    height: 642,
  },
  browsingCorner: {
    src: "/images/about/18-browsing-corner.jpg",
    alt: "Guest browsing the vinyl wall at The Analogue Room listening lounge in Solvang",
    width: 1024,
    height: 725,
  },
  pizzaTray: {
    src: "/images/food/19-pizza-tray.jpg",
    alt: "Thick-crust pepperoni pizza with basil at The Analogue Room in Solvang",
    width: 1024,
    height: 682,
  },
  pizzaWine: {
    src: "/images/food/20-pizza-wine.jpg",
    alt: "Pizza slice and Analogue Room wine glass at the Solvang vinyl lounge and bar",
    width: 1024,
    height: 682,
  },
} as const satisfies Record<string, VenuePhoto>

export const ALL_VENUE_PHOTOS: VenuePhoto[] = Object.values(VENUE_PHOTOS)
