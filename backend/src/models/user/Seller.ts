import { Schema, model, PassportLocalSchema, PassportLocalDocument } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

export type SellerDocument = PassportLocalDocument & {
    _id: string;  // 고유 아이디
    
    id: string; // 사용자 입력 아이디
    name: string;  // 사용자 이름
    address: string; // 주소
    phoneNum: string;  // 핸드폰 번호
    profileImage: string;  // 프로필 사진
    mainItem: string; // 주요 품목

    bankName: string; // 거래 은행 이름
    accountNum: string; // 계좌번호

    createdAt: Date;  // 입점 날짜
}

const sellerSchema = new Schema({
    id: String,
    name: String,  
    storeName: String,  
    address: String,  
    phoneNum: String,  
    profileImage: String, 
    bankName: String,
    accountNum: String,
    mainItem: String,
    createdAt: {
        type: Date,
        default: Date.now()
    } 
});

sellerSchema.plugin(passportLocalMongoose, { usernameField: 'id' });
export const Seller = model<SellerDocument>('Seller', sellerSchema as PassportLocalSchema);
