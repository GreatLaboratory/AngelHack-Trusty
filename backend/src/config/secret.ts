import 'dotenv/config';
import crypto, { Hmac } from 'crypto';

export const MONGODB_URI: string = process.env.MONGODB_URI;
export const SESSION_SECRET: string = process.env.SESSION_SECRET;
export const SENS_SERVICE_ID: string = process.env.SENS_SERVICE_ID;
export const SENS_ACCESS_KEY_ID: string = process.env.SENS_ACCESS_KEY_ID;
export const SENS_PHONE_NUM: string = process.env.SENS_PHONE_NUM;

export const makeSignature = () => {
    const space = ' ';				// one space
    const url = `/sms/v2/services/${process.env.SENS_SERVICE_ID}/messages`;
    const newLine = '\n';				// new line
    const method = 'POST';
    const timestamp = Date.now().toString();			// current timestamp (epoch)
    const accessKey = `${process.env.SENS_ACCESS_KEY_ID}`;			// access key id (from portal or Sub Account)
    const secretKey = `${process.env.SENS_SECRET_KEY}`;			// secret key (from portal or Sub Account)

    const message = [];
    const hmac: Hmac = crypto.createHmac('sha256', secretKey);
    message.push(method);
    message.push(space);
    message.push(url);
    message.push(newLine);
    message.push(timestamp);
    message.push(newLine);
    message.push(accessKey);
    const signature = hmac.update(message.join('')).digest('base64');

    return signature.toString();
};
