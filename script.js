(() => {
  /*
   * OWNER CONTACT CONFIGURATION
   * Keep these values aligned with the visible HTML for SEO and accessibility.
   * Leave an unconfigured social URL as an empty string; matching links stay hidden.
   */
  const siteContact = {
    phoneDisplay: '(512) 363-3797',
    phoneHref: '+15123633797',
    email: 'info@jarrelltx.co',
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/jarrelltxco/',
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

  const successMessage = $('[data-contact-success]');
  if (successMessage && new URLSearchParams(location.search).get('submitted') === 'true') {
    successMessage.hidden = false;
    successMessage.focus();
  }

  $$('[data-social]').forEach(link => {
    const url = siteContact[link.dataset.social];
    if (!url) link.hidden = true;
    else link.href = url;
  });

  const socialIcons = {
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 7.3A2.2 2.2 0 1 0 5.2 3a2.2 2.2 0 0 0 0 4.3ZM3.3 21h3.8V9H3.3v12Zm6 0h3.8v-6.7c0-3.7 4.8-4 4.8 0V21h3.8v-8c0-6.2-7-6-8.6-2.9V9H9.3v12Z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v2H6v4h3v7h4v-7h3.3l.7-4h-4V9c0-.7.3-1 1-1Z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6ZM17.5 5.7a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z"/></svg>'
  };
  $$('.footer-brand').forEach(footerBrand => {
    let socialRow = $('.footer-social', footerBrand);
    if (!socialRow) {
      socialRow = document.createElement('div');
      socialRow.className = 'footer-social';
      footerBrand.append(socialRow);
    }
    socialRow.innerHTML = ['linkedin', 'facebook'].map(network => `<a href="${siteContact[network]}" target="_blank" rel="noopener noreferrer" aria-label="JarrellTX.co on ${network[0].toUpperCase() + network.slice(1)}">${socialIcons[network]}</a>`).join('') + `<a class="instagram-follow" href="${siteContact.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Follow JarrellTX.co on Instagram">${socialIcons.instagram}<span>Follow us on Instagram</span></a>`;
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
