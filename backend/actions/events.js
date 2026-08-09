"use server";

import { db } from "@/lib/prisma";
import { eventSchema } from "@/app/lib/validators";

export async function createEvent(data) {
  const validatedData = eventSchema.parse(data);

  const event = await db.event.create({
    data: validatedData,
  });

  return event;
}

export async function getUserEvents() {
  const events = await db.event.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { bookings: true },
      },
    },
  });

  return { events, username: "user" };
}

export async function deleteEvent(eventId, userId) {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { email: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const event = await db.event.findUnique({
    where: { id: eventId },
  });

  if (!event || event.userId !== user.id) {
    throw new Error("Event not found or unauthorized");
  }

  await db.event.delete({
    where: { id: eventId },
  });

  return { success: true };
}

export async function getEventDetails(username, eventId) {
  const event = await db.event.findFirst({
    where: {
      id: eventId,
      user: {
        username: username,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });

  return event;
}
