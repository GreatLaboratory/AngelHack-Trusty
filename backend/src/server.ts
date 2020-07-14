import 'dotenv/config';

import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import errorHandler from 'errorhandler';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose, { Error } from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';

import { MONGODB_URI, SESSION_SECRET } from './config/secret';
import { passportConfig } from './config/passport';
class Server {
    // Express App 필드 선언
    private app: Application;

    // 생성자
    constructor () {
        this.app = express();
        this.connectDB();
        this.config();
        passportConfig(passport);
        this.routes();
    }

    // DB 연결
    private connectDB (): void {
        const connect = async () => {
            await mongoose.connect(MONGODB_URI, {
                dbName : 'angelhack',
                useFindAndModify: false,
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            }, (error: Error) => {
                if (error) console.error('몽고디비 연결 에러', error);
                else console.log('몽고디비 연결 성공');
            });
        };
        connect();
        mongoose.connection.on('error', (error: Error) => {
            console.log('몽고디비 연결 에러', error);
        });
        mongoose.connection.on('disconnected', () => {
            console.log('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
            connect();
        });
    }

    // 기본 서버 설정 및 미들웨어 
    private config (): void {
        if (process.env.NODE_ENV === 'production') {
            this.app.use(morgan('combined'));
            this.app.use(helmet());
            this.app.use(hpp());
            this.app.use(compression());
        } else {
            this.app.use(morgan('dev'));
        }
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cookieParser(SESSION_SECRET));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    // 라우터
    private routes (): void {
    }

    // 서버 구동
    public start (): void {
        this.app.use(errorHandler());
        this.app.listen(5000, () => {
            console.log('####### App is running!! #######');
        });
    }
}

const server: Server = new Server();
server.start();
