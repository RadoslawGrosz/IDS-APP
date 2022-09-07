import { OperatorNameToIdMap } from "../consts";
import extractOperatorName from "./extractOperatorName";

export default function extractOperatorId() {
  return OperatorNameToIdMap[extractOperatorName()] ?? null;
}
