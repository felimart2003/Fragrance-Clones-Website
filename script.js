// ─── Fragrance Database ───
// Each entry: designer original → best clone (highest-rated "Reminds Me Of" on Fragrantica)
const fragrances = [
  {
    original: "Aventus",
    originalHouse: "Creed",
    clone: "Club de Nuit Intense Man",
    cloneHouse: "Armaf",
    category: "men",
    notes: "Pineapple, birch, musk, oakmoss"
  },
  {
    original: "Baccarat Rouge 540",
    originalHouse: "Maison Francis Kurkdjian",
    clone: "Burberry Her Elixir de Parfum",
    cloneHouse: "Burberry",
    category: "unisex",
    notes: "Saffron, jasmine, ambergris, cedar"
  },
  {
    original: "Lost Cherry",
    originalHouse: "Tom Ford",
    clone: "Cherry Smoothie",
    cloneHouse: "Zara",
    category: "unisex",
    notes: "Cherry, tonka bean, almond, vanilla"
  },
  {
    original: "Sauvage Eau de Parfum",
    originalHouse: "Dior",
    clone: "L'Aventure Knight",
    cloneHouse: "Al Haramain",
    category: "men",
    notes: "Pepper, lavender, ambroxan, vanilla"
  },
  {
    original: "Bleu de Chanel",
    originalHouse: "Chanel",
    clone: "Blue de Chance",
    cloneHouse: "Maison Alhambra",
    category: "men",
    notes: "Citrus, mint, cedar, sandalwood"
  },
  {
    original: "Acqua di Gio Profumo",
    originalHouse: "Giorgio Armani",
    clone: "Agua de Vida",
    cloneHouse: "Maison Alhambra",
    category: "men",
    notes: "Aquatic, bergamot, amber, patchouli"
  },
  {
    original: "Tobacco Vanille",
    originalHouse: "Tom Ford",
    clone: "Tobacco Vanilla",
    cloneHouse: "Lattafa",
    category: "unisex",
    notes: "Tobacco, vanilla, cacao, dried fruits"
  },
  {
    original: "La Nuit de L'Homme",
    originalHouse: "Yves Saint Laurent",
    clone: "La Uno",
    cloneHouse: "Fragrance World",
    category: "men",
    notes: "Cardamom, lavender, cedar, coumarin"
  },
  {
    original: "Oud Wood",
    originalHouse: "Tom Ford",
    clone: "Woody Oud",
    cloneHouse: "Rasasi",
    category: "unisex",
    notes: "Oud, rosewood, sandalwood, vetiver"
  },
  {
    original: "Eros",
    originalHouse: "Versace",
    clone: "Supremacy Not Only Intense",
    cloneHouse: "Afnan",
    category: "men",
    notes: "Mint, green apple, tonka bean, vanilla"
  },
  {
    original: "Coco Mademoiselle",
    originalHouse: "Chanel",
    clone: "Suddenly Madam Glamour",
    cloneHouse: "Lidl",
    category: "women",
    notes: "Orange, jasmine, rose, patchouli"
  },
  {
    original: "The One Eau de Parfum",
    originalHouse: "Dolce & Gabbana",
    clone: "The Warrior",
    cloneHouse: "Armaf",
    category: "men",
    notes: "Ginger, amber, tobacco, cedar"
  },
  {
    original: "Luna Rossa Carbon",
    originalHouse: "Prada",
    clone: "Asad",
    cloneHouse: "Lattafa",
    category: "men",
    notes: "Lavender, metallic, ambroxan, patchouli"
  },
  {
    original: "Tuscan Leather",
    originalHouse: "Tom Ford",
    clone: "La Yuqawam",
    cloneHouse: "Rasasi",
    category: "men",
    notes: "Leather, raspberry, saffron, thyme"
  },
  {
    original: "Libre Eau de Parfum",
    originalHouse: "Yves Saint Laurent",
    clone: "Red Temptation",
    cloneHouse: "Zara",
    category: "women",
    notes: "Lavender, orange blossom, vanilla, musk"
  },
  {
    original: "La Vie Est Belle",
    originalHouse: "Lancôme",
    clone: "Suddenly Done",
    cloneHouse: "Lidl",
    category: "women",
    notes: "Iris, praline, patchouli, vanilla"
  },
  {
    original: "Black Orchid",
    originalHouse: "Tom Ford",
    clone: "Black Orchid",
    cloneHouse: "Zara",
    category: "unisex",
    notes: "Truffle, orchid, dark chocolate, patchouli"
  },
  {
    original: "Ombré Leather",
    originalHouse: "Tom Ford",
    clone: "Amber & Leather",
    cloneHouse: "Zara",
    category: "unisex",
    notes: "Leather, cardamom, jasmine, patchouli"
  },
  {
    original: "Spicebomb Extreme",
    originalHouse: "Viktor & Rolf",
    clone: "Spice Bomb",
    cloneHouse: "Fragrance World",
    category: "men",
    notes: "Tobacco, cinnamon, vanilla, lavandin"
  },
  {
    original: "Good Girl",
    originalHouse: "Carolina Herrera",
    clone: "Classy Chic Girl",
    cloneHouse: "Fragrance World",
    category: "women",
    notes: "Tuberose, jasmine, tonka bean, cacao"
  },
  {
    original: "1 Million",
    originalHouse: "Paco Rabanne",
    clone: "Craft Noire",
    cloneHouse: "Vurv",
    category: "men",
    notes: "Blood mandarin, cinnamon, leather, amber"
  },
  {
    original: "Bitter Peach",
    originalHouse: "Tom Ford",
    clone: "Peach Please",
    cloneHouse: "Zara",
    category: "unisex",
    notes: "Peach, rum, cognac, vanilla, sandalwood"
  },
  {
    original: "Invictus",
    originalHouse: "Paco Rabanne",
    clone: "Victor",
    cloneHouse: "Maison Alhambra",
    category: "men",
    notes: "Grapefruit, sea salt, guaiac wood, ambergris"
  },
  {
    original: "Daisy",
    originalHouse: "Marc Jacobs",
    clone: "Applejuice",
    cloneHouse: "Zara",
    category: "women",
    notes: "Strawberry, violet, jasmine, musk"
  },
  {
    original: "Interlude Man",
    originalHouse: "Amouage",
    clone: "Khamrah",
    cloneHouse: "Lattafa",
    category: "men",
    notes: "Incense, oregano, amber, oud, musk"
  },
  {
    original: "Rehab",
    originalHouse: "Initio",
    clone: "Hayaati Gold Elixir",
    cloneHouse: "Lattafa",
    category: "unisex",
    notes: "Lavender, musk, saffron, sandalwood"
  },
  {
    original: "Aventus for Her",
    originalHouse: "Creed",
    clone: "Club de Nuit Woman",
    cloneHouse: "Armaf",
    category: "women",
    notes: "Apple, peach, musk, sandalwood"
  },
  {
    original: "Reflection Man",
    originalHouse: "Amouage",
    clone: "Luxe Reflex",
    cloneHouse: "Maison Alhambra",
    category: "men",
    notes: "Rosemary, neroli, jasmine, sandalwood, cedar"
  },
  {
    original: "Noir Extreme",
    originalHouse: "Tom Ford",
    clone: "Encre Noire à L'Extrême",
    cloneHouse: "Lalique",
    category: "men",
    notes: "Cardamom, nutmeg, amber, vanilla, sandalwood"
  },
  {
    original: "Roses Vanille",
    originalHouse: "Mancera",
    clone: "Velvet Rose",
    cloneHouse: "Lattafa",
    category: "women",
    notes: "Rose, vanilla, white musk, sugar"
  }
];

