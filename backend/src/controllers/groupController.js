import { cons } from "effect/List";
import prisma from "../config/db.js";

export async function createGroup(req, res) {
  const { name } = req.body;
  const userId = req.user.id;
  try {
    const group = await prisma.group.create({
      data: { name, createdBy: userId },
    });
    res.status(201).json(group);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

export async function getGroups(req, res) {
  try {
    const userId = req.user.id;

    const groups = await prisma.group.findMany({
      where: {
        OR: [
          {
            groupMembers: {
              some: { userId },
            },
          },
          {
            createdBy: userId,
          },
        ],
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        groupMembers: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

export async function getGroupById(req, res) {
  const { id } = req.params;
  try {
    const group = await prisma.group.findUnique({
      where: { id: Number(id) },
      include: { creator: true, groupMembers: true, submissions: true },
    });
    if (!group) return res.status(404).json({ error: "Group not found" });
    res.status(200).json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

export async function updateGroup(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const group = await prisma.group.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.status(200).json(group);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

export async function deleteGroup(req, res) {
  const { id } = req.params;
  try {
    await prisma.group.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}
