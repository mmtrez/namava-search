import axios from 'axios';

const getSearchResult = async (type, page, query) => {
  try {
    const {data} = await axios.get('https://www.namava.ir/api/v3.0/search/advance', {
      params: {
        type,
        page,
        query,
        count: 20,
      },
    });
    if (!data.succeeded) throw new Error('error');

    const items = data.result.result_items[0].groups?.Media?.items;

    return items;
  } catch (err) {
    console.log(err);
  }
};

export default getSearchResult;
