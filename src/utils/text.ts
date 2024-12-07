function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getName(name: string) {
  return capitalizeFirstLetter(name.replace(/-/g, " "));
}
