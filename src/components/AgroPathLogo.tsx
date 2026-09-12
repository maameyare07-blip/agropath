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
    <rect x="1" y="1" width="30" height="30" rx="6" fill="#2f6b3a" />
    <text
      x="16"
      y="22"
      textAnchor="middle"
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="15"
      fontWeight="700"
      letterSpacing="0.5"
    >
      <tspan fill="#eef5ea">A</tspan>
      <tspan fill="#c9a227">P</tspan>
    </text>
  </svg>
);

export default AgroPathLogo;
