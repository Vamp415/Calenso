"use server";

import { db } from "@/lib/prisma";

export async function createBooking(bookingData) {
  try {
    // Fetch the event and its creator
    const event = await db.event.findUnique({
      where: { id: bookingData.eventId },
      include: { user: true },
    });

    if (!event) {
      throw new Error("Event not found");
    }

    // Create Google Meet link (simplified - needs OAuth setup)
    const meetLink = `https://meet.google.com/${Math.random().toString(36).substring(7)}`;
    const googleEventId = `cal_${Date.now()}`;

    // Create booking in database
    const booking = await db.booking.create({
      data: {
        eventId: event.id,
        userId: event.userId,
        name: bookingData.name,
        email: bookingData.email,
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
        additionalInfo: bookingData.additionalInfo,
        meetLink,
        googleEventId,
      },
    });

    return { success: true, booking, meetLink };
  } catch (error) {
    console.error("Error creating booking:", error);
    return { success: false, error: error.message };
  }
}
