import { Booking } from '@prisma/client';
import { prisma } from '../../config';

async function getBookingById(bookingId: number) {
  return await prisma.booking.findFirst({
    where: {
      id: bookingId,
    },
  });
}

async function getBookingByUserId(userId: number) {
  return await prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: {
        include: {
          Hotel: true,
        },
      },
    },
  });
}

async function getBookingByRoomId(roomId: number) {
  return await prisma.booking.findFirst({
    where: {
      roomId,
    },
  });
}

async function bookRoom(userId: number, roomId: number) {
  const data: CreateBooking = {
    userId,
    roomId,
  };
  return await prisma.booking.create({ data });
}

async function changeRoom(bookingId: number, roomId: number) {
  return await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      roomId,
    },
  });
}

export type CreateBooking = Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>;

const bookingRepository = {
  getBookingByUserId,
  getBookingByRoomId,
  getBookingById,
  bookRoom,
  changeRoom,
};

export default bookingRepository;
