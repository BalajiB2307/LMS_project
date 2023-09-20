import axios from 'axios';

const baseUrl = 'http://localhost:5000';

const getAllLMS = () => {
   return axios
    .get(`${baseUrl}/getall`)
    .then(({ data }) => {
      // console.log('data = ', data);
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getByID = (_id) => {
   return axios
    .get(`${baseUrl}/getbyid?_id=${_id}`)
    .then(({ data }) => {
      // console.log('data = ', data);
    //   setLMS(data);
    return data
    })
    .catch((err) => {
      console.log(err);
    });
};

const addLms = (reqData) => {
  return axios
    .post(`${baseUrl}/add`, reqData)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateLms = (reqData) => {
  return axios
    .patch(`${baseUrl}/update`, reqData)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteLms = (reqData) => {
  return axios
    .delete(`${baseUrl}/delete/${reqData}`)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getAllLMS, addLms, getByID, updateLms, deleteLms };
