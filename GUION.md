# Guion de exposición · Sistemas neumáticos

20 diapositivas · 12 min 25 s estimados. El caso de estudio conserva una plantilla para completar.

## 1. Sistemas neumáticos

**Tiempo:** 15 segundos · 0:00–0:15

En esta presentación veremos cómo una máquina utiliza el aire comprimido para realizar movimientos. Nos concentraremos en las válvulas que controlan el aire, los actuadores que lo convierten en trabajo y la integración de estos componentes en procesos industriales.

## 2. Del aire atmosférico al consumo

**Tiempo:** 25 segundos · 0:15–0:40

Como ya vimos en clase, el aire se comprime, se almacena y se acondiciona antes de distribuirse a los equipos. Aquí solo necesitamos recordar ese recorrido. Nuestra presentación comienza en el último bloque: la máquina consumidora, donde el aire disponible se controla y se utiliza para realizar una operación.

## 3. Controlar el aire. Realizar trabajo.

**Tiempo:** 35 segundos · 0:40–1:15

Dentro de esta máquina encontramos una válvula conectada al suministro y un cilindro conectado a la válvula mediante mangueras. La válvula establece por dónde circula el aire. El cilindro transforma la acción de ese aire en movimiento y empuja la pieza. Además, existe una señal que ordena el cambio de la válvula. Conviene distinguir esa orden del aire que aporta la energía.

## 4. Un ciclo de avance y retorno

**Tiempo:** 45 segundos · 1:15–2:00

Primero, el cilindro está retraído y la máquina espera la orden. Al activar la válvula, el aire entra a una cámara del cilindro y el aire de la cámara opuesta sale por el escape. La diferencia de fuerzas mueve el émbolo y el vástago empuja la pieza. Al retirar la orden, la válvula de este ejemplo vuelve a su posición inicial e invierte las conexiones para producir el retorno. Ahora vamos a estudiar los componentes que hacen posible esta secuencia.

## 5. Fuerza y velocidad

**Tiempo:** 45 segundos · 2:00–2:45

Para entender el sistema necesitamos distinguir presión y caudal. La presión, junto con el área del émbolo, determina la fuerza teórica disponible. El caudal está relacionado con la velocidad a la que se llena o vacía la cámara y, por tanto, con la velocidad del movimiento. Son relaciones útiles, aunque el comportamiento real también depende de la carga, la fricción y las restricciones del circuito. Aumentar la presión no equivale simplemente a ajustar la velocidad. En la relación de caudal usamos el volumen en las condiciones de la cámara, no litros normalizados.

## 6. Cuatro funciones de control

**Tiempo:** 30 segundos · 2:45–3:15

Las válvulas cumplen funciones distintas. Las direccionales establecen las conexiones de alimentación y escape. Las de caudal permiten ajustar la velocidad del actuador. Los reguladores ajustan la presión de trabajo y las antirretorno restringen el sentido de circulación. Nos concentraremos principalmente en las direccionales y en el control de caudal, porque explican cómo se gobierna el movimiento.

## 7. Vías y posiciones: 3/2 y 5/2

**Tiempo:** 60 segundos · 3:15–4:15

La denominación indica cuántas vías y posiciones tiene la válvula. Una 3/2 tiene tres vías y dos posiciones. En una configuración normalmente cerrada, al accionarla comunica la alimentación con el actuador; al volver al reposo, comunica el actuador con el escape. La 5/2 tiene cinco vías y dos posiciones. Puede alimentar una cámara mientras descarga la otra. Cuando conmuta, intercambia esas conexiones. Esta alternancia permite gobernar avance y retorno. Aquí mostramos cada cuadro por separado para seguir sus conexiones: en un símbolo completo, los dos cuadros se dibujan juntos.

## 8. La orden que cambia la válvula

**Tiempo:** 40 segundos · 4:15–4:55

Una válvula puede accionarse con un pulsador, por contacto mecánico, mediante una señal neumática o mediante una bobina eléctrica. También importa qué ocurre al retirar la orden. Una monoestable retorna a su posición de reposo, frecuentemente por un resorte. Una biestable conserva la última posición hasta recibir la orden contraria. Esta diferencia afecta la secuencia de la máquina. La posición de reposo debe evaluarse dentro del diseño del sistema; por sí sola no garantiza una condición segura.

## 9. Del aire al movimiento

**Tiempo:** 25 segundos · 4:55–5:20

Hasta ahora vimos cómo controlar el aire. Los actuadores aprovechan esa energía para realizar trabajo. Los cilindros producen desplazamiento lineal, los actuadores de giro cambian la orientación de un mecanismo y las pinzas permiten agarrar piezas. Por tanto, los cilindros forman parte de la familia de actuadores neumáticos.

## 10. Simple efecto y doble efecto

**Tiempo:** 50 segundos · 5:20–6:10

En un cilindro de simple efecto, el aire produce fuerza en un sentido. El retorno depende de un resorte o de una fuerza externa. En uno de doble efecto, el aire actúa alternadamente sobre ambos lados del émbolo, permitiendo realizar trabajo durante el avance y el retorno. En un cilindro convencional de vástago simple, las áreas efectivas son diferentes. A igual presión, la fuerza teórica de retorno es menor porque el vástago ocupa parte del área sobre la que actúa el aire.

