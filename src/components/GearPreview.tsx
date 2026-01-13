import { useEffect, useRef } from 'react';

interface GearPreviewProps {
  isGenerating?: boolean;
  hasModel?: boolean;
}

const GearPreview = ({ isGenerating = false, hasModel = false }: GearPreviewProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-xl overflow-hidden glass-surface">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 blueprint-grid opacity-30" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      
      {/* Center content */}
      <div 
        ref={canvasRef}
        className="relative z-10 flex items-center justify-center h-full"
      >
        {isGenerating ? (
          <div className="flex flex-col items-center gap-4 animate-fade-in-up">
            <div className="relative">
              <div className="w-24 h-24 border-2 border-primary/30 rounded-full animate-spin" 
                   style={{ animationDuration: '3s' }} />
              <div className="absolute inset-2 border-2 border-primary/50 rounded-full animate-spin" 
                   style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
              <div className="absolute inset-4 border-2 border-primary rounded-full animate-spin" 
                   style={{ animationDuration: '1.5s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
              </div>
            </div>
            <p className="font-mono text-sm text-primary animate-pulse">
              Generating 3D Model...
            </p>
          </div>
        ) : hasModel ? (
          <div className="flex flex-col items-center gap-6 animate-scale-in">
            {/* Simulated 3D Gear visualization */}
            <div className="relative animate-float" style={{ perspective: '1000px' }}>
              <svg 
                viewBox="0 0 200 200" 
                className="w-48 h-48 animate-rotate-slow"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Outer gear teeth */}
                {Array.from({ length: 21 }).map((_, i) => {
                  const angle = (i * 360) / 21;
                  const radians = (angle * Math.PI) / 180;
                  const x1 = 100 + 70 * Math.cos(radians);
                  const y1 = 100 + 70 * Math.sin(radians);
                  const x2 = 100 + 85 * Math.cos(radians);
                  const y2 = 100 + 85 * Math.sin(radians);
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="hsl(192 95% 55%)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      className="drop-shadow-lg"
                      style={{ filter: 'drop-shadow(0 0 4px hsl(192 95% 55% / 0.5))' }}
                    />
                  );
                })}
                {/* Main gear body */}
                <circle
                  cx="100"
                  cy="100"
                  r="65"
                  fill="none"
                  stroke="hsl(192 95% 55%)"
                  strokeWidth="3"
                  className="drop-shadow-lg"
                  style={{ filter: 'drop-shadow(0 0 8px hsl(192 95% 55% / 0.4))' }}
                />
                <circle
                  cx="100"
                  cy="100"
                  r="55"
                  fill="hsl(220 18% 12%)"
                  stroke="hsl(192 95% 55% / 0.5)"
                  strokeWidth="2"
                />
                {/* Inner details */}
                <circle
                  cx="100"
                  cy="100"
                  r="20"
                  fill="none"
                  stroke="hsl(192 95% 55%)"
                  strokeWidth="2"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="8"
                  fill="hsl(192 95% 55%)"
                  style={{ filter: 'drop-shadow(0 0 12px hsl(192 95% 55%))' }}
                />
                {/* Spokes */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                  const radians = (angle * Math.PI) / 180;
                  return (
                    <line
                      key={i}
                      x1={100 + 20 * Math.cos(radians)}
                      y1={100 + 20 * Math.sin(radians)}
                      x2={100 + 50 * Math.cos(radians)}
                      y2={100 + 50 * Math.sin(radians)}
                      stroke="hsl(192 95% 55% / 0.6)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>
              {/* Reflection effect */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-8 bg-primary/10 blur-xl rounded-full" />
            </div>
            
            {/* Model info */}
            <div className="glass-surface px-6 py-4 rounded-lg glow-border">
              <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                <div>
                  <span className="text-muted-foreground">Diameter:</span>
                  <span className="ml-2 text-primary">0.5"</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Teeth:</span>
                  <span className="ml-2 text-primary">21</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Module:</span>
                  <span className="ml-2 text-primary">0.6mm</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Pressure:</span>
                  <span className="ml-2 text-primary">20°</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <svg className="w-10 h-10 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <p className="font-mono text-sm">Your 3D model will appear here</p>
          </div>
        )}
      </div>
      
      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/30" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/30" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/30" />
    </div>
  );
};

export default GearPreview;
