const express = require("express");
const router = express.Router();
const students = require("../data/students");

let nextId = 4; // ID of new student

// ── GET: All student Info ──────────────────────────
// URL: GET /api/students
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    total: students.length,
    data: students,
  });
});

// ── GET: Get a single student info ───────────────────────
// URL: GET /api/students/1
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student Not Found",
    });
  }

  res.status(200).json({ success: true, data: student });
});

// ── POST: Create a new student ───────────────────
// URL: POST /api/students
router.post("/", (req, res) => {
  const { name, subject, gpa } = req.body;

  // Validation
  if (!name || !subject || gpa === undefined) {
    return res.status(400).json({
      success: false,
      message: "name, subject and gpa required",
    });
  }

  const newStudent = { id: nextId++, name, subject, gpa };
  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "New student added",
    data: newStudent,
  });
});

// ── PUT: complete student update ──────────────────────
// URL: PUT /api/students/1
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Student Not Found",
    });
  }

  const { name, subject, gpa } = req.body;
  if (!name || !subject || gpa === undefined) {
    return res.status(400).json({
      success: false,
      message: "name, subject and gpa required",
    });
  }

  students[index] = { id, name, subject, gpa };

  res.status(200).json({
    success: true,
    message: "Student completely updated",
    data: students[index],
  });
});

// ── PATCH: partial student update ───────────────────────────
// URL: PATCH /api/students/1
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Student Not Found",
    });
  }

  students[index] = { ...students[index], ...req.body };

  res.status(200).json({
    success: true,
    message: "Student partially updated",
    data: students[index],
  });
});

// ── DELETE: Delete a student ────────────────────
// URL: DELETE /api/students/1
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Student Not Found",
    });
  }

  const deleted = students.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: "Student Deleted",
    data: deleted,
  });
});

module.exports = router;
