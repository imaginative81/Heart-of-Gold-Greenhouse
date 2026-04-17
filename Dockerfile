FROM nginx:alpine

COPY default.conf.template /etc/nginx/templates/default.conf.template
COPY index.html styles.css *.jsx /usr/share/nginx/html/

ENV PORT=80
EXPOSE 80
