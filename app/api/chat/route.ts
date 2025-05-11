import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const { query, conversationHistory } = await request.json()

    // Determine if this is a search query or a chat message
    const isSearchQuery = !conversationHistory || conversationHistory.trim() === ""

    // Create a system prompt based on the request type
    let systemPrompt = ""

    if (isSearchQuery) {
      // System prompt for search queries
      systemPrompt = `You are SageBase, an AI assistant that helps users find information across multiple platforms.
      
This is a search query, so provide a comprehensive but concise answer that summarizes the key information about the topic.

For queries about technical topics like authentication, APIs, or development:
- Provide specific technical details when available
- Include information about implementation, best practices, and common issues
- Format your response with HTML for better readability

For example, if the query is about OAuth or authentication:
- Explain the authentication flow
- Mention token expiration and refresh mechanisms
- Note any ongoing projects or improvements

Format your responses with HTML for better display. Use:
- <p> tags for paragraphs
- <ul> and <li> for lists
- <a href="#"> for links
- <code> for inline code
- <pre> for code blocks
- <div> for sections`
    } else {
      // System prompt for chat messages
      systemPrompt = `You are SageBase, an AI assistant that helps users find information or create/update documents.
      
You're in simulation mode. When users ask for specific information that would require real company data:
- Politely inform them you couldn't find relevant information
- Suggest they contact a specific collegue by saying somethinh like : XXXXXXX could be a good person to answer this spcific question.
Use a real name.
- Offer to help document the information once they have it

This is a chat message in an ongoing conversation. Provide a helpful, conversational response that directly addresses the user's question.

Format your responses with HTML for better display. Use:
- <p> tags for paragraphs
- <ul> and <li> for lists
- <a href="#"> for links
- <code> for inline code
- <pre> for code blocks
- <div> for sections

Example format:
<div>
  <p>This is a paragraph.</p>
  <ul>
    <li>List item 1</li>
    <li>List item 2</li>
  </ul>
  <p>Here's a <a href="#">link</a> and <code>inline code</code>.</p>
</div>`
    }

    // Use the AI SDK with the appropriate system prompt
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: query,
      system: systemPrompt,
      temperature: isSearchQuery ? 0.3 : 0.7, // Lower temperature for search queries for more factual responses
      maxTokens: isSearchQuery ? 500 : 800, // Shorter responses for search queries
    })

    // Ensure the response is properly formatted as HTML
    let formattedResponse = text
    if (!text.includes("<div>") && !text.includes("<p>")) {
      formattedResponse = `<div><p>${text}</p></div>`
    }

    return NextResponse.json({ response: formattedResponse })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
