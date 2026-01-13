import { useState } from 'react';
import { Box, Cpu, Download, Layers, Zap, Settings2 } from 'lucide-react';
import GearPreview from '@/components/GearPreview';
import PromptInput from '@/components/PromptInput';
import FeatureCard from '@/components/FeatureCard';

const Index = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasModel, setHasModel] = useState(false);

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    setHasModel(false);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsGenerating(false);
    setHasModel(true);
  };

  const features = [
    {
      icon: Zap,
      title: "Natural Language",
      description: "Describe parts in plain English. No CAD expertise needed."
    },
    {
      icon: Cpu,
      title: "AI-Powered",
      description: "Advanced AI understands engineering specifications and tolerances."
    },
    {
      icon: Layers,
      title: "Parametric Models",
      description: "Generate fully editable parametric CAD files."
    },
    {
      icon: Download,
      title: "Export Ready",
      description: "Download in STEP, STL, IGES, or native CAD formats."
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 blueprint-grid opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 blur-[120px] rounded-full" />
      
      {/* Navigation */}
      <nav className="relative z-10 border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center glow-border">
              <Box className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-xl">
              <span className="text-foreground">CAD</span>
              <span className="text-primary">forge</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
              Examples
            </button>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
              Documentation
            </button>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:brightness-110 transition-all">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Settings2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">AI-Powered CAD Generation</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-foreground">Turn Words Into</span>
            <br />
            <span className="text-gradient">Precision Parts</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Describe any mechanical component in natural language and watch AI generate 
            production-ready 3D CAD models in seconds.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Input Section */}
          <div className="space-y-6">
            <PromptInput onGenerate={handleGenerate} isLoading={isGenerating} />
            
            {hasModel && (
              <div className="flex gap-3 animate-fade-in-up">
                <button className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:brightness-110 transition-all">
                  <Download className="w-4 h-4" />
                  Download STEP
                </button>
                <button className="flex-1 bg-secondary text-secondary-foreground py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-muted transition-all border border-border">
                  <Download className="w-4 h-4" />
                  Download STL
                </button>
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="lg:row-span-1">
            <GearPreview isGenerating={isGenerating} hasModel={hasModel} />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <FeatureCard 
              key={feature.title}
              {...feature}
              delay={0.4 + i * 0.1}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 glass-surface rounded-xl p-8 glow-border animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gradient font-mono">50k+</div>
              <div className="text-sm text-muted-foreground mt-1">Parts Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient font-mono">&lt;30s</div>
              <div className="text-sm text-muted-foreground mt-1">Average Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient font-mono">99.2%</div>
              <div className="text-sm text-muted-foreground mt-1">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-primary" />
              <span className="font-mono">CADforge © 2025</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
