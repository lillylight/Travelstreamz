import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, MapPin, X, Filter } from "lucide-react";
import { VideoCategory } from "@/types/video";

const CATEGORIES: VideoCategory[] = ['safety', 'fun', 'shopping', 'food', 'culture', 'nightlife', 'adventure', 'nature'];

interface StreamFiltersProps {
  selectedCategories: VideoCategory[];
  onCategoryToggle: (category: VideoCategory) => void;
  locationSearch: string;
  onLocationSearch: (location: string) => void;
  onClearFilters: () => void;
}

export const StreamFilters = ({
  selectedCategories,
  onCategoryToggle,
  locationSearch,
  onLocationSearch,
  onClearFilters,
}: StreamFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="absolute top-20 sm:top-16 md:top-18 left-0 right-0 z-20 px-3 sm:px-4 space-y-3">
      {/* Improved Search Bar with better spacing and smaller size on mobile */}
      <div className="flex gap-3 sm:gap-3 max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search location..."
            value={locationSearch}
            onChange={(e) => onLocationSearch(e.target.value)}
            className="pl-7 sm:pl-10 pr-8 sm:pr-10 bg-card/90 backdrop-blur-sm text-xs sm:text-sm h-8 sm:h-10 border-white/20 rounded-lg sm:rounded-xl"
            onFocus={() => setShowFilters(true)}
          />
          {locationSearch && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0.5 sm:right-1 top-1/2 -translate-y-1/2 h-6 w-6 sm:h-8 sm:w-8"
              onClick={() => onLocationSearch("")}
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          )}
        </div>
        
        {/* Filter Toggle Button with improved spacing */}
        <Button
          variant="outline"
          size="icon"
          className={`h-8 w-8 sm:h-10 sm:w-10 bg-card/90 backdrop-blur-sm border-white/20 rounded-lg sm:rounded-xl flex-shrink-0 ${
            showFilters ? 'bg-primary/20 border-primary/40' : ''
          }`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
      </div>

      {/* Category Filters with improved layout */}
      {showFilters && (
        <div className="bg-card/95 backdrop-blur-sm rounded-xl p-4 space-y-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Categories</span>
            </div>
            {(selectedCategories.length > 0 || locationSearch) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="h-7 text-xs px-3"
              >
                Clear All
              </Button>
            )}
          </div>
          
          {/* Improved category grid with better spacing */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
            {CATEGORIES.map((category) => (
              <Badge
                key={category}
                variant={selectedCategories.includes(category) ? "default" : "outline"}
                className="cursor-pointer hover:scale-105 transition-transform capitalize text-xs px-3 py-2 justify-center text-center"
                onClick={() => onCategoryToggle(category)}
              >
                {category}
                {selectedCategories.includes(category) && (
                  <X className="w-3 h-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full h-8 text-xs"
            onClick={() => setShowFilters(false)}
          >
            Apply Filters
          </Button>
        </div>
      )}

      {/* Active Filters Display with better spacing */}
      {!showFilters && (selectedCategories.length > 0 || locationSearch) && (
        <div className="flex items-center gap-2 flex-wrap">
          {locationSearch && (
            <Badge variant="secondary" className="gap-1 text-xs px-2 py-1">
              <MapPin className="w-3 h-3" />
              <span className="max-w-[100px] sm:max-w-none truncate">{locationSearch}</span>
            </Badge>
          )}
          {selectedCategories.slice(0, 3).map((category) => (
            <Badge key={category} variant="secondary" className="capitalize gap-1 text-xs px-2 py-1">
              {category}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => onCategoryToggle(category)}
              />
            </Badge>
          ))}
          {selectedCategories.length > 3 && (
            <Badge variant="secondary" className="text-xs px-2 py-1">
              +{selectedCategories.length - 3}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
