import Crops from "../../models/farmerManagement/crops.modle.js";
import mongoose from "mongoose";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";

export const retriveCrops = async (req, res) => {

    const { query } = req.query;

    if (!query || query === "") {
      const crops = (await Crops.find()).map((crop) => ({
        crop: crop,
        confidence: 1,
      }));

      res.status(200).json(crops);
      return;
    }

    const embeddingsModel = new OpenAIEmbeddings({
      model: "text-embedding-ada-002",
      apiKey: process.env.OPENAI_API_KEY,
    });

    const vectorIndex = new MongoDBAtlasVectorSearch(embeddingsModel, {
        collection: mongoose.connection.collection("cropsVectors"),
        indexName: "vector_index",
    });

    const results = await vectorIndex.similaritySearchWithScore(query);

    console.log(query)
    console.log(results);

    const matchedCrops = await Promise.all(
      results.map(async (result) => {
        const crops = await Crops.findById(result[0].metadata._id);
        return {
          crops: crops,
          confidence: result[1],
        };
      })
    );

    res
      .status(200)
      .json(
        matchedCrops.length > 3 ? matchedCrops.slice(0, 4) : matchedCrops
      );
}