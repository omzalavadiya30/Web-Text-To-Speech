export const voices = [
  { id: "en-female", language: "en", label: "English Female", gender: "Female" },
  { id: "en-male", language: "en", label: "English Male", gender: "Male" },
  { id: "hi-female", language: "hi", label: "Hindi Female", gender: "Female" },
  { id: "hi-male", language: "hi", label: "Hindi Male", gender: "Male" },
  { id: "gu-female", language: "gu", label: "Gujarati Female", gender: "Female" },
  { id: "gu-male", language: "gu", label: "Gujarati Male", gender: "Male" },
  { id: "mr-female", language: "mr", label: "Marathi Female", gender: "Female" },
  { id: "mr-male", language: "mr", label: "Marathi Male", gender: "Male" },
  { id: "es-female", language: "es", label: "Spanish Female", gender: "Female" },
  { id: "es-male", language: "es", label: "Spanish Male", gender: "Male" },
  { id: "fr-female", language: "fr", label: "French Female", gender: "Female" },
  { id: "fr-male", language: "fr", label: "French Male", gender: "Male" },
  { id: "de-female", language: "de", label: "German Female", gender: "Female" },
  { id: "de-male", language: "de", label: "German Male", gender: "Male" },
];

export function getVoicesForLanguage(languageValue) {
  return voices.filter((voice) => voice.language === languageValue);
}
