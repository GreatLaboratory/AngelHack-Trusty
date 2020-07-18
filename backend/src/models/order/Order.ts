import { Document, Schema, model } from 'mongoose';
import { IResponseCart } from './Cart';
const { Types : { ObjectId } } = Schema;

export interface IResponseOrder {
    orderId: string;
    orderDate: Date;
    cart: IResponseCart[];
}

export type OrderDocument = Document & {
    _id: string;  // 고유 아이디

    userId: string; // 사용자 아이디
    cartIdList: string[]; // 단일 주문 아이디 리스트

    totalPrice: string;  // 구매 총 가격
    payType: string; // 결제 수단

    buyerName: string;
    buyerPhoneNum: string;
    buyerTelephoneNum: string;
    buyerZipcode: string;
    buyerAddress: string;
    
    receiverName: string;
    receiverPhoneNum: string;
    receiverTelephoneNum: string;
    receiverZipcode: string;
    receiverAddress: string;

    createdAt: Date;  // 상품 등록날짜
}

const ordercartSchema = new Schema({
    userId: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    cartIdList: [
        {
            type: ObjectId,
            ref: 'Cart'
        }
    ],
    totalPrice: String,
    payType: String,
    buyerName: String,
    buyerPhoneNum: String,
    buyerTelephoneNum: String,
    buyerZipcode: String,
    buyerAddress: String,
    
    receiverName: String,
    receiverPhoneNum: String,
    receiverTelephoneNum: String,
    receiverZipcode: String,
    receiverAddress: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

export const Order = model<OrderDocument>('Order', ordercartSchema);
