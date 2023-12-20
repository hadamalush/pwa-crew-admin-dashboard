![admin-dashboard](https://github.com/hadamalush/pwa-crew-admin-dashboard/assets/59387147/534c2e02-527d-4d1f-bacc-0e19bbe38691)

# Admin dashboard - Pwa Crew

## [Live](https://pwacrew-admin-dashboard.netlify.app) 🌍

## Overview ✍️

The administration panel application is used to manage the events network site [Link](https://pwa-crew-site-demo.vercel.app/) . On the home page you will see statistics. Displays on the page , active connections in mongodb, number of all registered users. Charts - disk space usage (cloudinary, mega, vercelblob). Registered users in the last 7 days. On the next page is the inbox - integrated with gmail ( gmail api) - we can send messages , receive, move , delete. On the next subpage we can manage users, delete, edit, create or search. The last subpage - settings. Here we have three options. We can add a welcome message or an announcement, which will appear on the homepage of each user as a modal. We can change the drive to which you want to upload or download photos (events). We can also set an automatic return message, if someone sends a message through the contact form on the site then he/she will receive a return message, we can set it here.

## Technologies used 🚀

- **Redux**
- **Redux-toolkit**
- **Redux-hook-form**
- **Gmail API**
- **JWT**
- **React-quill**
- **React-router-dom**
- **React-select**
- **Reselect**
- **Sonner**
- **Js-cookie**
- **Framer-motion**
- **Axios**
- **and more...**

**Styled with tailwind**

## Rest api

**Rest api was written in next js application**

## Endpoints 🛤️ (domain - https://pwa-crew-site-demo.vercel.app/)

**User**

- 📤 **DELETE /admin/auth/logout**: Remove the token
- 📤 **POST /admin/auth/refreshToken**: Refresh the token
- 📤 **POST /admin/auth**: Create a new token

**Inbox (Gmail API)**

- 📤 **POST /admin/inbox/deletePermanent**: Delete messages
- 📤 **POST /admin/inbox/markAsRead**: Mark a message as read
- 📤 **POST /admin/inbox/moveMessages**: Move messages to (spam,trash,inbox)
- 📤 **POST /admin/inbox/sendMessage**: Send a message
- 📤 **POST /admin/inbox/deletePermanent**: Get all messages

**Settings**

- 📤 **POST /admin/settings/additionalInfo**: Set a message on the homepage
- 📤 **POST /admin/settings/setAutomaticMessage**: Set a feedback message
- 📤 **POST /admin/settings/setStorage**: Set storage
- 📥 **GET /admin/settings/getAdditionalInfo**: Get the set message
- 📥 **GET /admin/settings/getAutomaticMessage**: Get the set feedback
- 📥 **GET /admin/settings/getStorage**: Get the set storage

**Users**

- 📤 **POST /admin/users/addUser**: Create a user
- 📤 **POST /admin/users/deleteUser**: Delete a user
- 📤 **POST /admin/users/editUser**: Edit a user
- 📥 **GET /admin/users**: Get all the users

**Stats**

- 📥 **GET /admin/stats/cloudinary**: Get used disk space from cloudinary
- 📥 **GET /admin/stats/mega**: Get used disk space from mega.nz
- 📥 **GET /admin/stats/vercel**: Get used disk space from vercel blob
- 📥 **GET /admin/stats/mongoConnections**: Get active connections
- 📥 **GET /admin/stats/pageViews**: Get page views (Google analytics)

![Inbox](https://github.com/hadamalush/pwa-crew-admin-dashboard/assets/59387147/2c1f98eb-201c-47af-b166-f844c40ef356)

![New message](https://github.com/hadamalush/pwa-crew-admin-dashboard/assets/59387147/28666953-3ea4-40d6-9128-79de1db0f355)

![Users list](https://github.com/hadamalush/pwa-crew-admin-dashboard/assets/59387147/5905a7d7-2411-455c-a372-d937c08553dd)

![Settings](https://github.com/hadamalush/pwa-crew-admin-dashboard/assets/59387147/c2dda1fe-7de2-4c0c-bb91-adb003205d2e)

![Change storage](https://github.com/hadamalush/pwa-crew-admin-dashboard/assets/59387147/a543c938-e907-4cd6-b953-1a2ba2ef3d08)
