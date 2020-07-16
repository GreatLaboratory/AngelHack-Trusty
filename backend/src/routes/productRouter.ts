import { Router } from 'express';

import { postProduct, getProduct, getProductList } from '../controllers/productController';
import { productImageUploader } from '../routes/middleWares/uploader';

class ProductRouter {
    public router: Router;

    constructor () {
        this.router = Router();
        this.routes();
    }

    private routes (): void {
        // 상품 등록하기
        this.router.post('/', productImageUploader.fields([{ name: 'mainImage', maxCount: 1 }, { name: 'subImages', maxCount: 10 }]), postProduct);
        
        // 상품 조회하기
        this.router.get('/detail/:productId', getProduct);
        
        // 상품 리스트 조회하기
        this.router.get('/list', getProductList);
        
        // 카테고리별 상품 리스트 조회하기
        this.router.get('/categoryList/:category', getProductList);
    }
}

const productRouter = new ProductRouter();
export default productRouter.router;
