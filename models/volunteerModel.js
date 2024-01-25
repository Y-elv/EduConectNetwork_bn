import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    formType: {
      type: String,
      required: true,
      enum: [ 'student','teacher','organisation','Ngo'], // Make sure formType is one of these values
    },
    telNumber: {
      type: String,
      required: true,
    },
    location: {
      city: String,
      state: String,
      country: String,
    },
    description: {
      type: String,
      required: true,
    },
    funds: {
      type: Number,
      
      
    },
    availability:{
        type: Date,
    }
  });
  


  
const formModel = mongoose.model('Form', formSchema);
export default formModel