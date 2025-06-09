import axiosInstance from "./axiosInstance";
export const getDailyTicketSales = async (organizerId: string, start: string, end: string) => {
  const res = await axiosInstance.get(`/api/analytics/daily-sales`, {
    params: {organizerId, start, end },
    withCredentials: true
  });
  return res.data;
};
export const getDashboardSummary = async (organizerId: string) => {
  const res = await axiosInstance.get(`/api/analytics/summary?organizerId=${organizerId}`);
  return res.data;
};
