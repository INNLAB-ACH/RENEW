# PRD — Portal PSE / Nueva Plataforma ACH Colombia

**Versión:** 1.0 — Julio 2026
**Horizonte:** 18 meses (Q3 2026 → Q1 2028, con fase stretch a Q1 2029)
**Autor / fuente:** Consolidado a partir de `roadmap_portal_pse.html`, `habilitadores_roadmap_pse.md` y `service-blueprint-fase-0.md`
**Estado del documento:** Borrador para revisión — insumo de planeación de producto

---

## 1. Resumen ejecutivo

PSE deja de ser un canal de pago para convertirse en una **plataforma de capacidades financieras reutilizables**: un hub que conecta personas, empresas y el ecosistema financiero colombiano alrededor del movimiento de dinero, independientemente del canal, el instrumento o el caso de uso.

Hoy PSE es una tubería de redirección hacia el banco del usuario, sin identidad propia, sin datos consolidados y con una arquitectura amarrada a un solo caso de uso (débito a cuenta para pagar comercios). Este PRD describe la transformación hacia una plataforma desacoplada, modular y orientada al iniciador de la transacción (no al canal), con el **Portal PSE** como la primera superficie donde ACH tiene contacto directo con el usuario final.

El programa se ejecuta en **5 olas** a lo largo de 18 meses (+ una ola stretch), compuestas por **32 habilitadores** (capacidades de infraestructura no visibles al usuario) y **27 casos de uso / fichas** (funcionalidades de cara al usuario, repartidas en segmentos B2C y B2B).

### Principios de diseño

1. **Desacoplada por diseño** — un único mecanismo de débito, uno de crédito y una reversión estándar reemplazan los múltiples canales y silos actuales.
2. **Modular y escalable** — cada capacidad es una unidad independiente, parametrizable y potencialmente vendible como marca blanca (White Label).
3. **Un solo punto de conexión** — bancos, pasarelas, comercios y personas se integran una sola vez; la plataforma resuelve internamente la complejidad de las 49 entidades del ecosistema.
4. **Orientada al iniciador, no al canal** — la plataforma identifica quién inicia la transacción (persona, empresa, comercio, o en el futuro, un agente de IA), no solo por qué canal llegó.
5. **Experiencia en el centro** — el Portal PSE pone al usuario en contacto directo con ACH: autenticación propia, historial consolidado, múltiples instrumentos, agregación de cuentas y analítica financiera.
6. **Simplicidad para moverse a la velocidad del usuario** — la experiencia se adapta al ritmo real de personas y empresas en la gestión del dinero: decisiones rápidas, flujos claros y respuesta inmediata. La complejidad regulatoria, operativa y técnica se resuelve detrás de escena para que cliente y usuario perciban control, agilidad y una experiencia disfrutable de extremo a extremo.
7. **Datos como activo estratégico** — un DataLake unificado reemplaza los silos de reportería por producto y alimenta IA, fraude, scoring y marketing.

---

## 2. Objetivos de producto

| Objetivo | Descripción | Ola principal |
|---|---|---|
| **Proteger la operación actual** | Mejorar el flujo transaccional existente y frenar la fuga de volumen hacia Bre-B / RtP | Ola 0 |
| **Construir la plataforma core** | Reemplazar los 4-6 canales heterogéneos de débito/crédito por capacidades únicas y reutilizables | Ola 1 |
| **Convertirse en hub financiero** | Agregación de cuentas, BNPL, tarjeta, factoring como productos del portal | Ola 2 |
| **Abrir nuevos mercados** | Remesas, escrow, marketing de pagos, IA financiera, crossborder | Ola 3 |
| **Escalar y disrumpir** | Canal físico, pagos agénticos (MCP), White Label, agregación internacional | Ola 4 (stretch) |

### Métricas de negocio de referencia (línea base)
- PSE procesó **236M operaciones** en Q1 2026 (+12% vs. 2025), movilizando **~COP $910 billones** (ACH Colombia, abr. 2026).
- **~20M usuarios registrados**, de los cuales **~13.8M activos**.
- **30.451 empresas** vinculadas a PSE.
- ACH mueve **~COP $180B mensuales** en transferencias interbancarias (dispersión/nómina/proveedores).
- Amenaza competitiva directa: **Bre-B** (pagos inmediatos con RtP nativo) — riesgo alto (score 9/10) en varios casos de uso.

---

## 3. Alcance

