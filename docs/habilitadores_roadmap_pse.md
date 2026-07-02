# Habilitadores de la Nueva Plataforma ACH / Portal PSE
## Documento de referencia para vistas de detalle
**Versión:** 1.0 — Julio 2026
**Uso:** Insumo para la construcción de fichas de detalle por habilitador

---

## Marco de lectura

Los habilitadores son las capacidades de infraestructura, arquitectura, datos, legal y ecosistema que hacen posible la operación y evolución de la plataforma. No son visibles para el usuario final, pero sin ellos ningún caso de uso de la capa de servicio es sostenible. Están organizados por ola de implementación y referenciados a la capa arquitectónica que les corresponde.

**Capas de referencia:**
- **L1 — Ecosistema:** Orígenes, canales y actores externos
- **L2 — Integración unificada:** APIs, eventos, conectores, SDKs
- **L3 — Compensación y liquidación (ACH Core):** Compensación, liquidación, conciliación, reportes
- **L4 — Capacidades financieras core:** Débito, crédito, reversión
- **L5 — Orquestación y control:** Identidad, autenticación, fraude, KYC, límites
- **L6 — Servicios:** Experiencias y casos de uso (capa de servicio — no habilitadores)

---

---

# OLA 0 · Q3–Q4 2026
## Encender el Portal / Proteger la Operación

---

### HAB-01 · Auditoría y depuración de datos de usuarios

**Ola:** 0
**Capa:** L3 — Compensación y liquidación / Datos
**Prioridad:** Bloqueante — prerequisito de todos los habilitadores que dependen de datos

**Descripción**
PSE registra aproximadamente 20 millones de usuarios, de los cuales cerca de 13,8 millones se consideran activos. Sin embargo, la calidad del dato es incierta: hay duplicados, registros incompletos, cuentas inactivas sin depuración, información de entidad desactualizada y campos clave vacíos o inconsistentes. Este habilitador consiste en realizar un inventario exhaustivo del estado real de los datos de usuarios, definir los criterios de calidad requeridos para cada caso de uso futuro, ejecutar el proceso de limpieza y establecer los estándares de gobernanza de datos que prevengan la degradación futura.

**¿Qué habilita?**
- El Portal PSE con experiencia personalizada real
- El DataLake unificado con datos confiables
- El gestor financiero con IA (los modelos solo son tan buenos como los datos que los alimentan)
- El marketing de pagos y la segmentación de usuarios
- El KYC continuo y el control de fraude centralizado

**Prerequisitos**
- Inventario de fuentes de datos actuales (bases por producto, CRM, operadores)
- Definición de criterios de calidad por campo y por caso de uso
- Acceso a los sistemas fuente para lectura y corrección

**Consideraciones clave**
- La depuración no puede interrumpir la operación transaccional actual
- Debe definirse una política de retención y actualización continua de datos
- Es el prerequisito más subestimado del proyecto — su retraso bloquea la Ola 1

---

### HAB-02 · Portal PSE — Estructura base y autenticación propia

**Ola:** 0
**Capa:** L5 — Orquestación y control / L6 (punto de entrada)
**Prioridad:** Alta — primer entregable visible para el usuario

**Descripción**
Construcción de la estructura base del Portal PSE como producto digital propio de ACH: sistema de diseño, arquitectura frontend, flujos de navegación y, de manera central, un mecanismo de autenticación que pertenece a ACH y no al banco del usuario. Hoy el usuario se autentica en el banco para pagar con PSE — el portal rompe esa dependencia y establece una identidad propia del usuario en el ecosistema ACH. En esta etapa el portal expone las capacidades existentes (historial transaccional, pago de facturas) con una experiencia mejorada, sin reemplazar el flujo de pago actual.

**¿Qué habilita?**
- Punto de contacto directo ACH ↔ usuario (por primera vez en la historia de PSE)
- La identidad unificada (HAB-08) tiene aquí su punto de entrada
- Todos los casos de uso de la capa de servicio que requieren sesión del usuario
- La fidelización y el marketing de pagos (el usuario debe tener cuenta propia en el portal)

**Prerequisitos**
- Definición del sistema de diseño y brand del portal
- Decisión de arquitectura: tecnología frontend, hosting, estrategia de despliegue
- Acuerdo con entidades financieras sobre la coexistencia del portal con sus propios flujos
- Inicio de HAB-01 (datos de usuarios para enrolamiento)

**Consideraciones clave**
- El portal debe coexistir con el flujo actual sin interrumpirlo durante la transición
- La autenticación propia debe ser segura, simple y no generar fricción adicional al usuario
- La experiencia debe adaptarse al ritmo del usuario en la gestión del dinero: ocultar complejidad operativa/regulatoria y priorizar velocidad, claridad y control percibido
- Es el artefacto más visible del proyecto — define la percepción inicial del cambio

---

### HAB-03 · Habilitación legal como PSP

**Ola:** 0 (inicio) → Ola 1 (confirmación)
**Capa:** Regulatorio / Gobernanza
**Prioridad:** Crítica — bloquea la operación de múltiples casos de uso sin ella

**Descripción**
ACH Colombia opera actualmente bajo la figura de Sistema de Pago de Bajo Valor. La habilitación como Proveedor de Servicios de Pago (PSP) ante la Superintendencia Financiera de Colombia (SFC) otorga libertades operativas que la figura actual no permite: mayor autonomía para definir alianzas, ofrecer servicios directamente al usuario final sin intermediación bancaria obligatoria, y operar casos de uso como el BNPL, el escrow digital y las remesas sin depender de autorizaciones caso por caso. Este habilitador es un proceso regulatorio de mediano plazo que debe iniciarse en Q3 2026 para estar disponible en Ola 1-2.

**¿Qué habilita?**
- Operación de BNPL sin depender de cada banco como originador
- Escrow digital con custodia de fondos propia
- Recepción de remesas y operaciones crossborder
- Alianzas directas con fintechs sin intermediación bancaria obligatoria
- Mayor velocidad para lanzar nuevos servicios sin aprobación regulatoria caso por caso

**Prerequisitos**
- Diagnóstico legal del modelo operativo actual vs. modelo PSP
- Definición del alcance de los servicios que se quieren habilitar bajo PSP
- Equipo legal interno o externo especializado en regulación de pagos (SFC)
- Alineación con la junta directiva sobre el cambio de figura regulatoria

**Consideraciones clave**
- El proceso ante la SFC puede tomar entre 6 y 18 meses — debe iniciarse en Q3 2026 sin excepción
- Mientras se completa, hay zonas de operación permitidas que no requieren PSP — identificarlas es parte del trabajo
- La habilitación PSP cambia el modelo de relacionamiento con los bancos — requiere gestión de expectativas del ecosistema

---

### HAB-04 · Enrolamiento de usuarios en el portal

**Ola:** 0
**Capa:** L5 — Orquestación y control
**Prioridad:** Alta — define la masa crítica de usuarios con identidad propia en el portal

**Descripción**
Proceso y flujo para que los usuarios existentes de PSE (27M+ registrados, 13,8M activos) migren o creen su cuenta en el Portal PSE. El enrolamiento incluye verificación de identidad básica, vinculación de la cuenta PSE preexistente, consentimientos de uso de datos y configuración inicial (entidad favorita, instrumentos preferidos). En esta etapa el enrolamiento es manual (el usuario lo hace activamente); en Ola 2 se automatiza con IA.

**¿Qué habilita?**
- Base de usuarios activos en el portal para todos los casos de uso de la capa de servicio
- Datos de identidad verificada para el control de fraude y el KYC
- Punto de partida para la personalización y el marketing de pagos
- Métricas reales de adopción del portal como producto propio

**Prerequisitos**
- HAB-02 (portal con autenticación propia) activo
- HAB-01 (datos depurados) para no enrolar con datos incorrectos
- Estrategia de incentivos para la migración activa de usuarios existentes
- Comunicación y campaña de adopción del portal

