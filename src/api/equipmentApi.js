import api from './api';

export const fetchEquipmentOptions = async (options) => {
  const promises = options.map(async (option) => {
    const from = option.from;
    const choose = option.choose;

    const items = await Promise.all(from.map(async (item) => {
      const url = item.equipment?.url || item.url;
      const res = await api.get(url);
      return res.data.name;
    }));

    return { choose, items };
  });

  return Promise.all(promises);
};
