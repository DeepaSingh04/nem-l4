const express = require('express');
const { roleAuthMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Dummy course data
let courses = [
  { id: 1, name: 'JavaScript Basics' },
  { id: 2, name: 'Advanced Node.js' },
];

// Routes
router.get('/', (req, res) => res.json(courses));

router.post('/', roleAuthMiddleware('admin'), (req, res) => {
  const { name } = req.body;
  const newCourse = { id: courses.length + 1, name };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

router.put('/:id', roleAuthMiddleware('admin'), (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).json({ error: 'Course not found' });

  course.name = req.body.name || course.name;
  res.json(course);
});

router.delete('/:id', roleAuthMiddleware('admin'), (req, res) => {
  courses = courses.filter((c) => c.id !== parseInt(req.params.id));
  res.status(204).send();
});

module.exports = router;
