declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  import type { VFC, SVGProps } from 'react';

  const SVG: VFC<SVGProps<SVGSVGElement>>;
  export default SVG;
}

type ValueOf<T> = T[keyof T];

type SvgElement = VFC<SVGProps<SVGSVGElement>>;