**Consideraciones clave**
- El enrolamiento masivo no puede realizarse sin datos de calidad — HAB-01 es bloqueante
- Debe definirse el flujo mínimo: qué datos se requieren para enrolar vs. cuáles se enriquecen después
- La tasa de enrolamiento en los primeros 3 meses es la métrica más importante del portal en Ola 0

---

### HAB-05 · Optimización del flujo transaccional actual

**Ola:** 0
**Capa:** L5 — Orquestación / L6 — Servicios (flujo existente)
**Prioridad:** Alta — impacto inmediato en métricas de negocio actuales

**Descripción**
Mejora del flujo de pago actual de PSE sin reemplazarlo: reducción de campos en el checkout (de 7+ a 3), implementación de reintentos automáticos cuando una transacción falla por razones técnicas recuperables, mejora de los mensajes de error para que el usuario entienda qué pasó y qué hacer, y persistencia del contexto transaccional para que un reintento no obligue al usuario a ingresar nuevamente todos sus datos. Este habilitador no cambia la arquitectura subyacente — mejora la experiencia sobre lo que ya existe.

**¿Qué habilita?**
- Reducción inmediata de la tasa de abandono del flujo actual
- Menor pérdida de transacciones por errores técnicos recuperables
- Mejor percepción del usuario y los comercios sobre la calidad del canal PSE
- Datos más limpios sobre causas reales de rechazo (separar errores técnicos de rechazos legítimos)

**Prerequisitos**
- Diagnóstico de las causas actuales de abandono y rechazo por categoría
- Acuerdos con entidades financieras sobre el estándar de mensajes de error que envían
- Capacidad técnica para modificar el flujo sin afectar la operación

**Consideraciones clave**
- Es el habilitador de mayor impacto a corto plazo con menor riesgo de implementación
- Debe medirse antes y después: tasa de éxito transaccional, tiempo de flujo, tasa de abandono
- Los mensajes de error mejorados requieren coordinación con los bancos — cada uno envía sus propios códigos

---

### HAB-06 · Primer módulo de integración unificada (API inicial)

**Ola:** 0
**Capa:** L2 — Integración unificada
**Prioridad:** Alta — base técnica de la estrategia de alianzas

**Descripción**
Diseño e implementación del primer módulo de la capa de integración unificada: una API estandarizada que permite a los primeros aliados (fintechs, billeteras) conectarse al ecosistema ACH sin necesidad de implementar los múltiples protocolos y versiones que existen hoy. Este primer módulo no reemplaza las integraciones actuales con bancos — crea un canal paralelo, limpio y moderno para los nuevos participantes. Incluye documentación, sandbox de pruebas y proceso de certificación simplificado.

**¿Qué habilita?**
- Las primeras alianzas con fintechs y billeteras (HAB-07) tienen aquí su soporte técnico
- La API única para bancos y comercios (HAB-10) en Ola 1 evoluciona desde este módulo
- El onboarding automatizado de nuevos integradores en Ola 2
- La estrategia de White Label en Ola 4

**Prerequisitos**
- Definición del estándar de API (REST, eventos, autenticación OAuth 2.0 o similar)
- Sandbox técnico disponible para que los aliados prueben sin afectar producción
- Equipo de developer relations para acompañar las primeras integraciones

**Consideraciones clave**
- El estándar de API definido aquí debe ser el mismo que se escale en Ola 1 — no puede cambiarse sin romper integraciones ya activas
- La documentación técnica de calidad es tan importante como el código — determina la velocidad de adopción
- Debe ser compatible con los estándares emergentes de Open Finance en Colombia

---

### HAB-07 · Primeras alianzas con fintechs y billeteras

**Ola:** 0
**Capa:** L1 — Ecosistema
**Prioridad:** Alta — define la velocidad de construcción del ecosistema

**Descripción**
Identificación, negociación y formalización de alianzas con los primeros participantes del ecosistema que tienen APIs expuestas y capacidad de integración ágil: fintechs de crédito (BNPL), billeteras digitales (Nequi, Daviplata, Movii), fintechs de Open Finance (Belvo, Prometeo) y operadores de remesas. Estas alianzas no esperan a los bancos — empiezan con los actores más ágiles para construir masa crítica de servicios y demostrar el modelo antes de negociar con las entidades más lentas.

**¿Qué habilita?**
- Agregación de cuentas H1 (Ola 2) — las billeteras son los primeros proveedores de datos
- BNPL en el checkout (Ola 2) — las fintechs de crédito son los primeros originadores
- Remesas (Ola 3) — los operadores son los primeros conectores crossborder
- Demostración de modelo ante los bancos: "ya operamos con X fintechs, ahora los invitamos a ustedes"

**Prerequisitos**
- HAB-06 (API inicial) disponible para que los aliados puedan integrarse técnicamente
- Marco contractual estándar de alianzas definido por el equipo legal
- Identificación de los 5-10 aliados prioritarios por caso de uso

**Consideraciones clave**
- Las alianzas con fintechs no requieren la misma negociación que con bancos — son más ágiles pero requieren acuerdos de datos claros
- Definir desde el inicio el modelo de revenue sharing para cada tipo de alianza
- La estrategia es: "no pedir permiso al ecosistema bancario, construir valor y luego invitarlos"

---

---

# OLA 1 · Q1–Q2 2027
## Desacoplar y Unificar

---

### HAB-08 · Débito único

**Ola:** 1
**Capa:** L4 — Capacidades financieras core
**Prioridad:** Crítica — corazón del desacople arquitectónico

**Descripción**
Construcción de un único mecanismo reutilizable para extraer dinero desde cualquier instrumento de origen: cuenta de ahorros, cuenta corriente, tarjeta de débito, tarjeta de crédito, línea de crédito preaprobada, billetera digital o fondos precargados. Hoy PSE tiene entre 4 y 6 canales distintos de conexión con los bancos dependiendo del instrumento — cada uno con su propio protocolo, versión y lógica de manejo de errores. El débito único reemplaza todos esos canales por un carril de alta velocidad con un motor de reglas interno que decide cómo ejecutar el débito según el instrumento, la entidad y las condiciones de la transacción. Para el servicio que lo consume, es siempre la misma llamada.

**¿Qué habilita?**
- Cualquier caso de uso que requiera extraer dinero de cualquier instrumento (prácticamente todos los CUs)
- La selección dinámica de instrumento en el checkout (Ficha 01)
- El BNPL como instrumento nativo (Ficha 05)
- La tarjeta prepago PSE (Ficha 03) — carga desde múltiples cuentas
- El multi-débito desde agregación de cuentas

**Prerequisitos**
- HAB-01 (datos de cuentas y entidades depurados)
- Acuerdos técnicos con los 49 bancos para estandarizar el canal de débito
- Definición del motor de reglas: qué criterios determinan cómo se ejecuta un débito
- Pruebas de interoperabilidad con al menos 10-15 bancos antes del lanzamiento en producción

**Consideraciones clave**
- Es la capacidad más difícil técnicamente del roadmap — requiere coordinación con 49 entidades
- El motor de reglas interno debe ser parametrizable sin cambios de código: nuevas reglas = nueva configuración
- La idempotencia es crítica: un débito debe ejecutarse exactamente una vez aunque haya reintentos
- Debe estar diseñado para ser independiente del canal (PSE, Bre-B, RtP, físico) desde el inicio

---

### HAB-09 · Crédito único

**Ola:** 1
**Capa:** L4 — Capacidades financieras core
**Prioridad:** Crítica — complemento del débito único para cerrar el ciclo de pago

**Descripción**
Mecanismo unificado para acreditar dinero en cualquier destino: cuentas bancarias de cualquier entidad del ecosistema ACH, billeteras digitales, tarjetas prepago y otros instrumentos. Hoy el crédito también está fragmentado por tipo de instrumento destino y por entidad. El crédito único abstrae esa complejidad en una sola capacidad que decide internamente la ruta de acreditación óptima según el destino, los tiempos de liquidación disponibles y las condiciones de la transacción. Es el mecanismo que hace posible la dispersión de nómina, el pago a proveedores, las remesas y cualquier otro caso donde ACH debe entregar dinero a un destinatario.

