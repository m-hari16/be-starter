export const baseErrorResponse = (message = "ERROR") => {
  return {
    success: false,
    message: message,
  };
};

export const baseSuccessResponse = (data = {}, message = "OK") => {
  return {
    success: true,
    message: message,
    data: data,
  };
};
