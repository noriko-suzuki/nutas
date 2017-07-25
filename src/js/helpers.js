export function isSP() {
  return global.matchMedia( "(max-width: 800px)" ).matches;
}