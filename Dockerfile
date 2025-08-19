# ─── Stage 1: Builder ─────────────────────────────────────────────────────────#
FROM node:20.19.0-slim AS builder

# Zona horaria (opcional)
ENV TZ=America/Lima

WORKDIR /usr/src/app

# Copia sólo package.json y package-lock.json para cache de dependencias
COPY ./package*.json ./

# Instala TODO (incluyendo devDeps) para compilar
RUN npm ci

RUN npm install -g @angular/cli@17

# Copia el resto del código y construye en modo producción
COPY ./ ./

RUN npm run build

# ─── Stage 2: Runtime con SSL auto-firmado ────────────────────────────────────#
FROM nginx:stable-alpine

# Instala openssl para generar certificado
RUN apk add --no-cache openssl

# Crea directorio para certificados
RUN mkdir -p /etc/nginx/ssl

# Genera certificado auto-firmado (ajusta el CN si cambias de IP)
RUN openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/selfsigned.key \
  -out /etc/nginx/ssl/selfsigned.crt \
  -subj "/CN=_"  

# Copia tu configuración de nginx (que debe usar los certificados generados)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copia los artifacts compilados
COPY --from=builder /usr/src/app/dist/mibanco-cotizador /usr/share/nginx/html

# Exponer puertos HTTP y HTTPS
EXPOSE 80 443

# Arranca nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
