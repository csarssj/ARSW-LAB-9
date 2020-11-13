### Escuela Colombiana de Ingeniería
### Arquitecturas de Software - ARSW

## Escalamiento en Azure con Maquinas Virtuales, Sacale Sets y Service Plans

### Dependencias
* Cree una cuenta gratuita dentro de Azure. Para hacerlo puede guiarse de esta [documentación](https://azure.microsoft.com/en-us/free/search/?&ef_id=Cj0KCQiA2ITuBRDkARIsAMK9Q7MuvuTqIfK15LWfaM7bLL_QsBbC5XhJJezUbcfx-qAnfPjH568chTMaAkAsEALw_wcB:G:s&OCID=AID2000068_SEM_alOkB9ZE&MarinID=alOkB9ZE_368060503322_%2Bazure_b_c__79187603991_kwd-23159435208&lnkd=Google_Azure_Brand&dclid=CjgKEAiA2ITuBRDchty8lqPlzS4SJAC3x4k1mAxU7XNhWdOSESfffUnMNjLWcAIuikQnj3C4U8xRG_D_BwE). Al hacerlo usted contará con $200 USD para gastar durante 1 mes.

### Parte 0 - Entendiendo el escenario de calidad

Adjunto a este laboratorio usted podrá encontrar una aplicación totalmente desarrollada que tiene como objetivo calcular el enésimo valor de la secuencia de Fibonnaci.

**Escalabilidad**
Cuando un conjunto de usuarios consulta un enésimo número (superior a 1000000) de la secuencia de Fibonacci de forma concurrente y el sistema se encuentra bajo condiciones normales de operación, todas las peticiones deben ser respondidas y el consumo de CPU del sistema no puede superar el 70%.

### Escalabilidad Serverless (Functions)

1. Cree una Function App tal cual como se muestra en las  imagenes.

![](images/part3/part3-function-config.png)

![](images/part3/part3-function-configii.png)

2. Instale la extensión de **Azure Functions** para Visual Studio Code.

![](images/part3/part3-install-extension.png)

3. Despliegue la Function de Fibonacci a Azure usando Visual Studio Code. La primera vez que lo haga se le va a pedir autenticarse, siga las instrucciones.

![](images/part3/part3-deploy-function-1.png)

![](images/part3/part3-deploy-function-2.png)

4. Dirijase al portal de Azure y pruebe la function.

![](images/part3/part3-test-function.png)

5. Modifique la coleción de POSTMAN con NEWMAN de tal forma que pueda enviar 10 peticiones concurrentes. Verifique los resultados y presente un informe.

6. Cree una nueva Function que resuleva el problema de Fibonacci pero esta vez utilice un enfoque recursivo con memoization. Pruebe la función varias veces, después no haga nada por al menos 5 minutos. Pruebe la función de nuevo con los valores anteriores. ¿Cuál es el comportamiento?.

**Preguntas**

* ¿Qué es un Azure Function?

    - Se pueden dedifnir como pequeños scripts o funciones que se ejecutan en la nube. Por lo que no es necesario contar con una infraestructura especifica para ejecutalo    logrando que el proceso de desarollo sea mas productivo.

* ¿Qué es serverless?

    - Su definición sería algo como "computación sin servidor" es un modelo de computacion que consiste en el concepto de desarollar cosas en la nube. El desarollador solo se enfoca en codificar las "funciones" o los "scripts" pero la infraestructura y todo lo que se necesite para ejecutar esa función se encuentra en la nube ofrecido por proveedores en este tipo de computación. Las conocidas FaaS.

* ¿Qué es el runtime y que implica seleccionarlo al momento de crear el Function App?
  
    - Es el intervalo de tiempo en el que un programa de computadora se ejecuta en un sistema operativo. En Azure esta principalmente está relacionado con la versión de .NET en la que se basa el tiempo de ejecución.al seleccionar un plan, en este caso el plan Consumption y la versión de runtime 2, se especifica que la duracion es de 5 minutos, osea el tiempo que se mantendra ejecutando la función en memoria de manera continua en la nube.

* ¿Por qué es necesario crear un Storage Account de la mano de un Function App?

    - Porque el Storage Account nos proporciona un espacio de nombres unico para poder almacenar todos los datos
provenientes de Azure Storage, y sean accesiles a través de HTTP

* ¿Cuáles son los tipos de planes para un Function App?, ¿En qué se diferencias?, mencione ventajas y desventajas de cada uno de ellos.

    - Existen tres tipos de planes para un Function App:
    
        1. Plan Consumo: Cuando usa el plan de consumo, las instancias del host de Azure Functions se agregan y quitan dinámicamente según la cantidad de eventos entrantes. Este plan sin servidor se escala automáticamente y se le cobra por los recursos informáticos solo cuando sus funciones están en ejecución.
        
            - Pague solo cuando sus funciones se estén ejecutando
            - Escale automáticamente, incluso durante períodos de alta carga
        
        2. Plan Premiun: El plan Premium de Azure Functions ofrece a los clientes las mismas características y el mismo mecanismo de escalado que se utilizan en el plan Consumos in arranque en frío, con rendimiento mejorado y acceso a VNET. El plan Premium de Azure Functions se factura según el volumen de vCPU y memoria que consumen las funciones.
        
            - Instancias perpetuamente calientes para evitar cualquier arranque en frío
            - Conectividad de red virtual
            - Duración de ejecución ilimitada (60 minutos garantizados)
            - Tamaños de instancia premium (instancias de un núcleo, dos núcleos y cuatro núcleos)
            - Precios más predecibles
            - Asignación de aplicaciones de alta densidad para planes con aplicaciones de múltiples funciones
        
        3. Plan de Azure App Service: Sus aplicaciones de función también pueden ejecutarse en las mismas máquinas virtuales dedicadas que otras aplicaciones de App Service (SKU básicas, estándar, premium y aisladas).
            
            - Tiene máquinas virtuales infrautilizadas existentes que ya están ejecutando otras instancias de App Service.
            - Desea proporcionar una imagen personalizada en la que ejecutar sus funciones.


* ¿Por qué la memoization falla o no funciona de forma correcta?


* ¿Cómo funciona el sistema de facturación de las Function App?
    
    - El plan de consumo de Azure Functions se factura en función del consumo de recursos y las ejecuciones por segundo pero esto puede variar según el plan:
        
        1. Plan Consumo: Solo se le cobrará por el tiempo que se ejecute la aplicación de funciones. Este plan incluye una concesión gratuita por suscripción.
        
        2. Plan Premiun: Proporciona las mismas características y mecanismo de escalado que el plan de consumo, pero con un rendimiento mejorado y acceso a redes virtuales. El costo se basa en el plan de tarifa elegido. Para más información, consulte Plan Premium de Azure Functions.
        
        3. Plan de Azure App Service: Cuando necesite ejecutar en máquinas virtuales dedicadas o en aislamiento, utilice imágenes personalizadas o quiera usar el exceso de capacidad del plan de App Service. Usa la facturación del plan de App Service regular. El costo se basa en el plan de tarifa elegido

* Informe
