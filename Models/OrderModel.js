import mongoose from "mongoose";

const OrderModel = new mongoose.Schema(
	{
		orderFrom: {
			type: String,
		},
        orderFromChatId: {
            type: Number,
        }, 
		orderReference: {
			type: Array,
		},
        orderCaption: {
            type: String,
        },
		orderOptions: {
			numberOfPerson: {
				type: Number,
			},
			sizeOption: {
				type: String,
			},
			completenessOption: {
				type: String,
			},
			renderOption: {
				type: String,
			},
            backgroundOption: {
                type: String,
            }  
		},
        orderStatus: {
            default: 'waiting',
            type: String
        }
	},
	{
		timestamps: {
			createdAt: "created_at", // Use `created_at` to store the created date
			updatedAt: "updated_at", // and `updated_at` to store the last updated date
		},
	}
);

export default mongoose.model("Order", OrderModel);
