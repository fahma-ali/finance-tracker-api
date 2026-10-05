import swaggerJSDoc from "swagger-jsdoc";
const renderUrl = "https://finance-tracker-api-o7l0.onrender.com";
const localUrl = "http://localhost:5000";
const isProd = process.env.NODE_ENV === "production";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Personal Finance Tracker API",
      version: "1.0.0",
      description: "Track income and expenses, with JWT authentication.",
    },
    servers: [
      {
        url: isProd ? renderUrl : localUrl,
        description: isProd ? "Production (Render)" : "Local development",
      },
      {
        url: isProd ? localUrl : renderUrl,
        description: isProd ? "Local development" : "Production (Render)",
      },
    ],
    tags: [
      { name: "Auth" },
      { name: "Transactions" },
      { name: "Categories" },
      { name: "Upload" },
      { name: "Admin" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], 
};

export const swaggerSpec = swaggerJSDoc(options);
