import prisma from "../config/db.js";

export async function createAssignment(req, res) {
  const { title, description, dueDate, link, createdBy } = req.body;
  try {
    const assignment = await prisma.assignment.create({
      data: { title, description, dueDate: dueDate ? new Date(dueDate) : null, link, createdBy }
    });
    res.status(201).json(assignment);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

export async function getAssignments(req, res) {
  try {
    const assignments = await prisma.assignment.findMany({ include: { creator: true, submissions: true } });
    res.status(200).json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

export async function getAssignmentById(req, res) {
  const { id } = req.params;
  try {
    const assignment = await prisma.assignment.findUnique({
      where: { id: Number(id) },
      include: { creator: true, submissions: true }
    });
    if (!assignment) return res.status(404).json({ error: "Assignment not found" });
    res.status(200).json(assignment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

export async function updateAssignment(req, res) {
  const { id } = req.params;
  const { title, description, dueDate, link } = req.body;
  try {
    const assignment = await prisma.assignment.update({
      where: { id: Number(id) },
      data: { title, description, dueDate: dueDate ? new Date(dueDate) : null, link }
    });
    res.status(200).json(assignment);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

export async function deleteAssignment(req, res) {
  const { id } = req.params;
  try {
    await prisma.assignment.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}