// ─── Mobile Menu Toggle ───
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.getElementById("nav-menu");

  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener("click", function () {
      mobileMenu.classList.toggle("is-active");
      navMenu.classList.toggle("active");
    });
  }

  // ─── Fragrance Page Logic ───
  const grid = document.getElementById("fragranceGrid");
  if (grid) {
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const resultsCount = document.getElementById("resultsCount");

    function renderFragrances() {
      const query = searchInput.value.toLowerCase().trim();
      const category = categoryFilter.value;

      const filtered = fragrances.filter(function (frag) {
        const matchesCategory = category === "all" || frag.category === category;
        const matchesSearch =
          !query ||
          frag.original.toLowerCase().includes(query) ||
          frag.originalHouse.toLowerCase().includes(query) ||
          frag.clone.toLowerCase().includes(query) ||
          frag.cloneHouse.toLowerCase().includes(query) ||
          frag.notes.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
      });

      if (resultsCount) {
        resultsCount.textContent =
          filtered.length + " of " + fragrances.length + " fragrances";
      }

      if (filtered.length === 0) {
        grid.innerHTML = '<div class="no-results">No fragrances found matching your search.</div>';
        return;
      }

      var html = "";
      filtered.forEach(function (frag) {
        var categoryLabel =
          frag.category.charAt(0).toUpperCase() + frag.category.slice(1);
        html +=
          '<div class="fragrance-card">' +
            '<div class="fragrance-card__header">' +
              '<div class="fragrance-card__section">' +
                '<div class="fragrance-card__label">Original</div>' +
              '</div>' +
              '<span class="fragrance-card__category">' + categoryLabel + "</span>" +
            "</div>" +
            '<div class="fragrance-card__name">' + frag.original + "</div>" +
            '<div class="fragrance-card__house">' + frag.originalHouse + "</div>" +
            '<div class="fragrance-card__arrow">↓</div>' +
            '<div class="fragrance-card__section">' +
              '<div class="fragrance-card__label">Best Clone</div>' +
            '</div>' +
            '<div class="fragrance-card__name">' + frag.clone + "</div>" +
            '<div class="fragrance-card__house">' + frag.cloneHouse + "</div>" +
            '<hr class="fragrance-card__divider" />' +
            '<div class="fragrance-card__notes">Notes: ' + frag.notes + "</div>" +
          "</div>";
      });

      grid.innerHTML = html;
    }

    searchInput.addEventListener("input", renderFragrances);
    categoryFilter.addEventListener("change", renderFragrances);

    renderFragrances();
  }
});
