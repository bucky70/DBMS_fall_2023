import Request from "./Request";

const getAllCityState = async (data) => {
    try {
        let response=await Request.get('http://localhost:80/query7');;
        
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

export {getAllCityState}