const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    product_name:{
        type: String,
        unique: true,
        required: true
    },
    product_id:{
        type: Number,
        unique: true,
        required: true
    },
    product_quantity:{
        type: Number,
        required: true
    },
    selling_price:{
        type: Number,
        required: true
    },
    current_bought_price:{
        type: Number,
        required: true
    },
    bought_history:[{
        bought_quantity:{
            type: Number,
            required: true
        },
        bought_price:{
            type: Number,
            required: true
        },
        bought_date:{
            type: Date,
            required: true
        }
    }],
    selling_history:[{
        sold_date:{
            type: Date,
            default: Date.now()
        },
        sold_quantity:{
            type: Number,
            required: true
        },
        sold_price:{
            type: Number,
            required: true
        },
        profit:{
            type: Number,
            required: true
        }
    }]
});

const Product = module.exports = mongoose.model('Product', ProductSchema);
