import api from './api';

export const getAllClasses = async () => {
  const response = await api.get('/classes');
  return response.data.results;
};

export const getClassDetails = async (classIndex) => {
  const response = await api.get(`/classes/${classIndex}`);
  return response.data;
};
