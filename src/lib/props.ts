type svgProps = {
  width?: number | string; // Width of the SVG
  height?: number | string; // Height of the SVG
  fill?: string; // Fill color
  stroke?: string; // Stroke color
  strokeWidth?: number | string; // Stroke width
  viewBox?: string; // Viewbox dimensions
  xmlns?: string; // XML namespace
  title?: string; // Accessibility title
  className?: string; // Custom class for styling
  onClick?: () => void; // Click event handler
};
type Feature = {
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
  linkDescription: string;
};
