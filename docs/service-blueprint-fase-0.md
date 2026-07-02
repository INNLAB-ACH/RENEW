# Prompt: Service Blueprint — Fase 0 (Onboarding / Pago PSE)

> Este documento es un **prompt estructurado** para que Claude genere un artefacto de Service Blueprint (diagrama) a partir del prototipo actual de la "Nueva página de registro" (flujo de pago PSE: checkout → selección de método de pago → procesamiento → login/registro).
>
> Úsalo pegando este archivo completo como instrucción, o referenciándolo con `@service-blueprint-fase-0.md` y pidiendo: *"Genera el artefacto de service blueprint siguiendo este documento"*.

---

## 1. Instrucción para Claude

Quiero que generes un **Service Blueprint** en formato de artefacto visual (tabla/diagrama, preferiblemente como diagrama Mermaid tipo `flowchart` o tabla Markdown con swimlanes, o como artefacto HTML/SVG si el entorno lo permite).

El blueprint debe representar el flujo **Fase 0: Checkout, pago PSE y autenticación/registro de usuario**, basado en el prototipo funcional ubicado en `index.html` y `js/main.js` de este repositorio.

El blueprint debe incluir, como mínimo, estas capas (swimlanes), de arriba hacia abajo:

1. **Fases del journey** (encabezado horizontal, ver sección 3).
2. **Acciones del usuario** (frontstage — lo que el cliente hace).
3. **Línea de interacción** (*line of interaction*).
4. **Puntos de contacto / evidencia física-digital** (touchpoints, pantallas, componentes UI).
5. **Acciones del personal/sistema visible** (frontstage del sistema — lo que el usuario percibe que el sistema "hace" frente a él, p. ej. validaciones, loaders, mensajes).
6. **Línea de visibilidad** (*line of visibility*).
7. **Acciones backstage** (procesos no visibles al usuario, aunque en este prototipo sean simulados/mock).
8. **Línea de interacción interna** (*line of internal interaction*).
9. **Procesos de soporte** (sistemas, APIs, equipos internos — reales o futuros, marcando cuáles son mock hoy).
10. **Evidencia / artefactos generados** (comprobantes, estados, correos, etc.).
11. **Puntos de dolor y oportunidades** (anotaciones por fase, opcional pero recomendado).

Genera el blueprint completo, fase por fase, respetando el orden y contenido de la sección 3 y 4. Si usas Mermaid, usa subgraphs por fase y nodos por swimlane. Si usas tabla, una columna por fase y una fila por swimlane.

---

## 2. Contexto del prototipo (fuente de verdad)

- **Producto representado:** flujo de pago PSE de un e-commerce demo ("Tienda Andina"), seguido de autenticación/registro del usuario pagador.
- **Estado:** prototipo frontend estático (HTML/CSS/JS vanilla), sin backend real. Todo dato es mock (carrito hardcodeado, banco simulado, sin validación real de credenciales).
- **Archivos clave:**
  - [index.html](index.html) — 3 pantallas (`screen-checkout`, `screen-loading`, `screen-auth`).
  - [js/main.js](js/main.js) — lógica de carrito, transición de pantallas, tabs login/registro, validación de formularios.
  - [css/styles.css](css/styles.css) — estilos visuales (incluye estética de marca PSE).
  - [References/referencia.png](References/referencia.png) — referencia visual del loader estilo PSE real.
- **Actores:**
  - **Usuario comprador** (cliente del e-commerce, puede ser usuario nuevo o recurrente de PSE).
  - **Tienda Andina** (comercio afiliado, dueño del checkout).
  - **PSE** (pasarela de pago / ACH, representada por la pantalla de loading y topbar con logo PSE).
  - **Banco emisor** (entidad bancaria del usuario, seleccionable en login — Bancolombia, Davivienda, BBVA, Banco de Bogotá, Banco de Occidente, Nequi, Daviplata).
  - **Sistema (frontend mock)** — simula tiempos de espera y transiciones (`setTimeout` de 3s).

---

## 3. Fases del journey (encabezado del blueprint)

