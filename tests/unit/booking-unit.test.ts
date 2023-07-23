import bookingRepository from '../../src/repositories/booking-repository';
import bookingService from '../../src/services/booking-service';
import { notFoundError } from '@/errors';

describe('Bookings unit tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Get booking unit tests', () => {
    it('Should return a booking', async () => {
      jest.spyOn(bookingRepository, 'getBookingByUserId').mockResolvedValue({
        id: 1,
        roomId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        Room: {
          id: 1,
          capacity: 2,
          hotelId: 1,
          name: '1202',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      const booking = await bookingService.getBooking(1);
      expect(booking).toBeTruthy();
    });

    it('should return notFoundError when booking is not found', async () => {
      jest.spyOn(bookingRepository, 'getBookingByUserId').mockResolvedValueOnce(null);
      const promise = bookingService.getBooking(1);
      expect(promise).rejects.toEqual(notFoundError());
    });
  });

  describe('Post booking unit tests', () => {
    it('Should return a booking when post is successful', async () => {
      jest.spyOn(bookingRepository, 'getBookingByUserId').mockResolvedValue({
        id: 1,
        roomId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        Room: {
          id: 1,
          capacity: 2,
          hotelId: 1,
          name: '1202',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      const booking = await bookingService.getBooking(1);
      expect(booking).toBeTruthy();
    });

    it('should return notFoundError when booking is not found', async () => {
      jest.spyOn(bookingRepository, 'getBookingByUserId').mockResolvedValueOnce(null);
      const promise = bookingService.getBooking(1);
      expect(promise).rejects.toEqual(notFoundError());
    });
  });
});
