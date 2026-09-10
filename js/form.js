/* form.js — inline validation and submit states for the contact form.
   Native HTML5 constraints stay the source of truth; this layer replaces the browser
   bubbles with inline messages and wires up aria-invalid / aria-describedby.
   With JS off the form still submits and the browser still validates. */

(function () {
  'use strict';

  var form = document.getElementById('contact-form');
  if (!form) return;

  var wrap = document.getElementById('form-success');
  var formError = document.getElementById('form-error');
  var submitBtn = document.getElementById('submit-btn');
  var successTitle = document.getElementById('form-success-title');

  var MIN_SECONDS = 3;               // time-to-submit floor, instead of a CAPTCHA
  var loadedAt = Date.now();

  var fields = Array.prototype.slice.call(
    form.querySelectorAll('input:not([type="hidden"]):not([tabindex="-1"]), select, textarea')
  );

  function errorEl(field) {
    return document.getElementById(field.id + '-error');
  }

  function showError(field) {
    var el = errorEl(field);
    if (!el) return;
    el.textContent = el.dataset.error;
    el.classList.add('is-visible');
    field.setAttribute('aria-invalid', 'true');
  }

  function clearError(field) {
    var el = errorEl(field);
    if (!el) return;
    el.textContent = '';
    el.classList.remove('is-visible');
    field.removeAttribute('aria-invalid');
  }

  function validate(field) {
    if (field.checkValidity()) {
      clearError(field);
      return true;
    }
    showError(field);
    return false;
  }

  // Validate on blur, but only after the field has been touched — never per keystroke.
  fields.forEach(function (field) {
    field.addEventListener('blur', function () {
      if (field.dataset.touched === 'yes') validate(field);
    });

    var settle = field.type === 'checkbox' || field.tagName === 'SELECT' ? 'change' : 'input';
    field.addEventListener(settle, function () {
      field.dataset.touched = 'yes';
      if (field.getAttribute('aria-invalid') === 'true') validate(field);
    });
  });

  function firstInvalid() {
    for (var i = 0; i < fields.length; i++) {
      if (!fields[i].checkValidity()) return fields[i];
    }
    return null;
  }

  function showFormError(message) {
    formError.textContent = message;
    formError.hidden = false;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    formError.hidden = true;

    fields.forEach(function (field) {
      field.dataset.touched = 'yes';
      validate(field);
    });

    var invalid = firstInvalid();
    if (invalid) {
      invalid.focus();
      return;
    }

    if ((Date.now() - loadedAt) / 1000 < MIN_SECONDS) {
      showFormError('Een moment nog — probeer het over een paar seconden opnieuw.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Versturen…';

    var body = new URLSearchParams(new FormData(form)).toString();

    fetch(form.getAttribute('action') || '/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body
    })
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        form.hidden = true;
        wrap.hidden = false;
        // Tell screen-reader users the submission landed.
        successTitle.focus();
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Verstuur aanvraag';
        // Entered values are untouched, and there is a route that does not need this form.
        showFormError(
          'Het versturen is niet gelukt. Probeer het nog een keer, of mail ons direct op ' +
          'info@grondwerkbloembollen.nl.'
        );
      });
  });
}());
