import { useState } from 'react';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  isLoading?: boolean;
}

const PromptInput = ({ onGenerate, isLoading = false }: PromptInputProps) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onGenerate(prompt);
    }
  };

  const examplePrompts = [
    "1/2 inch gear with 21 teeth",
    "M8 hex bolt, 30mm length",
    "Bearing housing, 50mm bore",
    "Flanged coupling, 25mm shaft"
  ];

  return (
    <div className="w-full space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative glow-border rounded-xl overflow-hidden transition-all duration-300 hover:glow-border-strong focus-within:glow-border-strong">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
            <Sparkles className="w-5 h-5" />
          </div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your part... e.g., '1/2 inch gear with 21 teeth, pressure angle 20 degrees'"
            className="w-full bg-card/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground pl-12 pr-32 py-5 resize-none h-[72px] focus:outline-none font-mono text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating</span>
              </>
            ) : (
              <>
                <span>Generate</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
      
      {/* Example prompts */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-muted-foreground font-mono">Try:</span>
        {examplePrompts.map((example, i) => (
          <button
            key={i}
            onClick={() => setPrompt(example)}
            disabled={isLoading}
            className="text-xs font-mono px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200 disabled:opacity-50"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptInput;
