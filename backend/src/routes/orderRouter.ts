import { Router } from 'express';

import { takeInCart, getCartList, deleteCart, order, orderListForUser, orderListForSeller, addDeliveryInfo } from '../controllers/orderController';

class OrderRouter {
    public router: Router;

    constructor () {
        this.router = Router();
        this.routes();
    }

    private routes (): void {
        // 장바구니 담기
        this.router.post('/takeInCart/:userId', takeInCart);
        
        // 장바구니 목록 조회하기
        this.router.get('/cartList/:userId', getCartList);
        
        // 장바구니 삭제하기
        this.router.delete('/:cartId', deleteCart);
        
        // 주문하기
        this.router.post('/', order);
        
        // 사용자가 주문 목록 조회하기
        this.router.get('/listForUser/:userId', orderListForUser);
        
        // 판매자가 주문 목록 조회하기
        this.router.get('/listForSeller/:sellerId', orderListForSeller);
        
        // 판매자가 운송장 번호 입력하기
        this.router.post('/deliveryInfo/:cartId', addDeliveryInfo);
    }
}

const orderRouter = new OrderRouter();
export default orderRouter.router;
