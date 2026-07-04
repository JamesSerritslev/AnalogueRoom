/**
 * Print-order drinks menu for Sanity `pageMenus.sections`.
 *
 * Price fields:
 * - glassPrice + bottlePrice for Glass / Bottle columns
 * - glassPrice may be "12 / 15" for 6 oz / 9 oz
 * - price alone for bottle list, beer, spritz
 */

function withKeys(sections) {
  return sections.map((section, si) => ({
    _key: `ms${si}`,
    _type: "menuSection",
    title: section.title,
    ...(section.note ? { note: section.note } : {}),
    ...(section.slug
      ? { slug: { _type: "slug", current: section.slug } }
      : {}),
    categories: (section.categories || []).map((cat, ci) => ({
      _key: `ms${si}c${ci}`,
      _type: "menuCategory",
      title: cat.title,
      columns: cat.columns || "single",
      items: (cat.items || []).map((it, ii) => ({
        _key: `ms${si}c${ci}i${ii}`,
        _type: "menuItem",
        title: it.title,
        ...(it.description ? { description: it.description } : {}),
        ...(it.glassPrice ? { glassPrice: it.glassPrice } : {}),
        ...(it.bottlePrice ? { bottlePrice: it.bottlePrice } : {}),
        ...(it.price ? { price: it.price } : {}),
      })),
    })),
  }))
}

