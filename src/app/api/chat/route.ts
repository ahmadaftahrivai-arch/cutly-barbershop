import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "@/lib/aiSystemPrompt";

const client = new Anthropic();

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 1000;

interface ChatMessageInput {
  role?: unknown;
  content?: unknown;
}

function isValidMessage(
  m: ChatMessageInput,
): m is { role: "user" | "assistant"; content: string } {
  return (
    (m.role === "user" || m.role === "assistant") &&
    typeof m.content === "string" &&
    m.content.trim().length > 0 &&
    m.content.length <= MAX_MESSAGE_LENGTH
  );
}

export async function POST(request: Request) {
  let body: { messages?: unknown };

  try {
    body = await request.json();
  } catch {
    return new Response("Invalid request body.", { status: 400 });
  }

  const rawMessages = body.messages;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return new Response("messages must be a non-empty array.", { status: 400 });
  }
  if (rawMessages.length > MAX_MESSAGES) {
    return new Response("Too many messages.", { status: 400 });
  }
  if (!rawMessages.every(isValidMessage)) {
    return new Response("Each message needs a valid role and content.", {
      status: 400,
    });
  }

  const messages = rawMessages as { role: "user" | "assistant"; content: string }[];

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const claudeStream = client.messages.stream({
          model: "claude-opus-5",
          max_tokens: 1024,
          system: buildSystemPrompt(),
          output_config: { effort: "low" },
          messages,
        });

        for await (const event of claudeStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (error) {
        console.error("Chat stream error:", error);
        controller.enqueue(
          encoder.encode(
            "\n\nSorry, something went wrong on our end. Please try again or tap \"Talk to Admin\".",
          ),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