### Dentro de alcance
- Portal PSE como producto digital propio de ACH (frontend + autenticación propia).
- Capacidades financieras core reutilizables: débito único, crédito único, reversión estándar.
- Identidad unificada, control de fraude centralizado, KYC continuo.
- DataLake unificado y capacidades de analítica/IA.
- 27 casos de uso de la capa de servicio (B2C y B2B), descritos en la sección 6.
- Habilitación regulatoria como PSP ante la SFC.
- Integraciones con bancos (49 entidades), fintechs, billeteras, operadores de remesas, RADIAN/DIAN.
- Estrategia de White Label y pagos agénticos (MCP) como fase de escala.

### Fuera de alcance (explícito)
- ACH como entidad de crédito o emisor regulado de tarjetas (opera bajo modelo de intermediación / sponsor bancario).
- Reemplazo inmediato del flujo PSE actual — la migración es gradual y coexiste con el modelo vigente.
- Custodia de fondos en escrow antes de contar con el marco legal aprobado por la SFC (HAB-25).
- Expansión a un segundo país (se prepara la infraestructura en Ola 4, pero la ejecución de expansión regional no está en este roadmap).

---

## 4. Arquitectura de referencia (capas)

| Capa | Descripción |
|---|---|
| **L1 — Ecosistema** | Orígenes, canales y actores externos (bancos, fintechs, billeteras, redes de adquirencia, operadores de remesas) |
| **L2 — Integración unificada** | APIs, eventos, conectores, SDKs — punto único de conexión para el ecosistema |
| **L3 — Compensación y liquidación (ACH Core)** | Compensación, liquidación, conciliación, reportes, datos (DataLake) |
| **L4 — Capacidades financieras core** | Débito único, crédito único, reversión estándar |
| **L5 — Orquestación y control** | Identidad, autenticación, fraude, KYC, límites, IA |
| **L6 — Servicios** | Experiencias y casos de uso de cara al usuario (capa de servicio — no habilitadores) |

Los **habilitadores** (sección 7) viven en L1-L5; los **casos de uso / fichas** (sección 6) viven en L6 y son los que consumen las capacidades habilitadas por las capas inferiores.

---

## 5. Roadmap por olas

| Ola | Nombre | Periodo | Duración | Foco |
|---|---|---|---|---|
| **Ola 0** | Encender el Portal / Proteger la Operación | Q3–Q4 2026 | 6 meses | Base operativa, mejora del flujo actual, primeras alianzas |
| **Ola 1** | Desacoplar y Unificar | Q1–Q2 2027 | 6 meses | Débito/crédito/reversión únicos, identidad, fraude, API única, DataLake |
| **Ola 2** | Expandir el Hub | Q3 2027 | 3 meses | Agregación de cuentas, BNPL, tarjeta prepago, factoring, onboarding IA |
| **Ola 3** | Nuevos Mercados | Q4 2027 | 3 meses | Multi-moneda, remesas, escrow, marketing de pagos, gestor financiero IA |
| **Ola 4** (stretch) | Disrupción y Escala | Q1 2028 (→ Q1 2029) | 3 meses+ | Canal físico, redes sociales, agéntico/MCP, White Label, agregación internacional |

---

## 6. Catálogo de funcionalidades (27 casos de uso)

Cada ficha incluye: segmento, objetivo estratégico, problema que resuelve ("trabajos por hacer"), funcionalidades concretas y ola de introducción/evolución.

### 6.1 Segmento B2C — Persona Natural

#### Ficha 01 · Iniciación del pago / Formas de pago
**Objetivo:** Defender y escalar el negocio · **Ola:** 0 (mejora flujo actual) → 1 (multi-instrumento) → 4 (POS físico, redes sociales)
Unificación de todos los instrumentos de pago disponibles en un único flujo de iniciación. El usuario elige el instrumento; PSE orquesta la ejecución sin depender del banco o pasarela para definir qué opciones están disponibles.
- Selección de instrumento en tiempo real (cuenta, tarjeta, llave, billetera, BNPL).
- Redirección automática a instrumento alternativo si el primero falla o no tiene fondos.
- Pago crossborder: usuario en Colombia paga con cuenta colombiana al exterior.
- Motor de reglas para selección óptima según monto, disponibilidad y costo.
- (Ola 4) PSE como instrumento en punto de venta físico (POS) y como opción en redes sociales / apps de terceros (WhatsApp, TikTok, Instagram).

