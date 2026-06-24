import dotenv from "dotenv";
dotenv.config();

import { TwitterApi } from "twitter-api-v2";

console.log("Twitter Credentials Check:");
console.log({
  TWITTER_API_KEY: process.env.TWITTER_API_KEY ? "FOUND" : "MISSING",
  TWITTER_API_SECRET: process.env.TWITTER_API_SECRET ? "FOUND" : "MISSING",
  TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN ? "FOUND" : "MISSING",
  TWITTER_ACCESS_TOKEN_SECRET: process.env.TWITTER_ACCESS_TOKEN_SECRET ? "FOUND" : "MISSING",
});

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

export async function createPost(status) {
  try {
    const tweet = await twitterClient.v2.tweet(status);

    return {
      content: [
        {
          type: "text",
          text: `Tweet posted successfully: ${status}`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Twitter Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
}
