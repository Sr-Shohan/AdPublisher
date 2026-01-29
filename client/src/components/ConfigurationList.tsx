import { useConfigurations, useDeleteConfiguration } from "@/hooks/use-configurations";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Play, Settings2 } from "lucide-react";
import { format } from "date-fns";
import type { Configuration } from "@shared/schema";

interface ConfigurationListProps {
  onLoad: (config: Configuration) => void;
}

export function ConfigurationList({ onLoad }: ConfigurationListProps) {
  const { data: configs, isLoading } = useConfigurations();
  const deleteMutation = useDeleteConfiguration();

  if (isLoading) {
    return (
      <div className="p-4 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-muted/50 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!configs?.length) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <Settings2 className="w-12 h-12 mx-auto mb-3 opacity-20" />
        <p className="text-sm">No saved configurations yet.</p>
        <p className="text-xs mt-1">Save your current setup to access it quickly later.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-200px)] px-4">
      <div className="space-y-3 py-2">
        {configs.map((config) => (
          <div 
            key={config.id}
            className="group bg-card hover:bg-accent/50 border border-border hover:border-accent rounded-xl p-4 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold text-foreground">{config.name}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {format(new Date(config.createdAt || new Date()), "MMM d, yyyy")}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm("Delete this configuration?")) {
                    deleteMutation.mutate(config.id);
                  }
                }}
                className="opacity-0 group-hover:opacity-100 h-8 w-8 text-muted-foreground hover:text-destructive transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-2 text-xs text-muted-foreground">
                <span className="bg-muted px-2 py-0.5 rounded-full">{config.width}x{config.height}</span>
                <span className="bg-muted px-2 py-0.5 rounded-full">{config.ads} ads</span>
              </div>
              
              <Button 
                size="sm" 
                variant="secondary"
                onClick={() => onLoad(config)}
                className="h-7 text-xs"
              >
                <Play className="w-3 h-3 mr-1.5" />
                Load
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
