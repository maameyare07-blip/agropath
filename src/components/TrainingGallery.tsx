import { useText } from "@/lib/farmerI18n";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TrainingGalleryProps = {
  images: string[];
  title: string;
};

const TrainingGallery = ({ images, title }: TrainingGalleryProps) => {
  const tr = useText();
  const [index, setIndex] = useState(0);
  if (images.length === 0) return null;

  const go = (dir: number) =>
    setIndex((prev) => (prev + dir + images.length) % images.length);

  return (
    <div className="mt-4">
      <div className="relative overflow-hidden rounded-xl border border-border bg-muted aspect-video flex items-center justify-center">
        <img
          src={images[index]}
          alt={tr("{title} — photo {number} of {total}", { title, number: index + 1, total: images.length })}
          loading="lazy"
          className="w-full h-full object-contain"
        />


        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={tr("Previous photo")}
              className="absolute start-2 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-background/85 border border-border flex items-center justify-center text-foreground shadow-sm transition-colors hover:bg-background"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={tr("Next photo")}
              className="absolute end-2 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-background/85 border border-border flex items-center justify-center text-foreground shadow-sm transition-colors hover:bg-background"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={tr("Go to photo {number}", { number: i + 1 })}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-5 bg-primary" : "w-2 bg-border hover:bg-primary/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainingGallery;
