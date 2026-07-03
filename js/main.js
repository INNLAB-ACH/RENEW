(function () {
  "use strict";

  var CART = [
    { id: 1, name: "Tenis urbanos Andina Run", qty: 1, price: 219900, icon: "👟" },
    { id: 2, name: "Mochila antirrobo 18L", qty: 1, price: 149900, icon: "🎒" },
    { id: 3, name: "Audífonos inalámbricos Beat X", qty: 2, price: 89900, icon: "🎧" },
  ];
  var SHIPPING = 12000;

  function formatCOP(value) {
    return "$" + value.toLocaleString("es-CO");
  }

  function showScreen(id) {
    document.querySelectorAll(".screen").forEach(function (el) {
      el.classList.remove("screen--active");
    });
    document.getElementById(id).classList.add("screen--active");
  }

  // ---------- Checkout ----------
  function renderCart() {
    var list = document.getElementById("cart-list");
    var subtotal = 0;
    var totalQty = 0;

    list.innerHTML = "";
    CART.forEach(function (item) {
      subtotal += item.qty * item.price;
      totalQty += item.qty;

      var li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML =
        '<span class="cart-item__thumb">' + item.icon + "</span>" +
        '<span class="cart-item__body">' +
          '<span class="cart-item__name">' + item.name + "</span><br/>" +
          '<span class="cart-item__qty">Cantidad: ' + item.qty + "</span>" +
        "</span>" +
        '<span class="cart-item__price">' + formatCOP(item.qty * item.price) + "</span>";
      list.appendChild(li);
    });

    var total = subtotal + SHIPPING;

    document.getElementById("cart-count").textContent = totalQty + " productos";
    document.getElementById("summary-subtotal").textContent = formatCOP(subtotal);
    document.getElementById("summary-shipping").textContent = formatCOP(SHIPPING);
    document.getElementById("summary-total").textContent = formatCOP(total);
  }

  function initPaymentSelection() {
    var radios = document.querySelectorAll('input[name="payment-method"]');
    var goPayBtn = document.getElementById("btn-go-pay");

    radios.forEach(function (radio) {
      radio.addEventListener("change", function () {
        goPayBtn.disabled = !document.getElementById("payment-pse").checked;
      });
    });

    goPayBtn.addEventListener("click", function () {
      if (goPayBtn.disabled) return;
      showScreen("screen-loading");
      window.setTimeout(function () {
        showScreen("screen-auth");
      }, 3000);
    });
  }

  // ---------- Navegación ----------
  function initBackButton() {
    document.getElementById("btn-auth-back").addEventListener("click", function () {
      showScreen("screen-checkout");
    });
  }

  // ---------- Auth tabs ----------
  function initTabs() {
    var tabBtns = document.querySelectorAll(".auth-tab");
    tabBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.getAttribute("data-tab");

        document.querySelectorAll(".auth-tab").forEach(function (b) {
          b.classList.remove("auth-tab--active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("auth-tab--active");
        btn.setAttribute("aria-selected", "true");

        document.querySelectorAll(".auth-panel").forEach(function (panel) {
          panel.classList.remove("auth-panel--active");
        });
        document.getElementById("tab-panel-" + target).classList.add("auth-panel--active");
      });
    });
  }

  // ---------- Registro ----------
  function initRegistro() {
    var form = document.getElementById("form-registro");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.hidden = true;
      document.getElementById("registro-success").hidden = false;
    });
  }

  // ---------- Login ----------
  function initLogin() {
    var methodBanco = document.getElementById("login-method-banco");
    var methodPortal = document.getElementById("login-method-portal");
    var methodTarjeta = document.getElementById("login-method-tarjeta");
    var methodCreditoPSE = document.getElementById("login-method-credito-pse");
    var fieldsBanco = document.getElementById("fields-banco");
    var fieldsPortal = document.getElementById("fields-portal");
    var submitBtn = document.getElementById("btn-login-submit");
    var favoriteBanks = document.querySelectorAll(".favorite-bank");

    var bancoSelect = document.getElementById("login-banco");
    var bancoEmail = document.getElementById("login-banco-email");
    var usuario = document.getElementById("login-usuario");
    var password = document.getElementById("login-password");

    function syncFavoriteBankSelection(selectedBank) {
      favoriteBanks.forEach(function (button) {
        var isActive = button.getAttribute("data-bank") === selectedBank;
        button.classList.toggle("favorite-bank--active", isActive);
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
    }

    function updateVisibility() {
      var isBanco = methodBanco.checked;
      var isPortal = methodPortal.checked;

      fieldsBanco.hidden = !isBanco;
      fieldsPortal.hidden = !isPortal;

      bancoSelect.required = isBanco;
      bancoEmail.required = isBanco;
      usuario.required = isPortal;
      password.required = isPortal;

      if (!isBanco) {
        syncFavoriteBankSelection("");
      }

      validateSubmit();
    }

    function validateSubmit() {
      var valid = false;
      if (methodBanco.checked) {
        valid = bancoSelect.value.trim() !== "" && bancoEmail.value.trim() !== "";
      } else if (methodPortal.checked) {
        valid = usuario.value.trim() !== "" && password.value.trim() !== "";
      } else if (methodTarjeta.checked || methodCreditoPSE.checked) {
        valid = true;
      }
      submitBtn.disabled = !valid;
    }

    favoriteBanks.forEach(function (button) {
      button.addEventListener("click", function () {
        if (!methodBanco.checked) {
          methodBanco.checked = true;
          updateVisibility();
        }

        bancoSelect.value = button.getAttribute("data-bank");
        syncFavoriteBankSelection(bancoSelect.value);
        validateSubmit();
      });
    });

    bancoSelect.addEventListener("change", function () {
      syncFavoriteBankSelection(bancoSelect.value);
      validateSubmit();
    });

    [methodBanco, methodPortal, methodTarjeta, methodCreditoPSE].forEach(function (radio) {
      radio.addEventListener("change", updateVisibility);
    });

    [bancoSelect, bancoEmail, usuario, password].forEach(function (field) {
      field.addEventListener("input", validateSubmit);
      field.addEventListener("change", validateSubmit);
    });

    var form = document.getElementById("form-login");
    var loginSuccess = document.getElementById("login-success");
    var loginSuccessTitle = loginSuccess.querySelector("h2");
    var loginSuccessText = loginSuccess.querySelector("p");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (submitBtn.disabled) return;

      if (methodTarjeta.checked || methodCreditoPSE.checked) {
        loginSuccessTitle.textContent = "🔄 Redirigiendo...";
        loginSuccessText.textContent = "Serás llevado a la plataforma de pago de terceros para completar tu transacción.";
      } else {
        loginSuccessTitle.textContent = "¡Formulario enviado!";
        loginSuccessText.textContent = "Hemos recibido tu solicitud de ingreso correctamente.";
      }

      form.hidden = true;
      document.querySelector(".login-methods").hidden = true;
      document.querySelector(".form-helper").hidden = true;
      loginSuccess.hidden = false;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderCart();
    initPaymentSelection();
    initBackButton();
    initTabs();
    initRegistro();
    initLogin();
  });
})();
