import { Router } from 'express';
import userController from '../controller/user.controller';

const userRouter = Router();


userRouter.post('/user', userController.createUser);
userRouter.post('/login', userController.loginUser);
userRouter.post('/user/booking', userController.userBooking);
userRouter.get('/user', userController.getUsers);
userRouter.get('/user/:id', userController.getOneUser);
userRouter.put('/user', userController.updateUser);
userRouter.delete('/user/:id', userController.deleteUser);

export { userRouter };