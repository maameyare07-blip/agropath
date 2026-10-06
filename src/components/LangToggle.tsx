import { Check, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LANGS, useFarmerLang } from "@/lib/farmerI18n";

const LangToggle = ({ compact = false }: { compact?: boolean }) => {
  const { lang, setLang } = useFarmerLang();
  const current = LANGS.find((l) => l.code === lang)!;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant={compact ? "ghost" : "outline"}
          size="sm"
          className="h-11 min-w-11 gap-2"
          aria-label={`Language: ${current.label}`}
        >
          <Languages className="w-4 h-4" aria-hidden="true" />
          {compact ? current.short : current.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-border">
        {LANGS.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onSelect={() => setLang(l.code)}
            className="min-h-11 cursor-pointer justify-between gap-4"
            lang={l.code}
          >
            {l.label}
            {l.code === lang && <Check className="w-4 h-4" aria-hidden="true" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangToggle;