**¿Qué habilita?**
- Dispersión de nómina y proveedores (Fichas 17, 21)
- Recepción de remesas con acreditación inmediata (Ficha 09)
- Cashback y beneficios de marketing de pagos (Ficha 11)
- Anticipo de factoring a la cuenta del cedente (Ficha 15)
- Toda capacidad futura que requiera enviar dinero a cualquier destino

**Prerequisitos**
- HAB-08 (débito único) — ambas capacidades se diseñan en paralelo y son complementarias
- Estándares de acreditación con todas las entidades del ecosistema
- Definición de los tiempos de liquidación por tipo de crédito y entidad destino

**Consideraciones clave**
- El crédito único debe soportar acreditación inmediata (Bre-B), en lote y diferida según el caso de uso
- Debe manejar el caso de fallo en la acreditación: qué pasa con los fondos si el destino no está disponible
- La notificación al receptor del crédito es parte del servicio, no una capa adicional

---

### HAB-10 · Reversión estándar

**Ola:** 1
**Capa:** L4 — Capacidades financieras core
**Prioridad:** Alta — cierra el ciclo completo de la transacción

**Descripción**
Capacidad estándar para devolver fondos al origen de una transacción, ya sea por solicitud del usuario, por decisión del comercio, por fallo técnico o por una regla de negocio del escrow. Hoy PSE carece de flujos nativos para gestionar el ciclo completo de una transacción — las devoluciones y reversiones son un punto ciego operativo que se resuelve caso por caso con intervención manual. La reversión estándar es un débito con características específicas que el sistema identifica y procesa de forma diferenciada, con trazabilidad completa desde el origen hasta la acreditación de vuelta.

**¿Qué habilita?**
- Devoluciones en eCommerce sin intervención manual de back office
- El escrow digital (Fichas 10, 22) — la liberación o devolución de fondos retenidos
- El BNPL (Ficha 05) — reversión de cuotas en caso de devolución del bien
- Confianza del usuario: saber que puede recuperar su dinero es prerequisito de la adopción

**Prerequisitos**
- HAB-08 y HAB-09 — la reversión es una combinación de ambos
- Definición del modelo regulatorio de reversiones (plazos, condiciones, responsables)
- Acuerdos con bancos sobre el manejo de reversiones en cada tipo de instrumento

**Consideraciones clave**
- Los plazos de reversión varían por instrumento: tarjeta vs. cuenta corriente vs. billetera tienen tiempos distintos
- Debe ser auditable: cada reversión debe tener trazabilidad completa del motivo y el flujo
- El usuario debe recibir notificación proactiva del estado de su reversión

---

### HAB-11 · Identidad unificada y autenticación biométrica

**Ola:** 1
**Capa:** L5 — Orquestación y control
**Prioridad:** Crítica — base del conocimiento del iniciador

**Descripción**
Capa propia de ACH que identifica de forma unívoca al usuario o empresa detrás de cada transacción, independientemente del canal de entrada (portal, API, app tercero, POS). Hoy PSE no conoce al usuario final — solo conoce el banco desde donde llegó la transacción. La identidad unificada cambia eso: ACH sabe quién inicia, con qué instrumento, desde dónde y con qué historial. Sobre esta capa se implementa la autenticación biométrica como estándar de seguridad habilitador del one-click (PSD2-alineado): el usuario que ya está identificado y tiene su identidad verificada puede autorizar una transacción con un factor biométrico sin redirigir al banco.

**¿Qué habilita?**
- One-click / autenticación sin redirección bancaria (Ficha 01)
- El control de fraude centralizado (HAB-12) — no hay control de fraude real sin identidad unificada
- El KYC continuo (HAB-16) — el perfil de riesgo se construye sobre la identidad verificada
- La personalización real de la experiencia en el portal
- Los pagos agénticos en Ola 4 — el agente necesita saber con certeza quién autoriza

**Prerequisitos**
- HAB-02 (portal con autenticación propia) — la identidad unificada vive encima del portal
- HAB-04 (enrolamiento de usuarios) — el usuario debe estar enrolado para tener identidad propia
- Marco legal de identidad digital y consentimientos (HABEAS DATA, regulación biométrica)
- Decisión de tecnología: biometría facial, huella dactilar, llave de dispositivo o combinación

**Consideraciones clave**
- La biometría debe ser opcional en primera instancia y gradualmente incentivada, no forzada
- El estándar PSD2 es una referencia internacional — su adaptación al contexto colombiano requiere revisión regulatoria
- La identidad unificada no reemplaza la autenticación bancaria para transacciones de alto valor — las complementa

---

### HAB-12 · Control de fraude centralizado

**Ola:** 1
**Capa:** L5 — Orquestación y control
**Prioridad:** Crítica — riesgo reputacional y financiero directamente relacionado

**Descripción**
Extracción del control de fraude de los silos actuales por producto (PSE tiene su propio control, cada banco tiene el suyo) y construcción de una capa centralizada que evalúa el riesgo de cada transacción con visibilidad completa del comportamiento del usuario a través de todos los productos y canales de ACH. El motor de fraude centralizado consume la identidad unificada (HAB-11) y los datos del DataLake (HAB-13) para construir un perfil de riesgo dinámico por usuario, detectar anomalías en tiempo real y tomar decisiones de autorización, reto o bloqueo antes de que la transacción llegue al banco.

**¿Qué habilita?**
- Reducción de la tasa de fraude en el ecosistema ACH
- Autorización de transacciones de bajo riesgo sin redirección al banco (one-click)
- El KYC continuo y la detección de comportamientos inusuales a lo largo del ciclo de vida del cliente
- Mayor confianza de los comercios en el canal PSE — hoy absorben la reputación de fallas que no controlan

**Prerequisitos**
- HAB-11 (identidad unificada) — sin identidad centralizada no hay perfil de riesgo centralizado
- HAB-13 (DataLake unificado) — el motor de fraude consume datos históricos de comportamiento
- Integración con centrales de riesgo (DataCrédito, TransUnion) y listas de control
- Definición del modelo de decisión: reglas, modelos de ML o combinación

**Consideraciones clave**
- El control de fraude centralizado debe operar en tiempo real (<100ms) para no afectar la experiencia de pago
- Los falsos positivos son tan dañinos como el fraude no detectado — el modelo debe calibrarse cuidadosamente
- Requiere acuerdo con los bancos sobre quién tiene la última palabra en una transacción marcada como riesgosa

---

### HAB-13 · DataLake unificado

**Ola:** 1
**Capa:** L3 — Compensación y liquidación / Datos
**Prioridad:** Alta — elimina los silos de reportería y habilita la inteligencia de datos

**Descripción**
Construcción del repositorio único de datos transaccionales de ACH, alimentado en tiempo real o near-real-time por todos los productos y canales. Hoy la información está distribuida en silos por producto — PSE tiene sus reportes, Bre-B tendrá los suyos, y no hay una vista integrada del ecosistema. El DataLake unificado consolida todo en un solo lugar, con una capa de presentación parametrizable que permite a entidades, comercios y el propio equipo de ACH consumir datos según sus necesidades. Es también la fuente que alimenta los modelos de IA para fraude, scoring crediticio, gestor financiero y personalización.

**¿Qué habilita?**
- Reportería unificada para entidades financieras y comercios (sin silos por producto)
- El gestor financiero con IA (Ficha 07) — necesita datos históricos consolidados del usuario
- El marketing de pagos (Ficha 11) — la segmentación se construye sobre datos del DataLake
- El control de fraude centralizado (HAB-12) — consume datos históricos para construir perfiles
- El producto de datos como activo comercial diferenciado para comercios

**Prerequisitos**
- HAB-01 (datos depurados) — el DataLake debe llenarse con datos de calidad
- Definición de la arquitectura de datos: esquema, modelo de gobernanza, política de retención
- Definición de los niveles de acceso: datos operacionales vs. datos analíticos vs. datos comercializables
- Cumplimiento de la regulación de protección de datos (Ley 1581 de 2012, Habeas Data)

