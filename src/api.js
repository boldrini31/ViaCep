const axios = require('axios');

const getCep = async (cep) => {

    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`)
            .then(function (response) {
                return response
            })
        return response
    }
    catch (error) {
        console.error(error);
    }

}
export default getCep