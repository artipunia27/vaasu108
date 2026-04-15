"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

export async function getBhajans() {
  try {
    const bhajans = await prisma.bhajan.findMany({
      orderBy: { createdAt: "desc" },
      include: { comments: { orderBy: { createdAt: "asc" } } }
    });
    return bhajans;
  } catch (error) {
    console.error("Error fetching bhajans:", error);
    return [];
  }
}

export async function createBhajan(title, content, author, ownerId) {
  try {
    const newBhajan = await prisma.bhajan.create({
      data: {
        title,
        content,
        author,
        ownerId
      },
      include: { comments: true }
    });
    return newBhajan;
  } catch (error) {
    console.error("Error creating bhajan:", error);
    throw new Error("Failed to create bhajan");
  }
}

export async function likeBhajan(id) {
  try {
    const updated = await prisma.bhajan.update({
      where: { id },
      data: { likes: { increment: 1 } },
      include: { comments: true }
    });
    return updated;
  } catch (error) {
    console.error("Error liking bhajan:", error);
    throw new Error("Failed to link bhajan");
  }
}

export async function deleteBhajan(id, ownerId) {
  try {
    // Verify ownership
    const bhajan = await prisma.bhajan.findUnique({ where: { id } });
    if (!bhajan || bhajan.ownerId !== ownerId) {
      throw new Error("Unauthorized");
    }
    await prisma.bhajan.delete({ where: { id } });
    return true;
  } catch (error) {
    console.error("Error deleting bhajan:", error);
    throw new Error("Failed to delete bhajan");
  }
}

export async function addComment(bhajanId, text, author, ownerId) {
  try {
    const comment = await prisma.comment.create({
      data: {
        text,
        author,
        ownerId,
        bhajanId
      }
    });
    return comment;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw new Error("Failed to add comment");
  }
}

export async function deleteComment(id, ownerId) {
  try {
    const comment = await prisma.comment.findUnique({ where: { id } });
    if (!comment || comment.ownerId !== ownerId) {
      throw new Error("Unauthorized");
    }
    await prisma.comment.delete({ where: { id } });
    return true;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw new Error("Failed to delete comment");
  }
}
