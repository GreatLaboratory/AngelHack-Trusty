import { Schema, model, PassportLocalSchema, PassportLocalDocument } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
const { Types : { ObjectId } } = Schema;

export type SellerDocument = PassportLocalDocument & {
    _id: string;  // 고유 아이디
    cartIdList: string[];
    
    id: string; // 사용자 입력 아이디
    name: string;  // 사용자 이름
    storeName: string;  // 상호명
    address: string; // 주소
    phoneNum: string;  // 핸드폰 번호
    profileImage: string;  // 프로필 사진

    createdAt: Date;  // 입점 날짜
}

const sellerSchema = new Schema({
    cartIdList: [
        {
            type: ObjectId,
            ref: 'Cart'
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

sellerSchema.plugin(passportLocalMongoose, { usernameField: 'id' });
export const Seller = model<SellerDocument>('Seller', sellerSchema as PassportLocalSchema);
