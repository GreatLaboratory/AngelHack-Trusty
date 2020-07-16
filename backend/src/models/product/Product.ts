import { Document, Schema, model } from 'mongoose';
const { Types : { ObjectId } } = Schema;

export type ProductDocument = Document & {
    _id: string;  // 고유 아이디

    sellerId: string; // 판매자 아이디
    reviewIdList: string[];  // 해당 상품의 리뷰 아이디 리스트

    name: string;  // 이름
    image: string; // 상품 사진
    sellerImage: string;  // 판매자 사진
    price: string;  // 가격
    productArea: string;  // 산지
    description: string;  // 설명
    stock: number;  // 재고 수량

    createdAt: Date;  // 상품 등록날짜
}

const productSchema = new Schema({
    sellerId: {
        type: ObjectId,
        ref: 'Seller'
    },
    reviewIdList: [
        {
            type: ObjectId,
            ref: 'Review'
        }
    ],
    name: String,
    image: String,
    sellerImage: String,
    price: String,
    productArea: String,
    description: String,
    stock: Number,
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

export const Product = model<ProductDocument>('Product', productSchema);