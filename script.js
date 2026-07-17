(() => {
  /*
   * OWNER CONTACT CONFIGURATION
   * Keep these values aligned with the visible HTML for SEO and accessibility.
   * Leave an unconfigured social URL as an empty string; matching links stay hidden.
   */
  const siteContact = {
    phoneDisplay: '(512) 363-3797',
    phoneHref: '+15123633797',
    email: 'hello@jarrelltx.co',
    facebook: '',
    instagram: '',
    linkedin: 'https://www.linkedin.com/in/ahmedaldulaimi',
    maps: 'https://www.google.com/maps/search/?api=1&query=Jarrell%2C%20Texas',
    formEndpoint: '' // Add a production HTTPS form endpoint here when available.
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const header = $('[data-site-header]');
  const nav = $('[data-site-nav]');
  const toggle = $('[data-menu-toggle]');
  const closeMenu = () => {
    nav?.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('menu-open');
  };
  toggle?.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', open);
  });
  $$('a', nav).forEach(link => link.addEventListener('click', closeMenu));
  addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  const updateHeader = () => header?.classList.toggle('is-scrolled', scrollY > 16);
  updateHeader();
  addEventListener('scroll', updateHeader, { passive: true });
  $$('[data-year]').forEach(node => node.textContent = new Date().getFullYear());

  $$('[data-social]').forEach(link => {
    const url = siteContact[link.dataset.social];
    if (!url) link.hidden = true;
    else link.href = url;
  });

  const directory = $('[data-directory]');
  if (directory) {
    const grid = $('[data-business-grid]');
    const empty = $('[data-empty-state]');
    const count = $('[data-result-count]');
    const search = $('[data-directory-search]');
    const chips = $$('[data-filter]');
    const params = new URLSearchParams(location.search);
    let businesses = [];
    let category = (params.get('category') || 'all').toLowerCase();
    search.value = params.get('q') || '';

    const safeLink = (url, label, external = false) => url ? `<a class="button small light" href="${url}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>` : '';
    const renderCard = business => `<article class="business-card${business.featured ? ' featured' : ''}">
      ${business.image ? `<img src="${business.image}" alt="${business.name}" width="800" height="500" loading="lazy">` : ''}
      <div class="business-card-body"><span class="category">${business.category}</span><h2>${business.name}</h2><p>${business.description}</p>
      ${business.address ? `<p><strong>Location:</strong> ${business.address}</p>` : ''}
      <div class="business-actions">${safeLink(business.website, 'Visit website', true)}${safeLink(business.maps, 'Open map', true)}${business.phone ? safeLink(`tel:${business.phone.replace(/[^+\d]/g, '')}`, 'Call') : ''}${business.email ? safeLink(`mailto:${business.email}`, 'Email') : ''}${safeLink(business.facebook, 'Facebook', true)}${safeLink(business.instagram, 'Instagram', true)}</div></div></article>`;

    const applyFilters = () => {
      const query = search.value.trim().toLowerCase();
      const filtered = businesses.filter(item => (category === 'all' || item.category.toLowerCase() === category) && (!query || `${item.name} ${item.category} ${item.description}`.toLowerCase().includes(query)));
      grid.innerHTML = filtered.map(renderCard).join('');
      const noListings = filtered.length === 0;
      empty.hidden = !noListings;
      count.textContent = businesses.length ? `${filtered.length} business${filtered.length === 1 ? '' : 'es'}` : 'Directory accepting submissions';
      const next = new URL(location.href);
      query ? next.searchParams.set('q', query) : next.searchParams.delete('q');
      category !== 'all' ? next.searchParams.set('category', category) : next.searchParams.delete('category');
      history.replaceState({}, '', next);
    };

    chips.forEach(chip => {
      chip.setAttribute('aria-pressed', String(chip.dataset.filter === category));
      chip.addEventListener('click', () => {
        category = chip.dataset.filter;
        chips.forEach(item => item.setAttribute('aria-pressed', String(item === chip)));
        applyFilters();
      });
    });
    search.addEventListener('input', applyFilters);
    fetch('data/businesses.json')
      .then(response => { if (!response.ok) throw new Error('Directory data could not be loaded.'); return response.json(); })
      .then(data => { businesses = Array.isArray(data) ? data : []; applyFilters(); })
      .catch(() => { businesses = []; applyFilters(); });
  }

  $$('form[data-static-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const status = $('[data-form-status]', form);
      if (siteContact.formEndpoint) {
        status.hidden = false;
        status.textContent = 'Sending your request…';
        fetch(siteContact.formEndpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
          .then(response => {
            if (!response.ok) throw new Error();
            status.textContent = 'Your request was sent. We will reply as soon as practical.';
            form.reset();
          })
          .catch(() => { status.innerHTML = `We could not send the form. Please email <a href="mailto:${siteContact.email}">${siteContact.email}</a>.`; });
        return;
      }
      const data = new FormData(form);
      const subject = encodeURIComponent(form.dataset.subject || 'JarrellTX.co website request');
      const body = encodeURIComponent([...data.entries()].filter(([name]) => !name.startsWith('_')).map(([name, value]) => `${name.replaceAll('_', ' ')}: ${value}`).join('\n'));
      status.hidden = false;
      status.innerHTML = `Your email application is opening. If it does not open, email <a href="mailto:${siteContact.email}">${siteContact.email}</a>.`;
      location.href = `mailto:${siteContact.email}?subject=${subject}&body=${body}`;
    });
  });
})();
