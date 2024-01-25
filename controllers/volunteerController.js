import volunteerModel from '../models/volunteerModel';  // Adjust the path accordingly
import jwt from "jsonwebtoken"

const submitForm = async (req, res) => {
  try {
    const { formType, telNumber, location, description, funds, availability } = req.body;

    const token = req.headers.authorization;
    const jwtkey = process.env.JWT_SECRET_KEY;

    let decodedToken;
    
    try {
      decodedToken = jwt.verify(token, jwtkey);
    } catch (error) {
      console.error('Error decoding token:', error);
      return res.status(401).json({ message: "Invalid token" });
    }

    
    const userName = decodedToken.name;


    console.log('Token:', token);
    console.log('userName', userName);
    console.log('Decoded Token:', decodedToken);
    
    if (!['student', 'teacher', 'Ngo', 'organization'].includes(formType)) {
      return res.status(400).json({ error: 'Invalid formType' });
    }

    
    const newForm = new volunteerModel({
      formType,
      telNumber,
      location,
      description,
      ...(formType === 'student' || formType === 'teacher' ? { availability } : {availability}),
      ...(formType === 'ngo' || formType === 'organization' ? { funds } : {funds}),
    });
    console.log('New Form:', newForm);

   
    const savedForm = await newForm.save();

    res.status(201).json(savedForm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export default submitForm 