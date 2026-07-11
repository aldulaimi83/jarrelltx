(function () {
  const config = {
    siteUrl: "https://jarrelltx.co",
    yearTarget: "[data-year]",
    mobileNavToggle: "[data-menu-toggle]",
    mobileNav: "[data-site-nav]",
    header: "[data-site-header]",
    backToTop: "[data-back-to-top]",
    directoryRoot: "[data-directory-root]",
    directorySearch: "[data-directory-search]",
    directoryCategory: "[data-directory-category]",
    directorySort: "[data-directory-sort]",
    directoryOpenNow: "[data-directory-open-now]",
    directoryHasWebsite: "[data-directory-has-website]",
    directoryFeatured: "[data-directory-featured]",
    directoryFeaturedList: "[data-directory-featured-list]",
    directoryResults: "[data-directory-results]",
    directoryLoadMore: "[data-directory-load-more]",
    filterStorageKey: "jarrelltx-directory-filters",
    forms: {
      review: "",
      contact: "",
    },
  };

  const categories = [
    { name: "Restaurants", slug: "restaurants", icon: "store" },
    { name: "Home Services", slug: "home-services", icon: "home" },
    { name: "HVAC", slug: "hvac", icon: "fan" },
    { name: "Plumbing", slug: "plumbing", icon: "pipe" },
    { name: "Electrical", slug: "electrical", icon: "bolt" },
    { name: "Landscaping", slug: "landscaping", icon: "leaf" },
    { name: "Roofing", slug: "roofing", icon: "roof" },
    { name: "Automotive", slug: "automotive", icon: "car" },
    { name: "Real Estate", slug: "real-estate", icon: "house" },
    { name: "Health and Wellness", slug: "health-and-wellness", icon: "heart" },
    { name: "Beauty and Personal Care", slug: "beauty-and-personal-care", icon: "sparkle" },
    { name: "Professional Services", slug: "professional-services", icon: "briefcase" },
  ];

  const businesses = [
    {
      id: 1,
      name: "Demo Main Street Cafe",
      slug: "demo-main-street-cafe",
      category: "Restaurants",
      description: "Example listing for a family breakfast and lunch spot on the Jarrell side of town.",
      phone: "(512) 555-0101",
      email: "hello@demomainstcafe.example",
      address: "123 Main St, Jarrell, TX",
      website: "https://example.com",
      hours: "Mon-Sat 7:00 AM - 2:00 PM",
      featured: true,
      verified: false,
      image: "/assets/images/directory-demo.svg",
      services: ["Breakfast", "Lunch", "Catering"],
      latitude: 30.824,
      longitude: -97.604,
    },
    {
      id: 2,
      name: "Demo Jarrell Plumbing",
      slug: "demo-jarrell-plumbing",
      category: "Plumbing",
      description: "Sample listing for a local plumbing company serving homes and small businesses.",
      phone: "(512) 555-0110",
      email: "service@demojarrellplumbing.example",
      address: "45 Commerce Dr, Jarrell, TX",
      website: "https://example.com",
      hours: "24/7 Emergency Service",
      featured: true,
      verified: false,
      image: "/assets/images/directory-demo.svg",
      services: ["Repairs", "Drains", "Water Heaters"],
      latitude: 30.828,
      longitude: -97.602,
    },
    {
      id: 3,
      name: "Demo Lone Star Lawn Care",
      slug: "demo-lone-star-lawn-care",
      category: "Landscaping",
      description: "Example listing showing how yard, mowing, and seasonal cleanup services appear.",
      phone: "(512) 555-0112",
      email: "info@demolonestarlawn.example",
      address: "78 County Rd 314, Jarrell, TX",
      website: "",
      hours: "Mon-Fri 8:00 AM - 5:00 PM",
      featured: false,
      verified: false,
      image: "/assets/images/directory-demo.svg",
      services: ["Mowing", "Mulch", "Cleanup"],
      latitude: 30.821,
      longitude: -97.599,
    },
    {
      id: 4,
      name: "Demo Jarrell Electric",
      slug: "demo-jarrell-electric",
      category: "Electrical",
      description: "Placeholder listing for panel upgrades, lighting, and repair calls.",
      phone: "(512) 555-0113",
      email: "support@demojarrellelectric.example",
      address: "19 Ranch Rd, Jarrell, TX",
      website: "https://example.com",
      hours: "Mon-Sat 8:00 AM - 6:00 PM",
      featured: false,
      verified: false,
      image: "/assets/images/directory-demo.svg",
      services: ["Panel Upgrades", "Lighting", "Troubleshooting"],
      latitude: 30.826,
      longitude: -97.603,
    },
    {
      id: 5,
      name: "Demo Jarrell Realty",
      slug: "demo-jarrell-realty",
      category: "Real Estate",
      description: "A sample real estate profile with website and contact placeholders.",
      phone: "(512) 555-0114",
      email: "team@demojarrellrealty.example",
      address: "84 Frontage Rd, Jarrell, TX",
      website: "https://example.com",
      hours: "Mon-Fri 9:00 AM - 5:00 PM",
      featured: false,
      verified: false,
      image: "/assets/images/directory-demo.svg",
      services: ["Buying", "Selling", "Rentals"],
      latitude: 30.825,
      longitude: -97.598,
    },
    {
      id: 6,
      name: "Demo Jarrell Wellness",
      slug: "demo-jarrell-wellness",
      category: "Health and Wellness",
      description: "Demo wellness listing for massage, fitness, or clinic services.",
      phone: "(512) 555-0115",
      email: "care@demojarrellwellness.example",
      address: "6 Wellness Way, Jarrell, TX",
      website: "",
      hours: "Mon-Sat 8:00 AM - 7:00 PM",
      featured: false,
      verified: false,
      image: "/assets/images/directory-demo.svg",
      services: ["Wellness", "Classes", "Recovery"],
      latitude: 30.823,
      longitude: -97.6,
    },
    {
      id: 7,
      name: "Demo Jarrell Auto Care",
      slug: "demo-jarrell-auto-care",
      category: "Automotive",
      description: "Example auto service profile for maintenance, tires, and repair work.",
      phone: "(512) 555-0116",
      email: "service@demojarrellautocare.example",
      address: "71 Highway 95, Jarrell, TX",
      website: "https://example.com",
      hours: "Mon-Fri 8:00 AM - 6:00 PM",
      featured: false,
      verified: false,
      image: "/assets/images/directory-demo.svg",
      services: ["Oil Change", "Brakes", "Tires"],
      latitude: 30.827,
      longitude: -97.606,
    },
    {
      id: 8,
      name: "Demo Jarrell Bookkeeping",
      slug: "demo-jarrell-bookkeeping",
      category: "Professional Services",
      description: "Placeholder for bookkeeping, tax prep, and small business support.",
      phone: "(512) 555-0117",
      email: "hello@demojarrellbookkeeping.example",
      address: "11 Office Park, Jarrell, TX",
      website: "",
      hours: "Mon-Fri 9:00 AM - 4:00 PM",
      featured: false,
      verified: false,
      image: "/assets/images/directory-demo.svg",
      services: ["Bookkeeping", "Taxes", "Payroll"],
      latitude: 30.8245,
      longitude: -97.601,
    },
    {
      id: 9,
      name: "Demo Jarrell Roofing",
      slug: "demo-jarrell-roofing",
      category: "Roofing",
      description: "Sample listing for inspections, repairs, and replacement projects.",
      phone: "(512) 555-0118",
      email: "info@demojarrellroofing.example",
      address: "50 Ridge Rd, Jarrell, TX",
      website: "https://example.com",
      hours: "Mon-Sat 8:00 AM - 6:00 PM",
      featured: false,
      verified: false,
      image: "/assets/images/directory-demo.svg",
      services: ["Inspections", "Repairs", "Replacement"],
      latitude: 30.822,
      longitude: -97.597,
    },
    {
      id: 10,
      name: "Demo Jarrell Salon",
      slug: "demo-jarrell-salon",
      category: "Beauty and Personal Care",
      description: "Example beauty listing for hair, nails, and personal care services.",
      phone: "(512) 555-0119",
      email: "book@demojarrellsalon.example",
      address: "4 Market Square, Jarrell, TX",
      website: "https://example.com",
      hours: "Tue-Sat 9:00 AM - 6:00 PM",
      featured: false,
      verified: false,
      image: "/assets/images/directory-demo.svg",
      services: ["Hair", "Nails", "Makeup"],
      latitude: 30.8265,
      longitude: -97.6045,
    },
    {
      id: 11,
      name: "Demo Jarrell HVAC",
      slug: "demo-jarrell-hvac",
      category: "HVAC",
      description: "Sample heating and cooling profile with emergency service placeholders.",
      phone: "(512) 555-0120",
      email: "support@demojarrellhvac.example",
      address: "32 Cool Breeze Dr, Jarrell, TX",
      website: "https://example.com",
      hours: "24/7 Support",
      featured: true,
      verified: false,
      image: "/assets/images/directory-demo.svg",
      services: ["AC Repair", "Heating", "Maintenance"],
      latitude: 30.8205,
      longitude: -97.607,
    },
    {
      id: 12,
      name: "Demo Jarrell Legal",
      slug: "demo-jarrell-legal",
      category: "Professional Services",
      description: "Placeholder for professional service listings in the directory.",
      phone: "(512) 555-0121",
      email: "contact@demojarrelllegal.example",
      address: "89 Civic Loop, Jarrell, TX",
      website: "https://example.com",
      hours: "Mon-Fri 8:30 AM - 5:00 PM",
      featured: false,
      verified: false,
      image: "/assets/images/directory-demo.svg",
      services: ["Consulting", "Documentation", "Planning"],
      latitude: 30.8235,
      longitude: -97.5995,
    },
  ];

  const icons = {
    store: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'><path d='M4 10h16'/><path d='M5 10V6h14v4'/><path d='M7 10v8h10v-8'/><path d='M10 18v-4h4v4'/></svg>",
    home: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'><path d='M3 11.5 12 4l9 7.5'/><path d='M5 10.5V20h14v-9.5'/><path d='M10 20v-6h4v6'/></svg>",
    fan: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'><circle cx='12' cy='12' r='2'/><path d='M12 4c2 0 4 2 4 4-2 1-4 1-4 1'/><path d='M20 12c0 2-2 4-4 4-1-2-1-4-1-4'/><path d='M12 20c-2 0-4-2-4-4 2-1 4-1 4-1'/><path d='M4 12c0-2 2-4 4-4 1 2 1 4 1 4'/></svg>",
    pipe: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'><path d='M6 6v12'/><path d='M6 12h8a4 4 0 0 0 4-4V6'/><path d='M18 6v12'/></svg>",
    bolt: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'><path d='M13 2 5 14h6l-1 8 9-12h-6z'/></svg>",
    leaf: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'><path d='M19 5c-6 0-14 5-14 13 0 1 .4 1.8 1 2.4 1-2.2 3-4.2 6-5.7 2.8-1.4 5.9-1.8 7-1.9 0-3-.9-5.8-0.9-7.8Z'/></svg>",
    roof: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'><path d='M3 12 12 5l9 7'/><path d='M5 11v8h14v-8'/><path d='M9 19v-5h6v5'/></svg>",
    car: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'><path d='M3 14h18l-1-4H6L3 14Z'/><circle cx='7.5' cy='16.5' r='1.5'/><circle cx='16.5' cy='16.5' r='1.5'/></svg>",
    house: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'><path d='M4 11 12 4l8 7'/><path d='M6 10v10h12V10'/></svg>",
    heart: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'><path d='M12 21s-7-4.4-9.5-9A5.3 5.3 0 0 1 12 5.5 5.3 5.3 0 0 1 21.5 12c-2.5 4.6-9.5 9-9.5 9Z'/></svg>",
    sparkle: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'><path d='M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Z'/><path d='M19 14l.9 2.6L22.5 18l-2.6.9L19 21.5l-.9-2.6L15.5 18l2.6-.9L19 14Z'/></svg>",
    briefcase: "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'><path d='M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1'/><path d='M4 8h16v11H4z'/><path d='M4 12h16'/></svg>",
  };

  const categoryDescriptions = {
    Restaurants: "Browse places to eat, coffee stops, and local food spots.",
    "Home Services": "Find help for repairs, maintenance, and household projects.",
    HVAC: "Heating and cooling professionals serving Jarrell homes and shops.",
    Plumbing: "Emergency repair, drains, fixtures, and water system support.",
    Electrical: "Licensed-style listing space for lighting, panels, and wiring.",
    Landscaping: "Yard care, mowing, cleanup, and outdoor improvements.",
    Roofing: "Roof inspections, repairs, and replacement service listings.",
    Automotive: "Auto repair, tire shops, and routine maintenance providers.",
    "Real Estate": "Agents, brokers, and property support in the Jarrell area.",
    "Health and Wellness": "Fitness, clinics, wellness, and care-focused services.",
    "Beauty and Personal Care": "Salon, spa, barber, and beauty professionals.",
    "Professional Services": "Accounting, legal, consulting, and office support.",
  };

  function iconMarkup(name) {
    return icons[name] || icons.store;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function slugify(value) {
    return String(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function readFiltersFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return {
      q: params.get("q") || "",
      category: params.get("category") || "all",
      sort: params.get("sort") || "featured",
      openNow: params.get("open") === "1",
      hasWebsite: params.get("website") === "1",
      featured: params.get("featured") === "1",
    };
  }

  function saveFilters(filters) {
    try {
      localStorage.setItem(config.filterStorageKey, JSON.stringify(filters));
    } catch {
      // Ignore storage errors.
    }
  }

  function loadSavedFilters() {
    try {
      const value = localStorage.getItem(config.filterStorageKey);
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  }

  function renderCategories(target) {
    if (!target) return;
    target.innerHTML = categories
      .map((category) => {
        const description = categoryDescriptions[category.name] || "Local businesses in this category.";
        return `
          <article class="card category-card">
            <div class="category-icon">${iconMarkup(category.icon)}</div>
            <div>
              <h3>${escapeHtml(category.name)}</h3>
              <p class="muted">${escapeHtml(description)}</p>
            </div>
            <a class="btn btn-link" href="businesses.html?category=${encodeURIComponent(category.slug)}">View businesses</a>
          </article>
        `;
      })
      .join("");
  }

  function businessCardMarkup(business, { demo = false } = {}) {
    const tags = [
      business.featured ? "<span class='badge featured'>Featured</span>" : "",
      demo ? "<span class='badge demo'>Demo listing</span>" : business.verified ? "<span class='badge verified'>Verified</span>" : "<span class='badge demo'>Unverified</span>",
    ]
      .filter(Boolean)
      .join("");

    const services = Array.isArray(business.services) ? business.services.slice(0, 3) : [];

    return `
      <article class="card business-card" data-business-category="${escapeHtml(business.category)}" data-featured="${business.featured ? "1" : "0"}" data-has-website="${business.website ? "1" : "0"}" data-open-now="${business.hours.toLowerCase().includes("24/7") ? "1" : "0"}">
        <div class="business-image">
          <img src="${escapeHtml(business.image)}" alt="${escapeHtml(business.name)} placeholder image" width="800" height="450" loading="lazy">
        </div>
        <div class="meta-row">${tags}</div>
        <div>
          <h3>${escapeHtml(business.name)}</h3>
          <p class="muted">${escapeHtml(business.category)}</p>
        </div>
        <p>${escapeHtml(business.description)}</p>
        <div class="stack">
          <span class="pill">${escapeHtml(business.phone || "Phone placeholder")}</span>
          <span class="pill">${escapeHtml(business.address || "Address placeholder")}</span>
          <span class="pill">${escapeHtml(business.hours || "Hours placeholder")}</span>
        </div>
        <div class="stack">
          <div class="meta-row">
            ${services.map((service) => `<span class="pill">${escapeHtml(service)}</span>`).join("")}
          </div>
          <div class="business-actions">
            <a class="btn btn-secondary" href="${business.website || "#"}" ${business.website ? 'target="_blank" rel="noopener noreferrer"' : ""}>Website</a>
            <a class="btn btn-secondary" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address || business.name)}" target="_blank" rel="noopener noreferrer">Directions</a>
            <a class="btn btn-secondary" href="contact.html">Claim this listing</a>
          </div>
          <p class="small-note">Demo content only. Verify details before relying on any listing information.</p>
        </div>
      </article>
    `;
  }

  function normalizeCategory(value) {
    const match = categories.find((category) => category.name.toLowerCase() === value.toLowerCase() || category.slug === value.toLowerCase());
    return match ? match.name : "all";
  }

  function applyDirectory(root) {
    if (!root) return;

    const search = root.querySelector(config.directorySearch);
    const category = root.querySelector(config.directoryCategory);
    const sort = root.querySelector(config.directorySort);
    const openNow = root.querySelector(config.directoryOpenNow);
    const hasWebsite = root.querySelector(config.directoryHasWebsite);
    const featured = root.querySelector(config.directoryFeatured);
    const featuredList = root.querySelector(config.directoryFeaturedList);
    const results = root.querySelector(config.directoryResults);
    const loadMore = root.querySelector(config.directoryLoadMore);
    const count = root.querySelector("[data-results-count]");

    const initialFilters = {
      ...{
        q: "",
        category: "all",
        sort: "featured",
        openNow: false,
        hasWebsite: false,
        featured: false,
      },
      ...(loadSavedFilters() || {}),
      ...readFiltersFromUrl(),
    };

    let filters = { ...initialFilters };
    let visibleCount = 6;

    function setFormState() {
      if (search) search.value = filters.q;
      if (category) category.value = filters.category;
      if (sort) sort.value = filters.sort;
      if (openNow) openNow.checked = filters.openNow;
      if (hasWebsite) hasWebsite.checked = filters.hasWebsite;
      if (featured) featured.checked = filters.featured;
    }

    function filteredBusinesses() {
      let list = businesses.slice();

      const q = filters.q.trim().toLowerCase();
      if (q) {
        list = list.filter((item) => {
          const haystack = [
            item.name,
            item.category,
            item.description,
            ...(item.services || []),
            item.address,
            item.hours,
          ]
            .join(" ")
            .toLowerCase();
          return haystack.includes(q);
        });
      }

      if (filters.category && filters.category !== "all") {
        list = list.filter((item) => item.category.toLowerCase() === filters.category.toLowerCase());
      }

      if (filters.openNow) {
        list = list.filter((item) => item.hours && /24\/7|open|today/i.test(item.hours));
      }

      if (filters.hasWebsite) {
        list = list.filter((item) => Boolean(item.website));
      }

      if (filters.featured) {
        list = list.filter((item) => item.featured);
      }

      if (filters.sort === "name") {
        list.sort((a, b) => a.name.localeCompare(b.name));
      } else if (filters.sort === "category") {
        list.sort((a, b) => a.category.localeCompare(b.category));
      } else if (filters.sort === "recent") {
        list.sort((a, b) => b.id - a.id);
      } else {
        list.sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name));
      }

      return list;
    }

    function render() {
      const list = filteredBusinesses();
      const featuredBusinesses = list.filter((item) => item.featured);
      const visibleBusinesses = list.slice(0, visibleCount);

      if (featuredList) {
        featuredList.innerHTML = featuredBusinesses.length
          ? featuredBusinesses.slice(0, 3).map((business) => businessCardMarkup(business, { demo: true })).join("")
          : `<div class="empty-state">No featured demo listings match the current filters.</div>`;
      }

      if (results) {
        results.innerHTML = visibleBusinesses.length
          ? visibleBusinesses.map((business) => businessCardMarkup(business, { demo: true })).join("")
          : `<div class="empty-state"><h3>No businesses found</h3><p>Try a different search term or clear the filters. Demo listings are sample content only.</p></div>`;
      }

      if (count) {
        count.textContent = `${list.length} result${list.length === 1 ? "" : "s"}`;
      }

      if (loadMore) {
        loadMore.hidden = visibleCount >= list.length;
      }
    }

    function updateUrl() {
      const params = new URLSearchParams();
      if (filters.q) params.set("q", filters.q);
      if (filters.category && filters.category !== "all") params.set("category", filters.category);
      if (filters.sort && filters.sort !== "featured") params.set("sort", filters.sort);
      if (filters.openNow) params.set("open", "1");
      if (filters.hasWebsite) params.set("website", "1");
      if (filters.featured) params.set("featured", "1");
      const next = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
      window.history.replaceState({}, "", next);
      saveFilters(filters);
    }

    function setFilter(key, value) {
      filters = { ...filters, [key]: value };
      visibleCount = 6;
      updateUrl();
      render();
    }

    search?.addEventListener("input", (event) => setFilter("q", event.target.value));
    category?.addEventListener("change", (event) => setFilter("category", normalizeCategory(event.target.value)));
    sort?.addEventListener("change", (event) => setFilter("sort", event.target.value));
    openNow?.addEventListener("change", (event) => setFilter("openNow", event.target.checked));
    hasWebsite?.addEventListener("change", (event) => setFilter("hasWebsite", event.target.checked));
    featured?.addEventListener("change", (event) => setFilter("featured", event.target.checked));
    loadMore?.addEventListener("click", () => {
      visibleCount += 6;
      render();
    });

    setFormState();
    render();
  }

  function bindForms() {
    document.querySelectorAll("form[data-validate='true']").forEach((form) => {
      const status = form.querySelector("[data-form-status]");
      const endpointKey = form.dataset.endpoint;
      const endpoint = endpointKey ? config.forms[endpointKey] : "";

      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          if (status) {
            status.className = "form-status error";
            status.textContent = "Please complete the required fields.";
          }
          return;
        }

        const honeypot = form.querySelector("[name='website_company']");
        if (honeypot && honeypot.value) {
          if (status) {
            status.className = "form-status error";
            status.textContent = "Submission blocked.";
          }
          return;
        }

        if (!endpoint) {
          if (status) {
            status.className = "form-status error";
            status.textContent = "This form is not connected yet. Add a Formspree, Netlify Forms, EmailJS, or custom API endpoint in script.js.";
          }
          return;
        }

        const data = new FormData(form);
        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: { Accept: "application/json" },
            body: data,
          });

          if (!response.ok) throw new Error("Submission failed");

          form.reset();
          if (status) {
            status.className = "form-status success";
            status.textContent = "Thanks. Your request was sent successfully.";
          }
        } catch {
          if (status) {
            status.className = "form-status error";
            status.textContent = "We could not send the form. Check your endpoint setup or try the email link below.";
          }
        }
      });
    });
  }

  function bindFaq() {
    document.querySelectorAll("[data-accordion]").forEach((container) => {
      const items = Array.from(container.querySelectorAll("[data-accordion-item]"));
      items.forEach((item) => {
        const button = item.querySelector("[data-accordion-button]");
        const panel = item.querySelector("[data-accordion-panel]");
        if (!button || !panel) return;
        button.addEventListener("click", () => {
          const expanded = button.getAttribute("aria-expanded") === "true";
          button.setAttribute("aria-expanded", String(!expanded));
          panel.hidden = expanded;
        });
      });
    });
  }

  function bindNavigation() {
    const header = document.querySelector(config.header);
    const toggle = document.querySelector(config.mobileNavToggle);
    const nav = document.querySelector(config.mobileNav);

    toggle?.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    nav?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle?.setAttribute("aria-expanded", "false");
      });
    });

    const onScroll = () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 8);
      document.querySelector(config.backToTop)?.classList.toggle("is-visible", window.scrollY > 400);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function bindBackToTop() {
    const button = document.querySelector(config.backToTop);
    button?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function injectYear() {
    document.querySelectorAll(config.yearTarget).forEach((node) => {
      node.textContent = new Date().getFullYear();
    });
  }

  function setSiteMeta() {
    const root = document.querySelector(config.directoryRoot);
    if (root) applyDirectory(root);

    const categoriesTarget = document.querySelector("[data-categories]");
    renderCategories(categoriesTarget);

    const previewTarget = document.querySelector("[data-demo-preview]");
    if (previewTarget) {
      previewTarget.innerHTML = businesses.slice(0, 3).map((business) => businessCardMarkup(business, { demo: true })).join("");
    }
  }

  function init() {
    bindNavigation();
    bindBackToTop();
    bindForms();
    bindFaq();
    injectYear();
    setSiteMeta();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