**Consideraciones clave**
- El DataLake no es un volcado de datos — requiere modelado, etiquetado y gobernanza desde el inicio
- Debe separar claramente datos operacionales (para la operación del día a día) de datos analíticos (para inteligencia)
- La monetización de datos requiere anonimización robusta y consentimiento explícito del usuario

---

### HAB-14 · API única para bancos y comercios

**Ola:** 1
**Capa:** L2 — Integración unificada
**Prioridad:** Crítica — elimina la fragmentación de integraciones actuales

**Descripción**
Evolución del primer módulo de integración (HAB-06) hacia un estándar único de conexión para todos los participantes del ecosistema: bancos, pasarelas, comercios y fintechs se conectan a la plataforma ACH a través de un único contrato de API, sin importar qué servicio quieren consumir. Hoy los 49 bancos tienen integraciones heterogéneas con versiones y protocolos distintos. El API única estandariza esa superficie de integración y traslada la complejidad al interior de la plataforma ACH, donde se resuelve con el motor de reglas de débito/crédito único. Incluye un portal de desarrolladores, documentación completa y un proceso de certificación simplificado y automatizable.

**¿Qué habilita?**
- Incorporación de nuevos participantes al ecosistema en días, no en meses
- El onboarding automatizado de comercios y entidades (HAB-16)
- La estrategia de White Label (Ola 4) — terceros consumen las capacidades ACH vía API
- El SDK/Kit para integradores que reduce aún más la fricción de integración

**Prerequisitos**
- HAB-08, HAB-09, HAB-10 (capacidades financieras core) — la API expone estas capacidades
- HAB-06 (primer módulo de API) — este habilitador es su evolución y expansión
- Acuerdos con todos los bancos del ecosistema para migrar a la nueva API en un plazo definido

**Consideraciones clave**
- La migración de los bancos a la API única debe ser gradual — no se puede forzar un corte simultáneo de 49 entidades
- Versionamiento de la API: la versión actual debe mantenerse activa mientras los bancos migran
- El portal de desarrolladores y la documentación son tan críticos como el código de la API

---

---

# OLA 2 · Q3–Q4 2027
## Expandir el Hub

---

### HAB-15 · Integración con fintechs y billeteras (Open Finance H1)

**Ola:** 2
**Capa:** L1 — Ecosistema / L2 — Integración
**Prioridad:** Alta — base de la agregación de cuentas y del hub financiero

**Descripción**
Formalización e implementación técnica de las integraciones con los primeros proveedores de datos financieros del ecosistema: billeteras digitales (Nequi, Daviplata, Movii) y fintechs con APIs expuestas. Estas integraciones no esperan la regulación completa de Open Finance — aprovechan las APIs que ya existen y los acuerdos de datos bilaterales para construir el primer conjunto de cuentas agregables desde el portal PSE. Cada integración sigue el conector estándar del módulo de agregación (HAB-16), lo que permite incorporar nuevos proveedores de forma paramétrica sin desarrollos adicionales.

**¿Qué habilita?**
- Agregación de cuentas H1 para personas naturales (Ficha 04)
- Agregación empresarial H1 para tesorería (Ficha 13)
- La base de datos del usuario financiero que alimenta el gestor financiero con IA
- Cross-selling basado en el perfil financiero real del usuario

**Prerequisitos**
- HAB-07 (alianzas firmadas con los primeros participantes)
- HAB-14 (API única) — los nuevos proveedores se integran por la misma vía estándar
- Marco de consentimientos claro para que el usuario autorice el acceso a sus datos en otras entidades
- Acuerdos de nivel de servicio con cada proveedor de datos (SLA de disponibilidad, frecuencia de actualización)

**Consideraciones clave**
- Las billeteras tienen millones de usuarios — la integración tiene un impacto inmediato en la utilidad del portal
- Debe definirse qué datos se comparten (saldos sí, movimientos históricos tal vez, datos personales con restricciones)
- El consentimiento del usuario es el elemento más delicado — debe ser explícito, granular y revocable

---

### HAB-16 · Módulo de agregación de cuentas

**Ola:** 2
**Capa:** L2 — Integración / L5 — Orquestación
**Prioridad:** Alta — núcleo técnico del hub financiero

**Descripción**
Componente de software que consolida y normaliza la información de cuentas de múltiples entidades financieras en una vista unificada para el usuario. Recibe datos de diferentes fuentes (bancos, billeteras, fintechs) con diferentes formatos, frecuencias y protocolos, y los transforma en un modelo de datos común que el portal puede presentar de manera consistente. Incluye gestión de consentimientos, caché inteligente de datos para reducir llamadas innecesarias a las entidades, y un conector paramétrico que permite agregar nuevas entidades sin desarrollar un conector desde cero para cada una.

**¿Qué habilita?**
- La vista consolidada de saldos en el portal (Ficha 04 — H1)
- La selección automática del instrumento con más fondos en el momento del pago
- El dashboard financiero personal y empresarial (Fichas 07, 13)
- El multi-débito: pagar una transacción grande con fondos de múltiples cuentas

**Prerequisitos**
- HAB-15 (integraciones con proveedores de datos)
- HAB-11 (identidad unificada) — el módulo debe saber a qué usuario corresponde cada cuenta agregada
- Modelo de datos de cuentas definido: qué campos son obligatorios, cuáles opcionales
- Política de frecuencia de actualización de saldos (tiempo real vs. diferida)

**Consideraciones clave**
- La disponibilidad del módulo depende de la disponibilidad de las entidades fuente — debe manejar fallos parciales sin colapsar
- El usuario debe poder ver cuándo fue la última actualización de cada saldo
- El modelo de conector paramétrico es la inversión más importante: con él, sumar un banco nuevo cuesta horas, no semanas

---

### HAB-17 · Onboarding automatizado con IA

**Ola:** 2
**Capa:** L5 — Orquestación y control
**Prioridad:** Alta — elimina una de las principales barreras de adopción

**Descripción**
Automatización del proceso de registro y activación tanto para usuarios personas como para comercios y empresas. Hoy el onboarding de un comercio puede tomar semanas de documentación, revisión manual y correos de ida y vuelta. Con IA, el proceso incluye verificación de identidad en tiempo real (liveness check, validación de documento, cruce con bases de datos oficiales), análisis automatizado de documentos empresariales y aprobación en horas o minutos para el 80% de los casos. Los casos que requieren revisión humana se escalan a un flujo asistido, no bloqueado.

**¿Qué habilita?**
- Vinculación eficiente de comercios al ecosistema PSE (hoy es una barrera crítica)
- Acceso de pymes y microempresas a la plataforma sin los requisitos que hoy las excluyen
- El crecimiento del ecosistema sin crecer proporcionalmente el equipo de operaciones
- La inclusión financiera en el canal tradicional (HAB-18 requiere que los tenderos puedan registrarse fácilmente)

**Prerequisitos**
- HAB-11 (identidad unificada) — el onboarding con IA construye sobre la misma capa de identidad
- Integración con fuentes de datos oficiales: RUNT, RUES, Cámara de Comercio, listas de control
- Definición del flujo de onboarding por tipo de participante: persona natural, empresa, pasarela, banco
- Marco legal de KYC digital aprobado por la SFC

**Consideraciones clave**
- El onboarding automatizado no puede ser sinónimo de onboarding sin control — la IA debe ser supervisada
- Debe definirse el umbral de riesgo para aprobación automática vs. revisión humana
- La experiencia del onboarding determina la primera impresión de la plataforma para los nuevos participantes

---

### HAB-18 · KYC continuo

**Ola:** 2
**Capa:** L5 — Orquestación y control
**Prioridad:** Media-Alta — diferenciador regulatorio y de gestión de riesgo