#### Ficha 02 · Cash-Out ACH / Cajeros
**Objetivo:** Expandir alcance / inclusión financiera · **Ola:** 1 (piloto) → 3 (expansión nacional)
Retiro de efectivo en una red de aliados (corresponsales, cajeros, puntos de pago) usando PSE como instrumento, sin tarjeta débito tradicional.
- Retiro mediante código QR o código de un solo uso generado en el portal.
- Cashout desde cuenta de ahorros, billetera PSE o fondos precargados.
- Límites diferenciados por instrumento.
- Historial de retiros integrado al portal.

#### Ficha 03 · Tarjeta débito prepago / Fondos en PSE
**Objetivo:** Crear nuevo valor / expandir presencia cotidiana · **Ola:** 2 (virtual) → 3 (física + multimoneda)
Tarjeta prepago (física o virtual) respaldada por PSE, cargada desde cualquier cuenta agregada, bajo modelo de banco sponsor.
- Tarjeta virtual para pagos digitales inmediatos, activada desde el portal.
- Tarjeta física emitida por banco sponsor con marca PSE o marca blanca.
- Carga desde cualquier cuenta agregada (ahorros, corriente, depósito electrónico).
- Soporte multimoneda para pagos en el exterior.

#### Ficha 04 · Agregación de cuentas / Open Finance
**Objetivo:** Construir el hub / fundación del portal · **Ola:** 2 (H1: locales+billeteras) → 4 (H2: internacional; exploración H3: cripto)
Núcleo del hub financiero: el portal permite agregar y visualizar cuentas de múltiples entidades en un único lugar.
- H1: cuentas locales + billeteras; consulta de saldo; cross-selling básico.
- H2: cuentas internacionales y fondos de inversión abiertos.
- H3: billeteras cripto (exploración).
- Habilitador de multi-débito, gestor financiero y rentabilización de excedentes.

#### Ficha 05 · Crédito PSE / BNPL
**Objetivo:** Crear nuevo valor / aumentar conversión · **Ola:** 2
PSE intermedia crédito inmediato (BNPL) como instrumento de pago nativo en el checkout, sin asumir riesgo crediticio directo.
- BNPL como opción de pago nativa en el checkout del portal.
- Solicitud de crédito en tiempo real con respuesta inmediata (objetivo <2-3 s).
- Gestión de deuda: cuotas, historial, alertas de vencimiento.
- Cross-selling con oferta financiera según perfil transaccional.

#### Ficha 06 · Gestión de facturas
**Objetivo:** Presencia cotidiana / defender recaudo · **Ola:** 0 (historial + pago manual) → 1 (domiciliación + RtP)
Centraliza todas las facturas del usuario (servicios públicos, telco, educación, salud, impuestos) en un único lugar.
- Inscripción de facturas recurrentes con un clic.
- Débito automático (domiciliación) programado por el usuario.
- Cobro iniciado por el comercio (RtP): solicitud de pago al portal del usuario.
- Alertas de vencimiento e integración con calendario financiero.

#### Ficha 07 · Gestión financiera general
**Objetivo:** Diferenciación / retención de usuarios · **Ola:** 0 (historial básico) → 2 (categorización) → 3 (IA consultiva) → 4 (agéntico completo)
Capa analítica del portal: historial consolidado, analítica de vida financiera y gestor financiero con IA.
- Dashboard personal de ingresos, gastos y saldo consolidado.
- Categorización automática de gastos con alertas proactivas.
- Gestor financiero con IA: "toma mis cuentas, paga mis facturas e invierte el excedente".
- PSE agéntico: ejecución de pagos y compras por instrucción en lenguaje natural.
- (Ola 4) Rentabilización automática de excedentes de tesorería.

#### Ficha 08 · Pago de planilla / Prestaciones sociales (PILA personal)
**Objetivo:** Defender ventaja regulatoria / modernizar core · **Ola:** 0/1 (UX + multi-instrumento) → 2 (BNPL para independientes)
PSE como instrumento de pago de aportes a seguridad social para trabajadores independientes y colombianos en el exterior.
- Pago de aportes con cuenta, tarjeta, BNPL o instrumento crossborder.
- Financiamiento del aporte vía BNPL para independientes con flujo irregular.
- Domiciliación automática del aporte mensual.
- Historial de seguridad social integrado al portal.

