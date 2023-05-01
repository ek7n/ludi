const { v4: uuidv4 } = require('uuid');
const Iyzipay = require('iyzipay');
const { result } = require('lodash');

var iyzipay = new Iyzipay({
    apiKey: process.env.PAYMENT_API_KEY,
    secretKey: process.env.PAYMENT_SECRET,
    uri: 'https://sandbox-api.iyzipay.com'
});

const payment = async (req,res,next) => {
    const id = uuidv4();
    const { price,cardHolderName,cvc,expireMonth,expireYear,cardNumber} = req.body;
    console.log(id)
    const data = {
        locale: "tr",
        conversationId: id,
        price: price,
        paidPrice: price,
        currency: "TRY",
        installment: '1',
        basketId: 'B67832',
        paymentChannel: "WEB",
        paymentGroup: "PRODUCT",
        paymentCard: {
            cardHolderName,
            cardNumber,
            expireMonth,
            expireYear,
            cvc,
            registerCard: '0'
        },
        buyer: {
            id: 'BY789',
            name: 'John',
            surname: 'Doe',
            gsmNumber: '+905350000000',
            email: 'email@email.com',
            identityNumber: '74300864791',
            lastLoginDate: '2015-10-05 12:43:35',
            registrationDate: '2013-04-21 15:12:09',
            registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
            ip: '85.34.78.112',
            city: 'Istanbul',
            country: 'Turkey',
            zipCode: '34732'
        },
        shippingAddress: {
            contactName: 'Jane Doe',
            city: 'Istanbul',
            country: 'Turkey',
            address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
            zipCode: '34742'
        },
        billingAddress: {
            contactName: 'Jane Doe',
            city: 'Istanbul',
            country: 'Turkey',
            address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
            zipCode: '34742'
        },
        basketItems: [
            {
                id: 'BI101',
                name: 'Binocular',
                category1: 'Collectibles',
                category2: 'Accessories',
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price
            }
        ]
    };
    


let testData;

new Promise((resolve,reject) => {
    iyzipay.payment.create(data, function (err, result) {
        console.log(err, result.status);
        if(err) return reject(err);
        resolve(result)
        testData = result
        console.log(testData)
       /*  return res.json(
            {   
                data:testData.status,
                success : true,
                message:"Ödeme başarıyla alındı"
            } 
            
         ) */
         if(testData.status==="success"){
            next();
         }
         
    });
    
})
 
    /* next(); */
}



module.exports = {

    payment

}