**Descripción**
Evolución del KYC (Know Your Customer) desde un proceso puntual al inicio de la relación hacia un monitoreo continuo del comportamiento del cliente a lo largo de su ciclo de vida en la plataforma. El KYC continuo usa los datos del DataLake (HAB-13) y la identidad unificada (HAB-11) para detectar cambios en el perfil de riesgo del usuario — variaciones inusuales en volumen, nuevos patrones de transacción, señales de alerta en fuentes externas — y actuar proactivamente antes de que se materialice un riesgo regulatorio o de fraude.

**¿Qué habilita?**
- Cumplimiento regulatorio AML/LAFT de manera más eficiente que el KYC estático
- Actualización automática del perfil de riesgo sin requerir intervención del usuario
- Mayor confianza de las entidades financieras en la plataforma ACH como operador seguro
- Escalabilidad del ecosistema sin crecimiento proporcional del equipo de cumplimiento

**Prerequisitos**
- HAB-13 (DataLake unificado) — el KYC continuo consume datos históricos de comportamiento
- HAB-11 (identidad unificada) — el monitoreo es por persona identificada, no por transacción anónima
- Marco regulatorio de monitoreo continuo alineado con la UIAF y la SFC
- Modelos de detección de anomalías calibrados con datos históricos de la plataforma

**Consideraciones clave**
- El KYC continuo no puede traducirse en fricción para el usuario cuando no hay señales de riesgo
- Las alertas generadas deben ser accionables — no un volumen inmanejable de falsos positivos
- Requiere un equipo de cumplimiento capaz de actuar sobre las alertas que el sistema no puede resolver automáticamente

---

### HAB-19 · Módulo BNPL — Integración con originadores de crédito

**Ola:** 2
**Capa:** L2 — Integración / L4 — Capacidades financieras
**Prioridad:** Alta — habilita el instrumento de mayor crecimiento en el mercado colombiano

**Descripción**
Componente que integra a ACH con originadores de crédito (fintechs BNPL, bancos con cupo preaprobado) para ofrecer crédito inmediato como instrumento de pago nativo en el checkout del portal. El módulo gestiona la solicitud en tiempo real, el score de crédito devuelto por el originador, la presentación de la oferta al usuario, la aprobación y la acreditación al comercio. ACH actúa como orquestador: no otorga el crédito ni asume el riesgo, sino que conecta la necesidad del usuario con la oferta del originador en el momento exacto del pago.

**¿Qué habilita?**
- BNPL como instrumento nativo en el checkout (Ficha 05)
- Crédito productivo para empresas en el portal B2B (Ficha 14)
- BNPL para pago de planilla de independientes (Ficha 08)
- Incremento de la tasa de conversión en el checkout al eliminar el "no tengo fondos ahora"

**Prerequisitos**
- HAB-08 (débito único) — el BNPL genera un crédito del originador que se acredita al comercio mediante el crédito único
- Acuerdos comerciales con al menos 2 originadores (Addi u otros) antes del lanzamiento
- Integración técnica con los APIs de scoring y originación de cada partner
- Marco legal de la intermediación: ACH como plataforma tecnológica, no como entidad de crédito

**Consideraciones clave**
- El tiempo de respuesta del scoring es crítico: si tarda más de 2-3 segundos, el usuario abandona
- ACH debe definir si cobra al comercio, al originador o a ambos por la intermediación
- El módulo debe ser multi-originador desde el diseño: el usuario puede ver offers de distintos proveedores

---

### HAB-20 · Tarjeta prepago virtual — Acuerdo con banco sponsor

**Ola:** 2
**Capa:** L1 — Ecosistema / L4 — Capacidades financieras
**Prioridad:** Media — amplía la presencia de PSE a los pagos digitales cotidianos

**Descripción**
Habilitación del instrumento de tarjeta virtual PSE mediante un acuerdo con un banco sponsor que emite el plástico bajo su licencia regulatoria. ACH diseña la experiencia, define las reglas de carga y uso, y controla el portal del usuario. El banco sponsor provee la infraestructura de emisión, el BIN (número identificador del banco), la certificación con la franquicia (Visa o Mastercard) y el cumplimiento regulatorio de la emisión. Este modelo permite a ACH ofrecer una tarjeta PSE sin convertirse en emisor regulado.

**¿Qué habilita?**
- Tarjeta virtual PSE para pagos digitales (Ficha 03) — primer paso
- Presencia de PSE en cualquier comercio digital que acepte la franquicia
- Carga de la tarjeta desde cualquier cuenta agregada en el portal
- La tarjeta física en Ola 3 — el acuerdo con el sponsor se activa aquí y se extiende al plástico después

**Prerequisitos**
- HAB-15 y HAB-16 (agregación de cuentas) — la tarjeta se carga desde cuentas del portal
- Acuerdo firmado con banco sponsor: comisiones, responsabilidades, SLAs de servicio
- Certificación con la franquicia (proceso de Visa o Mastercard que puede tomar 3-6 meses)
- Definición del producto: límites, categorías permitidas, soporte de disputas

**Consideraciones clave**
- La selección del banco sponsor es estratégica — debe ser un aliado, no un competidor en el mismo espacio
- Las disputas y chargebacks del plástico son responsabilidad del sponsor, pero la experiencia del usuario la gestiona ACH
- El modelo de sponsor es una solución temporal — en el largo plazo ACH puede explorar la emisión directa bajo PSP

---

### HAB-21 · Módulo de factoring — Integración con RADIAN/DIAN

**Ola:** 2
**Capa:** L2 — Integración / L3 — Compensación
**Prioridad:** Media — abre un mercado de alto valor con infraestructura única de ACH

**Descripción**
Integración técnica con RADIAN (Registro de Facturas Electrónicas de la DIAN) para leer, validar y gestionar facturas electrónicas dentro del portal PSE. Este módulo es el soporte técnico del Factoring ACH (Ficha 15): permite a una empresa cargar sus facturas directamente desde RADIAN sin digitación manual, verificar su estado de aceptación por la empresa pagadora, y iniciar el proceso de negociación con cesionarios. La integración con RADIAN también habilita el confirming: la empresa pagadora puede autorizar desde el portal que sus facturas estén disponibles para que sus proveedores las negocien anticipadamente.

**¿Qué habilita?**
- Factoring ACH MVP (Ficha 15) — carga y negociación de facturas desde el portal
- Confirming para grandes empresas pagadoras con cadena de proveedores pyme
- Automatización de la conciliación de facturas vs. pagos en el ciclo de cuentas por pagar/cobrar
- Datos de facturas electrónicas como señal de calidad crediticia para el scoring de crédito

**Prerequisitos**
- Acceso técnico a la API de RADIAN (disponible públicamente con credenciales DIAN)
- Acuerdos con al menos 2 cesionarios (bancos o fintechs de factoring) para la primera versión
- Marco legal de la cesión de facturas electrónicas y el rol de ACH como intermediario tecnológico
- HAB-09 (crédito único) — el anticipo del factoring es un crédito del cesionario a la cuenta del cedente

**Consideraciones clave**
- RADIAN tiene más de 9 millones de documentos electrónicos diarios — la integración debe ser robusta y escalable
- El tiempo entre la solicitud de factoring y el anticipo en la cuenta es el principal diferenciador competitivo: objetivo <24 horas
- ACH debe definir su modelo de negocio en factoring: ¿cobra al cedente, al cesionario, o comparte el spread?

---

---

# OLA 3 · Q1–Q2 2028
## Nuevos Mercados

---

### HAB-22 · Capa multi-moneda

**Ola:** 3
**Capa:** L3 — Compensación y liquidación / L4 — Capacidades financieras
**Prioridad:** Alta — prerequisito de remesas, crossborder y expansión internacional

**Descripción**
Extensión de las capacidades financieras core (débito, crédito, reversión) para soportar transacciones en monedas distintas al peso colombiano. Incluye: gestión de tipos de cambio en tiempo real, liquidación en múltiples monedas, conversión automática en el punto de pago según las condiciones del usuario, y trazabilidad del valor en la moneda original a lo largo del ciclo de vida de la transacción. La capa multi-moneda no convierte a ACH en una casa de cambio — usa tasas de cambio de proveedores externos y ejecuta la conversión en el momento acordado con el usuario.