#### Ficha 09 · Remesas
**Objetivo:** Expandir alcance / nuevo segmento · **Ola:** 3
Recepción de remesas del exterior directamente en el portal, con opciones de disposición inmediata.
- Notificación en tiempo real de nueva remesa disponible.
- Disposición inmediata: pago de factura, transferencia a cuenta, cashout con aliado.
- Recarga de tarjeta PSE prepago con fondos de remesa.
- Envío de remesas desde Colombia al exterior (H2, futuro).

#### Ficha 10 · Depósito en garantía / Escrow digital (B2C)
**Objetivo:** Crear nuevo valor / diferenciación · **Ola:** 3
Débito al momento de la compra con retención de fondos hasta que se cumple una condición de negocio (entrega confirmada, servicio prestado).
- eCommerce C2C: débito al comprar, liberación al confirmar entrega.
- Plataformas de transporte: cobro estimado + ajuste final por distancia/tiempo.
- Servicios profesionales: pago liberado por hitos o entregables.
- Alquileres de corto plazo: garantía retenida hasta devolución del bien.

#### Ficha 11 · Marketing de pagos
**Objetivo:** Monetizar datos / generar fidelización · **Ola:** 3
Canal para que organizaciones ofrezcan descuentos, cashback y beneficios dirigidos a usuarios del portal, basados en comportamiento transaccional.
- Cashback automático al pagar con PSE en comercios aliados.
- Descuentos exclusivos visibles antes y durante el checkout.
- Segmentación por categoría de gasto para ofertas relevantes.
- Puntos de fidelización acumulables y redimibles en el ecosistema.

#### Ficha 24 · Zona Segura PSE
**Objetivo:** Proteger la operación / control preventivo · **Ola:** 2
Espacio de control dentro del portal para configurar reglas de negocio y seguridad por perfil de riesgo.
- Reglas por ubicación: permitir/bloquear transacciones según ciudad, país o zona.
- Whitelist/blacklist de entidades y comercios de confianza.
- Ventanas horarias de operación y bloqueo fuera de horario definido.
- Límites por monto máximo, cantidad de transacciones y acumulado diario/semanal.

#### Ficha XX · Motor antifraude adaptativo
**Objetivo:** Proteger la operación / reducir fraude · **Ola:** 1
Capa de seguridad transaccional que alimenta continuamente el motor de detección de fraudes con señales de comportamiento, dispositivo y patrones de pago.
- Scoring de riesgo en tiempo real por intento de pago.
- Autenticación escalonada según riesgo (frictionless vs. desafío).
- Retroalimentación automática del motor con transacciones aprobadas, rechazadas y reversadas.
- Alertas tempranas de anomalías por usuario, comercio y canal.

#### Ficha 25 · PSE como servicio (PaaS/IaaS transaccional)
**Objetivo:** Nuevo modelo de negocio / escala exponencial · **Ola:** 2 (White Label inicial) → 4 (madurez)
ACH presta PSE como plataforma/infraestructura como servicio para que bancos, cooperativas, fintechs, pasarelas y operadores internacionales usen PSE como su sistema de pagos sin construir desde cero.
- Banco regional consume PSE como servicio para agregación y pagos multi-instrumento.
- Cooperativa activa dispersión, factoring y BNPL con marca propia.
- Fintech usa APIs, motor antifraude y capacidades transaccionales para lanzar producto en meses.
- Operador internacional integra el core de pagos sin reconstruir plataforma.

#### Ficha 26 · Split Payment / "Hagamos Vaca"
**Objetivo:** Expandir uso cotidiano / pagos colaborativos · **Ola:** 4
Divide un pago entre varias personas en una sola transacción objetivo.
- Vaca para compras grupales con link de cobro por participante.
- Aportes parciales con estado en tiempo real (pendiente, pagado, vencido).
- Cierre automático cuando se completa el monto objetivo.
- Reversión proporcional automática si la transacción principal no se ejecuta.

#### Ficha 27 · Aprovechamiento de analítica para clientes (Snowflake)
**Objetivo:** Monetizar datos / diferenciación · **Ola:** 0
Convierte los datos transaccionales de PSE en productos analíticos accionables, soportados en Snowflake.
- MVP de segmentación de clientes por comportamiento transaccional y recurrencia.
- Tableros de insights en portal: hábitos de pago, categorías y oportunidades de ahorro.
- Motor de recomendaciones para próximos pagos, alertas y ofertas relevantes.
- Activación de campañas data-driven para comercios y usuarios.

---

### 6.2 Segmento B2B — Persona Jurídica

