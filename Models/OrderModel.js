import mongoose from "mongoose";

const OrderModel = new mongoose.Schema({
	orderFrom: { 
        type: String 
    },
    orderNum: {
        type: Number
    },
    orderStyle: {
        type: String
    },
    orderReference: {

    },
}, {
	timestamps: {
		createdAt: "created_at", // Use `created_at` to store the created date
		updatedAt: "updated_at", // and `updated_at` to store the last updated date
	},
});

export default mongoose.model("Portfolio", OrderModel);
