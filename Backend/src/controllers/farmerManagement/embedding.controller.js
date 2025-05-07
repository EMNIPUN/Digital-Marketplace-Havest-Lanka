import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "@langchain/core/documents";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import mongoose from "mongoose";
import Crops from "../../models/farmerManagement/crops.modle.js";

export const createEmbeddings = async (req, res) => {

    const embeddingsModel = new OpenAIEmbeddings({
      model: "text-embedding-ada-002",
      apiKey: process.env.OPENAI_API_KEY,
    });

    const vectorIndex = new MongoDBAtlasVectorSearch(embeddingsModel, {
        collection: mongoose.connection.collection("cropsVectors"),
        indexName: "vector_index",
      });

    const crops = await Crops.find({});

    const docs = crops.map((crop) => {
        const { _id,idealTemp, humidity, soilType, growthPeriod, description } = crop;
        const doc = new Document({
          pageContent: `${description} Ideal temperature: ${idealTemp}, Humidity: ${humidity}, Soil type: ${soilType}, Growth period: ${growthPeriod}.`,
          metadata: { _id },
        });
        return doc;
      }); 
      

    await vectorIndex.addDocuments(docs);

    res.status(200).json({
        message: "Embeddings created successfully",
      });
      return;
};