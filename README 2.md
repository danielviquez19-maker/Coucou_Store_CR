# Coucou Store CR - Sitio web estático

Versión inicial de sitio web / vitrina digital para **Coucou Store CR**.

## Qué incluye

- `index.html`: página principal del sitio.
- `assets/css/styles.css`: estilos responsive.
- `assets/js/products.js`: base de productos destacados.
- `assets/js/app.js`: filtros, búsqueda, ordenamiento y enlaces dinámicos de WhatsApp.
- `assets/docs/COLOCAR_CATALOGO_AQUI.txt`: instrucción para colocar el catálogo PDF. El PDF no se incluye dentro del ZIP para mantener el paquete liviano.
- `assets/img/products/`: imágenes extraídas del catálogo para la primera selección de productos.
- `amplify.yml`: configuración base para publicar en AWS Amplify.

## Cómo usar localmente

No requiere instalación ni dependencias. Para que el botón de PDF funcione, copiá el archivo del catálogo dentro de `assets/docs/` con el nombre exacto `catalogo-coucou-store-cr-mayo-2026.pdf`.

1. Descomprimí el ZIP.
2. Abrí `index.html` en el navegador.

Recomendado para revisar como servidor local:

```bash
python3 -m http.server 8080
```

Luego abrí:

```text
http://localhost:8080
```

## Cómo subir a GitHub

```bash
git init
git add .
git commit -m "Sitio inicial Coucou Store CR"
git branch -M main
git remote add origin https://github.com/USUARIO/NOMBRE-REPO.git
git push -u origin main
```

## Publicación en AWS Amplify

1. Entrá a AWS Amplify.
2. Seleccioná **New app > Host web app**.
3. Conectá GitHub.
4. Elegí el repositorio y la rama `main`.
5. Usá la configuración del archivo `amplify.yml`.
6. Publicá.

## Publicación en Amazon S3

1. Creá un bucket S3.
2. Activá static website hosting.
3. Subí todos los archivos manteniendo la estructura de carpetas.
4. Marcá `index.html` como index document.
5. Configurá permisos públicos o CloudFront, según el esquema de seguridad deseado.

## Ajustes recomendados para una versión final

- Sustituir o cargar logo oficial en `assets/img/`.
- Confirmar si los precios deben mostrarse con IVA o sin IVA. El catálogo indica que los precios no incluyen el 13% de impuestos.
- Cargar inventario real: disponibilidad, colores y fotos finales producto por producto.
- Agregar política de envíos, métodos de pago y zonas de entrega.
- Definir dominio final.
- Agregar medición: Meta Pixel, Google Analytics 4 y eventos de clic en WhatsApp.

## Edición rápida de productos

Los productos viven en:

```text
assets/js/products.js
```

Cada producto tiene esta estructura:

```js
{
  id: 'VF17605',
  brand: 'Nicole Lee',
  collection: 'Virtual Friend',
  category: 'Bolsos',
  name: 'Bolso Cuadrado',
  price: 34000,
  priceLabel: '₡34 000',
  measures: '34 cm x 24,5 cm x 14 cm',
  page: 2,
  image: 'assets/img/products/p2-000.jpg'
}
```
