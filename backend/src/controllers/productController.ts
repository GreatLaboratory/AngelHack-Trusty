import { Request, Response, NextFunction } from 'express';

import { ProductDocument, Product } from '../models/product/Product';
import { Seller, SellerDocument } from '../models/user/Seller';

// POST -> 상품 등록하기
export const postProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { sellerId, price, name, description, category } = req.body;
    const files: any = req.files;
    const mainImage: string = files['mainImage'][0].location;
    const subImages: string[] = [];
    files['subImages'].map((img: any) => subImages.push(`${ img.location }`));
    try {
        const seller: SellerDocument | null = await Seller.findById(sellerId);
        if (seller) {
            const newProduct: ProductDocument = new Product({
                sellerId,
                name,
                price: parseInt(price),
                productArea: seller.address,
                description,
                category,
                mainImage,
                subImages
            });
            await Product.create(newProduct);
            res.status(201).json({ message: '성공적으로 상품을 등록했습니다.', data: newProduct });
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};

// GET -> 상품 조회하기
export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    try {
        const product: ProductDocument | null = await Product.findById(productId).populate('sellerId');
        if (product) res.status(200).json(product);
        else res.status(400).json({ message: '해당하는 아이디의 상품이 존재하지 않습니다.' });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

// GET -> 상품 리스트 조회하기
export const getProductList = async (req: Request, res: Response, next: NextFunction) => {
    const { page, limit, sort } = req.query;
    try {
        let productList: ProductDocument[];
        if (sort === 'lowPrice') {
            if (page && limit){
                productList = await Product.find().sort('price').populate('sellerId')
                    .skip((parseInt(limit.toString()) * parseInt(page.toString())) - parseInt(limit.toString()))
                    .limit(parseInt(limit.toString()));
                res.status(200).json(productList);
            } else if (!page && limit) {
                productList = await Product.find().sort('price').populate('sellerId')
                    .limit(parseInt(limit.toString()));
                res.status(200).json(productList);
            } else {
                productList = await Product.find().sort('price').populate('sellerId');
                res.status(200).json(productList);
            }
        } else if (sort === 'highPrice') {
            if (page && limit){
                productList = await Product.find().sort('-price').populate('sellerId')
                    .skip((parseInt(limit.toString()) * parseInt(page.toString())) - parseInt(limit.toString()))
                    .limit(parseInt(limit.toString()));
                res.status(200).json(productList);
            } else if (!page && limit) {
                productList = await Product.find().sort('-price').populate('sellerId')
                    .limit(parseInt(limit.toString()));
                res.status(200).json(productList);
            } else {
                productList = await Product.find().sort('-price').populate('sellerId');
                res.status(200).json(productList);
            }
        } else {
            if (page && limit){
                productList = await Product.find().sort('-createdAt').populate('sellerId')
                    .skip((parseInt(limit.toString()) * parseInt(page.toString())) - parseInt(limit.toString()))
                    .limit(parseInt(limit.toString()));
                res.status(200).json(productList);
            } else if (!page && limit) {
                productList = await Product.find().sort('-createdAt').populate('sellerId')
                    .limit(parseInt(limit.toString()));
                res.status(200).json(productList);
            } else {
                productList = await Product.find().sort('-createdAt').populate('sellerId');
                res.status(200).json(productList);
            }
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};

// GET -> 카테고리별 상품 리스트 조회하기
export const getCategoryProductList = async (req: Request, res: Response, next: NextFunction) => {
    const { page, limit, sort } = req.query;
    const { category } = req.params;
    try {
        let productList: ProductDocument[];
        if (sort === 'lowPrice') {
            if (page && limit){
                productList = await Product.find({ category }).sort('price').populate('sellerId')
                    .skip((parseInt(limit.toString()) * parseInt(page.toString())) - parseInt(limit.toString()))
                    .limit(parseInt(limit.toString()));
                res.status(200).json(productList);
            } else if (!page && limit) {
                productList = await Product.find({ category }).sort('price').populate('sellerId')
                    .limit(parseInt(limit.toString()));
                res.status(200).json(productList);
            } else {
                productList = await Product.find({ category }).sort('price').populate('sellerId');
                res.status(200).json(productList);
            }
        } else if (sort === 'highPrice') {
            if (page && limit){
                productList = await Product.find({ category }).sort('-price').populate('sellerId')
                    .skip((parseInt(limit.toString()) * parseInt(page.toString())) - parseInt(limit.toString()))
                    .limit(parseInt(limit.toString()));
                res.status(200).json(productList);
            } else if (!page && limit) {
                productList = await Product.find({ category }).sort('-price').populate('sellerId')
                    .limit(parseInt(limit.toString()));
                res.status(200).json(productList);
            } else {
                productList = await Product.find({ category }).sort('-price').populate('sellerId');
                res.status(200).json(productList);
            }
        } else {
            if (page && limit){
                productList = await Product.find({ category }).sort('-createdAt').populate('sellerId')
                    .skip((parseInt(limit.toString()) * parseInt(page.toString())) - parseInt(limit.toString()))
                    .limit(parseInt(limit.toString()));
                res.status(200).json(productList);
            } else if (!page && limit) {
                productList = await Product.find({ category }).sort('-createdAt').populate('sellerId')
                    .limit(parseInt(limit.toString()));
                res.status(200).json(productList);
            } else {
                productList = await Product.find({ category }).sort('-createdAt').populate('sellerId');
                res.status(200).json(productList);
            }
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};