**¿Qué habilita?**
- Remesas con disposición inmediata en pesos desde la recepción en divisas (Ficha 09)
- Tarjeta prepago física con soporte en el exterior (Ficha 03)
- Pago de planilla para colombianos en el exterior (Ficha 08)
- Pagos crossborder para personas y empresas (Fichas 01, 17)
- La expansión de la plataforma a un segundo mercado de la región en Ola 4

**Prerequisitos**
- HAB-08, HAB-09 (débito y crédito únicos) — la multi-moneda es una extensión de estas capacidades, no un reemplazo
- Acuerdo con proveedor de tipos de cambio en tiempo real (Reuters, Bloomberg o fintech de FX)
- Marco regulatorio: operaciones en moneda extranjera bajo la regulación cambiaria colombiana (DIAN, Banco de la República)
- Definición del modelo de gestión del riesgo cambiario: ¿quién asume la variación entre el momento del débito y el crédito?

**Consideraciones clave**
- El riesgo cambiario entre el débito y el crédito puede ser significativo — debe cubrirse con un mecanismo de hedging o con tiempos de liquidación muy cortos
- La regulación cambiaria colombiana define límites y requisitos para operaciones en divisa — el equipo legal debe validar cada caso de uso
- La presentación al usuario del tipo de cambio aplicado debe ser transparente y en tiempo real

---

### HAB-23 · Integración con operadores de remesas internacionales

**Ola:** 3
**Capa:** L1 — Ecosistema / L2 — Integración
**Prioridad:** Alta — activa el segmento de mayor crecimiento en el mercado colombiano

**Descripción**
Integración técnica y comercial con operadores de remesas internacionales (Wise, Remitly, MoneyGram, Western Union, bancos corresponsales) para recibir notificaciones en tiempo real de remesas destinadas a usuarios del portal PSE y acreditarlas de manera inmediata en el instrumento que el usuario elija (cuenta, tarjeta, cashout). El módulo de integración gestiona los diferentes protocolos de cada operador, normaliza la información de la remesa y la presenta al usuario con sus opciones de disposición antes de que el dinero esté disponible en Colombia.

**¿Qué habilita?**
- Remesas con notificación y disposición inmediata (Ficha 09)
- El cashout de remesas en la red de aliados físicos (Ficha 02)
- La recarga de la tarjeta PSE con fondos de remesa
- Datos del flujo de remesas como insumo para servicios financieros adicionales (crédito, seguros)

**Prerequisitos**
- HAB-22 (capa multi-moneda) — las remesas llegan en dólares o euros y se convierten a pesos
- HAB-09 (crédito único) — la acreditación al usuario se hace por la misma vía
- Acuerdos comerciales con al menos 2 operadores antes del lanzamiento
- Registro ante el Banco de la República como entidad que canaliza remesas (si aplica bajo la figura PSP)

**Consideraciones clave**
- Los 2.1 millones de receptores de remesas en Colombia son el mercado inmediato — una fracción que se registre en el portal tiene impacto significativo
- La velocidad de acreditación es el principal diferenciador: mismo día vs. 1-3 días de las casas de cambio
- El costo de la remesa para el usuario final no debe aumentar por la intermediación de ACH — la propuesta de valor es la conveniencia, no el precio

---

### HAB-24 · Módulo de escrow digital — Motor de reglas y custodia

**Ola:** 3
**Capa:** L4 — Capacidades financieras / L5 — Orquestación
**Prioridad:** Media — diferenciador de largo plazo sin urgencia inmediata

**Descripción**
Componente que gestiona la retención temporal de fondos bajo condiciones de negocio definidas por las partes de una transacción. El motor de reglas del escrow permite configurar: la condición que activa la liberación de fondos (confirmación de entrega, verificación de hito, señal de tercero verificador), el tiempo máximo de retención antes de liberación automática, el proceso de disputa si la condición no se cumple, y las comisiones por el servicio de custodia. Los fondos retenidos se segregan de los fondos operacionales de ACH y se mantienen en una cuenta específica hasta su liberación.

**¿Qué habilita?**
- Escrow digital B2C para eCommerce, transporte y servicios (Ficha 10)
- Escrow digital B2B para contratos entre empresas (Ficha 22)
- Modelos de cobro variable (ajuste post-servicio) que hoy no tienen soporte en el ecosistema colombiano
- Confianza entre partes que no se conocen en transacciones de mediano y alto valor

**Prerequisitos**
- HAB-25 (marco legal del escrow) — el módulo técnico no puede operar sin el respaldo regulatorio
- HAB-08, HAB-09 (débito y crédito únicos) — el escrow es un débito diferido + crédito condicional
- HAB-10 (reversión estándar) — el escrow puede terminar en una reversión si la condición no se cumple
- Definición del modelo de cuentas de custodia: cómo se segregan los fondos y bajo qué figura regulatoria

**Consideraciones clave**
- La segregación de fondos en custodia tiene implicaciones regulatorias — requiere aprobación de la SFC
- El motor de reglas debe ser lo suficientemente flexible para cubrir casos de uso muy distintos (eCommerce vs. construcción) sin desarrollos específicos para cada uno
- El tiempo de resolución de disputas es el punto más crítico para la confianza del usuario en el modelo de escrow

---

### HAB-25 · Marco legal del escrow

**Ola:** 3
**Capa:** Regulatorio / Legal
**Prioridad:** Alta (bloqueante de HAB-24) — sin marco legal no hay escrow

**Descripción**
Desarrollo del marco jurídico que habilita a ACH para custodiar fondos de terceros bajo condiciones de negocio específicas. Incluye: la figura contractual bajo la cual ACH actúa (mandatario, fiduciario simplificado u otra figura reconocida por la SFC), los límites de monto y plazo de custodia permitidos, el proceso regulatorio de reporte de fondos en custodia, las obligaciones de ACH en caso de disputa entre las partes, y la protección del usuario en caso de insolvencia de ACH (segregación regulatoria de los fondos). Este marco debe ser revisado y aprobado por la SFC antes de la activación del módulo técnico.

**¿Qué habilita?**
- HAB-24 (módulo de escrow) — sin este marco legal, el módulo técnico no puede operar
- Fichas 10 y 22 (escrow B2C y B2B)
- Mayor confianza del ecosistema en ACH como custodio de fondos
- Posibilidad de expandir el modelo de custodia a otros casos de uso futuros

**Prerequisitos**
- Habilitación PSP (HAB-03) — la figura PSP puede ser la base para la custodia de fondos
- Equipo legal especializado en regulación financiera y derecho fiduciario
- Análisis comparativo de modelos de escrow en otros mercados de la región (México, Brasil, Chile)
- Consultas previas con la SFC antes de presentar la solicitud formal

**Consideraciones clave**
- Este proceso regulatorio puede tomar 12-18 meses — debe iniciarse en paralelo con las olas anteriores, no al final de Ola 2
- La figura de custodia más simple posible reduce el tiempo de aprobación regulatoria — empezar con el modelo mínimo viable
- La comunicación con el usuario sobre la segregación de sus fondos en custodia es un elemento de confianza crítico

---

### HAB-26 · Plataforma de marketing de pagos

**Ola:** 3
**Capa:** L5 — Orquestación / L2 — Integración
**Prioridad:** Media — activa la monetización de datos y la fidelización

**Descripción**
Infraestructura para la activación de beneficios, descuentos y cashback a usuarios del portal PSE, basada en segmentación por comportamiento transaccional. Incluye: motor de segmentación que agrupa usuarios por categorías de gasto, frecuencia, volúmenes y preferencias; motor de reglas para la activación de beneficios (cuándo, a quién, en qué condición); integración con los sistemas de liquidación para la acreditación del cashback; y panel de control para que los anunciantes definan sus campañas, revisen métricas de alcance y conversión, y gestionen su presupuesto de beneficios. Todo sobre datos anonimizados y con consentimiento explícito del usuario.

