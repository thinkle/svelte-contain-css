export async function load({ params }) {
  console.log("Got", params);
  // params.component will contain the dynamic part of your route
  return {
    component: params.component,
  };
}
