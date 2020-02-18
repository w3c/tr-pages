{
  'use strict';

  const EFFECT_DELAY = 1000,
    FILTER_TICKS = 200;

  const FILTER = (previousState) => {
    const SELECTOR_PREFIX = '#container > *';
    let selectors = [],
      qsOn,
      qsOff,
      on,
      off;
    if (previousState) {
      const ALL = {title: true, tag: true, status: true, version: true};
      for (let i of previousState) {
        if ('title' === i.key)
          selectors.push('[data-title*="' + i.value + '"]');
        else
          selectors.push('[data-' + i.key + '~="' + i.value + '"]');
        if (filters.hasOwnProperty(i.key))
          filters[i.key].value = i.value;
        delete ALL[i.key];
      }
      for (let i in ALL)
        if (filters.hasOwnProperty(i))
          filters[i].value = '';
    } else {
      if (filters.title.value)
        selectors.push('[data-title*="' + filters.title.value.toLowerCase() + '"]');
      if (filters.tag.value)
        selectors.push('[data-tag~="' + filters.tag.value + '"]');
      if (filters.status.value)
        selectors.push('[data-status~="' + filters.status.value + '"]');
      if (filters.version.value)
        selectors.push('[data-version~="' + filters.version.value + '"]');
    }
    qsOn = SELECTOR_PREFIX + selectors.join('');
    if (0 === selectors.length) {
      qsOff = SELECTOR_PREFIX + '[data-status="ret"]';
    } else {
      qsOff = selectors.map((i) => SELECTOR_PREFIX + ':not(' + i + ')').join(', ');
      if ('ret' !== filters.status.value)
        qsOff += ', ' + SELECTOR_PREFIX + '[data-status="ret"]';
    }
    off = document.querySelectorAll(qsOff);
    off.forEach((i) => {
      i.style.opacity = 0;
      i.setAttribute('aria-hidden', 'true');
    });
    setTimeout(() => {
      off.forEach((i) => {
        i.style.display = 'none';
      });
      const total = document.querySelectorAll(SELECTOR_PREFIX);
      const specs = document.querySelectorAll(SELECTOR_PREFIX + '[style*="display: inline-block"]');
      if (selectors.length > 0)
        summary.innerHTML = specs.length + ' spec' + (1 === specs.length ? '' : 's') + ' (of ' + (total.length) + ')';
      else
        summary.innerHTML = total.length + ' specs (no filters)';
      summary.classList.remove('busy');
      TOGGLE_STICKY();
    }, EFFECT_DELAY);
    on = document.querySelectorAll(qsOn);
    on.forEach((i) => {
      i.removeAttribute('aria-hidden');
      i.style.display = 'inline-block';
      i.style.opacity = 1;
    });
    if (!previousState)
      PUSH_STATE();
  };

  let filters, summary, ticker, list, filtersOffset;

  const RESET = () => {
    setTimeout(APPLY, 50);
  };

  const APPLY = (e) => {
    summary.innerHTML = 'Filtering&hellip;';
    summary.classList.add('busy');
    FILTER((e && 'popstate' === e.type) ? (e.state ? e.state : []) : null);
  };

  const IGNORE_EVENT = (e) => {
    if (e && e.cancelable)
      e.preventDefault();
  };

  const PUSH_STATE = () => {
    if (window.history && window.history.pushState) {
      let newUrl = window.location.origin + window.location.pathname,
        params = [];
      if (filters.title.value)
        params.push({key: 'title', value: filters.title.value.toLowerCase()});
      if (filters.tag.value)
        params.push({key: 'tag', value: filters.tag.value});
      if (filters.status.value)
        params.push({key: 'status', value: filters.status.value});
      if (filters.version.value)
        params.push({key: 'version', value: filters.version.value});
      if (params.length > 0)
        newUrl += '?' + params.map((i) => i.key + '=' + encodeURIComponent(i.value)).join('&');
      window.history.pushState(params, null, newUrl);
    }
  };

  const PROCESS_PARAMS = (skipHistory = false) => {
    const URL = window.location.href,
      PAIRS = URL.split(/[&?]/g);
    for (let i = 1; i < PAIRS.length; i++) {
      const M = PAIRS[i].match(/^([^=]+)(?:=([\s\S]*))?/);
      if (M) {
        const KEY = decodeURIComponent(M[1]),
          VALUE = decodeURIComponent(M[2]).replace(/\+/g, ' ').toLowerCase();
        if (filters.hasOwnProperty(KEY))
          filters[KEY].value = VALUE;
      }
    }
    if (!skipHistory)
      FILTER();
  };

  const TOGGLE_STICKY= () => {
    if (window.scrollY > filtersOffset) {
      filters.classList.add('stuck');
      if (window.innerWidth >= 768)
        list.style.marginTop = (filters.clientHeight + 16) + 'px';
      else
        list.style.marginTop = 0;
    } else {
      filters.classList.remove('stuck');
      list.style.marginTop = 0;
    }
  };

  const INIT = () => {
    window.removeEventListener('load', INIT);
    const HTML_CLASSES = document.firstElementChild.classList;
    filters = document.forms.filters;
    summary = document.getElementById('summary');
    list = document.getElementById('container');
    filtersOffset = filters.offsetTop;
    HTML_CLASSES.remove('no-js');
    HTML_CLASSES.add('js');
    PROCESS_PARAMS(true);
    filters.title.addEventListener('input', APPLY);
    filters.tag.addEventListener('change', APPLY);
    filters.status.addEventListener('change', APPLY);
    filters.version.addEventListener('change', APPLY);
    filters.addEventListener('reset', RESET);
    filters.addEventListener('submit', IGNORE_EVENT);
    window.addEventListener('popstate', APPLY);
    window.addEventListener('resize', TOGGLE_STICKY);
    window.addEventListener('scroll', TOGGLE_STICKY);
  };

  window.addEventListener('load', INIT);
}
