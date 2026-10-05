import swaggerJSDoc from "swagger-jsdoc";

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
        url: "http://localhost:5000",
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
