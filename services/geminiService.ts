import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}
  
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMoodBoardImages = async (prompt: string): Promise<string[]> => {
    try {
        const enhancedPrompt = `A visually stunning mood board capturing the essence of: "${prompt}". Create 4 high-quality, aesthetically pleasing images that are cohesive in style.`;

        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: enhancedPrompt,
            config: {
              numberOfImages: 4,
              outputMimeType: 'image/jpeg',
              aspectRatio: '4:3',
            },
        });
        
        if (!response.generatedImages || response.generatedImages.length === 0) {
            throw new Error("No images were generated. The prompt may have been blocked.");
        }

        const imageUrls = response.generatedImages.map(img => {
            if (!img.image.imageBytes) {
                throw new Error("Received an empty image from the API.");
            }
            return `data:image/jpeg;base64,${img.image.imageBytes}`;
        });

        return imageUrls;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Gemini API Error: ${error.message}`);
        }
        throw new Error("An unexpected error occurred while generating images.");
    }
};
