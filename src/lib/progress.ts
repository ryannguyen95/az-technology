// Fires the global top progress bar for programmatic navigations (router.push),
// which the RouteProgress click-interceptor can't see. Anchor/<Link> clicks are
// caught automatically; call this right before an imperative router.push().
export const ROUTE_START_EVENT = "az:routestart";

export function startRouteProgress() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(ROUTE_START_EVENT));
}
