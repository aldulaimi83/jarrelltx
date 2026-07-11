(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const header = $('[data-site-header]');
  const menu = $('[data-site-nav]');
  const toggle = $('[data-menu-toggle]');
  const updateHeader = () => header?.classList.toggle('is-scrolled', scrollY > 24);
  updateHeader();
  addEventListener('scroll', updateHeader, { passive: true });

  const closeMenu = () => {
    menu?.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('menu-open');
  };
  toggle?.addEventListener('click', () => {
    const opening = !menu.classList.contains('is-open');
    menu.classList.toggle('is-open', opening);
    toggle.setAttribute('aria-expanded', String(opening));
    toggle.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', opening);
  });
  $$('a', menu).forEach(link => link.addEventListener('click', closeMenu));
  addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  $$('[data-year]').forEach(node => node.textContent = new Date().getFullYear());

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: .12 });
    $$('.reveal').forEach(node => observer.observe(node));
    const art = $('.hero-art img');
    addEventListener('scroll', () => {
      if (art && scrollY < innerHeight) art.style.transform = `scale(1.03) translateY(${scrollY * .025}px)`;
    }, { passive: true });
  } else {
    $$('.reveal').forEach(node => node.classList.add('is-visible'));
  }

  // Preview profiles deliberately avoid invented phones, ratings, reviews and street addresses.
  const businesses = [
    { name: 'Main Street Café', category: 'Eat and drink', description: 'A preview of how a neighborhood restaurant can introduce its menu and story.', location: 'Jarrell, Texas', image: 'cafe' },
    { name: 'Jarrell Home Co.', category: 'Home services', description: 'A preview profile for practical help around the home, from repairs to maintenance.', location: 'Serving Jarrell', image: 'home' },
    { name: '95 Auto Works', category: 'Automotive', description: 'A preview of a clear, useful local auto-service profile built for quick decisions.', location: 'Jarrell, Texas', image: 'auto' },
    { name: 'Prairie Wellness', category: 'Health and wellness', description: 'A preview profile for local care, movement and everyday wellbeing.', location: 'Jarrell, Texas', image: 'wellness' },
    { name: 'Market Mercantile', category: 'Shopping', description: 'A preview storefront for locally sold goods, gifts and useful finds.', location: 'Jarrell, Texas', image: 'shop' },
    { name: 'Northline Bookkeeping', category: 'Professional services', description: 'A preview profile for trusted, straightforward business support.', location: 'Serving Jarrell', image: 'professional' }
  ];

  const visual = type => {
    const palettes = {
      cafe:['#d65f3a','#f4d6a0'], home:['#163f31','#c9ef69'], auto:['#25352c','#e8a879'],
      wellness:['#d9c9ae','#d65f3a'], shop:['#f0bd4f','#163f31'], professional:['#b9c6b6','#172019']
    };
    const [a,b] = palettes[type] || palettes.home;
    return `<svg viewBox="0 0 600 420" role="img" aria-label="Editorial placeholder illustration"><rect width="600" height="420" fill="${a}"/><circle cx="455" cy="95" r="72" fill="${b}"/><path d="M0 305L180 180l90 70 88-112L600 320v100H0z" fill="${b}" opacity=".9"/><rect x="75" y="122" width="190" height="183" rx="12" fill="#fffdf8"/><rect x="104" y="160" width="132" height="60" rx="6" fill="${a}"/><rect x="132" y="238" width="76" height="67" fill="${b}"/></svg>`;
  };
  const card = business => `<article class="listing-card" data-category="${business.category.toLowerCase()}" data-search="${(business.name+' '+business.description).toLowerCase()}">
    <div class="listing-visual">${visual(business.image)}</div><div class="listing-content"><span class="listing-label">${business.category}</span><h3>${business.name}</h3><p>${business.description}</p><div class="listing-meta">${business.location}</div><a class="text-link" href="contact.html?interest=listing">View profile preview</a></div></article>`;
  $$('[data-listings]').forEach(root => {
    const limit = Number(root.dataset.limit || businesses.length);
    root.innerHTML = businesses.slice(0, limit).map(card).join('');
  });

  const directory = $('[data-directory]');
  if (directory) {
    const search = $('[data-directory-search]');
    const chips = $$('[data-filter]');
    const count = $('[data-result-count]');
    const grid = $('[data-listings]', directory);
    const params = new URLSearchParams(location.search);
    let category = (params.get('category') || 'all').toLowerCase();
    if (params.get('q')) search.value = params.get('q');
    const apply = () => {
      const query = search.value.trim().toLowerCase();
      let visible = 0;
      $$('.listing-card', grid).forEach(item => {
        const show = (category === 'all' || item.dataset.category === category) && (!query || item.dataset.search.includes(query));
        item.hidden = !show;
        if (show) visible++;
      });
      count.textContent = `${visible} preview profile${visible === 1 ? '' : 's'}`;
      $('[data-empty]').hidden = visible !== 0;
      const next = new URL(location.href);
      query ? next.searchParams.set('q', query) : next.searchParams.delete('q');
      category !== 'all' ? next.searchParams.set('category', category) : next.searchParams.delete('category');
      history.replaceState({}, '', next);
    };
    chips.forEach(chip => {
      const active = chip.dataset.filter === category;
      chip.setAttribute('aria-pressed', String(active));
      chip.addEventListener('click', () => {
        category = chip.dataset.filter;
        chips.forEach(c => c.setAttribute('aria-pressed', String(c === chip)));
        apply();
      });
    });
    search.addEventListener('input', apply);
    apply();
  }

  $$('form[data-email-fallback]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const status = $('[data-form-status]', form);
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      // No production submission endpoint is configured. Never claim a successful submission.
      status.hidden = false;
      status.innerHTML = 'This form is not sending yet. Email your request to <a href="mailto:hello@jarrelltx.co">hello@jarrelltx.co</a>.';
      status.focus();
    });
  });
})();
