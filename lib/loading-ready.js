/**
 * loading-ready — thin module-level signal for LoadingScreen completion.
 *
 * LoadingScreen calls signalReady() once when its animation finishes.
 * Any component that needs to defer work until after the loading screen
 * uses isReady() (sync check) or listens for the "wisper:ready" window event.
 *
 * The flag stays true for the lifetime of the session — the loading screen
 * only shows on the first page load, never on subsequent client-side navigations.
 */

let _ready = false;

/** Returns true if the loading screen has already completed. */
export function isReady() {
  return _ready;
}

/**
 * Called once by LoadingScreen when its exit animation finishes.
 * Dispatches "wisper:ready" on window so any listener fires immediately.
 */
export function signalReady() {
  if (_ready) return;
  _ready = true;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("wisper:ready"));
  }
}
