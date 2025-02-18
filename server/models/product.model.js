// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     name : {
//         type : String,
//     },
//     image : {
//         type : Array,
//         default : []
//     },
//     category : [
//         {
//             type : mongoose.Schema.ObjectId,
//             ref : 'category'
//         }
//     ],
//     subCategory : [
//         {
//             type : mongoose.Schema.ObjectId,
//             ref : 'subCategory'
//         }
//     ],
//     unit : {
//         type : String,
//         default : ""
//     },
//     stock : {
//         type : Number,
//         default : null
//     },
//     price : {
//         type : Number,
//         defualt : null
//     },
//     discount : {
//         type : Number,
//         default : null
//     },
//     description : {
//         type : String,
//         default : ""
//     },
//     more_details : {
//         type : Object,
//         default : {}
//     },
//     publish : {
//         type : Boolean,
//         default : true
//     }
// },{
//     timestamps : true
// })

// //create a text index
// productSchema.index({
//     name  : "text",
//     description : 'text'
// },{
//     name : 10,
//     description : 5
// })


// const ProductModel = mongoose.model('product',productSchema)

// export default ProductModel



import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
    name: {
        type: String, // e.g., "Bundle of 5"
        required: true,
    },
    price: {
        type: Number, // Price of the variant
        required: true,
    },
    discount: {
        type: Number, // Percentage discount for the variant
        default: 0,   // e.g., 20 for 20% discount
    },
    quantity: {
        type: Number, // Quantity of items in this variant
        required: true, // e.g., 5 (for a bundle of 5)
    },
    additionalDetails: {
        type: Object, // Any extra details about the variant
        default: {},
    }
});

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        image: {
            type: Array,
            default: [],
        },
        category: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "category",
            },
        ],
        subCategory: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "subCategory",
            },
        ],
        unit: {
            type: String,
            default: "",
        },
        stock: {
            type: Number,
            default: null,
        },
        price: {
            type: Number,
            default: null,
        },
        discount: {
            type: Number,
            default: null,
        },
        description: {
            type: String,
            default: "",
        },
        more_details: {
            type: Object,
            default: {},
        },
        publish: {
            type: Boolean,
            default: true,
        },
        variants: [variantSchema], // Add an array of variants
    },
    {
        timestamps: true,
    }
);

// Create a text index
productSchema.index(
    {
        name: "text",
        description: "text",
    },
    {
        name: 10,
        description: 5,
    }
);

const ProductModel = mongoose.model("product", productSchema);

export default ProductModel;
