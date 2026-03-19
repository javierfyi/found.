export interface PropDefinition {
  name: string
  type: string
  default: string
  description: string
}

export interface ApiReferenceEntry {
  name: string
  description: string
  props: PropDefinition[]
}

export interface ComponentData {
  name: string
  title: string
  description: string
  id: string
  size?: "normal" | "tall" | "wide"
  isPro?: boolean
  videoUrl?: string
  example?: string
  dependencies?: string[]
  apiReference?: ApiReferenceEntry[]
}

export const componentsData: ComponentData[] = [
  {
    name: "animated-stack",
    title: "Animated Stack",
    description: "An interactive stack of cards that expand and animate on hover with smooth spring animations",
    id: "foundry1",
    size: "tall",

    videoUrl: "/demos/card_open.mp4",
    dependencies: ["motion", "lucide-react"],
    apiReference: [
      {
        name: "AnimatedStack",
        description: "A self-contained notification stack component that expands on hover with spring animations.",
        props: [],
      },
    ],
    example: `import { AnimatedStack } from "@/components/animated-stack"

export default function NotificationsPage() {
  return <AnimatedStack />
}`,
  },
  {
    name: "shimmering-text",
    title: "Shimmering Text",
    description: "A text component with beautiful shimmer animation effects that glide across the text.",
    id: "foundry-shimmer",
    size: "normal",

    videoUrl: "/demos/shimering_text.mp4",
    dependencies: ["motion"],
    apiReference: [
      {
        name: "ShimmeringText",
        description: "A text component that applies a shimmering gradient animation across the text.",
        props: [
          { name: "text", type: "string", default: "-", description: "Text to display with shimmer effect." },
          { name: "duration", type: "number", default: "2", description: "Animation duration in seconds." },
          { name: "delay", type: "number", default: "0", description: "Delay before starting animation in seconds." },
          { name: "repeat", type: "boolean", default: "true", description: "Whether to repeat the animation." },
          { name: "repeatDelay", type: "number", default: "0.5", description: "Pause duration between repeats in seconds." },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes." },
          { name: "startOnView", type: "boolean", default: "true", description: "Start animation when entering viewport." },
          { name: "once", type: "boolean", default: "false", description: "Whether to animate only once." },
          { name: "inViewMargin", type: "UseInViewOptions[\"margin\"]", default: "-", description: "Margin for in-view detection (rootMargin)." },
          { name: "spread", type: "number", default: "2", description: "Shimmer spread multiplier." },
          { name: "color", type: "string", default: "-", description: "Base text color." },
          { name: "shimmerColor", type: "string", default: "-", description: "Shimmer gradient color." },
        ],
      },
    ],
    example: `import { ShimmeringText } from "@/components/shimmering-text"

export default function HeroSection() {
  return (
    <ShimmeringText
      text="Shimmering Text"
      className="text-2xl font-bold"
      duration={1.5}
      repeatDelay={1}
    />
  )
}`,
  },
  {
    name: "typing-text",
    title: "Typing Text",
    description: "A typing text animation. Highly customizable and easy to use.",
    id: "foundry-typing",
    size: "normal",

    videoUrl: "/demos/typing_text.mp4",
    dependencies: ["motion"],
    apiReference: [
      {
        name: "TypingText",
        description: "A text component that types out characters one by one with optional looping.",
        props: [
          { name: "text", type: "string", default: "-", description: "Text to type out." },
          { name: "delay", type: "number", default: "0.05", description: "Delay between each character in seconds." },
          { name: "holdDelay", type: "number", default: "1", description: "Pause at end before restart (when loop is true) in seconds." },
          { name: "loop", type: "boolean", default: "true", description: "Whether to loop the animation." },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes." },
          { name: "children", type: "ReactNode", default: "-", description: "Optional children rendered after the typed text (e.g. a cursor)." },
        ],
      },
      {
        name: "TypingTextCursor",
        description: "An animated blinking cursor to pair with TypingText.",
        props: [
          { name: "className", type: "string", default: "-", description: "Additional CSS classes for the cursor." },
        ],
      },
    ],
    example: `import { TypingText, TypingTextCursor } from "@/components/typing-text"

export default function HeroSection() {
  return (
    <TypingText
      text="Hello, world!"
      delay={0.05}
      holdDelay={1}
      loop
      className="text-4xl font-semibold"
    >
      <TypingTextCursor />
    </TypingText>
  )
}`,
  },
  {
    name: "animated-number",
    title: "Animated Number",
    description: "A number that animates smoothly to a new value using spring physics.",
    id: "foundry-number",
    size: "normal",

    videoUrl: "/demos/count_number.mp4",
    dependencies: ["motion"],
    apiReference: [
      {
        name: "AnimatedNumber",
        description: "A number display that animates smoothly to new values using spring physics.",
        props: [
          { name: "value", type: "number", default: "-", description: "The target number to animate to." },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes." },
          { name: "springOptions", type: "SpringOptions", default: "-", description: "Motion spring configuration for the animation." },
          { name: "as", type: "React.ElementType", default: "\"span\"", description: "The HTML element to render as." },
        ],
      },
    ],
    example: `import { AnimatedNumber } from "@/components/animated-number"

export default function StatsPage() {
  const [value, setValue] = useState(500)

  return (
    <div>
      <AnimatedNumber
        value={value}
        className="text-4xl font-bold"
        springOptions={{ stiffness: 100, damping: 20 }}
      />
      <button onClick={() => setValue(Math.floor(Math.random() * 10000))}>
        Randomize
      </button>
    </div>
  )
}`,
  },
  {
    name: "hover-card",
    title: "Hover Card",
    description: "A card that reveals its description on hover with a smooth slide-up animation. Keyboard accessible, customizable.",
    id: "foundry-hover-card",
    size: "normal",

    videoUrl: "/demos/card_hover.mp4",
    dependencies: [],
    apiReference: [
      {
        name: "HoverCard",
        description: "A card component that reveals its description on hover with a smooth slide-up animation. Extends anchor element attributes.",
        props: [
          { name: "title", type: "string", default: "-", description: "The title displayed on the card." },
          { name: "description", type: "string", default: "-", description: "The description revealed on hover." },
          { name: "image", type: "string", default: "-", description: "Optional background image URL." },
          { name: "href", type: "string", default: "\"#\"", description: "Link destination URL." },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes for the card container." },
          { name: "descriptionClassName", type: "string", default: "-", description: "Additional CSS classes for the description overlay." },
          { name: "showIcon", type: "boolean", default: "true", description: "Show the external link icon." },
          { name: "customIcon", type: "ReactNode", default: "-", description: "Custom icon to replace the default external link icon." },
          { name: "asDiv", type: "boolean", default: "false", description: "Render as a div instead of an anchor." },
        ],
      },
    ],
    example: `import { HoverCard } from "@/components/hover-card"

export default function ProjectsPage() {
  return (
    <HoverCard
      href="/projects/my-app"
      title="My Awesome App"
      description="A revolutionary new application"
      image="/images/project-cover.jpg"
    />
  )
}`,
  },
  {
    name: "arrow-tooltip",
    title: "Arrow Tooltip",
    description: "A styled tooltip with an arrow indicator. Built on Radix UI with refined styling and smooth animations.",
    id: "foundry-arrow-tooltip",
    size: "normal",

    videoUrl: "/demos/tooltip-hover.mov",
    dependencies: ["@radix-ui/react-tooltip"],
    apiReference: [
      {
        name: "ArrowTooltip",
        description: "Root component that wraps the tooltip trigger and content. Includes a built-in provider with zero delay.",
        props: [],
      },
      {
        name: "ArrowTooltipTrigger",
        description: "The element that triggers the tooltip on hover.",
        props: [],
      },
      {
        name: "ArrowTooltipContent",
        description: "The tooltip content panel with the arrow indicator.",
        props: [
          { name: "sideOffset", type: "number", default: "4", description: "Distance in pixels from the trigger." },
          { name: "side", type: "\"top\" | \"right\" | \"bottom\" | \"left\"", default: "\"top\"", description: "Preferred side of the trigger to render against." },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes for the content." },
        ],
      },
    ],
    example: `import {
  ArrowTooltip,
  ArrowTooltipTrigger,
  ArrowTooltipContent,
} from "@/components/arrow-tooltip"

export default function Example() {
  return (
    <ArrowTooltip>
      <ArrowTooltipTrigger>
        <button>Hover me</button>
      </ArrowTooltipTrigger>
      <ArrowTooltipContent>
        Tooltip content here
      </ArrowTooltipContent>
    </ArrowTooltip>
  )
}`,
  },
  {
    name: "feedback",
    title: "Feedback",
    description: "A polished feedback form with character counter, loading states, success animation, and error handling.",
    id: "foundry-feedback",
    size: "normal",

    videoUrl: "/demos/feedback.mp4",
    dependencies: ["motion"],
    apiReference: [
      {
        name: "Feedback",
        description: "A polished feedback popover with morphing animation, character counter, loading states, and success/error handling.",
        props: [
          { name: "onSubmit", type: "(feedback: string) => Promise<void>", default: "-", description: "Async callback when feedback is submitted." },
          { name: "onOpenChange", type: "(open: boolean) => void", default: "-", description: "Callback when the popover opens or closes." },
          { name: "buttonText", type: "string", default: "\"Feedback\"", description: "Label for the trigger button." },
          { name: "buttonIcon", type: "ReactNode", default: "-", description: "Custom icon for the trigger button." },
          { name: "placeholder", type: "string", default: "\"Share your feedback...\"", description: "Textarea placeholder text." },
          { name: "maxLength", type: "number", default: "500", description: "Maximum character count." },
          { name: "successTitle", type: "string", default: "\"Feedback received!\"", description: "Title shown on successful submission." },
          { name: "successMessage", type: "string", default: "\"Thanks for helping us improve.\"", description: "Message shown on successful submission." },
          { name: "errorMessage", type: "string", default: "\"Failed to submit feedback. Please try again.\"", description: "Fallback error message." },
          { name: "successDuration", type: "number", default: "3300", description: "Duration to show success state in milliseconds." },
          { name: "submitText", type: "string", default: "\"Send feedback\"", description: "Label for the submit button." },
          { name: "triggerClassName", type: "string", default: "-", description: "Additional CSS classes for the trigger button." },
          { name: "popoverClassName", type: "string", default: "-", description: "Additional CSS classes for the popover container." },
          { name: "showCharacterCounter", type: "boolean", default: "true", description: "Show the character count indicator." },
          { name: "open", type: "boolean", default: "-", description: "Controlled open state." },
          { name: "defaultOpen", type: "boolean", default: "-", description: "Default open state (uncontrolled)." },
        ],
      },
    ],
    example: `import { Feedback } from "@/components/feedback"

export default function AppLayout() {
  return (
    <Feedback
      onSubmit={async (feedback) => {
        await fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ feedback }),
        })
      }}
      buttonText="Feedback"
      placeholder="Share your feedback..."
      maxLength={500}
      submitText="Send feedback"
    />
  )
}`,
  },
  {
    name: "progressive-blur",
    title: "Progressive Blur",
    description: "A gradient overlay with backdrop blur that fades content at the edges of a scrollable container.",
    id: "foundry-progressive-blur",
    size: "normal",

    videoUrl: "/demos/blur_scroll.mov",
    dependencies: [],
    apiReference: [
      {
        name: "ProgressiveBlur",
        description: "A positioned overlay that combines a gradient background with backdrop blur to smoothly fade content edges.",
        props: [
          { name: "className", type: "string", default: "-", description: "Additional CSS classes for the container." },
          { name: "backgroundColor", type: "string", default: "\"#f5f4f3\"", description: "Background color for the gradient blend." },
          { name: "position", type: "\"top\" | \"bottom\"", default: "\"top\"", description: "Position of the blur effect." },
          { name: "height", type: "string", default: "\"150px\"", description: "Height of the blur area." },
          { name: "blurAmount", type: "string", default: "\"4px\"", description: "Intensity of the backdrop blur." },
        ],
      },
    ],
    example: `import { ProgressiveBlur } from "@/components/progressive-blur"

export default function ScrollContainer() {
  return (
    <div className="relative h-96 overflow-y-auto">
      <ProgressiveBlur position="top" backgroundColor="#ffffff" />
      <div className="p-8">
        {/* Scrollable content */}
      </div>
      <ProgressiveBlur position="bottom" backgroundColor="#ffffff" />
    </div>
  )
}`,
  },
  {
    name: "chat-input",
    title: "Chat Input",
    description: "A minimalist chat input with animated message bubbles and auto bot replies.",
    id: "foundry-chat-input",
    size: "tall",

    videoUrl: "/demos/ai-input-01.mov",
    dependencies: ["motion", "lucide-react"],
    apiReference: [
      {
        name: "ChatInput",
        description: "A minimalist chat input bar with animated message bubbles that appear above the input.",
        props: [
          { name: "placeholder", type: "string", default: "\"Send Message\"", description: "Placeholder text for the input." },
          { name: "onSend", type: "(message: string) => void", default: "-", description: "Callback when a message is sent." },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes for the container." },
          { name: "maxMessages", type: "number", default: "8", description: "Maximum number of visible messages." },
        ],
      },
    ],
    example: `import { ChatInput } from "@/components/chat-input"

export default function ChatPage() {
  return (
    <ChatInput
      placeholder="Send Message"
      onSend={(msg) => console.log("Sent:", msg)}
      maxMessages={8}
    />
  )
}`,
  },
]

// Helper function to get component by name
export function getComponentByName(name: string): ComponentData | undefined {
  return componentsData.find((component) => component.name === name)
}
