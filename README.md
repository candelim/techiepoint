# Techiepoint

Repo para TechiePoint 2.0, con ejemplos para Openshift
Se trata de 2 ejemplos básicos usando nodejs (ejemplo1) y nodejs + mongodb (ejemplo2)
## Instalacion

Clonar el repositorio de https://github.com/candelim/techiepoint.git  

```bash
git clone https://github.com/candelim/techiepoint.git 
```
## Uso de comando OC

Una vez clonado el repositorio se puede comenzar usando el cliente OC

Acceso a la plataforma

```bash
oc login -u usuario https://miservidor.plataforma.com 
```

Verificar proyectos que tengo asignados

```bash
oc get projects
```

Ambientarse en un proyecto

```bash
oc project labs-desa
```

Verificar pods en ejecución

```bash
oc get pods
```

Verificar servicios

```bash
oc get svc
```

También se puede acceder al detalle de cada "objeto" (pod, servicio, etc)

```bash
oc describe svc/miservicio
```

Los BUILDs puede iniciarse creando una nueva aplicación

```bash
oc new-app repo.git
```

Los DEPLOYs pueden iniciarse en base a un build ya exitoso

```bash
oc rollout latest dc/miaplicacion
```

Más información puede obtenerse desde la documentación oficial de Openshift en https://docs.openshift.com/container-platform/4.1/welcome/index.html 
[Nota: verificar la versión instalada y la de la documentación ya que pueden variar algunos comandos] 

## Implementacion de Ejemplo 1

Creacion de la aplicación [BUILD + DEPLOY]

Este comando genere el buildconfig [bc] en base código fuente y unando una builder image (S2I - source to image)
El resultado genera un deployconfig [dc] en base a la imagen buildeada

```bash
oc new-app https://github.com/candelim/techiepoint.git --context-dir=/ejemplo1 --name=ejemplo1
```

Creación de una ruta

Se crea una ruta por defecto en el dominio que esté disponible

```bash
oc expose svc/ejemplo1
```

Carga de variables de entorno

Se modifica el deployconfig [dc] agregando variables de entorno. Otra alternativa es hacer esta carga por ConfigMaps o por Secrets
```bash
oc set env deployment/ejemplo1 MYNAME=Matias
```
Verificacion del servicio
```bash
curl http://url-ejemplo-servicio-expuesto.com/name
```

## Implementacion de Ejemplo 2

Despliegue de una base mongodb 3.2 en base a imagen del catálogo

Por fines prácticos se usan variables de entorno, pero la recomendación es que al ser datos sensibles, se usen secrets

```bash
oc new-app registry.access.redhat.com/rhscl/mongodb-32-rhel7 \
-e MONGODB_USER=techiepoint MONGODB_PASSWORD=techiepoint123 MONGODB_ADMIN_PASSWORD=techiepoint123 \
MONGODB_SERVICE=techiepoint MONGODB_DATABASE=ejemplo2 --name=techiepoint
```

Creación de la aplicación

Este comando genere el buildconfig [bc] en base código fuente y unando una builder image (S2I - source to image)
El resultado genera un deployconfig [dc] en base a la imagen buildeada

```bash
oc new-app https://github.com/candelim/techiepoint.git --context-dir=/ejemplo2 --name=ejemplo2
```

Carga de variables de entorno

Se deben cargar las variables de entorno para la conexión a la base de datos [la recomendación es que se usen secrets] 
```bash
oc env dc/ejemplo2 MONGODB_USER=techiepoint MONGODB_PASSWORD=techiepoint123 DATABASE_SERVICE_NAME=techiepoint MONGODB_PORT=27017 MONGODB_DATABASE=ejemplo2 --overwrite
```

Creación de una ruta

Se crea una ruta por defecto en el dominio que esté disponible

```bash
oc expose svc/ejemplo2
```

Carga de variables de entorno

Se modifica el deployconfig [dc] agregando variables de entorno. Otra alternativa es hacer esta carga por ConfigMaps o por Secrets

```bash
oc set env deployment/ejemplo2 MYORIGIN=Origin
```

Verificacion del servicio

```bash
curl http://url-ejemplo-servicio-expuesto.com/home
curl http://url-ejemplo-servicio-expuesto.com/count
```
