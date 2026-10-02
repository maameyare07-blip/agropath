import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFarmerLang } from "@/lib/farmerI18n";

const LangToggle = () => {
  const { t, toggle } = useFarmerLang();
  return (
    <Button type="button" variant="outline" size="sm" onClick={toggle} className="h-11 gap-2">
      <Languages className="w-4 h-4" /> {t.language}
    </Button>
  );
};

export default LangToggle;
