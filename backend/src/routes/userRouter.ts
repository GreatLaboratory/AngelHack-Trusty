import { Router, Request, Response } from 'express';

import { login, signUp } from '../controllers/userController';
import { profileImageUploader } from '../routes/middleWares/uploader'

class UserRouter {
    public router: Router;

    constructor () {
        this.router = Router();
        this.routes();
    }

    private routes (): void {
        // 사용자 로컬 로그인하기
        this.router.post('/login', login, (req: Request, res: Response) => {
            console.log(req.user);
            res.json(req.user);
        });

        // 사용자 회원가입하기
        this.router.post('/signUp', profileImageUploader.single('image'), signUp);

    }
}

const userRouter = new UserRouter();
export default userRouter.router;
