import { Product } from '../model/Product.js';
import { Customer } from '../model/Customer.js';
// data would be seeded in Postgres DB or similar

const customers = [
    {
        id: 1,
        name: 'Default',
    },
    {
        id: 2,
        name: 'SecondBite'
    },
    {
        id: 3,
        name: 'Axil',
    },
    {
        id: 4,
        name: 'MYER',
    },
    {
        id: 5,
        name: 'Test1',
    },
];

const getCustomer = (customerName) => {
    const customer = customers.find(el => el.name === customerName);
    return new Customer(customer.id, customer.name);
};

const products = [
    {
    id: 1,
    name: 'ClassicAd',
    description: 'Offers the most basic level of advertisement',
    price: 269.99,
    imageUrl: 'https://i.imgur.com/lbSfzDF.png?2',
    imageName: 'Classic',
    },
    {
    id: 2,
    name: 'StandOutAd',
    description: 'Allows advertisers to use a company logo and use a longer presentation text',
    price: 322.99,
    imageUrl: 'https://i.imgur.com/kcCEdqF.png?1',
    imageName: 'StandOut',
    },
    {
    id: 3,
    name: 'PremiumAd',
    description: 'Allows advertisers to use a company logo and use a longer presentation text',
    price: 394.99,
    imageUrl: 'https://i.imgur.com/FqnCJdi.png?2',
    imageName: 'Premium',
    },
]

const getProduct = (productName) => {
    const product = products.find(el => el.name === productName);
    return new Product(product.id, product.name, product.description, product.price, product.imageUrl, product.imageName);
};

const pricingRules = [
    // array of functions that change itemPrice depending on particular logic of deal
    // some kind of contingency where(customer.deal === true) to execute?
    // the items will be the ads, so this will need to execute for every instance of the ad class
    {
        name: 'ThreeForTwo',
        // update later if have time to types array so can add different types of ad to deal
        type: 'ClassicAd',
        customers: ['SecondBite'],
        runRule: (currentCustomer, ruleCustomers, ruleAdType, items) => {
                if(ruleCustomers.indexOf(currentCustomer.name) > -1){
                    // console.log('threeForTwo does apply');
                    const ruleItems = items.filter((el) => el.name === ruleAdType);
                    // console.log(ruleItems);
                    const discountItemsCount = Math.floor(ruleItems.length/3);
                    // console.log(discountItemsCount);
                    for(let i =  0; i < discountItemsCount; i++){
                        ruleItems[i].price = 0;
                    }
                    const nonRuleItems = items.filter((el) => el.name !== ruleAdType);
                    return [...nonRuleItems, ...ruleItems];
                }
                else {
                    // console.log('threeForTwo does not apply');
                    return items;
                }
        }
    },

{
        name: 'FiveForFour',
        type: 'ClassicAd',
        customers: ['MYER'],
        runRule: (currentCustomer, ruleCustomers, ruleAdType, items) => {
            
            if(ruleCustomers.indexOf(currentCustomer.name) > -1){
                // console.log('fiveForFour does apply');

                const ruleItems = items.filter((el) => el.name === ruleAdType)
                const discountItemsCount = Math.floor(ruleItems.length/5);
                for(let i =  0; i < discountItemsCount; i++){
                    ruleItems[i].price = 0;
                }
                const nonRuleItems = items.filter((el) => el.name !== ruleAdType);
                return [...nonRuleItems, ...ruleItems];
            }
            else {
                // console.log('fiveForFour does not apply');
                return items;
            }
    }
},
{
        name: 'StandOutDiscount',
        type: 'StandOutAd',
        customers: ['Axil'],
        runRule: (currentCustomer, ruleCustomers, ruleAdType, items) => {
            if(ruleCustomers.indexOf(currentCustomer.name) > -1){
                // console.log('standOutDiscount does apply');
                const ruleItems = items.filter((el) => el.name === ruleAdType)
                for(let i =  0; i < ruleItems.length; i++){
                    ruleItems[i].price = 299.99;
                }
                const nonRuleItems = items.filter((el) => el.name !== ruleAdType);
                return [...nonRuleItems, ...ruleItems];
            }
            else {
                // console.log('standOutDiscount does not apply');
                return items;
            }
    }
},
{
    name: 'PremiumDiscount',
    type: 'PremiumAd',
    customers: ['MYER'],
    runRule: (currentCustomer, ruleCustomers, ruleAdType, items) => {
        if(ruleCustomers.indexOf(currentCustomer.name) > -1){
            // console.log('premiumDiscount does apply');

            const ruleItems = items.filter((el) => el.name === ruleAdType)
            for(let i =  0; i < ruleItems.length; i++){
                ruleItems[i].price = 389.99;
            }
            const nonRuleItems = items.filter((el) => el.name !== ruleAdType);
            return [...nonRuleItems, ...ruleItems];
        }
        else {
            // console.log('premiumDiscount does not apply');
            return items;
        }
}
},
];

export { customers, getCustomer, getProduct, products, pricingRules };