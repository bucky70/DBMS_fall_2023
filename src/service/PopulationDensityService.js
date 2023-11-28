import Request from "./Request";

const getAllPopulationDensityData = async (data) => {
    try {
        let response;
        response = await Request.post('http://localhost:80/query4', {"Year": data.years ,"City":data.City });
        
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
export {getAllPopulationDensityData}