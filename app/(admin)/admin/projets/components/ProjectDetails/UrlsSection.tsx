import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UrlsSectionProps {
  selectedProject: {
    figma_link?: string;
    pre_prod_url?: string;
  };
  tempFigmaUrl: string;
  tempStagingUrl: string;
  setTempFigmaUrl: (url: string) => void;
  setTempStagingUrl: (url: string) => void;
  handleUpdateUrls: () => void;
}

export const UrlsSection = ({
  selectedProject,
  tempFigmaUrl,
  tempStagingUrl,
  setTempFigmaUrl,
  setTempStagingUrl,
  handleUpdateUrls
}: UrlsSectionProps) => (
  <Card className="border-t pt-6 space-y-6 bg-white p-4 shadow-[0_4px_20px_-1px_rgba(147,51,234,0.2)] hover:shadow-[0_4px_20px_-1px_rgba(147,51,234,0.3)] transition-shadow">
    <div className="grid grid-cols-1 gap-6">
      {/* Figma URL */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <Label htmlFor="figmaUrl" className="text-sm font-medium mb-2 block">
          Lien Figma (Maquette)
        </Label>
        <div className="flex gap-3">
          <Input
            id="figmaUrl"
            placeholder="https://figma.com/file/..."
            value={tempFigmaUrl || selectedProject?.figma_link || ''}
            onChange={(e) => setTempFigmaUrl(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={handleUpdateUrls}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!tempFigmaUrl && !tempStagingUrl}
          >
            Enregistrer
          </Button>
        </div>
      </div>

      {/* Staging URL */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <Label htmlFor="stagingUrl" className="text-sm font-medium mb-2 block">
          Lien de préproduction
        </Label>
        <div className="flex gap-3">
          <Input
            id="stagingUrl"
            placeholder="https://staging.votreprojet.com"
            value={tempStagingUrl || selectedProject?.pre_prod_url || ''}
            onChange={(e) => setTempStagingUrl(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={handleUpdateUrls}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!tempFigmaUrl && !tempStagingUrl}
          >
            Enregistrer
          </Button>
        </div>
      </div>
    </div>
  </Card>
); 