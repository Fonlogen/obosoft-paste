# Fase di build
FROM node:22 AS build-stage
 
# Imposta la directory di lavoro
WORKDIR /app
 
# Copia i file package.json e package-lock.json
COPY package*.json ./
 
# Installa le dipendenze
RUN npm install
 
# Copia tutto il resto del progetto
COPY . .
 
# Compila il progetto Vue
RUN npm run build
 
# Fase di produzione
FROM node:22 AS production-stage
 
# Installa serve per servire i file statici
RUN npm install -g serve
 
# Imposta la directory di lavoro
WORKDIR /app
 
# Copia i file compilati dalla fase di build
COPY --from=build-stage /app/build /app/dist
 
# Espone la porta 3000
EXPOSE 3004
 
# Comando per avviare l'applicazione
CMD ["serve", "-s", "dist", "-l", "3004"]
