import httpStatus from 'http-status';
import { Response } from 'express';
import { Booking, Room } from '@prisma/client';
import bookingService from '../services/booking-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const booking = await bookingService.getBooking(userId);

  type BookingResponse = Omit<Booking, 'userId' | 'roomId' | 'createdAt' | 'updatedAt'> & { Room: Room };

  const result: BookingResponse = {
    id: booking.id,
    Room: booking.Room,
  };

  return res.status(httpStatus.OK).send(result);
}

export async function bookRoom(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;

  if (isNaN(roomId)) throw { name: 'BadRequest' };

  const booking = await bookingService.bookRoom(userId, roomId);

  return res.status(httpStatus.OK).send({ bookingId: booking.id });
}

export async function changeRoom(req: AuthenticatedRequest, res: Response) {
  const { bookingId } = req.params;
  const { roomId } = req.body;

  if (isNaN(roomId)) throw { name: 'BadRequest' };

  if (isNaN(Number(bookingId))) throw { name: 'BadRequest' };

  const booking = await bookingService.changeRoom(Number(bookingId), roomId);

  return res.status(httpStatus.OK).send({ bookingId: booking.id });
}
