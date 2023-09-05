// import Raven from "raven-js";

function init() {
  // Raven.config(
  //   "https://1f2454f7518b4e65ba52818e8b424827@o4505799621738496.ingest.sentry.io/4505805056180224",
  //   {
  //     release: 1 - 0 - 0,
  //     environment: "development-test",
  //   }
  // ).install();
}
function log(error) {
  console.log(error);
  // Raven.captureException(error);
}

export default {
  init,
  log,
};
