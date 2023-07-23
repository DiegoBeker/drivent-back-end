import { Router } from 'express';
import { authenticateToken } from '../middlewares';
import { bookRoom, changeRoom, getBooking } from '../controllers/booking-controller';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/booking', getBooking)
  .post('/booking', bookRoom)
  .put('/booking/:bookingId', changeRoom);

export default bookingRouter;
