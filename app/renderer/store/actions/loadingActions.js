export const SET_LOADING = "SET_LOADING";

export function setLoading(bool) {
  if (bool) {
    return {
      type: SET_LOADING,
      payload: { loading: "loader", disable: "block" }
    };
  } else {
    return {
      type: SET_LOADING,
      payload: { loading: "", disable: "" }
    };
  }
}