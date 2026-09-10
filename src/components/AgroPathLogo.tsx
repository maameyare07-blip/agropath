type AgroPathLogoProps = {
  className?: string;
};

const AgroPathLogo = ({ className }: AgroPathLogoProps) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="AgroPath logo"
  >
    <path
      d="M8 26 C 8 18, 14 10, 22 10"
      stroke="#2f6b3a"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />
    <circle cx="22" cy="10" r="3" fill="#c9a227" />
    <circle cx="8" cy="26" r="3" fill="#2f6b3a" />
  </svg>
);

export default AgroPathLogo;
