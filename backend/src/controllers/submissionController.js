import prisma from "../config/db.js";

export async function createSubmission(req, res) {
  const { groupId, assignmentId, confirmed, confirmedAt } = req.body;
  try {
    const submission = await prisma.submission.create({
      data: {
        groupId,
        assignmentId,
        confirmed: confirmed ?? false,
        confirmedAt: confirmedAt ? new Date(confirmedAt) : null
      }
    });
    res.status(201).json(submission);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

export async function getSubmissions(req, res) {
  try {
    const submissions = await prisma.submission.findMany({
      include: { group: true, assignment: true }
    });
    res.status(200).json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

export async function getSubmission(req, res) {
  const { id } = req.params;
  try {
    const submission = await prisma.submission.findUnique({
      where: { id: Number(id) },
      include: { group: true, assignment: true }
    });
    if (!submission) return res.status(404).json({ error: "Submission not found" });
    res.status(200).json(submission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

export async function updateSubmission(req, res) {
  const { id } = req.params;
  const { confirmed, confirmedAt } = req.body;
  try {
    const submission = await prisma.submission.update({
      where: { id: Number(id) },
      data: {
        confirmed: confirmed ?? undefined,
        confirmedAt: confirmedAt ? new Date(confirmedAt) : null
      }
    });
    res.status(200).json(submission);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

export async function deleteSubmission(req, res) {
  const { id } = req.params;
  try {
    await prisma.submission.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}
