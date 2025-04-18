import api from './api';

export const getAllRaces = async () => {
  const response = await api.get('/races');
  return response.data.results;
};

export const getRaceDetails = async (raceIndex) => {
  const response = await api.get(`/races/${raceIndex}`);
  return response.data;
};