| # | Fase | Objetivo del usuario en esta fase | Pantalla(s) involucradas |
|---|------|-----------------------------------|---------------------------|
| 1 | **Descubrimiento y carrito** | Revisar productos y total a pagar | `screen-checkout` (sección carrito + resumen) |
| 2 | **Selección de método de pago** | Elegir cómo pagar | `screen-checkout` (sección métodos de pago) |
| 3 | **Redirección a pasarela PSE** | Confiar en que el pago está siendo gestionado de forma segura | `screen-loading` |
| 4 | **Autenticación o registro** | Identificarse ante PSE/banco para autorizar el pago, o registrarse si es nuevo | `screen-auth` (tabs Login / Registro) |
| 5 | **Confirmación** | Obtener certeza de que la solicitud fue recibida | `form-success` (login o registro) |

> Nota: en el prototipo actual, las fases 4 y 5 cubren **dos sub-flujos paralelos**: (a) Login de un pagador existente (vía banco o vía portal PSE) y (b) Registro de un usuario nuevo. El blueprint debe representarlos como **carriles alternos dentro de la fase 4-5**, no como fases separadas.

---

## 4. Detalle por fase (insumos para cada swimlane)

### Fase 1 — Descubrimiento y carrito
- **Acción usuario:** entra al checkout, revisa productos (`cart-list`), cantidad y subtotal/envío/total.
- **Touchpoint:** tarjetas de producto, resumen de compra (`checkout__summary`), header de tienda con contador de carrito.
- **Frontstage sistema:** renderiza carrito dinámicamente (`renderCart()`), calcula subtotal + envío fijo ($12.000) = total.
- **Backstage (mock hoy / real en futuro):** catálogo de productos, motor de precios e inventario (en prototipo: arreglo `CART` hardcodeado en JS).
- **Evidencia:** monto total visible antes de pagar.
- **Dolor/oportunidad:** no hay edición de cantidades ni eliminación de ítems en el prototipo — posible gap a documentar.

### Fase 2 — Selección de método de pago
- **Acción usuario:** elige entre "Tarjeta" (deshabilitada, no disponible en demo) o "PSE — Débito a cuenta bancaria".
- **Touchpoint:** radio buttons `payment-option`, botón `btn-go-pay` (deshabilitado hasta seleccionar PSE).
- **Frontstage sistema:** habilita/deshabilita el botón "Ir a pagar" según selección (`initPaymentSelection()`).
- **Backstage:** ninguno aún (no hay llamada a pasarela real).
- **Evidencia:** estado visual del botón principal (habilitado/deshabilitado).
- **Dolor/oportunidad:** opción de tarjeta visible pero inutilizable — validar si debe ocultarse o mantenerse para roadmap futuro.

### Fase 3 — Redirección a pasarela PSE (loading)
- **Acción usuario:** espera mientras el sistema "procesa" (no hay interacción posible).
- **Touchpoint:** pantalla `screen-loading` con stepper de 4 íconos (🏬 tienda → 🔒 seguridad → 💬 comunicación → 🏦 banco), spinner con logo PSE, mensaje "Estamos procesando tu transacción...", footer de contacto soporte.
- **Frontstage sistema:** transición automática tras 3000 ms (`window.setTimeout`) hacia `screen-auth`.
- **Backstage (mock hoy):** en producto real, aquí ocurriría: tokenización de transacción, registro en ACH/PSE, selección de banco destino. Hoy es un `setTimeout` fijo sin llamadas reales.
- **Procesos de soporte (futuro):** API de PSE/ACH, gateway de pagos, antifraude.
- **Evidencia:** ninguna persistente (pantalla transitoria).
- **Dolor/oportunidad:** tiempo fijo de 3s no refleja latencia real ni maneja errores de conexión/timeout — el blueprint debe marcar este como punto de riesgo para Fase 1 (ver PRD del Portal ACH, sección Roadmap).

### Fase 4 — Autenticación o Registro (dos sub-carriles)

