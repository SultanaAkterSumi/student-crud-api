const express = require("express");
const router = express.Router();
const students = require("../data/students");

let nextId = 4; // নতুন student এর ID

// ── GET: সব student দেখা ──────────────────────────
// URL: GET /api/students
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    total: students.length,
    data: students,
  });
});

// ── GET: একটি student দেখা ───────────────────────
// URL: GET /api/students/1
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student পাওয়া যায়নি",
    });
  }

  res.status(200).json({ success: true, data: student });
});

// ── POST: নতুন student যোগ করা ───────────────────
// URL: POST /api/students
router.post("/", (req, res) => {
  const { name, subject, gpa } = req.body;

  // Validation
  if (!name || !subject || gpa === undefined) {
    return res.status(400).json({
      success: false,
      message: "name, subject এবং gpa আবশ্যক",
    });
  }

  const newStudent = { id: nextId++, name, subject, gpa };
  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "নতুন student যোগ হয়েছে",
    data: newStudent,
  });
});

// ── PUT: পুরো student আপডেট ──────────────────────
// URL: PUT /api/students/1
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Student পাওয়া যায়নি",
    });
  }

  const { name, subject, gpa } = req.body;
  if (!name || !subject || gpa === undefined) {
    return res.status(400).json({
      success: false,
      message: "name, subject এবং gpa আবশ্যক",
    });
  }

  students[index] = { id, name, subject, gpa };

  res.status(200).json({
    success: true,
    message: "Student সম্পূর্ণ আপডেট হয়েছে",
    data: students[index],
  });
});

// ── PATCH: আংশিক আপডেট ───────────────────────────
// URL: PATCH /api/students/1
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Student পাওয়া যায়নি",
    });
  }

  students[index] = { ...students[index], ...req.body };

  res.status(200).json({
    success: true,
    message: "Student আংশিক আপডেট হয়েছে",
    data: students[index],
  });
});

// ── DELETE: student মুছে ফেলা ────────────────────
// URL: DELETE /api/students/1
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Student পাওয়া যায়নি",
    });
  }

  const deleted = students.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: "Student মুছে ফেলা হয়েছে",
    data: deleted,
  });
});

module.exports = router;