#### Ficha 12 · Tarjeta corporativa / Des-salarización
**Objetivo:** Crear nuevo valor / simplificar operación corporativa · **Ola:** 2
La empresa emite tarjetas prepagas para colaboradores, cargadas desde cuentas corporativas del portal.
- Tarjeta de viáticos: carga automática por evento o período; control de categorías.
- Tarjeta de regalo corporativa para incentivos o temporadas.
- Des-salarización: gasolina, alimentación (exenta de parafiscales bajo condiciones legales).
- Panel de administración: emisión, bloqueo, recarga y reportes en tiempo real.

#### Ficha 13 · Agregación de cuentas empresarial
**Objetivo:** Construir el hub empresarial / fundación B2B · **Ola:** 2
Permite a las empresas agregar y visualizar todas sus cuentas bancarias corporativas en un único lugar.
- Dashboard de tesorería: posición de caja consolidada en tiempo real.
- Conciliación automática de transacciones multi-banco.
- Alertas de saldos mínimos, vencimientos y compromisos próximos.
- Integración con ERP (SAP, Oracle, Siigo, World Office).

#### Ficha 14 · Crédito productivo / BNPL empresarial
**Objetivo:** Crear nuevo valor / ecosistema financiero empresarial · **Ola:** 2 (pilotos)
Acceso a crédito productivo para empresas en casos de alto valor: impuestos, nómina, seguridad social, liquidaciones, eventos no planeados de flujo de caja.
- Crédito puente para pago de impuestos (DIAN, IVA, ICA, predial).
- Financiamiento de nómina: la empresa paga con crédito, amortiza en semanas.
- Crédito para aportes PILA cuando el flujo de caja no alcanza.
- Liquidación de contratos: anticipo para cubrir obligaciones laborales imprevistas.

#### Ficha 15 · Factoring ACH
**Objetivo:** Nuevo mercado / monetizar infraestructura ACH · **Ola:** 2 (MVP)
Gestión y negociación de facturación anticipada. La empresa carga sus facturas electrónicas integradas con RADIAN/DIAN, las negocia con entidades aliadas y recibe el anticipo en el portal.
- Carga y visualización de facturas electrónicas desde RADIAN/DIAN.
- Negociación y subasta de facturas con múltiples cesionarios.
- Anticipo automático al aprobar la cesión con acreditación en el portal.
- Confirming: la empresa pagadora ofrece a proveedores adelantar el cobro.
- Objetivo de tiempo: solicitud → anticipo en cuenta en **<24 horas**.

#### Ficha 16 · Gestión de facturas empresarial
**Objetivo:** Presencia cotidiana empresarial / defender recaudo · **Ola:** 1
Centraliza las obligaciones periódicas de la empresa: servicios públicos, telecomunicaciones, arrendamientos.
- Inscripción de facturas con asignación de centro de costo.
- Flujo de aprobación jerárquico: solicitud → aprobador → pago.
- Débito automático (domiciliación) programado por la empresa.
- Historial con trazabilidad completa para auditoría interna y externa.

#### Ficha 17 · Pago de proveedores / Dispersión
**Objetivo:** Escalar dispersión / core B2B · **Ola:** 0 (panel básico) → 1 (dispersión masiva multi-entidad) → 4 (White Label)
Servicio de dispersión masiva de pagos a prestadores de servicios, proveedores o comisionistas.
- Dispersión masiva (hasta miles de registros por lote) a cualquiera de los 49 bancos del ecosistema.
- Carga de archivo plano, Excel o integración API con ERP.
- Notificación automática al proveedor: correo, SMS o notificación en portal.
- Reporte de dispersión: exitosos, fallidos, pendientes de retorno.
- (Ola 4) White Label de capacidades de dispersión para bancos aliados y cooperativas.

#### Ficha 18 · Recaudo cash-in con red de aliados
**Objetivo:** Nuevo segmento / inclusión del canal tradicional · **Ola:** 2 (piloto 2-3 ciudades) → 3 (expansión nacional)
Habilitación de recaudo en efectivo a través de una red de aliados físicos para empresas de consumo masivo cuyos canales operan en efectivo.
- Tendero paga su pedido al distribuidor; el sistema lo acredita en tiempo real a la empresa.
- Recaudo vía QR: el surtidor presenta código; el tendero paga desde cualquier fuente disponible.
- Dashboard de cartera en tiempo real: pagos recibidos, saldos, morosidad por ruta/distribuidor.
- Habilitación del tendero para pagar a surtidores sin depender del efectivo (H2, futuro).

