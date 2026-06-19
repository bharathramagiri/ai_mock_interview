import { generateText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { questions, answers, emotions } = await req.json();

    const dataCompilation = questions.map((q: string, idx: number) => ({
      question: q,
      candidateAnswer: answers[idx] || "No verbal feedback recorded.",
      capturedEmotions: emotions[idx] || ["No metric data compiled"]
    }));

    const structuralPrompt = `
      You are an expert executive talent acquisition specialist and professional technical interviewer.
      Analyze the candidate's responses to the 10 questions provided below.
      
      Review the answers for technical accuracy, structure, clarity, and logical consistency. 
      Factor in the captured micro-expressions listed with each query to judge presentation confidence and stress control.

      Dataset Payload for Review:
      ${JSON.stringify(dataCompilation, null, 2)}

      Construct your feedback exactly using this layout structure:
      1. OVERALL INTERVIEW SCORE: Provide a single clear absolute score from 0 to 100.
      2. TECHNICAL ACCURACY EVALUATION: Detailed critique of engineering competencies.
      3. COMMUNICATION AND EMOTION ASSESSMENT: How well did they communicate under pressure?
      4. STRATEGIC INSIGHTS FOR IMPROVEMENT: Actionable ways they can perform better next time.
    `;

    // Connect to OpenRouter
    const openrouter = createOpenRouter({
      apiKey: process.env.OPEN_ROUTER_AI_API_KEY,
    });

    // THE PERMANENT FIX: Auto-route to whatever free endpoint is currently open
    const response = await generateText({
      model: openrouter("openrouter/free"),
      prompt: structuralPrompt,
    });

    return NextResponse.json({ evaluation: response.text });
    
  } catch (error: any) {
    console.error("FULL EVALUATION ERROR:", error);
    return NextResponse.json({ 
      error: "OpenRouter Error: " + (error.message || "Please check your terminal for details.") 
    }, { status: 500 });
  }
}