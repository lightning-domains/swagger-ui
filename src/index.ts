import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
// import cors from 'cors'; // If you need CORS
// import dotenv from 'dotenv'; // If you use environment variables

// dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3001;

// app.use(cors()); // Enable CORS if needed

// Load the OpenAPI YAML file
const swaggerDocument = yaml.load(
  fs.readFileSync(path.join(__dirname, "../docs/api.yml"), "utf8")
) as Record<string, any>;

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Basic route
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Swagger UI is available at http://localhost:${port}/api-docs`);
});
