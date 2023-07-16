import mongoose from 'mongoose'

const PortfolioModel = new mongoose.Schema({
    pic: {
        type: String,
    },
    style: {
        type: String,
    },
    genre: {
        type: String,
    },
}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
})

export default mongoose.model('Portfolio', PortfolioModel)