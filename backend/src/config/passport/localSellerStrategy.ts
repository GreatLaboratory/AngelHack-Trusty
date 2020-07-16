import { PassportStatic } from 'passport';
import { Seller } from '../../models/user/Seller';

export const localSeller = (passport: PassportStatic) => {
    passport.use('seller', Seller.createStrategy());

    passport.serializeUser(Seller.serializeUser());
    passport.deserializeUser(Seller.deserializeUser());
};
