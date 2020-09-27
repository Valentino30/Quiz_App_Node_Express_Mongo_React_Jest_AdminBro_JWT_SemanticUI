const mongoose = require("mongoose");
const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: "/admin",
});

const admin = {
  email: process.env.ADMIN_EMAIL || "admin@gmail.com",
  password: process.env.ADMIN_PASSWORD || "admin-bro",
};

const router = AdminBroExpress.buildAuthenticatedRouter(
  adminBro,
  {
    cookieName: process.env.ADMIN_COOKIE_NAME || "admin-bro",
    cookiePassword: process.env.ADMIN_COOKIE_PASSWORD || "admin-bro",
    authenticate: async (email, password) =>
      email === admin.email && password === admin.password ? admin : null,
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
  }
  );

module.exports = router;
