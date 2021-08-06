export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  mutations: {
    pushRequest(state, payload) {
      state.requests.push(payload);
    },
    setRequests(state, payload) {
        state.requests = payload
    }
  },
  actions: {
    async addRequest(context, payload) {
      const response = await fetch(
        `https://real-state-project-a228a-default-rtdb.firebaseio.com/requests.json`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to send request"
        );
        throw error;
      }

      context.commit("pushRequest", payload);
    },
    async loadRequests(context) {
      const response = await fetch(
        `https://real-state-project-a228a-default-rtdb.firebaseio.com/requests.json`
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to load request"
        );
        throw error;
      }
      const requests = [];
      for (const key in responseData) {
        const request = {
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          emailAddress: responseData[key].emailAddress,
          rentalId: responseData[key].rentalId,
          bid: responseData[key].bid,
        };
        requests.push(request);
      }
      context.commit("setRequests", requests);
    },
  },
  getters: {
    requests(state) {
      return state.requests;
    },
  },
};
