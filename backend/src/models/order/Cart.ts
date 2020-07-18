import { Document, Schema, model } from 'mongoose';
const { Types : { ObjectId } } = Schema;

export interface IResponseCart {
    cart?: CartDocument;
    orderNum?: string;
    orderPrice?: string;
    productImage?: string;
    productName?: string;
    productPrice?: string;
    sellerName?: string;
    orderDate?: Date;
    status?: string;
    cartId?: string;
}

export type CartDocument = Document & {
    _id: string;  // 고유 아이디

    userId: string; // 사용자 아이디
    sellerId: string; // 판매자 아이디
    productId: string; // 상품 아이디
    orderId: string; // 묶음 주문 아이디

    orderNum: string;  // 구매 수량
    orderPrice: string;  // 구매 총 가격
    isOrdered: boolean;  // 구매 여부
    isReviewed: boolean;  // 후기 작성 여부
    status: string;  // 주문 상태
    deliveryFirm: string;  // 운송장 회사
    deliveryNum: string;  // 운송장 번호

    createdAt: Date;  // 상품 등록날짜
}

const cartSchema = new Schema({
    userId: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    sellerId: {
        type: ObjectId,
        required: true,
        ref: 'Seller'
    },
    productId: {
        type: ObjectId,
        required: true,
        ref: 'Product'
    },
    orderId: {
        type: ObjectId,
        ref: 'Order'
    },
    orderNum: String,
    orderPrice: String,
    isOrdered: {
        type: Boolean,
        default: false
    },
    isReviewed: {
        type: Boolean,
        default: false
    },
    status: String,
    deliveryFirm: String,
    deliveryNum: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

export const Cart = model<CartDocument>('Cart', cartSchema);
