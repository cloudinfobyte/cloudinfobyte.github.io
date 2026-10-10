(function () {
  "use strict";
  var cfg = window.CIB_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };

  document.documentElement.classList.remove("no-js");

  // year
  var y = $("#year");
  if (y) y.textContent = new Date().getFullYear();

  // mobile nav
  var toggle = $(".nav-toggle"), nav = $("#nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // scroll reveal (content stays visible if IntersectionObserver is missing)
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // contact email, if configured
  if (cfg.contactEmail) {
    var row = $("#contact-email-row"), a = $("#contact-email");
    if (row && a) {
      a.textContent = cfg.contactEmail;
      a.href = "mailto:" + cfg.contactEmail;
      row.hidden = false;
    }
  }

  // contact form
  var form = $("#contact-form"), status = $("#form-status"), btn = $("#submit-btn");
  if (!form) return;

  function say(msg, kind) {
    status.textContent = msg;
    status.className = "status" + (kind ? " " + kind : "");
  }

  function validate() {
    var ok = true;
    ["name", "email", "message"].forEach(function (id) {
      var el = $("#" + id), field = el.closest(".field");
      var bad = !el.value.trim() || !el.checkValidity();
      field.classList.toggle("invalid", bad);
      if (bad) ok = false;
    });
    return ok;
  }

  function data() {
    return {
      name: $("#name").value.trim(),
      email: $("#email").value.trim(),
      company: $("#company").value.trim(),
      topic: $("#topic").value,
      message: $("#message").value.trim()
    };
  }

  function viaMailto(d) {
    var to = cfg.contactEmail;
    if (!to) {
      say("The contact form is not connected to an inbox yet. The site owner needs to set a form key or email in assets/js/config.js.", "err");
      return;
    }
    var body = "Name: " + d.name + "\nEmail: " + d.email + "\nCompany: " + d.company + "\nTopic: " + d.topic + "\n\n" + d.message;
    window.location.href = "mailto:" + encodeURIComponent(to).replace("%40", "@") +
      "?subject=" + encodeURIComponent((cfg.subjectPrefix || "Enquiry") + ": " + d.topic) +
      "&body=" + encodeURIComponent(body);
    say("Your mail app should open with the message ready to send.", "ok");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if ($("#botcheck").checked) return;          // honeypot tripped: silently drop
    if (!validate()) { say("Please fill in your name, a valid email and a message.", "err"); return; }

    var d = data();
    var subject = (cfg.subjectPrefix || "Enquiry") + ": " + d.topic;
    var endpoint, payload;

    if (cfg.web3formsKey) {
      endpoint = "https://api.web3forms.com/submit";
      payload = { access_key: cfg.web3formsKey, subject: subject, from_name: "CloudInfoByte website",
                  name: d.name, email: d.email, company: d.company, topic: d.topic, message: d.message };
    } else if (cfg.formspreeEndpoint) {
      endpoint = cfg.formspreeEndpoint;
      payload = { _subject: subject, name: d.name, email: d.email, company: d.company, topic: d.topic, message: d.message };
    } else {
      viaMailto(d);
      return;
    }

    btn.disabled = true;
    say("Sending...", "");
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok && j.success !== false, j: j }; });
    }).then(function (res) {
      if (res.ok) {
        form.reset();
        say("Thanks! Your message was sent. We will reply by email.", "ok");
      } else {
        say("Could not send the message. Please try again" + (cfg.contactEmail ? " or email " + cfg.contactEmail : "") + ".", "err");
      }
    }).catch(function () {
      say("Network error. Please try again" + (cfg.contactEmail ? " or email " + cfg.contactEmail : "") + ".", "err");
    }).then(function () { btn.disabled = false; });
  });
})();
