import { Schema, model, PassportLocalSchema, PassportLocalDocument } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
const { Types : { ObjectId } } = Schema;

export type UserDocument = PassportLocalDocument & {
    _id: string;  // 고유 아이디

    orderIdList: string[];
    cartIdList: string[];
    reviewIdList: string[];

    id: string; // 사용자 입력 아이디
    name: string;  // 사용자 이름
    phoneNum: string;  // 프로필 사진
    profileImage: boolean;  // 핸드폰 번호
}

const userSchema = new Schema({
    orderIdList: [
        {
            type: ObjectId,
            ref: 'Order'
        }
    ],
    cartIdList: [
        {
            type: ObjectId,
            ref: 'Cart'
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
    phoneNum: String,  
    profileImage: String,  
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'id' });
export const User = model<UserDocument>('User', userSchema as PassportLocalSchema);
