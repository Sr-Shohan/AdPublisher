import { RefreshCw, ExternalLink, Bug, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface AdDisplayProps {
  url: string;
  width: number;
  height: number;
  index: number;
}

export function AdDisplay({ url, width, height, index }: AdDisplayProps) {
  const [key, setKey] = useState(0); // Used to force reload iframe
  const [isLoading, setIsLoading] = useState(true);

  const reload = () => {
    setIsLoading(true);
    setKey((prev) => prev + 1);
  };

  const openInNewTab = () => window.open(url, '_blank');
  const openDebug = () => window.open(`${url}&debug`, '_blank');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-colors duration-300 shadow-sm hover:shadow-md">
        <div className="p-6 flex flex-col items-center gap-6">
          <div 
            className="relative bg-white shadow-inner rounded-md overflow-hidden border border-border"
            style={{ width: `${width}px`, height: `${height}px` }}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/20 z-10">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            )}
            <iframe
              key={key}
              src={url}
              width={width}
              height={height}
              scrolling="no"
              frameBorder="0"
              onLoad={() => setIsLoading(false)}
              className="relative z-0"
            />
          </div>

          <div className="flex items-center gap-2 w-full justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={reload}
              className="flex-1 text-xs md:text-sm"
            >
              <RefreshCw className="w-3 h-3 md:w-4 md:h-4 mr-2" />
              Reload
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={openInNewTab}
              className="flex-1 text-xs md:text-sm"
            >
              <ExternalLink className="w-3 h-3 md:w-4 md:h-4 mr-2" />
              Open
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={openDebug}
              className="flex-1 text-xs md:text-sm hover:text-orange-500 hover:border-orange-200 hover:bg-orange-50"
            >
              <Bug className="w-3 h-3 md:w-4 md:h-4 mr-2" />
              Debug
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

import { motion } from "framer-motion";
