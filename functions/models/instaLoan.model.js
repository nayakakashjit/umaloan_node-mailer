const mongoose = require('mongoose');

const instaLoanSchema = mongoose.Schema(
    {
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    amount: {
        type: Number
    },
    property_state: {
        type: String
    },
    property_city: {
        type: String
    },
    officialemail: {
        type: String
    },
    company_name: {
        type: String
    },
    pan: {
        type: String
    },
    salary: {
        type: Number
    },
    selected_bank: {
        type: String
    }
},
{ timestamps: true },
);

const instaLoanModel = mongoose.model('instaloan', instaLoanSchema);
module.exports = instaLoanModel;