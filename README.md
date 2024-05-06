### Запуск проекту

**Сервер**


[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/26370442-2bbe8cb4-c6df-4e26-bd37-552737310ac5?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D26370442-2bbe8cb4-c6df-4e26-bd37-552737310ac5%26entityType%3Dcollection%26workspaceId%3D50b276af-88a7-4227-b6a0-90f0ac850253#?env%5Bhousing-match%5D=W3sia2V5IjoiYXBpX3VybCIsInZhbHVlIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImRlZmF1bHQifV0=)


1. **Встановлення залежностей:**
   ```bash
   cd server
   npm install
   ```
2. **Заповнення файлу змінних оточення .env (переіменнувати .env.example)**
    ```dotenv
        PORT=5000
        SERVER_URL=http://localhost:5000
        CLIENT_URL=http://localhost:5173
        DB_URI=
        JWT_SECRET=
        BUCKET_NAME=
        BUCKET_REGION=
        ACCESS_KEY=
        SECRET_ACCESS_KEY=
        SMTP_HOST=
        SMTP_PORT=
        SMTP_USER=
        SMTP_PASSWORD=
   ```

3. **Запуск сервера Express:**
   ```bash
   npm run dev
   ```

**Кліент**

1. **Встановлення залежностей:**
   ```bash
   cd client
   npm install
   ```
2. **Заповнення файлу змінних оточення .env (переіменнувати .env.example)**
   ```dotenv
      VITE_SERVER_URL=http://localhost:5000
   ```

3. **Запуск кліенту:**
   ```bash
   npm run dev
   ```

**Відкрийте браузер:**
Проект буде доступний за адресою [http://localhost:5173](http://localhost:5173)

### Структура проекту:

- **`/client`**: Містить файли, пов'язані з фронтенд частиною.
- **`/server`**: Містить файли, пов'язані з бекенд частиною.
