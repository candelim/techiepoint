# Techiepoint

Repo para TechiePoint 2.0, con ejemplos para Openshift
Se trata de 2 ejemplos básicos usando nodejs (ejemplo1) y nodejs + mongodb (ejemplo2)
## Instalacion

Clonar el repositorio de https://github.com/candelim/techiepoint.git  

```bash
git clone https://github.com/candelim/techiepoint.git 
```
## Uso

Una vez clonado el repositorio se puede comenzar usando el cliente OC

Acceso a la plataforma

```bash
oc login -u usuario https://miservidor.plataforma.com 
```

Verificar proyectos que tengo asignados

```bash
oc get projects
```

Ambientarme en un proyecto

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
