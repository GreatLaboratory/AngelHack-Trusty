import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

import { OrderDocument, Order, IResponseOrder } from '../models/order/Order';
import { CartDocument, Cart, IResponseCart } from '../models/order/Cart';
import { Product, ProductDocument } from '../models/product/Product';
import { User, UserDocument } from '../models/user/User';
import { Seller } from '../models/user/Seller';

// POST -> 장바구니 담기
export const takeInCart = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { productId, orderNum, orderPrice } = req.body;
    try {
        const product: ProductDocument | null = await Product.findById(productId);
        if (product) {
            const sellerId: string = product.sellerId;
            const cartInfo: CartDocument = new Cart({ userId, sellerId, productId, orderNum, orderPrice, isOrdered: false });
            await Cart.create(cartInfo);
            res.status(200).json({ message: '성공적으로 장바구니에 담겼습니다.', data: cartInfo });
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};

// GET -> 장바구니 목록 조회하기
export const getCartList = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const resultCartList: IResponseCart[] = [];
    try {
        const cartList: CartDocument[] = await Cart.find({ userId, isOrdered: false });
        const getProductList = async (cartList: CartDocument[]) => { 
            const promises = cartList.map((cart: CartDocument) => {
                const { productId } = cart;
                const product = Product.findById(productId).select('mainImage name price');
                if (product) return product;
            });
            return await Promise.all(promises); 
        };
        const resultProductList: any = await getProductList(cartList);
        for (let i = 0; i < cartList.length; i++) {
            const response: IResponseCart = {
                cart: cartList[i],
                productImage: resultProductList[i].mainImage,
                productName: resultProductList[i].name,
                productPrice: resultProductList[i].price
            };
            resultCartList.push(response);
        }
        res.status(200).json(resultCartList);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

// DELETE -> 장바구니 삭제하기
export const deleteCart = async (req: Request, res: Response, next: NextFunction) => {
    const { cartId } = req.params;
    try {
        const cart: CartDocument | null = await Cart.findByIdAndDelete(cartId);
        if (cart) res.status(201).json({ message: '장바구니 삭제가 완료되었습니다.', data: cart});
        else res.status(400).json({ message: '해당하는 아이디의 장바구니가 존재하지 않습니다.' });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

// POST -> 사용자가 주문하기
export const order = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, cartList, buyerInfo, receiverInfo, totalPrice, payType } = req.body;
    const cartIdList: string[] = cartList.map((cart: CartDocument) => cart._id);
    try {
        cartList.forEach(async (cart: CartDocument) => {
            // 장바구니의 상태를 주문상태로 변경 - 배송상태는 처음 디폴트값인 배송중으로 변경
            await Cart.findByIdAndUpdate(cart._id, { isOrdered: true, status: '배송중', createdAt: new Date() });
        });

        // order db 생성
        const newOrderInfo: OrderDocument = new Order({ 
            userId, 
            cartIdList,
            totalPrice,
            payType,
            buyerName: buyerInfo.name,
            buyerPhoneNum: buyerInfo.phoneNum,
            buyerTelephoneNum: buyerInfo.telephoneNum,
            buyerZipcode: buyerInfo.zipcode,
            buyerAddress: buyerInfo.address,
            receiverName: receiverInfo.name,
            receiverPhoneNum: receiverInfo.phoneNum,
            receiverTelephoneNum: receiverInfo.telephoneNum,
            receiverZipcode: receiverInfo.zipcode,
            receiverAddress: receiverInfo.address,
        });
        await Order.create(newOrderInfo);

        // 각각의 단일 주문의 orderId 필드 업데이트
        cartIdList.forEach(async (cartId: string) => {
            await Cart.findByIdAndUpdate(cartId, { orderId: newOrderInfo._id });
        });

        // 주문을 한 사용자의 주문 리스트
        const user: UserDocument | null = await User.findById(userId);
        if (user) {
            user.orderIdList.push(newOrderInfo._id);
            await user.save();
        }

        // 프론트 응답
        res.status(201).json({ message: '성공적으로 주문요청이 완료되었습니다.', data: newOrderInfo });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

// GET -> 사용자가 주문 목록 조회하기 + 배송조회
export const orderListForUser = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { limit, page } = req.query;

    // eslint-disable-next-line no-var
    var responseCartList: IResponseCart[] = [];
    let responseCart: IResponseCart;
    const responseOrderList: IResponseOrder[] = [];
    let responseOrder: IResponseOrder;
    let orderList: OrderDocument[];
    try {
        if (page && limit){
            orderList = await Order.find({ userId })
                .populate('cartIdList')
                .sort('-createdAt')
                .skip(parseInt(limit.toString()) * parseInt(page.toString()) - parseInt(limit.toString()))
                .limit(parseInt(limit.toString()));

        } else if (!page && limit) {
            orderList = await Order.find({ userId })
                .populate('cartIdList')
                .sort('-createdAt')
                .limit(parseInt(limit.toString()));

        } else {
            orderList = await Order.find({ userId })
                .populate('cartIdList')
                .sort('-createdAt');
        }

        // 카트리스트로 상품 객체리스트 불러오는 함수
        const getProducts = async (cartList: any) => {
            const promises = cartList.map((cart: CartDocument) => {
                const { productId } = cart;
                const product = Product.findById(productId).select('mainImage name');
                if (product) return product; 
            });
            return await Promise.all(promises);     
        };
            
        // 카트리스트로 판매자 객체리스트 불러오는 함수
        const getSellers = async (cartList: any) => {
            const promises = cartList.map((cart: CartDocument) => {
                const { sellerId } = cart;
                const seller = Seller.findById(sellerId).select('name');
                if (seller) return seller; 
            });
            return await Promise.all(promises);     
        };

        for (let i = 0; i < orderList.length; i++) {
            const cartList: any = orderList[i].cartIdList;
            const productList: any = await getProducts(cartList);
            const sellerList: any = await getSellers(cartList);
            for (let j = 0; j < cartList.length; j++) {
                responseCart = {
                    orderNum: cartList[j].orderNum,
                    orderPrice: cartList[j].orderPrice,
                    productName: productList[j].name,
                    productImage: productList[j].mainImage,
                    sellerName: sellerList[j].name,
                    status: cartList[j].status
                };
                responseCartList.push(responseCart);
            }
            responseOrder = {
                orderId: orderList[i]._id,
                orderDate: orderList[i].createdAt,
                cart: responseCartList
            };
            responseOrderList.push(responseOrder);
            responseCartList = [];
        }
        res.status(200).json(responseOrderList);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

// GET -> 판매자가 주문 목록 조회하기
export const orderListForSeller = async (req: Request, res: Response, next: NextFunction) => {
    const { sellerId } = req.params;
    const { limit, page } = req.query;
    // eslint-disable-next-line no-var
    var responseCartList: IResponseCart[] = [];
    let responseCart: IResponseCart;
    let cartList: CartDocument[];
    try {
        if (page && limit){
            cartList = await Cart.find({ sellerId, isOrdered: true })
                .sort('-createdAt')
                .skip(parseInt(limit.toString()) * parseInt(page.toString()) - parseInt(limit.toString()))
                .limit(parseInt(limit.toString()));
        } else if (!page && limit) {
            cartList = await Cart.find({ sellerId, isOrdered: true })
                .sort('-createdAt')
                .limit(parseInt(limit.toString()));
        } else {
            cartList = await Cart.find({ sellerId, isOrdered: true })
                .sort('-createdAt');
        }

        // 카트리스트로 상품 객체리스트 불러오는 함수
        const getProducts = async (cartList: any) => {
            const promises = cartList.map((cart: CartDocument) => {
                const { productId } = cart;
                const product = Product.findById(productId).select('mainImage name');
                if (product) return product; 
            });
            return await Promise.all(promises);     
        };
        const productList: any = await getProducts(cartList);
        for (let i = 0; i < cartList.length; i++) {
            responseCart = {
                cartId: cartList[i]._id,
                orderDate: cartList[i].createdAt,
                orderNum: cartList[i].orderNum,
                orderPrice: cartList[i].orderPrice,
                productName: productList[i].name,
                productImage: productList[i].mainImage,
                status: cartList[i].status
            };
            responseCartList.push(responseCart);
        }
        res.status(200).json(responseCartList);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

// POST -> 판매자가 운송장 번호 입력하기
export const addDeliveryInfo = async (req: Request, res: Response, next: NextFunction) => {
    const { cartId } = req.params;
    const { deliveryFirm, deliveryNum } = req.body;
    try {
        const cart: CartDocument | null = await Cart.findById(cartId);
        if (!cart) {
            res.status(404).json({ message: '해당하는 id값의 주문정보가 존재하지 않습니다.' });
        } else {
            try {
                const deliveryInfo = await axios.get(`https://apis.tracker.delivery/carriers/${deliveryFirm}/tracks/${deliveryNum}`);
                cart.deliveryNum = deliveryNum;
                cart.deliveryFirm = deliveryFirm;
                if (deliveryInfo.status === 200) cart.status = '배송완료';
                await cart.save();
                res.status(201).json({ mesage: `택배사는 ${deliveryFirm}이며, 운송장 번호는 ${deliveryNum}로 입력되었습니다.` });       
            } catch (error) {
                res.status(400).json({ message: '배송시스템 DB에 등록되지않은 운송장 번호입니다.' });
            }
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};
