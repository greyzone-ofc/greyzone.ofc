/**
 * Project metadata for the selected-work carousel.
 * SVG illustrations stay in components; use `artSvgId` (or an equivalent art key)
 * to map each project to its illustration later.
 */
export type Project = {
  idx: string;
  industry: string;
  title: string;
  sub: string;
  year: string;
  result: string;
  /** Optional key to map to the project’s SVG illustration in a component. */
  artSvgId?: string;
};
