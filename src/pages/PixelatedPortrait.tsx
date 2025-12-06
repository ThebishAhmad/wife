import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";
import portraitImage from "@/assets/portrait.jpg";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
export default function PixelatedPortrait() {
  const navigate = useNavigate();
  const [interactive, setInteractive] = useState(true);
  const [distortionMode, setDistortionMode] = useState<"swirl" | "repel" | "attract">("swirl");

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="max-w-6xl w-full space-y-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Interactive Pixelated Portrait</h1>
            <p className="text-muted-foreground mt-2">
              Hover over the image to see the interactive distortion effect
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex-1 flex justify-center">
            <PixelatedCanvas
              src={portraitImage}
              width={400}
              height={500}
              cellSize={3}
              dotScale={0.9}
              shape="square"
              backgroundColor="#000000"
              dropoutStrength={0.4}
              interactive={interactive}
              distortionStrength={3}
              distortionRadius={80}
              distortionMode={distortionMode}
              followSpeed={0.2}
              jitterStrength={4}
              jitterSpeed={4}
              sampleAverage
              tintColor="#FFFFFF"
              tintStrength={0.2}
              className="rounded-xl border border-border shadow-lg"
            />
          </div>

          <div className="flex-1 space-y-6 max-w-md">
            <div className="space-y-4 p-6 rounded-lg border border-border bg-card">
              <h2 className="text-xl font-semibold">Controls</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Interactive Mode</span>
                  <Button
                    variant={interactive ? "default" : "outline"}
                    size="sm"
                    onClick={() => setInteractive(!interactive)}
                  >
                    {interactive ? "ON" : "OFF"}
                  </Button>
                </div>

                <div className="space-y-2">
                  <span className="text-sm font-medium">Distortion Mode</span>
                  <div className="flex gap-2">
                    <Button
                      variant={distortionMode === "swirl" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDistortionMode("swirl")}
                    >
                      Swirl
                    </Button>
                    <Button
                      variant={distortionMode === "repel" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDistortionMode("repel")}
                    >
                      Repel
                    </Button>
                    <Button
                      variant={distortionMode === "attract" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDistortionMode("attract")}
                    >
                      Attract
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 p-6 rounded-lg border border-border bg-card/50">
              <h3 className="text-lg font-semibold">How it works</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• The image is converted to a pixelated dot pattern</li>
                <li>• Hover your mouse to create interactive distortions</li>
                <li>• Each mode creates a unique movement effect</li>
                <li>• The effect smoothly follows your cursor</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
