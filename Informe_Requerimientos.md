![][image1]	![][image2]

**U**niversidad **N**acional de **S**an **M**artín

ESCUELA PROFESIONAL DE INGENIERÍA DE SISTEMAS E INFORMÁTICA

*Facultad de Ingeniería de Sistemas e Informática*

# ***Requerimientos de negocio para sistema de punto de venta en la nube y facturación electrónica para Rumi Market***

Ingeniería de Requerimiento

***Estudiantes:***

Arevalo Romero, Nayelli Yuley Correa Torres, Joy Steven Rodas Cubas, Belther Alain Rosales Galvez, Enyanys Ariana

Vasquez Bardalez, Frank Edgardo

***Asesor:***

Ing. Dr. Elmer Ruiz Trigoso

Abril de 2026 Tarapoto \- Perú

**Índice**

[Historial de revisiones	3](#historial-de-revisiones)

1. [Requerimientos del negocio	4](#requerimientos-del-negocio)

   1. [Situación actual	4](#situación-actual)

   2. [Oportunidad del negocio	4](#oportunidad-del-negocio)

   3. [Objetivos de negocio y criterios de éxito	5](#objetivos-de-negocio-y-criterios-de-éxito)

   4. [Análisis de Riesgos del Negocio	5](#análisis-de-riesgos-del-negocio)

2. [Visión de la solución	7](#visión-de-la-solución)

   1. [Declaración de la visión de la solución	7](#declaración-de-la-visión-de-la-solución)

   2. [Funciones principales	7](#funciones-principales)

   3. [Suposiciones y dependencias	7](#suposiciones-y-dependencias)

   4. [Limitaciones y exclusiones	7](#limitaciones-y-exclusiones)

3. [Contexto del negocio	9](#contexto-del-negocio)

   1. [Perfil de los interesados (Stakeholders)	9](#perfil-de-los-interesados-\(stakeholders\)-tabla-1)

   2. [Ambiente de operación	10](#ambiente-de-operación)

# **Historial de revisiones** {#historial-de-revisiones}

| Autores | Fecha | Versión | Comentarios |
| :---- | :---- | :---- | :---- |
| et. al. | 11/04/2026 | 1.0 | Versión inicial: Elaboración de requerimientos para RUMI Market. |

1. # **Requerimientos del negocio** {#requerimientos-del-negocio}

   1. # **Situación actual** {#situación-actual}

RUMI Market, ubicado en el Jr. Bolognesi 1455, opera actualmente bajo un esquema de gestión de ventas que requiere modernización tecnológica para optimizar sus procesos operativos. Los puntos críticos identificados incluyen:

* **Procesos manuales:** Dependencia de registros manuales para la gestión de ventas y stock; actualmente usan cuadernos para anotar sus ventas.  
  * **Limitación en pagos:** Dificultad para integrar y conciliar de manera fluida múltiples métodos de pago modernos como Yape, Plin y transferencias bancarias. Adicionalmente, no tienen un registro de ingresos por método de pago, por lo que es difícil seguir los ingresos reales que perciben.  
    * **Facturación desarticulada:** La emisión de comprobantes de pago no está totalmente integrada con el flujo de venta en tiempo real, lo que genera retrasos en el servicio al cliente.  
    * **Gestión de inventario:** Falta de visibilidad inmediata sobre la disponibilidad de productos en el momento del despacho. Tienen un control en cuadernos del inventario que puede prestarse a equivocaciones.

  2. # **Oportunidad del negocio** {#oportunidad-del-negocio}

La implementación de un Sistema de Punto de Venta (POS) en la nube representa una ventaja competitiva estratégica para RUMI Market. Las oportunidades clave son:

* **Centralización cloud:** Acceso a la información de ventas e inventario desde cualquier ubicación, eliminando la dependencia de servidores físicos locales.  
  * **Automatización fiscal:** Integración nativa con servicios de facturación electrónica para cumplir con las normativas locales (boletas y facturas) de manera automática al finalizar cada transacción.  
    * **Omnicanalidad de pagos:** Capacidad de registrar y validar pagos electrónicos (Yape, Plin, tarjetas) mediante códigos de operación y confirmaciones visuales integradas en el flujo de caja.

    * **Escalabilidad:** Uso de API REST para el tratamiento de datos, permitiendo futuras expansiones o integraciones con módulos de CRM o programas de lealtad.

  3. # **Objetivos de negocio y criterios de éxito** {#objetivos-de-negocio-y-criterios-de-éxito}

     * **ON1:** Digitalizar el 100% de las transacciones de venta de RUMI Market en un entorno nube.  
     * **ON2:** Automatizar el control de existencias mediante la actualización en tiempo real.

     * **ON3:** Garantizar el cumplimiento tributario continuo de las microempresas.

     * **CE1:** El sistema permite procesar pagos mixtos y generar comprobantes digitales en menos de 30 segundos por transacción.  
     * **CE2:** Cada venta confirmada descuenta automáticamente el stock del inventario, disparando alertas de stock bajo.  
     * **CE3:** Generación exitosa de comprobantes electrónicos con los campos obligatorios y envío opcional al cliente.

  4. # **Análisis de Riesgos del Negocio** {#análisis-de-riesgos-del-negocio}

El riesgo de Competencia del mercado se considera de Severidad Alta e Impacto Medio. Dada la ubicación de RUMI Market, la aparición de nuevos competidores o cadenas con sistemas tecnológicos avanzados es constante. El impacto es moderado porque el sistema busca precisamente cerrar esa brecha; no obstante, si la competencia reacciona con mejores ofertas antes de consolidar el software, la recuperación de la inversión podría verse afectada por una reducción en el flujo de clientes.  
En cuanto a la Aparición de otros productos mejores que el nuestro, la Severidad es Media y el Impacto Bajo. En el sector de software POS, siempre surgen nuevas herramientas con funciones adicionales. Sin embargo, el diseño del sistema basado en API permite que el software de RUMI Market sea flexible y actualizable, lo que minimiza el riesgo de quedar obsoletos rápidamente frente a otras soluciones del mercado.  
Las Restricciones de tiempo presentan una Severidad Alta y un Impacto Alto. El cronograma del proyecto es ajustado, y cualquier demora en la configuración de la facturación

electrónica o en la carga de la base de datos de productos impediría cumplir con los objetivos de digitalización en las fechas previstas. Un retraso crítico obligaría a seguir usando el registro manual, postergando la visibilidad real de las ganancias y el control del inventario.  
La Resistencia al cambio por parte de los usuarios tiene una Severidad Media, pero su Impacto es Crítico. Este es uno de los puntos más delicados, ya que el personal está acostumbrado a la rapidez (aunque imprecisa) del cuaderno. Si los usuarios encuentran el sistema difícil o lento, podrían optar por no registrar todas las ventas, lo que anularía por completo la utilidad de los reportes y generaría descuadres de caja insalvables para la administración.  
Finalmente, los Problemas para la implementación se evalúan con una Severidad Media e Impacto Alto. Este riesgo incluye fallos técnicos como la inestabilidad del internet en el local o la falta de compatibilidad con el hardware (impresoras y escáneres). Si el sistema falla durante la puesta en marcha, se interrumpe la atención al público, provocando colas y una pérdida inmediata de confianza tanto de los empleados como de los clientes finales.

2. # **Visión de la solución** {#visión-de-la-solución}

   1. # **Declaración de la visión de la solución** {#declaración-de-la-visión-de-la-solución}

Para RUMI Market, que busca modernizar su gestión de ventas y cumplir con las normativas fiscales vigentes, el Sistema de Punto de Venta (POS) y Facturación Electrónica es una plataforma en la nube accesible desde cualquier dispositivo con conexión a internet. Este sistema permite registrar transacciones de venta, gestionar inventarios en tiempo real y emitir comprobantes electrónicos autorizados de manera automática. A diferencia de los procesos manuales actuales y sistemas locales limitados, nuestra solución garantiza la integridad de los datos, la agilidad en el servicio al cliente y la visibilidad total del negocio desde cualquier lugar.

2. # **Funciones principales** {#funciones-principales}

   * **FE1:** Registro de ventas con múltiples métodos de pago (Efectivo, Yape, Plin, Tarjetas).

     * **FE2:** Emisión de boletas y facturas electrónicas integradas con la SUNAT.

     * **FE3:** Gestión de catálogo de productos y control de stock en tiempo real.

     * **FE4:** Generación de reportes de ventas diarios y por método de pago.

     * **FE5:** Sincronización automática de datos en la nube.

     * **FE6:** Interfaz optimizada para pantallas táctiles y navegadores web.

   3. # **Suposiciones y dependencias** {#suposiciones-y-dependencias}

      * **SU1:** RUMI Market cuenta con una conexión a internet estable en el local para la sincronización y facturación.  
      * **SU2:** El personal operativo recibirá capacitación básica en el uso de la interfaz web del sistema.  
      * **DEP1:** La emisión de comprobantes electrónicos depende de la disponibilidad del servicio del Proveedor de Servicios Electrónicos (PSE) o la OSE autorizada por SUNAT.

   # **Limitaciones y Exclusiones**	 {#limitaciones-y-exclusiones}

   # 

   # **Exclusiones** 

      * **EX1:** No se desarrollará una aplicación móvil nativa (Android/iOS) en esta fase (se usará la versión web responsiva).

      * **EX2:** No se incluye la integración con sistemas de contabilidad externos de terceros.

   # **Limitaciones:**

      * **LI1:** El sistema requiere navegadores web modernos (Chrome, Firefox, Edge) para garantizar la compatibilidad de la interfaz.  
      * **LI2:** La validación de pagos Yape/Plin reside en la verificación manual del código de operación por parte del cajero, capturándolo en el sistema.

3. # **Contexto del negocio** {#contexto-del-negocio}

   1. **Perfil de los interesados (Stakeholders) Tabla 1**

*Perfil de los interesados para el sistema de RUMI Market*

| Stakeholder | Beneficio y valor percibido | Actitudes | Funciones de Interés mayor | Restricciones |
| :---- | :---- | :---- | :---- | :---- |
| Dueño de RUMI Market | Mejor control de ingresos y cumplimiento fiscal automático. | Entusiasta y comprometido con la mejora tecnológica. | Supervisión de ventas en tiempo real y reportes de rentabilidad. | Presupuesto inicial para el desarrollo del POS en la nube. |
| Personal de Ventas (Cajero) | Reducción del tiempo por venta y eliminación de registros manuales en papel. | Interés en simplificar sus tareas pero con cierta cautela ante el cambio digital. | Interfaz de venta rápida y registro de métodos de pago electrónicos (Yape/Plin). | Tiempo limitado para capacitación intensa durante horas laborales. |
| Clientes del Market | Servicio más ágil y recepción digital de comprobantes de pago. | Positiva, valoran la rapidez y la transparencia de la transacción. | Validación de su pago y entrega puntual de su boleta electrónica. | Ninguna identificada. |
| SUNAT | Mayor transparencia fiscal y formalización de las microempresas. | Regulatoria y de cumplimiento estricto. | Validación y recepción de comprobantes electrónicos en tiempo real. | Cumplimiento obligatorio de normativas vigentes. |

*Nota.* La tabla detalla las expectativas y limitaciones de los actores clave involucrados en la implementación del sistema POS.

2. # **Ambiente de operación** {#ambiente-de-operación}

   * **Distribución:** Operación local centralizada en Jr. Bolognesi 1455 con acceso remoto desde cualquier ubicación vía web.  
     * **Disponibilidad:** El sistema POS debe estar operativo durante todo el horario de atención al público (Mañanas y Tardes).  
     * **Autenticación:** Cada cajero y el administrador tendrán credenciales únicas (usuario y contraseña) para el tracking de ventas.  
     * **Carga de usuarios:** Se espera un uso concurrente bajo (1-3 cajas simultáneas) pero con alta frecuencia de transacciones individuales.  
     * **Hardware:** El sistema se ejecutará en computadoras de escritorio estándar, laptops o tablets con navegadores web actualizados.

[image1]: <data:image/png;base64,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>

[image2]: <data:image/png;base64,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>