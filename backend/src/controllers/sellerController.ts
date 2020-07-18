import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

import { Seller, SellerDocument } from '../models/user/Seller';

// GET -> 로그인하기
export const login = passport.authenticate('seller');

// POST -> 회원가입하기
export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const { id, name, phoneNum, mainItem, productArea, password } = req.body;
    const file = req.file as Express.Multer.File;
    const profileImage: string = file ? file.location : '';
    try {
        const exSeller: SellerDocument | null = await Seller.findOne({ id });
        if (!exSeller) {
            const sellerInfo: SellerDocument = new Seller({
                id,
                name,
                phoneNum,
                mainItem,
                productArea,
                profileImage 
            });
            await Seller.register(sellerInfo, password);
            res.status(201).json({ message: '성공적으로 회원가입하였습니다.', data: sellerInfo });
        } else {
            res.status(409).json({ message: '이미 사용중인 아이디입니다.' });
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};
