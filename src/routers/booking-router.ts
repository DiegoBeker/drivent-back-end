import { Router } from 'express';
import { authenticateToken } from '../middlewares';
import { bookRoom, changeRoom, getBooking } from '../controllers/booking-controller';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken).get('/', getBooking).post('/', bookRoom).put('/:bookingId', changeRoom);

export default bookingRouter;
