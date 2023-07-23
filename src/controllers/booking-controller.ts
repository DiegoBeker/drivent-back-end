import httpStatus from 'http-status';
import { Response } from 'express';
import bookingService from '../services/booking-service';
import bookingRepository from '../repositories/booking-repository';
import { AuthenticatedRequest } from '@/middlewares';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const booking = bookingService.getBooking(userId);

  return res.status(httpStatus.OK).send(booking);
}

export async function bookRoom(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;

  if (isNaN(roomId)) throw { name: 'BadRequest' };

  const booking = await bookingRepository.bookRoom(userId, roomId);

  return res.status(httpStatus.OK).send({ bookingId: booking.id });
}

export async function changeRoom(req: AuthenticatedRequest, res: Response) {
  const { bookingId } = req.params;
  const { roomId } = req.body;

  if (isNaN(roomId)) throw { name: 'BadRequest' };

  if (isNaN(Number(bookingId))) throw { name: 'BadRequest' };

  const booking = await bookingRepository.changeRoom(Number(bookingId), roomId);

  return res.status(httpStatus.OK).send({ bookingId: booking.id });
}
