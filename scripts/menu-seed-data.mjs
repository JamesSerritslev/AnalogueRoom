/**
 * Print-order drinks menu for Sanity `pageMenus.sections`.
 * Source: AR Menu 08.06.26.pdf
 *
 * Price fields:
 * - glassPrice + bottlePrice for Glass / Bottle columns
 * - price alone for bottle list, beer, spritz, bottle/can
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
        title: "Spritz",
        columns: "single",
        items: [
          {
            title: "Prickly Pear Spritz",
            description:
              "Dreamcote Prickly Pear Cider, lime juice, simple syrup, tonic",
            price: "15",
          },
        ],
      },
      {
        title: "Rosé",
        columns: "glass-bottle",
        items: [
          {
            title: "The SET Rosé, 2023",
            glassPrice: "12",
            bottlePrice: "36",
          },
          {
            title: "Dragonette Rosé, 2025",
            glassPrice: "13",
            bottlePrice: "38",
          },
          {
            title: "Can Sumoi La Rosa, 2025",
            glassPrice: "16",
            bottlePrice: "42",
          },
        ],
      },
      {
        title: "Whites — Local Selections",
        columns: "glass-bottle",
        items: [
          {
            title: "Tatomer Gruner Veltliner, 2024",
            glassPrice: "14",
            bottlePrice: "42",
          },
          {
            title: "Turning Tide Sauvignon Blanc, 2025",
            glassPrice: "10",
            bottlePrice: "35",
          },
          {
            title: "OLG Accolytes Chardonnay, 2024",
            glassPrice: "18",
            bottlePrice: "63",
          },
        ],
      },
      {
        title: "Whites — Imports",
        columns: "glass-bottle",
        items: [
          {
            title: "Escudo Real Vinho Verde, 2025",
            glassPrice: "10",
            bottlePrice: "30",
          },
          {
            title: "Selbach ‘Incline’ Dry Riesling, 2023",
            glassPrice: "12",
            bottlePrice: "42",
          },
          {
            title: "Cherchi Tuvaoes Vermentino, 2024",
            glassPrice: "20",
            bottlePrice: "65",
          },
        ],
      },
      {
        title: "Reds — Local Selections",
        columns: "glass-bottle",
        items: [
          {
            title: "RZN Mencia, 2023",
            glassPrice: "17",
            bottlePrice: "52",
          },
          {
            title: "The SET Gamay Noir, 2024",
            glassPrice: "16",
            bottlePrice: "56",
          },
          {
            title: "Ad Ripa Cabernet Sauvignon",
            glassPrice: "18",
            bottlePrice: "54",
          },
        ],
      },
      {
        title: "Reds — Imports",
        columns: "glass-bottle",
        items: [
          {
            title: "Patin Strada Nebbiolo Langhe DOC, 2024",
            glassPrice: "17",
            bottlePrice: "58",
          },
          {
            title: "Painted Scars Rhone Blend, Cotes Catalanes, 2022",
            glassPrice: "18",
            bottlePrice: "63",
          },
          {
            title: "Vina Cobos ‘Bramare’ Malbec, Valle De Uco, 2022",
            glassPrice: "22",
            bottlePrice: "66",
          },
        ],
      },
      {
        title: "Orange & Carbonic",
        columns: "glass-bottle",
        items: [
          {
            title: "Wineslut Orange, Sauvignon Blanc, 2024",
            glassPrice: "15",
            bottlePrice: "45",
          },
          {
            title: "Disko Carbonic Gamay, 2023",
            glassPrice: "16",
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
          { title: "MadeWest Hazy IPA", price: "8" },
          { title: "MadeWest Pale Ale", price: "7" },
          { title: "TDNE ‘Crushing Hazard’ American Lager", price: "7" },
          { title: "TDNE ‘Particle Drift’ Hazy IPA", price: "8" },
          { title: "TDNE ‘DOPE’ WC IPA", price: "8" },
          { title: "M. Special ‘Sabado Tarde’ Tangerine Ale", price: "7" },
          { title: "M. Special ‘El Mero Mero’ Mexican Lager", price: "7" },
          { title: "Topa Topa ‘Mountain Cats’ WC Pilsner", price: "8" },
          { title: "Topa Topa ‘Weekender’ WC IPA", price: "8" },
          { title: "Topa Topa ‘Chief Peak’ IPA", price: "8" },
          { title: "Topa Topa ‘Level Line’ Pale Ale", price: "7" },
          { title: "Tarantula Hill ‘Liquid Candy’ Hazy IPA", price: "8" },
          { title: "Athletic Brewing ‘Run Wild’ N/A IPA", price: "5" },
          { title: "Athletic Brewing ‘Free Wave’ N/A Hazy IPA", price: "5" },
        ],
      },
      {
        title: "Ciders / Seltzers / Meads",
        columns: "bottle-can",
        items: [
          { title: "Tin City Original Dry Hopped Cider", price: "6" },
          { title: "Honest Abe Cactus Cooler Mead", price: "9" },
          { title: "Ashland Blackberry Lemonade Seltzer", price: "6" },
        ],
      },
      {
        title: "Waters/Sodas",
        columns: "bottle-can",
        items: [
          { title: "San Pellegrino, 12oz / 25oz", price: "4 / 6" },
          {
            title: "Yerba Mate",
            description: "Revel Berry, Bluephoria, Enlightenmint",
            price: "4.50",
          },
          { title: "Coca Cola de Mexico", price: "5" },
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
          { title: "Adami Di Gica Brut Prosecco 375ml, NV", price: "33" },
          { title: "Dreamcote Prickly Pear Cider, SYV, 2023", price: "45" },
          {
            title: "Flying Goat Cellars Goat Bubbles Brut Cuvée, SRH, 2019",
            price: "58",
          },
          {
            title: "Dreamcote Pet Nat Rosé of Grenache, SYV, 2024",
            price: "60",
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
          { title: "Can Sumoi Rosado ‘La Rosa’, Spain, 2025", price: "45" },
        ],
      },
      {
        title: "White Wines — Local Selections",
        columns: "single",
        items: [
          {
            title: "Turning Tide Sauvignon Blanc, Central Coast, 2023",
            price: "35",
          },
          {
            title: "Tatomer ‘Meeresboden’ Gruner Veltliner, SRH, 2024",
            price: "42",
          },
          {
            title: "Lieu Dit ‘Blanc De Mer’ White Blend, SBC, 2024",
            price: "45",
          },
          {
            title: "Our Lady of Guadalupe ‘Acolytes’ Chardonnay, SRH, 2024",
            price: "63",
          },
          {
            title: "Brander ‘Au Natural’ Estate Sauvignon Blanc, 2023",
            price: "64",
          },
          {
            title: "Holus Bolus Roussanne, Bien Nacido Vineyard, 2023",
            price: "65",
          },
          {
            title: "Tatomer Gruner Veltliner, John Sebastiano Vineyard, SRH, 2023",
            price: "68",
          },
          {
            title: "A Tribute to Grace Grenache Blanc, Thompson Vineyard, 2023",
            price: "68",
          },
        ],
      },
      {
        title: "White Wines — Imported Selections",
        columns: "single",
        items: [
          {
            title: "Escudo Real Vinho Verde, Quinta da Lixa, 2025",
            price: "30",
          },
          { title: "Chablis Jean Mare Brocard, 375ml, 2023", price: "35" },
          {
            title: "Pinot Blanc, Domaine Christophe Mittnacht, Alsace, 2025",
            price: "45",
          },
          {
            title: "Selbach ‘Incline’ Dry Riesling, Mosel, 2023",
            price: "48",
          },
          { title: "Selbach ‘Classic’ Riesling, Mosel, 2023", price: "48" },
          {
            title: "Bourgogne Blanc, Les Belles Roches, 2023",
            price: "53",
          },
          {
            title: "Cherchi ‘Tuvaoes’ Vermentino Di Sardegna, 2024",
            price: "64",
          },
          {
            title:
              "Domaine De Fa Beaujolais – Villages Leynes – Les Magnons Blanc, 2022",
            price: "67",
          },
        ],
      },
      {
        title: "Red Wines — Local Selections",
        columns: "single",
        items: [
          { title: "Pax ‘Cuvee Syrah’, Syrah, Sonoma Coast, 2025", price: "51" },
          {
            title: "Ad Ripa, Cabernet Sauvignon, Happy Canyon, 2022",
            price: "54",
          },
          {
            title: "The SET, Gamay Noir, Mail Road Vineyard, SRH, 2023",
            price: "56",
          },
          { title: "RZN Mencia, Nolan Ranch Vineyard, 2023", price: "60" },
          {
            title: "Our Lady of Guadalupe ‘Acolytes’ Pinot Noir, SRH, 2023",
            price: "63",
          },
          {
            title: "A Tribute to Grace, Grenache, SBC, 2023",
            price: "66",
          },
          {
            title: "Our Lady of Guadalupe, Estate Pinot Noir, 2023",
            price: "90",
          },
          {
            title: "Brander, ‘Bouchet’, Estate Bordeaux Blend, 2023",
            price: "98",
          },
        ],
      },
      {
        title: "Red Wines — Imported Selections",
        columns: "single",
        items: [
          {
            title: "Patin ‘Strada’, Nebbiolo Langhe DOC, 2024",
            price: "58",
          },
          {
            title: "Ver Sacrum, GSM Blend, Valle de Uco, Argentina, 2024",
            price: "60",
          },
          { title: "Pinot Noir, ‘Cenizas’ Laberinto, 2024", price: "60" },
          {
            title: "Domaine De Fa ‘En Besset’ Beaujolais, 2023",
            price: "62",
          },
          {
            title: "Painted Scars, Red Blend, IGP Côtes Catalanes, 2022",
            price: "63",
          },
          {
            title: "Viña Cobos ‘Bramare’ Malbec, Valle de Uco, Argentina, 2022",
            price: "66",
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
          { title: "Disko, Carbonic Gamay Noir, SBC, 2023", price: "48" },
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