**¿Qué habilita?**
- Marketing de pagos B2C (Ficha 11) — descuentos, cashback y puntos para personas
- Marketing de pagos B2B (Ficha 23) — marketplace y beneficios corporativos
- Monetización de los datos transaccionales de ACH como activo comercial
- Fidelización y retención de usuarios activos en el portal

**Prerequisitos**
- HAB-13 (DataLake unificado) — la segmentación se construye sobre los datos históricos
- HAB-11 (identidad unificada) — la activación de beneficios es por usuario identificado
- Consentimiento explícito del usuario para el uso de sus datos en personalización comercial
- Acuerdos con los primeros anunciantes antes del lanzamiento (mínimo 3-5 marcas piloto)

**Consideraciones clave**
- La plataforma de marketing de pagos no puede sentirse como publicidad invasiva — el usuario debe percibir valor, no ruido
- La regulación de protección de datos limita los usos permitidos de la información transaccional — el equipo legal debe validar cada tipo de segmentación
- El modelo de revenue sharing con anunciantes debe estar definido antes de activar la primera campaña

---

### HAB-27 · Gestor financiero con IA

**Ola:** 3
**Capa:** L5 — Orquestación / L6 — Servicios
**Prioridad:** Media — diferenciador de largo plazo y palanca de retención

**Descripción**
Modelos de inteligencia artificial entrenados sobre los datos transaccionales del portal PSE para ofrecer al usuario análisis, recomendaciones y capacidad de ejecución de instrucciones financieras en lenguaje natural. El gestor financiero tiene tres niveles de evolución: (1) analítico — muestra patrones, proyecciones y alertas; (2) consultivo — sugiere acciones específicas ("tienes $200k sin usar, podrías pagar el crédito X"); (3) ejecutivo — el usuario autoriza al gestor a ejecutar acciones (pagar facturas, mover fondos, programar pagos). El nivel 3 es el PSE agéntico que se completa en Ola 4.

**¿Qué habilita?**
- Gestión financiera general con IA (Ficha 07) — capas analítica y consultiva
- Rentabilización de excedentes: el gestor detecta fondos ociosos y sugiere instrumentos de inversión
- Mejor experiencia de usuario = mayor retención y mayor volumen transaccional en el portal
- El PSE agéntico de Ola 4 — los modelos entrenados en Ola 3 son la base del agente ejecutivo

**Prerequisitos**
- HAB-13 (DataLake unificado) con al menos 12-18 meses de datos históricos de calidad
- HAB-16 (agregación de cuentas) — el gestor necesita visibilidad completa de las finanzas del usuario
- Equipo de data science capaz de desarrollar y mantener los modelos
- Marco legal de uso de IA en servicios financieros (transparencia, explicabilidad, no discriminación)

**Consideraciones clave**
- Los modelos de IA financiera deben ser explicables — el usuario debe poder entender por qué el gestor sugiere algo
- La ejecución de instrucciones (nivel 3) requiere consentimiento explícito y mecanismo de confirmación robusto para prevenir errores
- La privacidad de los datos es el elemento más sensible — el usuario debe confiar en que su información no se usa fuera del servicio acordado

---

---

# OLA 4 · Q3 2028–Q1 2029 (stretch)
## Disrupción y Escala

---

### HAB-28 · Integración con POS y cajeros — Canal físico

**Ola:** 4
**Capa:** L1 — Ecosistema / L2 — Integración
**Prioridad:** Alta (para Ola 4) — lleva PSE al punto de venta físico por primera vez

**Descripción**
Habilitación de PSE como instrumento de pago en el punto de venta físico (POS, pinpads, cajeros automáticos) mediante QR interoperable y/o NFC. El usuario puede pagar en cualquier comercio físico usando el portal PSE — su saldo, su tarjeta prepago PSE o cualquier cuenta agregada — sin necesidad de tarjeta física del banco. La integración es con las redes de adquirencia existentes (Redeban, Credibanco) para que los comercios no tengan que cambiar su terminal, sino recibir PSE como una nueva forma de pago a través de los mismos dispositivos que ya tienen.

**¿Qué habilita?**
- PSE en el punto de venta físico (Ficha 01 extendida)
- Presencia de PSE en el día a día físico del usuario — compra de mercado, gasolina, restaurantes
- El cashout de remesas y fondos en puntos físicos habilitados (Ficha 02 extendida)
- Cierra la brecha entre el mundo digital y físico del ecosistema ACH

**Prerequisitos**
- HAB-20 (tarjeta prepago con franquicia) — la integración en POS usa la infraestructura de franquicia
- Acuerdos con redes de adquirencia (Redeban, Credibanco) para reconocer PSE como forma de pago
- QR interoperable compatible con el estándar Bre-B para no crear un QR paralelo
- HAB-11 (identidad unificada) — el pago en físico debe autenticarse de forma segura sin fricción

**Consideraciones clave**
- El QR de PSE debe ser interoperable con Bre-B desde el diseño — no puede ser un QR propietario separado
- La experiencia en POS debe ser igual o más simple que pagar con tarjeta débito — si es más compleja, no adoptará
- La comisión por transacción física debe ser competitiva con las comisiones de tarjeta débito actuales

---

### HAB-29 · Pagos desde redes sociales y apps de terceros

**Ola:** 4
**Capa:** L1 — Ecosistema / L2 — Integración
**Prioridad:** Media (Ola 4) — amplía el ecosistema de orígenes de transacción

**Descripción**
Integración de PSE como origen de pago en plataformas de redes sociales (WhatsApp, TikTok, Instagram) y aplicaciones de terceros (Netflix, Telcos, plataformas de apuestas) mediante APIs de pagos embedidos. El usuario puede iniciar y completar una transacción desde la aplicación donde ya está, sin salir a una pasarela externa. ACH provee la capa de orquestación y seguridad; la plataforma tercera integra el botón o el flujo de pago usando el SDK/API de PSE.

**¿Qué habilita?**
- Pagos en redes sociales como origen de transacción (Ficha 01 extendida)
- Casos como "pagar la suscripción de Netflix directamente desde la app" con cuenta bancaria colombiana
- Reach hacia segmentos jóvenes que viven en redes sociales y no en portales bancarios
- Nuevos canales de adquisición de usuarios para el portal PSE

**Prerequisitos**
- HAB-14 (API única) — las plataformas terceras se conectan vía la misma API estándar
- HAB-11 (identidad unificada) — el usuario que paga desde WhatsApp debe estar identificado
- Acuerdos específicos con cada plataforma: WhatsApp Business API, TikTok Shop, Instagram Checkout
- Marco de seguridad para pagos embedidos: cómo se autentica el usuario dentro de una app tercera

**Consideraciones clave**
- Los pagos embedidos en redes sociales tienen restricciones por parte de las plataformas — Meta, TikTok tienen sus propias reglas de qué pueden hacer las integraciones de pago
- La experiencia de pago dentro de una app tercera no puede requerir salir de esa app — debe ser nativa o casi nativa
- La seguridad en un contexto no controlado (app de tercero) es más compleja — el modelo de autenticación debe adaptarse

---

### HAB-30 · PSE agéntico y MCP (Model Context Protocol)

**Ola:** 4
**Capa:** L5 — Orquestación / L2 — Integración
**Prioridad:** Alta (Ola 4) — posiciona a ACH en la frontera del ecosistema de IA financiera

**Descripción**
Habilitación de PSE como plataforma que puede ser consumida por agentes de inteligencia artificial externos mediante el estándar MCP (Model Context Protocol). Un agente de IA (Claude, ChatGPT, Copilot u otros) puede conectarse a las capacidades PSE y ejecutar transacciones en nombre del usuario con su autorización: pagar una factura, transferir fondos, revisar saldos, programar pagos. El MCP define un protocolo estandarizado para que el agente interactúe con el sistema PSE de forma segura, con trazabilidad completa y con los mismos controles de fraude e identidad que cualquier transacción humana. Complementa el gestor financiero propio de PSE (HAB-27) con la capacidad de ser consumido por agentes externos.

