import { InsiderSentimentApiResponseData } from "./insiderSentimentApiResponseData";

export type InsiderSentimentApiResponse = {
    data: InsiderSentimentApiResponseData[];
    symbol : string;
}