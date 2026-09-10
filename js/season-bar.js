/* season-bar.js — positions and reveals the "nu" marker on the hero season bar.
   The bar itself is in the HTML; with JS off it reads fine without a marker. */

(function () {
  'use strict';

  var bar = document.getElementById('season-bar');
  var marker = document.getElementById('season-marker');
  var label = document.getElementById('season-marker-label');
  if (!bar || !marker || !label) return;

  var MONTHS = ['januari', 'februari', 'maart', 'april', 'mei', 'juni',
                'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

  var now = new Date();
  var month = now.getMonth();                       // 0–11
  var day = now.getDate();
  var daysInMonth = new Date(now.getFullYear(), month + 1, 0).getDate();

  // Position within the twelve segments, proportional to the day of the month.
  var fraction = (month + (day - 1) / daysInMonth) / 12;
  var target = (fraction * 100).toFixed(3) + '%';

  label.textContent = 'nu · ' + MONTHS[month];

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced) {
    marker.style.left = target;
    marker.hidden = false;
    return;
  }

  // Start at the left edge, reveal, then draw across to the current month.
  marker.style.left = '0%';
  marker.hidden = false;

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      marker.classList.add('is-animating');
      marker.style.left = target;
    });
  });
}());
