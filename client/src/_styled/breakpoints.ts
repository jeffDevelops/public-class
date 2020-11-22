export const breakpoints = {
  up: (breakpointLowerBound: number) =>
    `@media screen and (min-width: ${breakpointLowerBound}px)`,
  down: (breakpointUpperBound: number) =>
    `@media screen and (max-width: ${breakpointUpperBound}px)`,
  between: (breakpointLowerBound: number, breakpointUpperBound: number) =>
    `@media screen and (min-width: ${breakpointLowerBound}px) and (max-width: ${breakpointUpperBound}px)`,
}
