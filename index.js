const express = require("express");
const app = express();
const PORT = 3000;

// Middleware: JSON body reading permission
app.use(express.json());

// Routes Connection
const studentRoutes = require("./routes/students");
app.use("/api/students", studentRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Student CRUD API is Running!",
    routes: {
      getAll: "GET    /api/students",
      getOne: "GET    /api/students/:id",
      create: "POST   /api/students",
      fullUpdate: "PUT    /api/students/:id",
      partUpdate: "PATCH  /api/students/:id",
      delete: "DELETE /api/students/:id",
    },
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `${req.method} ${req.url} Not Found`,
  });
});

// Server running
app.listen(PORT, () => {
  console.log(`✅ Server Running: http://localhost:${PORT}`);
  console.log(`📋 API: http://localhost:${PORT}/api/students`);
});
