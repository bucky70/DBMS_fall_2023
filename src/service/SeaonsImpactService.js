import Request from "./Request";

const getSeasonsData = async (data) => {
    try {
        let response;
        response = await Request.post('http://localhost:80/query3', {"Year": data.years , "City":data.City, "State": data.State });
        
        if(response.status === 200 && !response.data.error) {
            return response.data.data;
        } else {
            throw new Error(`Response status not success ${response.status} with text ${response.statusText}`);
        }
    } catch (err) {
        console.error(err);
        return undefined;
    }
}

export {getSeasonsData}