#### Ficha 19 · Recaudo vía cobranza (RtP)
**Objetivo:** Nuevo servicio / iniciación de pagos RtP · **Ola:** 1
La empresa genera solicitudes de pago (RtP) que llegan al portal del usuario sin que este deba ir a la plataforma del comercio.
- Generación masiva de solicitudes de pago (RtP) desde el portal empresarial.
- El usuario aprueba el pago con un clic desde su portal PSE.
- Dashboard de cobranza: enviadas, vistas, aprobadas, rechazadas, pendientes.
- Escalamiento automático: recordatorio o cobranza tradicional si no paga en X días.
- **Nota de riesgo:** amenaza directa de Bre-B (RtP nativo) — prioridad alta de defensa competitiva.

#### Ficha 20 · PILA empresarial
**Objetivo:** Defender ventaja regulatoria / modernizar core empresarial · **Ola:** 0 (UX + notificaciones) → 1 (integración directa con operadores)
Acceso directo a la liquidación y pago de planilla de seguridad social desde el portal.
- Importación de archivo de liquidación desde el sistema de nómina de la empresa.
- Cálculo asistido de aportes para empresas sin software especializado.
- Pago con débito automático en la fecha de vencimiento.
- Alertas de vencimiento y cambios normativos (UGPP).

#### Ficha 21 · Dispersión de nómina
**Objetivo:** Escalar dispersión / core B2B · **Ola:** 0 (migración + panel básico)
Servicio de pago de nómina multi-entidad. La empresa carga el archivo de nómina y PSE ejecuta los créditos a cada empleado.
- Carga de archivo de nómina (Excel, plano o API con ERP) y pago simultáneo multi-entidad.
- Comprobante digital al empleado por correo, SMS o notificación en portal.
- Soporte para nómina variable: comisiones, bonificaciones, horas extra.
- Integración con sistemas de nómina (Siigo, Helisa, SAP HR).

#### Ficha 22 · Escrow digital B2B
**Objetivo:** Crear nuevo valor / diferenciación B2B · **Ola:** 3
ACH/PSE retiene fondos entre empresas hasta que se cumplen condiciones de negocio definidas contractualmente.
- Compraventa B2B: pago liberado al confirmar entrega o cumplimiento de hito contractual.
- Contratos de construcción o ingeniería: pagos por avance de obra verificado.
- Importaciones: pago al proveedor internacional liberado al confirmar llegada en aduana.
- Plataformas B2B de subastas: escrow automático por lote adjudicado.

#### Ficha 23 · Marketing de pagos B2B
**Objetivo:** Monetizar ecosistema / nuevo modelo de relacionamiento · **Ola:** 3
La empresa usa el portal para ejecutar compras corporativas con beneficios negociados, o para ofrecer descuentos a sus propios clientes.
- Marketplace B2B: catálogo de proveedores para compras corporativas por categoría.
- Programa de beneficios para empleados: descuentos negociados accesibles desde el portal.
- Campañas de activación comercial: empresa X ofrece descuento a compradores del sector Y.
- Analítica de compras corporativas: gasto por proveedor, categoría, período.

---

## 7. Habilitadores (infraestructura, 32 en total)

Los habilitadores no son visibles al usuario final, pero son bloqueantes de los casos de uso de la sección 6. Se listan agrupados por ola; el detalle completo (descripción, prerequisitos, consideraciones) está en `habilitadores_roadmap_pse.md`.

### Ola 0 · Q3–Q4 2026 — Encender el Portal
| ID | Habilitador | Prioridad |
|---|---|---|
| HAB-01 | Auditoría y depuración de datos de usuarios (20M usuarios, ~13.8M activos) | **Bloqueante** |
| HAB-02 | Portal PSE — estructura base y autenticación propia | Alta |
| HAB-03 | Habilitación legal como PSP ante la SFC | **Crítica** |
| HAB-04 | Enrolamiento de usuarios en el portal | Alta |
| HAB-05 | Optimización del flujo transaccional actual (7+ campos → 3, reintentos, mensajes de error) | Alta |
| HAB-06 | Primer módulo de integración unificada (API inicial) | Alta |
| HAB-07 | Primeras alianzas con fintechs y billeteras | Alta |

