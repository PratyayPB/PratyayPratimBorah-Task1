import prisma from "../config/db.js";

export async function addGroupMember(req, res) {
  const { groupId, userId } = req.body;
  try {
    const member = await prisma.groupMember.create({
      data: { groupId, userId }
    });
    res.status(201).json(member);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

export async function getGroupMembers(req, res) {
  const { groupId } = req.params;
  try {
    const members = await prisma.groupMember.findMany({
      where: { groupId: Number(groupId) },
      include: { user: true }
    });
    res.status(200).json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

export async function removeGroupMember(req, res) {
  const { id } = req.params;
  try {
    await prisma.groupMember.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}
