/**
 * Venue photos for About collage + homepage placement.
 * Hero (`barFull`) is a high-res full-bleed; other shots are ~1024 on the long edge.
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
    alt: "Blue marble vinyl spinning on a turntable at Analogue Room vinyl lounge in Solvang",
    width: 682,
    height: 1024,
  },
  djRecords: {
    src: "/images/about/02-dj-records.jpg",
    alt: "DJ spinning records at Analogue Room bar and vinyl lounge in Solvang",
    width: 855,
    height: 1024,
  },
  barNight: {
    src: "/images/about/03-bar-night.jpg",
    alt: "Nightlife and guests at Analogue Room bar in Solvang",
    width: 1024,
    height: 682,
  },
  craftBeer: {
    src: "/images/about/04-craft-beer.jpg",
    alt: "Craft beer at Analogue Room wine and beer bar in Solvang",
    width: 1024,
    height: 682,
  },
  storefront: {
    src: "/images/about/05-storefront.jpg",
    alt: "Analogue Room bar and vinyl lounge storefront in Solvang at night",
    width: 1024,
    height: 682,
  },
  boothWine: {
    src: "/images/about/06-booth-wine.jpg",
    alt: "DJ booth with turntables and wine at Analogue Room wine bar in Solvang",
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
    alt: "Turntables and mixer at Analogue Room listening lounge in Solvang",
    width: 1024,
    height: 685,
  },
  teamBar: {
    src: "/images/about/09-team-bar.jpg",
    alt: "Analogue Room team behind the bar in Solvang",
    width: 762,
    height: 1024,
  },
  recordWall: {
    src: "/images/about/10-record-wall.jpg",
    alt: "Vinyl record wall inside Analogue Room listening lounge in Solvang",
    width: 1024,
    height: 682,
  },
  shelfGear: {
    src: "/images/about/11-shelf-gear.jpg",
    alt: "Vinyl shelves and hi-fi gear at Analogue Room vinyl lounge in Solvang",
    width: 682,
    height: 1024,
  },
  fullBooth: {
    src: "/images/about/12-full-booth.jpg",
    alt: "DJ booth and record wall at Analogue Room bar in Solvang",
    width: 1024,
    height: 682,
  },
  nightCrowd: {
    src: "/images/about/13-night-crowd.jpg",
    alt: "Guests and vinyl nightlife at Analogue Room bar in Solvang",
    width: 1024,
    height: 682,
  },
  analogueWine: {
    src: "/images/about/14-analogue-wine.jpg",
    alt: "Wine poured at Analogue Room wine bar in Solvang",
    width: 1024,
    height: 682,
  },
  browsingRecords: {
    src: "/images/about/15-browsing-records.jpg",
    alt: "Browsing vinyl records at Analogue Room vinyl lounge in Solvang",
    width: 1024,
    height: 756,
  },
  djDuo: {
    src: "/images/about/16-dj-duo.jpg",
    alt: "DJs at the booth inside Analogue Room vinyl lounge and bar in Solvang",
    width: 682,
    height: 1024,
  },
  wineShelf: {
    src: "/images/about/17-wine-shelf.jpg",
    alt: "Wine bottles and Analogue glasses on the backlit shelf at Analogue Room wine bar in Solvang",
    width: 1024,
    height: 642,
  },
  barFull: {
    src: "/images/about/20-bar-wall.jpg",
    alt: "Analogue Room bar in Solvang with vinyl shelves, wine bottles, and hi-fi gear under warm pendant lights",
    width: 3840,
    height: 2560,
  },
  barCrowd: {
    src: "/images/about/21-bar-crowd.jpg",
    alt: "Guests at the bar with vinyl shelves and wine bottles at Analogue Room in Solvang",
    width: 1024,
    height: 682,
  },
  djBooth: {
    src: "/images/about/22-dj-booth.jpg",
    alt: "DJ spinning vinyl at the booth inside Analogue Room wine bar in Solvang",
    width: 1024,
    height: 682,
  },
  barPatrons: {
    src: "/images/about/24-bar-patrons.jpg",
    alt: "Guests at the bar choosing from the backlit wine and vinyl wall at Analogue Room in Solvang",
    width: 682,
    height: 1024,
  },
  pizzaTray: {
    src: "/images/food/21-pizza-row.jpg",
    alt: "Four square pizza slices lined up on the bar at Analogue Room in Solvang",
    width: 1024,
    height: 682,
  },
  pizzaBoard: {
    src: "/images/food/23-pizza-four.jpg",
    alt: "Four thick-crust pizza slices on a wooden board at Analogue Room in Solvang",
    width: 870,
    height: 1024,
  },
  pizzaCheese: {
    src: "/images/food/24-pizza-cheese.jpg",
    alt: "Cheese pizza slice on a wooden board at Analogue Room in Solvang",
    width: 1024,
    height: 585,
  },
  pizzaPair: {
    src: "/images/food/25-pizza-pair.jpg",
    alt: "Cheese and pepperoni focaccia pizzas side by side at Analogue Room in Solvang",
    width: 1024,
    height: 581,
  },
  pizzaPepperoni: {
    src: "/images/food/26-pizza-pepperoni.jpg",
    alt: "Pepperoni pizza slice on parchment at Analogue Room in Solvang",
    width: 1024,
    height: 682,
  },
  pizzaSausage: {
    src: "/images/food/27-pizza-sausage.jpg",
    alt: "Sausage and mushroom pizza slice at Analogue Room in Solvang",
    width: 1024,
    height: 682,
  },
  pizzaProsciutto: {
    src: "/images/food/28-pizza-prosciutto.jpg",
    alt: "Prosciutto, arugula, and balsamic pizza slice at Analogue Room in Solvang",
    width: 682,
    height: 1024,
  },
} as const satisfies Record<string, VenuePhoto>
