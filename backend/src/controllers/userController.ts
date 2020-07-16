import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import cache from 'memory-cache';
import axios, { AxiosRequestConfig } from 'axios';

import { User, UserDocument } from '../models/user/User';
import { SENS_SERVICE_ID, SENS_ACCESS_KEY_ID, SENS_PHONE_NUM, makeSignature } from '../config/secret';

// GET -> 로그인하기
export const login = passport.authenticate('local');

// POST -> 회원가입하기
export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const { id, name, phoneNum, storeName, address, password } = req.body;
    const file = req.file as Express.Multer.File;
    const profileImage: string = file ? file.location : '';
    try {
        const exUser: UserDocument | null = await User.findOne({ id });
        if (!exUser) {
            const userInfo: UserDocument = new User({
                id,
                name,
                phoneNum,
                storeName,
                address,
                profileImage 
            });
            await User.register(userInfo, password);
            res.status(201).json({ message: '성공적으로 회원가입하였습니다.', data: userInfo });
        } else {
            res.status(409).json({ message: '이미 사용중인 아이디입니다.' });
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};

// POST -> 폰번호 입력받고 해당 번호로 인증번호 발송
export const sendCodeToPhone = async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNum } = req.body;
    // const cache: CacheClass<string, number> = new CacheClass();

    // 서버에서 생성한 인증번호
    const verifyNum: number = Math.floor(Math.random() * 10000000) + 1;

    // 만약 클라에서 입력받은 폰번호가 키값으로 이미 메모리캐시에 올라가져있다면 먼저 있던걸 삭제
    cache.del(phoneNum);
    
    // phoneNum이라는 key에다가 verifyNum이라는 value를 메모리캐시에 4분동안 저장 / 이후 자동삭제됨
    cache.put(phoneNum, verifyNum, 180000);

    // naver sens에 request 발생시킨다.
    const header: AxiosRequestConfig = { headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-ncp-apigw-timestamp': Date.now().toString(),
        'x-ncp-iam-access-key': SENS_ACCESS_KEY_ID,
        'x-ncp-apigw-signature-v2': makeSignature()
    }};
    try {
        await axios.post(`https://sens.apigw.ntruss.com/sms/v2/services/${SENS_SERVICE_ID}/messages`, {
            'type': 'SMS',
            'from': SENS_PHONE_NUM,
            'content': `믿음직 서비스 가입을 위한 인증번호는 ${verifyNum}입니다.`,
            'messages': [
                {
                    'to': phoneNum,
                    'content': `믿음직 서비스 가입을 위한 인증번호는 ${verifyNum}입니다.`
                }
            ],
        }, 
        header);
        res.status(201).json({ message: '인증번호 전송 완료' });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

// POST -> 사용자가 입력한 인증번호로 인증
export const verifyCode  = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const { phoneNum, verifyNumFromClient } = req.body;
        // const cache: CacheClass<string, number> = new CacheClass();
        const verifyNumFromServer: number | null = cache.get(phoneNum);

        if (verifyNumFromServer?.toString() === verifyNumFromClient) {
            res.status(201).json({message : '인증에 성공하였습니다.'});
        } else {
            res.status(409).json({message : '인증번호가 일치하지않습니다.'});
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};
