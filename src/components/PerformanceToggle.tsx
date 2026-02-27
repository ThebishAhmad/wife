import { Zap, ZapOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePerformance } from "@/context/PerformanceContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const PerformanceToggle = () => {
    const { highPerformanceMode, togglePerformanceMode } = usePerformance();

    return (
        <div className="fixed bottom-20 left-4 z-50">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className={`rounded-full shadow-lg transition-all duration-300 ${highPerformanceMode
                                    ? 'bg-amber-100 border-amber-300 text-amber-600 hover:bg-amber-200'
                                    : 'bg-white/80 backdrop-blur-sm border-pink-200 text-rose-500 hover:bg-pink-50'
                                }`}
                            onClick={togglePerformanceMode}
                        >
                            {highPerformanceMode ? (
                                <ZapOff className="h-5 w-5" />
                            ) : (
                                <Zap className="h-5 w-5" />
                            )}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <p>{highPerformanceMode ? "Enable Effects" : "Reduce Motion (Save Battery)"}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};
