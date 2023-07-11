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
    }
}) 

export default mongoose.model('Portfolio', PortfolioModel)