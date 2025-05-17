export function validateSearchParams(keywords, location) {
  if (!keywords) {
    return 'Keywords parameter is required';
  }

  if (!location) {
    return 'Location parameter is required';
  }

  if (keywords.length < 2) {
    return 'Keywords must be at least 2 characters long';
  }

  if (location.length < 2) {
    return 'Location must be at least 2 characters long';
  }

  return null;
}