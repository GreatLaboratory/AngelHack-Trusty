import { Schema, model, PassportLocalSchema, PassportLocalDocument } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
const { Types : { ObjectId } } = Schema;

export type UserDocument = PassportLocalDocument & {
    _id: string;  // 고유 아이디

    orderIdList: string[];
    reviewIdList: string[];

    id: string; // 사용자 입력 아이디
    name: string;  // 사용자 이름
    storeName: string;  // 상호명
    address: string; // 주소
    phoneNum: string;  // 핸드폰 번호
    profileImage: string;  // 프로필 사진
    

    createdAt: Date; // 가입 날짜
}

const userSchema = new Schema({
    orderIdList: [
        {
            type: ObjectId,
            ref: 'Order'
        }
    ],
    reviewIdList: [
        {
            type: ObjectId,
            ref: 'Review'
        }
    ],
    id: String,
    name: String,  
    storeName: String,  
    address: String,  
    phoneNum: String,  
    profileImage: String, 
    createdAt: {
        type: Date,
        default: Date.now()
    } 
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'id' });
export const User = model<UserDocument>('User', userSchema as PassportLocalSchema);
