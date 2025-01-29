export async function load({ params }) {
  // params.component will contain the dynamic part of your route
  return {
    component: params.component,
  };
}
