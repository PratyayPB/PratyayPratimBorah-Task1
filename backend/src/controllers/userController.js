import prisma from "../config/db.js";

export async function createUser(req, res) {
  const { name, email, password, role } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email, password, role }
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

export async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email, password, role }
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

export async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}
