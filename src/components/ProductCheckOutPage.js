import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Badge, Box, Button, useTheme } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import * as database from '../database/index';
import { CheckOut } from "../model/CheckOut";
import { ProductCard } from "./ProductCard";

// insert card action re counter and add to shopping cart
const ProductCheckOutPage = () => {

    const theme = useTheme();    
    const history = useHistory();
    const [cardsArray, setCardsArray] = useState([]);
    const [customersArray, setCustomersArray] = useState([]);
    const [currentCustomer, setCurrentCustomer] = useState({});
    const [items, setItems] = useState([]);
    const [checkoutTotal, setCheckoutTotal] = useState(0);
  
    useEffect(() => {
        setCardsArray(database.products);
        setCustomersArray(database.customers);
        setCurrentCustomer(database.getCustomer('Default'));
    }, []);
    
    const customerDealsMessage = () => {
        if(currentCustomer.name === 'SecondBite'){
            return ('Special Deal: 3 for 2 Classic Ads!')
        } else if(currentCustomer.name === 'Axil'){
            return ('Special Deal: StandOut Ads $299.99!')
        } else if(currentCustomer.name === 'MYER'){
            return ('Special Deal: 5 for 4 StandOut Ads, and Premium Ads $389.99!')
        } else {
            return ('')
        } 
    }
    const handleSelectCustomer = (e) => {
        setCurrentCustomer(database.getCustomer(e.target.value));
        // need to add fresh/reset of page to clear other customer related UI
    }
    
    const handleAddProduct = (productName) => {
        // create new item array and add each item to array shopping cart
        const newItems = [...items, database.getProduct(productName)];
        setItems(newItems);      
    }

    const handleCheckout = () => {
        // calculate the total price for the customer
        if(items.length > 0){
            const productCheckout = new CheckOut(currentCustomer, database.pricingRules);
            // add products to checkout
            for(let i = 0; i < items.length; i++){
                productCheckout.addItem(items[i]);
            }
            setCheckoutTotal(productCheckout.totalPrice().toFixed(2));  
        }
    }
      
return (
        <Box className="selectProducts" container width='91.5%'p={theme.spacing(1)} xs={12} sm={12} md={6} lg={4} >
        <h1>Select your ads and checkout</h1>
        {/* if expanded I'd put the shopping cart in nav, and navigate to new page for itemised list - and make running total display before hitting checkout as well*/}
        <Badge 
        color="secondary" badgeContent={items.length}>
         {checkoutTotal > 0 ? `$${checkoutTotal}` : ''} <ShoppingCartIcon /> 
        </Badge> 
        <Box>
        <Button variant="outlined" color="secondary" size="small" onClick={() => 
          handleCheckout()
        }
        >
         Checkout 
        </Button>
        </Box>
        
        <Box>
        <h3>Select customer</h3>
            <select onChange={handleSelectCustomer} value={currentCustomer.name}>{
            customersArray.map((el) => {
              return (
              <option
                key={el.id} 
                value={el.name} 
                >{el.name}</option>
                );
            })
          }</select>
          <h4 style={{ color: 'red' }}>{customerDealsMessage()}</h4>
          </Box>
        <Box className="productCards" container display='flex' flexDirection='row' flexWrap='wrap' xs={12} sm={12} md={12} lg={12}>
        
        {
            cardsArray.map((el) => {
              return (

              <ProductCard 
                el={el} 
                handleAddProduct={handleAddProduct}
                />

                );
            })
          } 
   </Box>
    </Box> 
    )
};

export { ProductCheckOutPage };