### Ola 1 · Q1–Q2 2027 — Desacoplar y Unificar
| ID | Habilitador | Prioridad |
|---|---|---|
| HAB-08 | Débito único (reemplaza 4-6 canales actuales) | **Crítica** |
| HAB-09 | Crédito único | **Crítica** |
| HAB-10 | Reversión estándar | Alta |
| HAB-11 | Identidad unificada y autenticación biométrica | **Crítica** |
| HAB-12 | Control de fraude centralizado | **Crítica** |
| HAB-13 | DataLake unificado | Alta |
| HAB-14 | API única para bancos y comercios | **Crítica** |

### Ola 2 · Q3–Q4 2027 — Expandir el Hub
| ID | Habilitador | Prioridad |
|---|---|---|
| HAB-15 | Integración con fintechs y billeteras (Open Finance H1) | Alta |
| HAB-16 | Módulo de agregación de cuentas | Alta |
| HAB-17 | Onboarding automatizado con IA | Alta |
| HAB-18 | KYC continuo | Media-Alta |
| HAB-19 | Módulo BNPL — integración con originadores de crédito | Alta |
| HAB-20 | Tarjeta prepago virtual — acuerdo con banco sponsor | Media |
| HAB-21 | Módulo de factoring — integración con RADIAN/DIAN | Media |

### Ola 3 · Q1–Q2 2028 — Nuevos Mercados
| ID | Habilitador | Prioridad |
|---|---|---|
| HAB-22 | Capa multi-moneda | Alta |
| HAB-23 | Integración con operadores de remesas internacionales | Alta |
| HAB-24 | Módulo de escrow digital — motor de reglas y custodia | Media |
| HAB-25 | Marco legal del escrow | Alta (bloqueante de HAB-24) |
| HAB-26 | Plataforma de marketing de pagos | Media |
| HAB-27 | Gestor financiero con IA | Media |

### Ola 4 · Q3 2028–Q1 2029 (stretch) — Disrupción y Escala
| ID | Habilitador | Prioridad |
|---|---|---|
| HAB-28 | Integración con POS y cajeros — canal físico | Alta |
| HAB-29 | Pagos desde redes sociales y apps de terceros | Media |
| HAB-30 | PSE agéntico y MCP (Model Context Protocol) | Alta |
| HAB-31 | White Label — modularización de capacidades para terceros | Media |
| HAB-32 | Agregación de cuentas internacionales (H2) | Media |

### 7.1 Dependencias bloqueantes críticas

| Habilitador | Bloquea a |
|---|---|
| HAB-01 — Depuración de datos | HAB-04, HAB-13, HAB-17, HAB-27 |
| HAB-03 — Habilitación PSP | HAB-25 y múltiples casos de uso de Ola 2-3 |
| HAB-08 — Débito único | HAB-09, HAB-10, HAB-19, HAB-24 |
| HAB-11 — Identidad unificada | HAB-12, HAB-18, HAB-30 |
| HAB-13 — DataLake unificado | HAB-12, HAB-18, HAB-26, HAB-27 |
| HAB-22 — Multi-moneda | HAB-23, HAB-32 |
| HAB-25 — Marco legal escrow | HAB-24 |

**Implicación de planeación:** HAB-01 (calidad de datos) es el riesgo de cronograma más subestimado del programa — su retraso bloquea en cascada la Ola 1 completa. HAB-03 (PSP ante la SFC) debe iniciarse en Q3 2026 sin excepción porque el proceso regulatorio puede tomar 6-18 meses.

---

## 8. Priorización competitiva

Los casos de uso con mayor amenaza competitiva de corto plazo (score de amenaza ≥ 8/10) requieren tratamiento prioritario porque **Bre-B** (con RtP nativo) puede capturar el segmento antes que el Portal PSE:

| Ficha | Amenaza | Razón |
|---|---|---|
| Ficha XX — Motor antifraude adaptativo | 9/10 | Fraude en pagos digitales crece con el volumen; controles fragmentados hoy |
| Ficha 19 — Recaudo vía cobranza (RtP) | 9/10 | Bre-B lo ofrece nativamente; si PSE no lo implementa primero, pierde el segmento |
| Ficha 01 — Iniciación del pago | 8/10 | 35% de abandono de carrito si el método preferido no está disponible |
| Ficha 06 — Gestión de facturas | 8/10 | Bre-B con RtP nativo es amenaza directa e inmediata |
| Ficha 24 — Zona Segura PSE | 7/10 | Controles de seguridad configurables son tabla de apuestas competitiva |
| Ficha 03 — Tarjeta prepago | 7/10 | Nequi, Daviplata y Nu ya ofrecen tarjeta virtual propia |

