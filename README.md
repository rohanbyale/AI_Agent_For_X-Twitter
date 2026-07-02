# 🤖 AI-Powered Twitter/X Agent

<p align="center">
![Gemini](https://img.shields.io/badge/Powered%20by-Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)
![MCP](https://img.shields.io/badge/Model%20Context%20Protocol-MCP-00C853?style=for-the-badge)
![X](https://img.shields.io/badge/X-Twitter-000000?style=for-the-badge&logo=x)

</p>

An AI-powered Twitter/X automation agent built with **Google Gemini** and **Model Context Protocol (MCP)** to generate high-quality tweets and publish them automatically.


---

### Configure Environment Variables

Create a `.env` file.

```env
GEMINI_API_KEY=your_gemini_api_key

TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret

TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_SECRET=your_access_secret
---



---

# 📖 What is an AI Agent?

An AI Agent is software that can:

- 🧠 Understand user requests
- 💭 Reason about tasks
- 🛠 Use external tools
- 📄 Read files and documents
- 🌐 Access APIs
- 💬 Generate natural language responses
- ✅ Complete multi-step workflows automatically

Unlike a normal chatbot, an AI agent can **take actions**, not just answer questions.

---

# 🔌 What is MCP?

**Model Context Protocol (MCP)** is an open protocol that allows AI models to communicate with external tools and data sources through a standard interface.

Instead of hardcoding integrations for every application, an AI agent can connect to MCP servers to access:

- File systems
- Databases
- GitHub
- Slack
- Google Drive
- Web APIs
- Custom business tools
- Internal company services

Think of MCP as **USB-C for AI applications**—one standard protocol for connecting models to tools.

---

# 🏗 MCP Architecture

```text
        User
          │
          ▼
    AI Agent (LLM)
          │
      MCP Client
          │
 ─────────────────────
 │        │         │
 ▼        ▼         ▼
File    GitHub   Database
Server   Server    Server
```

---

# ⚙️ How MCP Works

1. User sends a request.
2. The AI Agent analyzes the task.
3. The agent discovers available MCP tools.
4. It selects the right tool.
5. The MCP server performs the action.
6. Results are returned to the AI.
7. The AI generates the final response.

---
