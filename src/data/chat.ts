import { ChatMessage } from "@/types";

export const chatTranscript: ChatMessage[] = [
  {
    id: "c1",
    sender: "customer",
    text: "How much is a haircut?",
  },
  {
    id: "c2",
    sender: "ai",
    text: "Our Classic Haircut starts at Rp35.000 and takes around 45 minutes. Want me to check available slots today?",
  },
  {
    id: "c3",
    sender: "customer",
    text: "Yes please, and what time do you close?",
  },
  {
    id: "c4",
    sender: "ai",
    text: "We're open until 21.00 today. I found a 5 PM slot with Raka — would you like me to hold it for you?",
  },
];

export const aiCapabilities: string[] = [
  "Services",
  "Pricing",
  "Opening hours",
  "Booking information",
  "Location",
  "General questions",
];
