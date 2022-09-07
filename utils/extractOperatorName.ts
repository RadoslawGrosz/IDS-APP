const getOperatorNameFromSubdomain = () => {
  const hostname = window.location.host;
  const matches = hostname.match(/(?<operatorName>.*)\.ids\.i4b\.pl/);

  if (!matches) {
    return null;
  }

  return matches.groups?.operatorName ?? null;
};

const getOperatorNameFromQuery = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  return urlSearchParams.get("operatorName");
};

const getOperatorNameFromEnv = () => {
  return process.env.REACT_APP_OPERATOR_NAME ?? null;
};

export default function extractOperatorName() {
  const extractions: Array<string | null> = [
    getOperatorNameFromSubdomain(),
    // getOperatorNameFromQuery(),
    getOperatorNameFromEnv(),
  ];
  return extractions.filter((operatorName) => !!operatorName)[0] ?? "invalid";
}
