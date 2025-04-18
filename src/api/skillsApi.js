import api from './api';

export const getAllSkills = async () => {
  const response = await api.get('/skills');
  return response.data.results;
};
