# 📌 OrganizeU – Backend

Backend del proyecto **OrganizeU**, una aplicación para la gestión personal de **tareas**, **recordatorios** y **recuperación de credenciales**.  
Desarrollado en **NestJS**, conectado a **MongoDB Atlas** y desplegado con **Docker** y **Render**.

---

## 👥 Integrantes del equipo
- Juan Fernando Muñoz López  
- Santiago Henao Ramírez  
- Manuel Alejandro Quiceno Muñoz  
- Nicolás Guerrero Maya  

---

## 🎯 Descripción general
OrganizeU busca ayudar a los usuarios a organizar su vida diaria a través de un sistema que centraliza la gestión de usuarios, tareas y recordatorios.  

- **Framework:** NestJS  
- **Base de datos:** MongoDB Atlas  
- **Contenedores:** Docker  
- **Hosting:** Render  
- **Diseño UI:** Figma  

🔗 **Repositorio Backend:** [OrganizeU Backend](https://github.com/juanferm0410/organizeubackend.git)  
🔗 **Mockup en Figma:** [Diseño en Figma](https://www.figma.com/proto/rRfQ1mqW5qB7c7kaUpHhJR/Mockup-OrganizeU?node-id=0-1&t=MW822j4HUdxDxn81-1)  
🔗 **API en Render:** [OrganizeU API](https://organizeu.onrender.com/users/)  

---

## 🛠️ Tecnologías utilizadas
- [NestJS](https://nestjs.com/) – Framework modular para Node.js.  
- [MongoDB Atlas](https://www.mongodb.com/atlas) – Base de datos NoSQL en la nube.  
- [Docker](https://www.docker.com/) – Contenerización y despliegue.  
- [Render](https://render.com/) – Plataforma de hosting de aplicaciones.  
- [Nodemailer](https://nodemailer.com/) – Envío de correos para recuperación de contraseñas.  

---

## 📂 Arquitectura del backend
El backend está estructurado en módulos bajo el patrón de NestJS:

- **Controllers** → Definen los endpoints.  
- **Services** → Contienen la lógica de negocio.  
- **DTOs** → Validan datos de entrada.  
- **Modules** → Agrupan controladores y servicios.  

### 🔑 Módulos principales
1. **Auth**  
   - Autenticación y login.  
   - Validación de credenciales.  

2. **Users**  
   - Registro, consulta, actualización y eliminación de usuarios.  
   - Gestión de tareas y recordatorios **dentro de cada usuario**.  
   - Recuperación de contraseña por correo electrónico.  

---

## 🗄️ Base de datos
- Se utiliza **MongoDB Atlas** en la nube.  
- Colecciones almacenadas en formato **JSON**.  
- Conexión a través de `connectDB.ts`.  
- Credenciales protegidas en variables de entorno `.env`.  

---
