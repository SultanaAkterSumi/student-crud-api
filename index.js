const express = require("express");
const app = express();
const PORT = 3000;

// Middleware: JSON body পড়ার অনুমতি
app.use(express.json());

// Routes যুক্ত করা
const studentRoutes = require("./routes/students");
app.use("/api/students", studentRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Student CRUD API চলছে!",
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
    message: `${req.method} ${req.url} পাওয়া যায়নি`,
  });
});

// Server চালু
app.listen(PORT, () => {
  console.log(`✅ Server চলছে: http://localhost:${PORT}`);
  console.log(`📋 API: http://localhost:${PORT}/api/students`);
});
