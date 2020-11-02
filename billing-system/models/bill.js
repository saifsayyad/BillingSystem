const mongoose = require('mongoose');

const BillSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cell_number: {
        type: String,
        required: true
    },
    bill_date: {
        type: Date,
        required: true
    },
    final_bill: {
        type: Number,
        required: true
    },
    entry_created_date: {
        type: Date,
        default: Date.now()
    },
    bill_items: [{
      item_name: {
          type: String,
          required: true
      },
      item_price: {
          type: Number,
          required: true
      },
      item_quantity: {
          type: Number,
          required: true
      }
    }]
});

const Bill = module.exports = mongoose.model('Bill', BillSchema);