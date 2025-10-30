import { useState } from "react";
import { VideoFeed } from "@/components/VideoFeed";
import { MultiStreamViewer } from "@/components/MultiStreamViewer";
import { SlotMachineViewer } from "@/components/SlotMachineViewer";
import { StreamSelector } from "@/components/StreamSelector";
import { ConnectWallet } from "@/components/ConnectWallet";
import { mockStreams, streamTags } from "@/data/mockStreams";
import { Button } from "@/components/ui/button";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { 
  Layers, 
  Grid3x3, 
  Sparkles, 
  Menu, 
  Settings, 
  Play,
  Maximize2,
  Columns2,
  Columns3,
  Filter,
  Home,
  ArrowLeft,
  Tv,
  Bell
} from "lucide-react";

const Index = () => {
  const [viewMode, setViewMode] = useState<'classic' | 'streams' | 'slots'>('classic');
  const [selectedStreamTags, setSelectedStreamTags] = useState<string[]>(['Bali']);
  const [streamViewMode, setStreamViewMode] = useState<'single' | 'split-2' | 'split-3'>('single');

  const handleTagSelect = (tagName: string) => {
    setSelectedStreamTags(prev => {
      if (prev.includes(tagName)) {
        return prev.filter(t => t !== tagName);
      }
      return [...prev, tagName];
    });
  };

  const selectedStreams = mockStreams.filter(stream => 
    selectedStreamTags.includes(stream.tag.name)
  );

  return (
    <div className="min-h-screen bg-background relative">
      {/* Back Button - Show when not in classic mode */}
      {viewMode !== 'classic' && (
        <div className="fixed top-4 left-4 z-50">
          <Button
            onClick={() => setViewMode('classic')}
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full backdrop-blur-sm bg-black/60 border-white/20 hover:bg-black/80 shadow-lg"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Mobile: Vertical Left Navigation Bar */}
      <div className="fixed left-0 top-0 bottom-0 w-12 sm:w-14 md:w-16 bg-black/90 backdrop-blur-xl border-r border-white/10 z-40 flex flex-col items-center py-3 sm:py-4 md:py-6 lg:hidden">
        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center mb-3 sm:mb-4 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>

        {/* View Mode Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center mb-3 sm:mb-4 transition-colors">
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="ml-2 sm:ml-3">
            <DropdownMenuItem 
              onClick={() => setViewMode('streams')}
              className={viewMode === 'streams' ? 'bg-purple-600/20' : ''}
            >
              <Play className="w-4 h-4 mr-2" />
              Live Streams
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              onClick={() => setViewMode('slots')}
              className={viewMode === 'slots' ? 'bg-purple-600/20' : ''}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Video Slots
            </DropdownMenuItem>
            
            {viewMode === 'streams' && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs">Stream Layout</DropdownMenuLabel>
                
                <DropdownMenuItem 
                  onClick={() => setStreamViewMode('single')}
                  className={`text-xs ${streamViewMode === 'single' ? 'bg-accent' : ''}`}
                >
                  <Maximize2 className="w-3 h-3 mr-2" />
                  Single Stream
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  onClick={() => setStreamViewMode('split-2')}
                  className={`text-xs ${streamViewMode === 'split-2' ? 'bg-accent' : ''}`}
                >
                  <Columns2 className="w-3 h-3 mr-2" />
                  Split View (2)
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  onClick={() => setStreamViewMode('split-3')}
                  className={`text-xs ${streamViewMode === 'split-3' ? 'bg-accent' : ''}`}
                >
                  <Columns3 className="w-3 h-3 mr-2" />
                  Triple View (3)
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] sm:w-[320px] bg-black/95 backdrop-blur-xl border-white/10">
            <SheetHeader>
              <SheetTitle className="text-white">Settings</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Tv className="w-4 h-4 mr-2" />
                    Choose Streams
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[320px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Select Streams</SheetTitle>
                  </SheetHeader>
                  <StreamSelector 
                    tags={streamTags}
                    selectedTags={selectedStreamTags}
                    onTagSelect={handleTagSelect}
                    maxSelection={3}
                  />
                </SheetContent>
              </Sheet>
              
              <Button variant="outline" className="w-full justify-start">
                <Filter className="w-4 h-4 mr-2" />
                Content Filters
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Quality Settings
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: Top Navigation */}
      <div className="hidden lg:flex items-center justify-between p-4 sm:p-6 bg-black/90 backdrop-blur-xl border-b border-white/10">
        {/* Left: Burger Menu for View Modes */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="bg-white/10 border-white/20 hover:bg-white/20">
              <Menu className="w-5 h-5 text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[240px]">
            <DropdownMenuLabel className="text-sm">Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="text-xs">
              <Filter className="w-3 h-3 mr-2" />
              Content Filters
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="text-xs text-muted-foreground">
              Quality Settings
            </DropdownMenuItem>
            
            <DropdownMenuItem className="text-xs text-muted-foreground">
              Notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Right: Connect Wallet */}
        <ConnectWallet />
      </div>

      {/* Main Content Area */}
      <main className="ml-12 sm:ml-14 md:ml-16 lg:ml-0 lg:pt-20 min-h-screen bg-background relative">
        
        {/* Desktop: Top Navigation */}
        <div className="hidden lg:block absolute top-4 left-4 right-4 z-50">
          <div className="flex items-center justify-between">
            
            {/* Left: Brand */}
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                TravelStreamz
              </h1>
            </div>
            
            {/* Right: Settings & Connect Wallet */}
            <div className="flex items-center gap-2">
              <ConnectWallet />
              
              {/* Settings Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="h-10 w-10 rounded-full backdrop-blur-sm bg-white/10 border-white/20"
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[240px]">
                  <DropdownMenuLabel className="text-sm">Stream Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <Sheet>
                    <SheetTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-sm">
                        <Layers className="w-4 h-4 mr-2" />
                        Choose Streams
                      </DropdownMenuItem>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Choose Your Streams</SheetTitle>
                        <SheetDescription>
                          Select up to 3 streams to watch simultaneously
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-6">
                        <StreamSelector
                          tags={streamTags}
                          selectedTags={selectedStreamTags}
                          onTagSelect={handleTagSelect}
                          maxSelection={3}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                  
                  <DropdownMenuItem className="text-sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Content Filters
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem className="text-sm text-muted-foreground">
                    <Tv className="w-4 h-4 mr-2" />
                    Quality Settings
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem className="text-sm text-muted-foreground">
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        
        {/* Mobile: Connect Wallet (Top Right) */}
        <div className="fixed top-2 right-2 z-50 sm:hidden">
          <ConnectWallet />
        </div>
        
        {/* Floating SLOTS Button */}
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
          <Button
            onClick={() => setViewMode('slots')}
            size="lg"
            className={`h-16 w-16 rounded-full shadow-2xl transition-all duration-300 ${
              viewMode === 'slots'
                ? 'bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 hover:scale-110'
                : 'bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 hover:scale-105'
            }`}
          >
            <Sparkles className="h-8 w-8" />
          </Button>
        </div>
        
        {/* Main Content */}
        <div className="ml-12 sm:ml-14 md:ml-16 lg:ml-0 lg:pt-20">
          {viewMode === 'slots' ? (
            <SlotMachineViewer 
              streams={mockStreams.slice(0, 3)} 
              onBack={() => setViewMode('classic')}
            />
          ) : viewMode === 'streams' && selectedStreams.length > 0 ? (
            <MultiStreamViewer 
              availableStreams={mockStreams}
              initialMode={streamViewMode}
              onBack={() => setViewMode('classic')}
            />
          ) : (
            <VideoFeed />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
