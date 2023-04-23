import axios from "axios";

const API = "http://localhost:3001";
const API2 = "https://elitmusbackend-6bsu.onrender.com";

export const addGame = async (data) => {
  try {
    const res = await axios.post(`${API2}/add-games`, data);
    if (res) {
      return {
        data: res.data,
        status: res.status,
        error: false,
        message: "Game Added Successfully",
      };
    }
  } catch (error) {
    console.log(error, " error hai");
    return {
      data: null,
      status: 500,
      error: true,
      message: error?.response?.data?.error || "Something went wrong",
    };
  }
};

export const getGameById = async (id) => {
  try {
    const res = await axios.get(`${API2}/get-games/${id}`);
    if (res) {
      return {
        data: res.data,
        status: res.status,
        error: false,
        message: "Game Fetched Successfully",
      };
    }
  } catch (error) {
    console.log(error, " error hai");
    return {
      data: null,
      status: 500,
      error: true,
      message: error?.response?.data?.error || "Something went wrong",
    };
  }
};

// /update-games/:id

export const updateGame = async (id, data) => {
  try {
    const res = await axios.put(
      `${API2}/update-games/${id}`,
      data
    );
    if (res) {
      return {
        data: res.data,
        status: res.status,
        error: false,
        message: "Game Updated Successfully",
      };
    }
  } catch (error) {
    console.log(error, " error hai");
    return {
      data: null,
      status: 500,
      error: true,
      message: error?.response?.data?.error || "Something went wrong",
    };
  }
};


// Update score board of details 
export const updateScoreBoard = async (id, data) => {
  try {
    const res = await axios.put(
      `${API2}/update-score-board/${id}`,
      data
    );
    if (res) {
      return {
        data: res.data,
        status: res.status,
        error: false,
        message: "Game Updated Successfully",
      };
    }
  } catch (error) {
    console.log(error, " error hai");
    return {
      data: null,
      status: 500,
      error: true,
      message: error?.response?.data?.error || "Something went wrong",
    };
  }
}


// Get Leaderboard of game
export const getLeaderBoard = async () => {
  try {
    const res = await axios.get(`${API2}/get-score-board`);
    if (res) {
      return {
        data: res.data,
        status: res.status,
        error: false,
        message: "Game Fetched Successfully",
      };
    }
  } catch (error) {
    console.log(error, " error hai");
    return {
      data: null,
      status: 500,
      error: true,
      message: error?.response?.data?.error || "Something went wrong",
    };
  }
}

