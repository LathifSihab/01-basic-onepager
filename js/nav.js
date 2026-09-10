/* nav.js — mobile disclosure menu and scrollspy.
   Progressive enhancement: without JS the nav links still work as anchors. */

(function () {
  'use strict';

  var toggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('site-nav');
  var links = nav ? nav.querySelectorAll('.nav-list a') : [];

  /* ---------- Disclosure menu ---------- */

  function isOpen() {
    return toggle.getAttribute('aria-expanded') === 'true';
  }

  function open() {
    toggle.setAttribute('aria-expanded', 'true');
    nav.classList.add('is-open');
  }

  function close(returnFocus) {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    if (returnFocus) toggle.focus();
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      if (isOpen()) close(false); else open();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) close(true);
    });

    document.addEventListener('click', function (e) {
      if (!isOpen()) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      close(false);
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && isOpen()) close(false);
    });
  }

  /* ---------- Scrollspy ---------- */

  if (!('IntersectionObserver' in window) || !links.length) return;

  var sections = [];
  Array.prototype.forEach.call(links, function (link) {
    var id = link.getAttribute('href').slice(1);
    var section = document.getElementById(id);
    if (section) sections.push({ link: link, section: section });
  });

  function setActive(link) {
    Array.prototype.forEach.call(links, function (l) {
      if (l === link) l.setAttribute('aria-current', 'true');
      else l.removeAttribute('aria-current');
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var match = sections.filter(function (s) { return s.section === entry.target; })[0];
      if (match) setActive(match.link);
    });
  }, {
    // A band across the upper middle of the viewport: the section the reader is looking at.
    rootMargin: '-88px 0px -55% 0px',
    threshold: 0
  });

  sections.forEach(function (s) { observer.observe(s.section); });
}());
