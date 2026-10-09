const EVENT = "intro:reveal";

export function revealPage() {
  const root = document.documentElement;
  if (root.dataset.intro === "done") return;
  root.dataset.intro = "done";
  window.dispatchEvent(new Event(EVENT));
}

export function onPageReveal(callback: () => void) {
  if (document.documentElement.dataset.intro === "done") {
    callback();
    return () => {};
  }
  window.addEventListener(EVENT, callback, { once: true });
  return () => window.removeEventListener(EVENT, callback);
}
