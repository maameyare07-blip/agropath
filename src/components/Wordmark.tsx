type WordmarkProps = {
  /** Use the lighter green so the mark stays legible on dark backgrounds. */
  onDark?: boolean;
  className?: string;
};

/** Two-tone "AgroPath" brand wordmark. Inherits font size/weight from its parent. */
const Wordmark = ({ onDark = false, className = "" }: WordmarkProps) => (
  <span className={className}>
    <span className={onDark ? "text-brand-green-light" : "text-brand-green"}>Agro</span>
    <span className="text-brand-gold">Path</span>
  </span>
);

export default Wordmark;
