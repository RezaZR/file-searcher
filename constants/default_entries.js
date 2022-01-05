export const DEFAULT_IGNORE_LIST = {
  contentxite: [
    "tokopedia-lite/services/*/@types/**",
    "tokopedia-lite/services/*/build/**",
    "tokopedia-lite/services/*/docker/**",
    "tokopedia-lite/services/*/node_modules/**",
    "tokopedia-lite/services/*/coverage/**",
    "tokopedia-lite/services/*/static/**",
    "tokopedia-lite/services/*/utils/**"
  ]
};

export const DEFAULT_TARGET = {
  contentxite: [
    "tokopedia-lite/services/arael/**/__buggy_tests__",
    "tokopedia-lite/services/b2b/**/__buggy_tests__",
    "tokopedia-lite*/services/freyja/**/__buggy_tests__",
    "tokopedia-lite/services/mynakama/**/__buggy_tests__",
    "tokopedia-lite/services/play/**/__buggy_tests__",
    "tokopedia-lite/services/theseus/**/__buggy_tests__"
  ]
};
