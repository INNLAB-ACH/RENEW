(function () {
  "use strict";

  var CART = [
    { id: 1, name: "Tenis urbanos Andina Run", qty: 1, price: 219900, icon: "👟" },
    { id: 2, name: "Mochila antirrobo 18L", qty: 1, price: 149900, icon: "🎒" },
    { id: 3, name: "Audífonos inalámbricos Beat X", qty: 2, price: 89900, icon: "🎧" },
  ];
  var SHIPPING = 12000;

  var BANKS = {
    bancolombia: { name: "Bancolombia", logo: "assets/bancolombia.png" },
    davivienda: { name: "Davivienda", logo: "assets/davivienda.png" },
    bbva: { name: "BBVA Colombia", logo: "" },
    bogota: { name: "Banco de Bogotá", logo: "" },
    occidente: { name: "Banco de Occidente", logo: "" },
    nequi: { name: "Nequi", logo: "assets/nequi.png" },
    daviplata: { name: "Daviplata", logo: "" },
  };

  function formatCOP(value) {
    return "$" + value.toLocaleString("es-CO");
  }

  function showScreen(id) {
    document.querySelectorAll(".screen").forEach(function (el) {
      el.classList.remove("screen--active");
    });
    document.getElementById(id).classList.add("screen--active");
  }

  function resetAuthState() {
    var loginTabBtn = document.getElementById("tab-btn-login");
    var registroTabBtn = document.getElementById("tab-btn-registro");
    var loginPanel = document.getElementById("tab-panel-login");
    var registroPanel = document.getElementById("tab-panel-registro");

    if (loginTabBtn && registroTabBtn && loginPanel && registroPanel) {
      loginTabBtn.classList.add("auth-tab--active");
      loginTabBtn.setAttribute("aria-selected", "true");
      registroTabBtn.classList.remove("auth-tab--active");
      registroTabBtn.setAttribute("aria-selected", "false");
      loginPanel.classList.add("auth-panel--active");
      registroPanel.classList.remove("auth-panel--active");
    }

    var loginMethods = document.querySelector(".login-methods");
    var formHelper = document.querySelector(".form-helper");
    var formLogin = document.getElementById("form-login");
    var loginSuccess = document.getElementById("login-success");
    var bancoCard = document.getElementById("login-method-banco-card");
    var summaryCard = document.getElementById("summary-card");
    var fieldsBancoEdit = document.getElementById("fields-banco-edit");
    var fieldsPortal = document.getElementById("fields-portal");
    var loginSubmit = document.getElementById("btn-login-submit");
    var methodBanco = document.getElementById("login-method-banco");
    var favoriteBanks = document.querySelectorAll(".favorite-bank");
    var loginNombre = document.getElementById("login-nombre");
    var loginTipoDoc = document.getElementById("login-tipo-doc");
    var loginNumDoc = document.getElementById("login-num-doc");
    var loginBanco = document.getElementById("login-banco");
    var loginBancoEmail = document.getElementById("login-banco-email");

    if (formLogin) {
      formLogin.reset();
      formLogin.hidden = false;
    }
    if (loginSuccess) {
      loginSuccess.hidden = true;
    }
    if (bancoCard) {
      bancoCard.hidden = false;
    }
    if (methodBanco) {
      methodBanco.checked = true;
    }
    if (summaryCard) {
      summaryCard.hidden = false;
    }
    if (fieldsBancoEdit) {
      fieldsBancoEdit.hidden = true;
    }
    if (loginNombre) {
      loginNombre.value = "";
    }
    if (loginTipoDoc) {
      loginTipoDoc.value = "";
    }
    if (loginNumDoc) {
      loginNumDoc.value = "";
    }
    if (loginBanco) {
      loginBanco.value = "";
    }
    if (loginBancoEmail) {
      loginBancoEmail.value = "";
    }
    if (loginMethods) {
      loginMethods.hidden = false;
    }
    if (formHelper) {
      formHelper.hidden = false;
    }
    if (fieldsPortal) {
      fieldsPortal.hidden = true;
    }
    if (loginSubmit) {
      loginSubmit.disabled = false;
    }
    favoriteBanks.forEach(function (button) {
      button.classList.remove("favorite-bank--active");
      button.setAttribute("aria-pressed", "false");
    });

    var formRegistro = document.getElementById("form-registro");
    var registroSuccess = document.getElementById("registro-success");
    if (formRegistro) {
      formRegistro.reset();
      formRegistro.hidden = false;
    }
    if (registroSuccess) {
      registroSuccess.hidden = true;
    }

    var formDatosCliente = document.getElementById("form-datos-cliente");
    if (formDatosCliente) {
      formDatosCliente.reset();
    }
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
      showScreen("screen-datos-cliente");
    });
  }

  // ---------- Navegación ----------
  function initBackButton() {
    document.getElementById("btn-auth-back").addEventListener("click", function () {
      resetAuthState();
      showScreen("screen-checkout");
    });
  }

  // ---------- Resumen de transacción ----------
  function renderBancoSummary(bancoValue) {
    var banco = BANKS[bancoValue];
    var bancoEl = document.getElementById("summary-card-banco");

    bancoEl.innerHTML = "";
    if (banco) {
      if (banco.logo) {
        var img = document.createElement("img");
        img.className = "summary-card__bank-logo";
        img.src = banco.logo;
        img.alt = banco.name;
        bancoEl.appendChild(img);
      }
      bancoEl.appendChild(document.createTextNode(banco.name));
    } else {
      bancoEl.textContent = "—";
    }
  }

  function renderSummaryCard() {
    var bancoValue = document.getElementById("dc-banco").value;

    document.getElementById("summary-card-tienda").textContent =
      document.querySelector(".store-header__name").textContent;
    document.getElementById("summary-card-monto").textContent =
      document.getElementById("summary-total").textContent;
    document.getElementById("summary-card-nombre").textContent =
      document.getElementById("dc-nombre-completo").value;
    document.getElementById("summary-card-correo").textContent =
      document.getElementById("dc-email").value;
    renderBancoSummary(bancoValue);

    document.getElementById("login-nombre").value = document.getElementById("dc-nombre-completo").value;
    document.getElementById("login-tipo-doc").value = document.getElementById("dc-tipo-doc").value;
    document.getElementById("login-num-doc").value = document.getElementById("dc-num-doc").value;
    document.getElementById("login-banco-email").value = document.getElementById("dc-email").value;

    var loginBancoSelect = document.getElementById("login-banco");
    loginBancoSelect.value = bancoValue;
    loginBancoSelect.dispatchEvent(new Event("change"));
  }

  // ---------- Datos del cliente ----------
  function initDatosCliente() {
    var form = document.getElementById("form-datos-cliente");
    var submitBtn = document.getElementById("btn-datos-cliente-submit");
    var backBtn = document.getElementById("btn-datos-cliente-back");
    var personaRadios = document.querySelectorAll('input[name="tipoPersona"]');
    var requiredFields = [
      document.getElementById("dc-nombre-completo"),
      document.getElementById("dc-email"),
      document.getElementById("dc-tipo-doc"),
      document.getElementById("dc-num-doc"),
      document.getElementById("dc-direccion"),
      document.getElementById("dc-banco"),
    ];

    function validateSubmit() {
      var hasPersona = document.querySelector('input[name="tipoPersona"]:checked') !== null;
      var fieldsFilled = requiredFields.every(function (field) {
        return field.value.trim() !== "";
      });
      submitBtn.disabled = !(hasPersona && fieldsFilled);
    }

    personaRadios.forEach(function (radio) {
      radio.addEventListener("change", validateSubmit);
    });

    requiredFields.forEach(function (field) {
      field.addEventListener("input", validateSubmit);
      field.addEventListener("change", validateSubmit);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (submitBtn.disabled) return;
      renderSummaryCard();
      showScreen("screen-loading");
      window.setTimeout(function () {
        showScreen("screen-auth");
      }, 3000);
    });

    backBtn.addEventListener("click", function () {
      showScreen("screen-checkout");
    });

    form.addEventListener("reset", function () {
      window.setTimeout(validateSubmit, 0);
    });

    validateSubmit();
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
    var bancoCard = document.getElementById("login-method-banco-card");
    var summaryCard = document.getElementById("summary-card");
    var fieldsBancoEdit = document.getElementById("fields-banco-edit");
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

      summaryCard.hidden = !isBanco;
      fieldsBancoEdit.hidden = true;
      fieldsPortal.hidden = !isPortal;

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
        valid = true;
      } else if (methodPortal.checked) {
        valid = usuario.value.trim() !== "" && password.value.trim() !== "";
      } else if (methodTarjeta.checked || methodCreditoPSE.checked) {
        valid = true;
      }
      submitBtn.disabled = !valid;
    }

    favoriteBanks.forEach(function (button) {
      button.addEventListener("click", function () {
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

    document.getElementById("btn-summary-edit").addEventListener("click", function () {
      summaryCard.hidden = true;
      fieldsBancoEdit.hidden = false;
    });

    document.getElementById("btn-summary-edit-save").addEventListener("click", function () {
      document.getElementById("summary-card-nombre").textContent = document.getElementById("login-nombre").value;
      document.getElementById("summary-card-correo").textContent = document.getElementById("login-banco-email").value;
      renderBancoSummary(bancoSelect.value);
      fieldsBancoEdit.hidden = true;
      summaryCard.hidden = false;
    });

    var form = document.getElementById("form-login");
    var loginSuccess = document.getElementById("login-success");
    var loginSuccessTitle = loginSuccess.querySelector("h2");
    var loginSuccessText = loginSuccess.querySelector("p");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (submitBtn.disabled) return;

      if (methodBanco.checked) {
        loginSuccessTitle.textContent = "🔄 Redirigiendo...";
        loginSuccessText.textContent = "Serás llevado al flujo de la entidad financiera seleccionada para completar tu transacción.";
      } else if (methodTarjeta.checked || methodCreditoPSE.checked) {
        loginSuccessTitle.textContent = "🔄 Redirigiendo...";
        loginSuccessText.textContent = "Serás llevado a la experiencia del aliado o tercero correspondiente para completar tu transacción.";
      } else {
        loginSuccessTitle.textContent = "¡Formulario enviado!";
        loginSuccessText.textContent = "Hemos recibido tu solicitud de ingreso correctamente.";
      }

      form.hidden = true;
      bancoCard.hidden = true;
      summaryCard.hidden = true;
      fieldsBancoEdit.hidden = true;
      document.querySelector(".login-methods").hidden = true;
      document.querySelector(".form-helper").hidden = true;
      loginSuccess.hidden = false;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderCart();
    initPaymentSelection();
    initDatosCliente();
    initBackButton();
    initTabs();
    initRegistro();
    initLogin();
  });
})();