export const SEED_MENU_SECTIONS = withKeys([
  {
    title: "Wines By the Glass",
    slug: "wines",
    note: "6 oz OR 9 oz Glass Pour Available",
    categories: [
      {
        title: "Sparkling",
        columns: "glass-bottle",
        items: [
          {
            title: "Dreamcote Prickly Pear Cider, 2023",
            glassPrice: "13",
            bottlePrice: "45",
          },
          {
            title: "Flying Goat Brut Cuvée, 2019",
            glassPrice: "19",
            bottlePrice: "68",
          },
        ],
      },
      {
        title: "Rosé",
        columns: "glass-bottle",
        items: [
          {
            title: "The SET Rosé, 2023",
            glassPrice: "12 / 15",
            bottlePrice: "36",
          },
          {
            title: "Dragonette Cellars Rosé, 2025",
            glassPrice: "13 / 16",
            bottlePrice: "39",
          },
        ],
      },
      {
        title: "Whites",
        columns: "glass-bottle",
        items: [
          {
            title: "RZN Clairette Blanche, 2025",
            glassPrice: "15 / 18",
            bottlePrice: "45",
          },
          {
            title: "Disko Albariño, 2024",
            glassPrice: "16 / 19",
            bottlePrice: "52",
          },
          {
            title: "Mazette Sauvignon Blanc, 2025",
            glassPrice: "18 / 21",
            bottlePrice: "54",
          },
        ],
      },
      {
        title: "Reds",
        columns: "glass-bottle",
        items: [
          {
            title: "Disko Sangiovese, 2023",
            glassPrice: "16 / 19",
            bottlePrice: "52",
          },
          {
            title: "The SET Pinot Noir, 2024",
            glassPrice: "17 / 20",
            bottlePrice: "58",
          },
          {
            title: "Mazette Grenache ‘Community Cuvée’, 2025",
            glassPrice: "17 / 20",
            bottlePrice: "58",
          },
        ],
      },
      {
        title: "Orange & Carbonic",
        columns: "glass-bottle",
        items: [
          {
            title: "Wineslut Orange, Sauvignon Blanc, 2024",
            glassPrice: "15 / 18",
            bottlePrice: "45",
          },
          {
            title: "Disko Carbonic Gamay, 2023",
            glassPrice: "16 / 19",
            bottlePrice: "48",
          },
        ],
      },
      {
        title: "Zero Proof",
        columns: "glass-bottle",
        items: [
          {
            title: "GlasRose Elderflower & Yuzu Verjus",
            glassPrice: "20",
            bottlePrice: "50",
          },
          {
            title: "GlasRose Hibiscus & Blood Orange Verjus",
            glassPrice: "20",
            bottlePrice: "50",
          },
        ],
      },
      {
        title: "Spritz",
        columns: "single",
        items: [
          {
            title: "Prickly Pear Spritz",
            description:
              "Dreamcote Prickly Pear Cider, lime juice, simple syrup, tonic water",
            price: "15",
          },
        ],
      },
    ],
  },
  {
    title: "Beers",
    slug: "beer",
    categories: [
      {
        title: "Beer",
        columns: "bottle-can",
        items: [
          { title: "Coors Light, 12oz Can", price: "5" },
          { title: "Modelo Especial, 12oz Bottle", price: "5" },
          { title: "TDNE ‘Crushing Hazard’ American Light Lager", price: "7" },
          { title: "TDNE ‘Effigy’ Czech Pilsner", price: "8" },
          { title: "TDNE ‘Sowing the Sun’ Kölsch", price: "8" },
          { title: "Athletic Brewing N/A ‘Run Wild’ IPA", price: "5" },
          { title: "Athletic Brewing N/A ‘Free Wave’ Hazy IPA", price: "5" },
        ],
      },
      {
        title: "Waters/Sodas",
        columns: "bottle-can",
        items: [
          { title: "San Pellegrino, 12oz / 25oz", price: "3 / 6" },
          {
            title: "Spindrift Sparkling Water",
            description: "Lime, Blood Orange, Lemon",
            price: "4",
          },
          {
            title: "Yerba Mate",
            description: "Revel Berry, Bluephoria, Enlightenmint",
            price: "4.50",
          },
          { title: "Coca Cola de Mexico", price: "5" },
          {
            title: "Fanta de Mexico",
            description: "Fresa, Naranja, Uva, Piña",
            price: "5",
          },
        ],
      },
    ],
  },
  {
    title: "Wines by the Bottle",
    slug: "wines-by-the-bottle",
    categories: [
      {
        title: "Sparkling Wines",
        columns: "single",
        items: [
          { title: "Dreamcote Prickly Pear Cider, SYV, 2023", price: "45" },
          {
            title: "Dreamcote Pet Nat Rosé of Grenache, SYV, 2024",
            price: "60",
          },
          {
            title: "Flying Goat Cellars Goat Bubbles Brut Cuvée, SRH, 2019",
            price: "68",
          },
          {
            title: "Flying Goat Cellars ‘Goat Bubbles’ Pinot Meunier, SRH, 2021",
            price: "85",
          },
        ],
      },
      {
        title: "Rosé",
        columns: "single",
        items: [
          {
            title: "The SET Rosé, Mail Road Vineyard, SRH, 2023",
            price: "36",
          },
          { title: "Dragonette Cellars Rosé, SRH, 2025", price: "39" },
        ],
      },
      {
        title: "White Wines",
        columns: "single",
        items: [
          {
            title: "RZN Clairette Blanche, Nolan Ranch Vineyard, 2024",
            price: "45",
          },
          {
            title: "Disko Albariño, North Canyon Vineyard, 2024",
            price: "52",
          },
          {
            title: "Mazette ‘Mutual Muse’ Sauvignon Blanc, Santa Ynez Valley, 2024",
            price: "54",
          },
          {
            title: "Brander ‘Au Natural’ Estate Sauvignon Blanc, 2023",
            price: "64",
          },
          {
            title: "Holus Bolus Roussanne, Bien Nacido Vineyard, 2023",
            price: "75",
          },
        ],
      },
      {
        title: "Red Wines",
        columns: "single",
        items: [
          {
            title: "Disko Sangiovese, Oak Savannah Vineyard, 2023",
            price: "48",
          },
          { title: "RZN Mencía, Nolan Ranch Vineyard, 2023", price: "53" },
          {
            title: "The SET Pinot Noir, Mail Road Vineyard, SRH, 2023",
            price: "58",
          },
          {
            title: "Mazette ‘Community Cuvée’ Grenache, SYV, 2025",
            price: "58",
          },
          {
            title: "Brander ‘Bouchet’ Estate Bordeaux Blend, 2023",
            price: "98",
          },
        ],
      },
      {
        title: "Other Selections",
        columns: "single",
        items: [
          {
            title: "Wineslut Orange, Sauvignon Blanc, White Barn Vineyard, 2024",
            price: "45",
          },
          { title: "Disko Carbonic Gamay Noir, SBC, 2023", price: "48" },
        ],
      },
      {
        title: "Zero Proof",
        columns: "single",
        items: [
          {
            title: "GlasRose Elderflower & Yuzu Verjus, 2025",
            price: "50",
          },
          {
            title: "GlasRose Hibiscus & Blood Orange Verjus, 2025",
            price: "50",
          },
        ],
      },
    ],
  },
])
