const express = require('express');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
const router = express.Router();

const Bill = require('../models/bill');
const Product = require('../models/product');
const product = require('../models/product');

router.get('/billing', (req, res, next) => {
    Bill.find(function(err, bills){
        res.json(bills);
    })
});


router.get('/product', (req, res, next) => {
    Product.find(function(err, bills){
        res.json(bills);
    })
});

router.post('/product',jsonParser, (req, res, next) => {
    console.log(req.body);
    let newProduct = new Product({
        product_name: req.body.product_name,
        product_id: req.body.product_id,
        product_quantity: req.body.product_quantity,
        selling_price: req.body.selling_price,
        current_bought_price: req.body.current_bought_price,
        bought_history: req.body.bought_history,
        selling_history:[]
    });

    newProduct.save((err, product) => {
        if(err)
        {
            res.json({err:err, msg: 'Failed to save Product'});
        }
        else{
            res.json({msg: 'Product Saved!'});
        }
    });
});

router.put('/product/:id', jsonParser, (req, res, next) => {
    Product.findOneAndUpdate({product_name: req.params.id}, req.body, function(err, result){
        if(err){
            res.json({err:err, msg:"Failed!"});
        }else{
            res.json({msg: 'Product '+req.params.id+' Updated!', res: result});
        }
    });
});

router.delete('/product/:id', (req, res, next) => {
    Product.remove({_id: req.params.id}, function(err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});


router.post('/billing', jsonParser, (req, res, next) => {
    console.log(req.body);
    let newBill = new Bill({
        name: req.body.name,
        cell_number: req.body.cell_number,
        bill_date: req.body.bill_date,
        bill_items: req.body.bill_items,
        final_bill: req.body.final_bill
    });

    newBill.save((err, bill) => {
        if(err)
        {
            res.json({err:err, msg: 'Failed to save Bill'});
        }
        else{
            res.json({msg: 'Bill Saved!'});
        }
    });
});


router.delete('/billing/:id', (req, res, next) => {
    Bill.remove({_id: req.params.id}, function(err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});

module.exports = router;