export const RegularExpressions = {
    VARIABLE: /[A#]\{(.*?)}/g,
    FUNCTION: /d2:.*\(.*'(.*?)'.*\)/g,
    FUNCTION_WITH_GROUPS: /(d2:)(.*\(.*')(.*?)('.*\))/g,
    CONSTANT: /V\{(.*?)}/g,
};