**¿Qué habilita?**
- PSE agéntico completo (Ficha 07 extendida) — el usuario instruye en lenguaje natural y el agente ejecuta
- Integración con ecosistemas de IA (Claude, ChatGPT, Copilot) como interfaces de pago
- PSE como parte del ecosistema de herramientas que los agentes de IA pueden usar para gestionar las finanzas de sus usuarios
- Un modelo de distribución completamente nuevo: el agente es el canal, PSE es la infraestructura

**Prerequisitos**
- HAB-27 (gestor financiero con IA) — el agente propio de PSE es la primera implementación de los modelos que el MCP expone
- HAB-14 (API única) — el MCP se construye sobre la misma API estándar
- HAB-11 (identidad unificada) — el agente debe estar autorizado por el usuario identificado
- Marco de autorización delegada: cómo un usuario autoriza a un agente a actuar en su nombre con límites definidos
- Revisión legal y regulatoria de los pagos agénticos: ¿quién es responsable si el agente comete un error?

**Consideraciones clave**
- El MCP es un estándar emergente en 2025-2026 — PSE que lo adopte temprano tiene ventaja de posicionamiento en el ecosistema de IA
- Los controles de autorización son críticos: el agente solo puede ejecutar lo que el usuario autorizó explícitamente, con límites de monto y frecuencia
- La responsabilidad en transacciones agénticas es un área regulatoria sin jurisprudencia en Colombia — el equipo legal debe construir el marco desde cero

---

### HAB-31 · White Label — Modularización de capacidades para terceros

**Ola:** 4
**Capa:** L2 — Integración / L1 — Ecosistema
**Prioridad:** Media (Ola 4) — convierte la plataforma en un activo exportable

**Descripción**
Empaquetamiento de las capacidades de la plataforma ACH (débito único, crédito único, reversión, control de fraude, identidad, agregación de cuentas) como módulos vendibles a terceros que quieren ofrecer servicios financieros sin construir la infraestructura desde cero: bancos pequeños, cooperativas, fintechs de nicho, billeteras regionales. El modelo White Label permite que un tercero ofrezca bajo su propia marca un servicio de pagos, dispersión o factoring, usando la infraestructura de ACH como capa de procesamiento invisible. Es el paso de ser una plataforma de pagos a ser una plataforma de plataformas.

**¿Qué habilita?**
- Nuevas fuentes de ingreso sin nuevos usuarios directos — B2B2C y B2B2B
- Expansión del ecosistema ACH sin crecer el equipo proporcionalmente
- Reducción de la dependencia de los bancos grandes — los bancos pequeños y cooperativas se convierten en aliados que usan la infraestructura ACH
- El primer paso hacia la expansión regional: un banco de otro país puede conectarse como cliente White Label

**Prerequisitos**
- Toda la infraestructura de Olas 1-3 estable y probada en producción
- HAB-14 (API única) — el White Label es la API consumida por terceros con un modelo comercial diferente
- Modelo de precios y contratos de White Label definidos (SLA, soporte, revenue sharing, exclusividades)
- Capacidad de soporte dedicado para clientes White Label — no pueden usar el mismo canal de soporte que los usuarios finales

**Consideraciones clave**
- La marca PSE puede o no estar visible en las implementaciones White Label — debe definirse el modelo de marca para cada cliente
- Los clientes White Label heredan la regulación de ACH — deben cumplir los mismos estándares de KYC, AML y fraude
- La separación de datos entre clientes White Label es crítica para la privacidad y la competencia — cada cliente solo ve sus propios datos

---

### HAB-32 · Agregación de cuentas internacionales (H2)

**Ola:** 4
**Capa:** L1 — Ecosistema / L2 — Integración
**Prioridad:** Media (Ola 4) — completa la visión del hub financiero global

**Descripción**
Extensión del módulo de agregación de cuentas (HAB-16) para incluir cuentas bancarias en entidades del exterior: bancos de Estados Unidos, España y otros países con alta migración colombiana; cuentas de servicios financieros internacionales (Wise, Revolut, Payoneer); y fondos de inversión abiertos. Esta capacidad cierra la brecha para los colombianos en el exterior — pueden ver y gestionar sus finanzas globales desde el portal PSE — y para quienes reciben ingresos en divisas (freelancers, exportadores) que hoy no tienen un hub local donde consolidar su vida financiera internacional.

**¿Qué habilita?**
- Agregación de cuentas H2 (Ficha 04) — cuentas en bancos del exterior
- Gestión financiera global desde el portal: visibilidad de pesos y divisas en un solo lugar
- El usuario que recibe remesas puede ver de dónde viene el dinero antes de que llegue a Colombia
- Oportunidades de cross-selling: seguros de viaje, inversión en fondos internacionales, cambio de divisas

**Prerequisitos**
- HAB-22 (capa multi-moneda) — la agregación internacional requiere normalizar saldos en distintas monedas a una vista en pesos
- HAB-16 (módulo de agregación) — es una extensión del mismo módulo con conectores internacionales
- Acuerdos de intercambio de datos con entidades del exterior (bajo regulación GDPR en Europa, CCPA en EE.UU.)
- Regulación cambiaria: la visualización de cuentas del exterior puede tener implicaciones de reporte ante el Banco de la República

**Consideraciones clave**
- Los acuerdos de datos con entidades del exterior son más complejos que los locales — implican regulaciones de privacidad de otros países
- La experiencia debe ser simple para el usuario: ver sus cuentas en dólares y en pesos en la misma pantalla, sin preocuparse por los tipos de cambio
- Este habilitador posiciona a ACH para la eventual expansión regional — la infraestructura de agregación internacional es la misma que se necesitaría para operar en otro país

---

---

## Resumen por capa arquitectónica

| Capa | Habilitadores |
|------|---------------|
| **L1 — Ecosistema** | HAB-07, HAB-15, HAB-20, HAB-23, HAB-28, HAB-29, HAB-31, HAB-32 |
| **L2 — Integración unificada** | HAB-06, HAB-14, HAB-16, HAB-19, HAB-21, HAB-29, HAB-30, HAB-31 |
| **L3 — Compensación y liquidación** | HAB-01, HAB-13, HAB-22 |
| **L4 — Capacidades financieras core** | HAB-08, HAB-09, HAB-10, HAB-19, HAB-24 |
| **L5 — Orquestación y control** | HAB-02, HAB-04, HAB-11, HAB-12, HAB-16, HAB-17, HAB-18, HAB-26, HAB-27, HAB-30 |
| **Regulatorio / Legal / Gobernanza** | HAB-03, HAB-25 |

## Resumen por ola

| Ola | Habilitadores | Período |
|-----|---------------|---------|
| **Ola 0** | HAB-01 a HAB-07 | Q3–Q4 2026 |
| **Ola 1** | HAB-08 a HAB-14 | Q1–Q2 2027 |
| **Ola 2** | HAB-15 a HAB-21 | Q3–Q4 2027 |
| **Ola 3** | HAB-22 a HAB-27 | Q1–Q2 2028 |
| **Ola 4** | HAB-28 a HAB-32 | Q3 2028–Q1 2029 |

## Habilitadores bloqueantes (prerequisito de otros)

| Habilitador | Bloquea a |
|-------------|-----------|
| HAB-01 — Depuración de datos | HAB-04, HAB-13, HAB-17, HAB-27 |
| HAB-03 — Habilitación PSP | HAB-25, y múltiples CUs de Ola 2-3 |
| HAB-08 — Débito único | HAB-09, HAB-10, HAB-19, HAB-24 |
| HAB-11 — Identidad unificada | HAB-12, HAB-18, HAB-30 |
| HAB-13 — DataLake unificado | HAB-12, HAB-18, HAB-26, HAB-27 |
| HAB-22 — Multi-moneda | HAB-23, HAB-32 |
| HAB-25 — Marco legal escrow | HAB-24 |

---

*Documento producido como insumo para la construcción de vistas de detalle por habilitador — Portal PSE / Nueva Plataforma ACH Colombia, julio 2026.*