---

## 9. Estado actual — Gaps del prototipo existente

El repositorio contiene un prototipo frontend estático (`index.html`, `js/main.js`) que representa el flujo de checkout → pago PSE → autenticación/registro de un e-commerce demo. Es la base de Fase 0 (ver `service-blueprint-fase-0.md`). Gaps identificados que deben resolverse en Ola 0-1:

- **Carrito:** sin edición ni eliminación de ítems (solo lectura de un arreglo hardcodeado).
- **Selección de método de pago:** opción "Tarjeta" visible pero deshabilitada — decidir si se oculta o se prioriza en roadmap.
- **Redirección a pasarela:** tiempo fijo de `setTimeout` (3s) sin manejo de error, timeout o latencia real — riesgo directo para HAB-05 (optimización del flujo).
- **Autenticación:** sin validación real contra banco o PSE; cualquier dato no vacío pasa — a resolver con HAB-02 (autenticación propia) y HAB-11 (identidad unificada).
- **Registro:** sin validación de formato (email, documento, celular) más allá de atributos `required`; sin manejo de usuario duplicado.
- **Confirmación:** el flujo termina sin cierre explícito (no hay botón "volver a la tienda" ni redirección, ni comprobante descargable) — gap de UX a cerrar antes de producción.

Estos gaps son el punto de partida técnico concreto para los primeros sprints de HAB-02 y HAB-05.

---

## 10. Riesgos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Retraso en depuración de datos (HAB-01) | Bloquea toda la Ola 1 | Iniciar en paralelo a la definición del portal; tratar como bloqueante crítico de cronograma |
| Demora en habilitación PSP ante la SFC (6-18 meses) | Bloquea BNPL, escrow, remesas sin intermediación | Iniciar el trámite en Q3 2026 sin excepción; identificar zonas operables sin PSP mientras tanto |
| Coordinación con 49 bancos para débito/crédito único | Retrasa HAB-08/HAB-09, corazón del desacople | Pruebas de interoperabilidad progresivas (10-15 bancos antes de producción); migración gradual, no corte simultáneo |
| Bre-B captura RtP y pagos inmediatos antes que PSE | Pérdida de cuota de mercado en facturación y cobranza | Priorizar Ficha 06 y Ficha 19 en Ola 0-1; diseñar QR interoperable con Bre-B desde el inicio (no QR propietario) |
| Falsos positivos en control de fraude centralizado | Fricción en la experiencia, pérdida de conversión | Calibración cuidadosa del modelo; operación en tiempo real (<100ms) |
| Marco legal de escrow y pagos agénticos sin jurisprudencia en Colombia | Bloquea HAB-24/HAB-25 y HAB-30 | Iniciar consultas previas con la SFC en paralelo a las olas anteriores, no al final |

---

## 11. Métricas de éxito por ola

| Ola | Métricas clave |
|---|---|
| Ola 0 | Tasa de enrolamiento en el portal (primeros 3 meses), tasa de éxito transaccional, tasa de abandono, tiempo de flujo de checkout |
| Ola 1 | % de transacciones cursadas por débito/crédito único vs. canales legacy, tiempo de respuesta del motor de fraude (<100ms), cobertura de bancos migrados a API única |
| Ola 2 | # de cuentas agregadas por usuario activo, tasa de aprobación BNPL en checkout, tiempo de onboarding de comercio (objetivo: horas, no semanas) |
| Ola 3 | Tiempo de disposición de remesa (objetivo: mismo día), adopción de escrow en eCommerce, engagement con recomendaciones del gestor financiero IA |
| Ola 4 | Transacciones vía POS físico, # de agentes de IA conectados vía MCP, # de clientes White Label activos |

---

## 12. Anexos / documentos fuente

- `roadmap_portal_pse.html` — roadmap visual interactivo con las 27 fichas de casos de uso y las 5 olas.
- `habilitadores_roadmap_pse.md` — documento de referencia detallado de los 32 habilitadores (descripción, prerequisitos, consideraciones clave por habilitador).
- `service-blueprint-fase-0.md` — especificación del service blueprint del prototipo actual (Fase 0: checkout, pago PSE, autenticación/registro).
- `index.html`, `js/main.js`, `css/styles.css` — prototipo funcional de referencia (frontend estático, sin backend real).