## 11. ¿Cuánta fuerza puede producir?

**Tiempo:** 55 segundos · 6:10–7:05

Seleccionar un cilindro requiere conocer cuánto debe mover, qué distancia debe recorrer y a qué velocidad. Como ejemplo, con seis bar y un émbolo de veinte milímetros, obtenemos una fuerza teórica de avance de aproximadamente ciento ochenta y ocho newtons. Este cálculo supone escape a presión atmosférica y desprecia la fricción. La fuerza útil será menor si hay fricción o contrapresión. También debemos comprobar la carga, el margen de operación, el montaje y la capacidad de amortiguar el movimiento al final de la carrera. Los controles muestran cómo cambian presión, área y fuerza; no sustituyen la selección con catálogo.

## 12. Orientar y agarrar piezas

**Tiempo:** 30 segundos · 7:05–7:35

Cuando la operación requiere cambiar la orientación de una pieza, puede utilizarse un actuador de giro. Cuando requiere tomarla y soltarla, una pinza neumática transforma la acción del aire en apertura y cierre de sus dedos. La elección empieza por el movimiento requerido y después considera aspectos como torque, fuerza de agarre, dimensiones y carga.

## 13. Ajustar la velocidad

**Tiempo:** 40 segundos · 7:35–8:15

Para ajustar la velocidad se utilizan reguladores de caudal. El regulador unidireccional combina una restricción ajustable con un antirretorno: en un sentido limita el flujo y en el otro permite el paso libre. Una disposición habitual en cilindros de doble efecto consiste en regular el aire que sale de la cámara que se descarga. Podemos regular avance y retorno por separado. La válvula direccional decide el recorrido; estos reguladores ajustan cómo se desarrolla el movimiento.

## 14. La señal ordena. El aire mueve.

**Tiempo:** 40 segundos · 8:15–8:55

En la electroneumática, una señal eléctrica acciona la bobina de una válvula. El mando puede ser sencillo o formar parte de un control con relés o un PLC. La válvula conmuta y cambia el recorrido del aire que mueve el cilindro. Los sensores permiten confirmar estados, como que el cilindro llegó al final de su recorrido. Esto ayuda a coordinar la siguiente acción. La electricidad interviene en el mando, mientras que el aire comprimido aporta la energía para el movimiento de este actuador.

## 15. Movimientos cotidianos en producción

**Tiempo:** 25 segundos · 8:55–9:20

Estos sistemas aparecen en operaciones muy concretas. Un cilindro puede expulsar un producto rechazado después de una inspección. También puede sujetar una pieza durante un ensamble. Una pinza neumática puede tomar y liberar componentes dentro de una estación de manipulación. Son ejemplos de cómo distintos movimientos neumáticos participan en la producción.

## 16. ¿Cuándo conviene la neumática?

**Tiempo:** 50 segundos · 9:20–10:10

Desde el punto de vista industrial, la neumática puede facilitar la automatización de movimientos repetitivos con soluciones relativamente sencillas. La inversión inicial puede ser atractiva, especialmente en tareas simples y cuando la planta ya dispone de aire comprimido. Pero debemos evaluar el sistema completo. El aire tiene un costo energético, las fugas generan pérdidas y se necesita mantenimiento. Además, los circuitos convencionales presentan limitaciones para posicionar con precisión entre los extremos de la carrera. La decisión depende de la fuerza, la precisión, el ritmo de producción y el costo total durante la vida útil.

## 17. Neumática conectada y configurable

**Tiempo:** 40 segundos · 10:10–10:50

La evolución de la neumática incluye una integración más estrecha con el control digital. Las islas de válvulas agrupan funciones y pueden comunicar información de estado al sistema de automatización. También existen terminales que permiten configurar funciones neumáticas mediante software y realizar diagnósticos, por ejemplo de fugas. Esto puede facilitar ajustes y seguimiento del funcionamiento, aunque añade costo y complejidad. Estas capacidades dependen del equipo utilizado; no están presentes en cualquier válvula neumática.

## 18. Caso de estudio

**Tiempo:** 60 segundos · 10:50–11:50

Reserva un minuto para el caso que buscarás. Explica: empresa o proceso, necesidad, solución neumática y resultado documentado. Si no hay resultados medidos, presenta el aprendizaje sin inventar porcentajes. Completa los campos desde Personalizar y copia la configuración al archivo config.js para llevar el caso a otro equipo.

## 19. Componentes que trabajan juntos

**Tiempo:** 25 segundos · 11:50–12:15

Las válvulas establecen cómo circula el aire y los actuadores lo convierten en trabajo mecánico. El desempeño depende de seleccionar y combinar correctamente estos elementos. En la industria, la neumática resulta conveniente cuando sus capacidades responden a la operación y se evalúan tanto los requisitos técnicos como los costos de funcionamiento.

## 20. Fuentes técnicas

**Tiempo:** 10 segundos · 12:15–12:25

Estas son las principales fuentes técnicas consultadas, complementadas con el material de clase y la fuente del caso de estudio. Muchas gracias.
