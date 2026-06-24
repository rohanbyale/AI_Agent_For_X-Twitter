// import { config } from 'dotenv';
// import readline from 'readline/promises'

// import { GoogleGenAI } from "@google/genai";
// import { Client } from '@modelcontextprotocol/sdk/client/index.js'
// import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js"

// config()
// let tools = []
// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
// const mcpClient = new Client({
//     name: "example-client",
//     version: "1.0.0",
// })

// const chatHistory = [];
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// mcpClient.connect(new SSEClientTransport(new URL("http://localhost:3001/sse"))).then(async () => {

//     console.log("Connected to mcp server")
//     tools = (await mcpClient.listTools()).tools.map(tool => {
//         return {
//             name: tool.name,
//             description: tool.description,
//             parameters: {
//                 type: tool.inputSchema.type,
//                 properties: tool.inputSchema.properties,
//                 required: tool.inputSchema.required

//             }
//         }
//     })
//     // console.log("Available tools:", tools)
//     chatLoop();
// })

// async function chatLoop(toolCall) {

//     if (toolCall) {
// console.log("calling tool", toolCall.name)
// chatHistory.push({
//     role: "model",
//     parts:[
//         {
//             text:`calling tool ${toolCall.name}`,
//             type:"text"
//         }
//     ]
// })

//     const toolResult = await   mcpClient.callTool({
//             name: toolCall.name,
//             arguments: toolCall.args
//         })

//         console.log(toolResult)

//     }

// chatHistory.push({
//     role:"user",
//     parts:[
//         {
//             text:toolResult.content[ 0 ].text,
//             type:"text"
//         }
//     ]
// })


//     const question = await rl.question('You: ')
//     chatHistory.push({
//         role: "user",
//         parts: [
//             {
//                 text: question,
//                 type: "text"
//             }
//         ]
//     })

//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: chatHistory,
//         config: {
//             tools: [
//                 {
//                     functionDeclarations: tools
//                 }
//             ]
//         }
//     })
//     // console.log(response.candidates[ 0 ].content.parts[ 0 ].text)

//     const functionCall = response.candidates[0].content.parts[0].functionCall

//     const responseText = response.candidates[0].content.parts[0].text

//     if (functionCall) {
//         return chatLoop(functionCall)
//     }

//     chatHistory.push({
//         role: "model",
//         parts: [
//             {
//                 text: responseText,
//                 type: "text"
//             }
//         ]
//     })

//     console.log(`AI: ${responseText}`)
//     chatLoop();
// }





import { config } from "dotenv";
import readline from "readline/promises";
import { GoogleGenAI } from "@google/genai";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const mcpClient = new Client({
  name: "example-client",
  version: "1.0.0",
});

let tools = [];
const chatHistory = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function start() {
  await mcpClient.connect(
    new SSEClientTransport(
      new URL("http://localhost:3001/sse")
    )
  );

  console.log("Connected to MCP Server");

  const toolList = await mcpClient.listTools();

  tools = toolList.tools.map((tool) => ({
    name: tool.name,
    description: tool.description,
    parametersJsonSchema: tool.inputSchema,
  }));

  console.log("Available Tools:");
  console.dir(tools, { depth: null });

  await chatLoop();
}

async function chatLoop() {
  while (true) {
    const question = await rl.question("You: ");

    chatHistory.push({
      role: "user",
      parts: [{ text: question }],
    });

    let continueLoop = true;

    while (continueLoop) {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: chatHistory,
        config: {
          tools: [
            {
              functionDeclarations: tools,
            },
          ],
        },
      });

      const part = response.candidates?.[0]?.content?.parts?.[0];

      if (!part) {
        console.log("No response from model");
        break;
      }

      if (part.functionCall) {
        const functionCall = part.functionCall;

        console.log("\nFunction Call:");
        console.dir(functionCall, { depth: null });

        const toolResult = await mcpClient.callTool({
          name: functionCall.name,
          arguments: functionCall.args || {},
        });

        console.log("\nTool Result:");
        console.dir(toolResult, { depth: null });

        chatHistory.push({
          role: "model",
          parts: [
            {
              functionCall,
            },
          ],
        });

        chatHistory.push({
          role: "user",
          parts: [
            {
              text: toolResult.content[0].text,
            },
          ],
        });

        continue;
      }

      console.log(`AI: ${part.text}`);

      chatHistory.push({
        role: "model",
        parts: [{ text: part.text }],
      });

      continueLoop = false;
    }
  }
}

start().catch(console.error);
