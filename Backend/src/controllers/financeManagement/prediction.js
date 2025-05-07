import axios from 'axios';

const predictPrice = async (req, res) => {
  const { prices, timeline, name } = req.body;

  // Ensure you have the correct prompt based on crop data and timeline
  const priceData = prices.map((price) => `${price.date}: ${price.price}`).join("\n");

  const prompt = `
    Predict the price trend for the crop ${name} over the next ${timeline} days based on the following historical prices:
    ${priceData} , give prediction for the given time frame and prices for each day in that time frame 
    dont say cannot predict with given data i want to demonstrate this works with ai , 
    dont mention anywhere insufficient data or anything means that somehow give price predictions for the given dates
  `;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        params: { key: "AIzaSyBm0IkfMMSDZ7DqYvj6Gm5jSF2xj3Y6L8E" }, // Use environment variable for security
        headers: { "Content-Type": "application/json" }
      }
    );

    const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    res.status(200).json({ prediction: reply });
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    res.status(500).json({ message: "Error communicating with Gemini API", error });
  }
};

export default { predictPrice };