**Sub-carril A: Login (usuario existente)**
- **Acción usuario:** elige "Pagar desde mi banco" o "Pagar desde mi portal PSE", completa el formulario correspondiente, envía.
- **Touchpoint:** tabs `Login`/`Registro`, opciones `login-method-banco` / `login-method-portal`, campos dinámicos (selector de banco + correo, o usuario + contraseña).
- **Frontstage sistema:** muestra/oculta campos según método (`updateVisibility()`), valida campos requeridos en tiempo real (`validateSubmit()`), habilita botón "Ingresar" solo si es válido.
- **Backstage (mock hoy / real futuro):** autenticación contra banco emisor o contra PSE (hoy: sin validación real, cualquier dato no vacío pasa).
- **Procesos de soporte (futuro):** servicio de autenticación bancaria, MFA/OTP, antifraude.
- **Evidencia:** mensaje de éxito `login-success` ("¡Formulario enviado!").

**Sub-carril B: Registro (usuario nuevo)**
- **Acción usuario:** completa datos personales (tipo y número de documento, correo, nombres, apellidos, celular) y envía.
- **Touchpoint:** formulario `form-registro` con 9 campos.
- **Frontstage sistema:** valida campos requeridos vía atributos `required` del navegador (no hay validación custom adicional en JS).
- **Backstage (mock hoy / real futuro):** creación de usuario/cliente en PSE o en el comercio, verificación de identidad (KYC).
- **Procesos de soporte (futuro):** servicio de registro/KYC, validación de documento, deduplicación de usuarios.
- **Evidencia:** mensaje de éxito `registro-success` ("¡Formulario enviado!").
- **Dolor/oportunidad:** no hay validación de formato (email, número de documento, celular) más allá de `required`; no hay manejo de error si el usuario ya existe.

### Fase 5 — Confirmación
- **Acción usuario:** percibe que su solicitud fue recibida (no hay retorno automático al comercio en el prototipo).
- **Touchpoint:** bloque `form-success` (ícono ✅ + texto), reemplaza al formulario correspondiente.
- **Frontstage sistema:** oculta formulario, muestra mensaje de éxito.
- **Backstage (futuro):** notificación al comercio de pago confirmado, generación de comprobante, redirección de vuelta a Tienda Andina con estado de la transacción.
- **Procesos de soporte (futuro):** servicio de notificaciones (email/SMS), generación de comprobante PDF, webhook de confirmación al comercio.
- **Evidencia:** mensaje en pantalla únicamente (no hay comprobante descargable en este prototipo, a diferencia del Portal de Usuarios ACH que sí contempla PDF).
- **Dolor/oportunidad:** flujo termina "en el limbo" — no hay cierre explícito (botón "Volver a la tienda" o redirección), a documentar como gap de UX.

---

## 5. Líneas del blueprint a marcar explícitamente

- **Línea de interacción:** entre el usuario y la UI (siempre presente, ya que todo el prototipo es frontend).
- **Línea de visibilidad:** separa lo que el usuario ve (pantallas, mensajes, loaders) de lo que no ve (lógica JS de validación, futura lógica de backend).
- **Línea de interacción interna:** separa procesos "backstage" simulados hoy (JS local) de futuros procesos de soporte reales (APIs externas: PSE, banco emisor, comercio).

---

## 6. Leyenda requerida en el artefacto

El artefacto debe incluir una leyenda que distinga:
- 🟢 **Implementado en el prototipo actual** (frontend, mock).
- 🟡 **Simulado / placeholder** (ej. `setTimeout`, validación mínima).
- 🔴 **No implementado — solo conceptual para fases futuras** (integraciones reales con PSE, banco, antifraude, notificaciones).

---

## 7. Salida esperada

1. Un diagrama (Mermaid `flowchart TB` con subgraphs por fase, o tabla Markdown con swimlanes) que cubra las 5 fases y los 2 sub-carriles de la fase 4.
2. Una sección de **hallazgos / gaps** listando los puntos de dolor identificados en la sección 4 (carrito sin edición, timeout fijo sin manejo de error, validaciones débiles, falta de cierre de flujo).
3. Una sección de **siguientes pasos sugeridos** alineada con el roadmap del Portal de Usuarios ACH (Fase 2: integración backend real; Fase 3: seguridad/antifraude/notificaciones).
