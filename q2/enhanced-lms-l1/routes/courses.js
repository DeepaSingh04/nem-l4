const express = require('express');
const { dummyAuthMiddleware } = require('../middlewares/securityMiddlewares');

const router = express.Router();

// Dummy courses data
let courses = [
  { id: 1, name: 'JavaScript Basics', description: 'Learn JS basics.' },
  { id: 2, name: 'Node.js Fundamentals', description: 'Understand Node.js.' },
];

// Public route to get courses
router.get('/', (req, res) => {
  res.json(courses);
});

// Protected route to add a new course
router.post('/', dummyAuthMiddleware, (req, res) => {
  const { name, description } = req.body;
  const newCourse = { id: courses.length + 1, name, description };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

// Protected route to update a course
router.put('/:id', dummyAuthMiddleware, (req, res) => {
  const courseId = parseInt(req.params.id, 10);
  const { name, description } = req.body;

  const course = courses.find((c) => c.id === courseId);
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }

  course.name = name || course.name;
  course.description = description || course.description;

  res.json(course);
});

// Protected route to delete a course
router.delete('/:id', dummyAuthMiddleware, (req, res) => {
  const courseId = parseInt(req.params.id, 10);
  const courseIndex = courses.findIndex((c) => c.id === courseId);

  if (courseIndex === -1) {
    return res.status(404).json({ error: 'Course not found' });
  }

  courses.splice(courseIndex, 1);
  res.status(204).send();
});

module.exports = router;
