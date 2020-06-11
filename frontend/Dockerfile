FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build -- --output-path=./dist/meuq


FROM nginx
COPY --from=build-stage /app/dist/meuq/ /usr/share/nginx/html
COPY conf/nginx-conf.conf /etc/nginx/conf.d/default.conf
EXPOSE 4201

CMD ["nginx", "-g", "daemon off;"]

