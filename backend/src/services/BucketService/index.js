import DoBucket from "./DoBucket.js";
import LocalBucket from "./LocalBucket.js";
import Env from "../../config/EnvConfig.js";

const { NODE_ENV } = Env;

const bucket = NODE_ENV === "development" ? LocalBucket : DoBucket;

export default bucket;