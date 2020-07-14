import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

import { User, UserDocument } from '../models/user/User';

// GET -> 로그인하기
export const login = passport.authenticate('local');

// POST -> 회원가입하기
export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const { id, name, phoneNum, password } = req.body;
    const file = req.file as Express.Multer.File;
    const profileImage: string = file ? file.location : '';
    try {
        const exUser: UserDocument | null = await User.findOne({ id });
        if (!exUser) {
            const userInfo: UserDocument = new User({
                id,
                name,
                phoneNum,
                profileImage 
            });
            await User.register(userInfo, password);
            res.status(201).json({ message: '성공적으로 회원가입하였습니다.' });
        } else {
            res.status(409).json({ message: '이미 사용중인 아이디입니다.' });
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};