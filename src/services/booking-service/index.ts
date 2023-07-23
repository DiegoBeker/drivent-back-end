import { notFoundError } from '../../errors';
import bookingRepository from '../../repositories/booking-repository';
import enrollmentRepository from '../../repositories/enrollment-repository';
import roomRepository from '../../repositories/room-repository';
import ticketsRepository from '../../repositories/tickets-repository';

async function getBooking(userId: number) {
  const booking = await bookingRepository.getBookingByUserId(userId);

  if (!booking) throw notFoundError();

  return booking;
}

async function bookRoom(userId: number, roomId: number) {
  const room = await roomRepository.getRoomById(roomId);

  if (!room) throw notFoundError();

  const roomIsBooked = await bookingRepository.getBookingByRoomId(roomId);

  if (roomIsBooked) throw { name: 'BookingError' };

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket.TicketType.includesHotel || ticket.TicketType.isRemote || ticket.status !== 'PAID')
    throw {
      name: 'BookingError',
    };

  return await bookingRepository.bookRoom(userId, roomId);
}

async function changeRoom(bookingId: number, roomId: number) {
  const bookingExists = await bookingRepository.getBookingById(bookingId);

  if (!bookingExists) throw notFoundError();

  const room = await roomRepository.getRoomById(roomId);

  if (!room) throw notFoundError();

  const roomIsBooked = await bookingRepository.getBookingByRoomId(roomId);

  if (roomIsBooked) throw { name: 'BookingError' };

  return await bookingRepository.changeRoom(bookingId, roomId);
}

const bookingService = {
  getBooking,
  bookRoom,
  changeRoom,
};

export default bookingService;
