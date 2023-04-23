export const formatDiffOfStartAndEndTime = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diff = end.getTime() - start.getTime();
    const diffMins = Math.round(diff / 60000);

    return diffMins + ' mins';
  };


  export const formatSeconds = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${parseFloat(minutes)}:${
      Math.round(remainingSeconds) < 10 ? "0" : ""
    }${Math.round(remainingSeconds)}`;
  };