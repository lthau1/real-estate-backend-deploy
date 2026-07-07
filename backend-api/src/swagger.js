const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Real Estate API",
      version: "1.0.0",
      description: "CT313H Real Estate SPA Backend API",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        Property: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            price: { type: "string" },
            location: { type: "string" },
          },
        },

        Agent: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
          },
        },

        Contact: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            message: { type: "string" },
          },
        },
      },
    },
  },

  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);
