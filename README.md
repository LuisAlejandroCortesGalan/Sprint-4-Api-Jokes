# API de Chistes

Esta es una API sencilla que proporciona chistes al azar. Ideal para agregar un toque de humor a tus aplicaciones o simplemente para disfrutar de un buen chiste.

## Descripción

La API devuelve chistes en formato JSON. Puedes hacer solicitudes a la API para obtener chistes, ya sea en formato de texto o con más detalles como el tipo de chiste.

## Endpoints

### Obtener un chiste al azar

`GET /joke`

Este endpoint devuelve un chiste aleatorio.

#### Ejemplo de Respuesta:

```json
{
  "joke": "¿Por qué el libro de matemáticas está triste? Porque tiene demasiados problemas."
}
