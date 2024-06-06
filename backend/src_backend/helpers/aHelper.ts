import {OrclConnection} from "../utils/connection";
import {allQueries} from "../utils/queries"

export const queryHelper1 = async (data) => {
    try
    {
        let conn = await OrclConnection();
        let query = allQueries.Query1.replace("DBMS", data.Year)
        const cityArray = data.City.split(',').map(city => `'${city.trim()}'`);
        const citiesInQuotes = cityArray.join(', ');
        query = query.replace("DBMSCITY", citiesInQuotes);
        const stateArray = data.State.split(',').map(state => `'${state.trim()}'`);
        const stateInQuotes = stateArray.join(', ');
        query = query.replace("DBMSSTATE", stateInQuotes)
        let result = await conn.execute(query);
        conn.close();
        return {
            status: 200,
            isSuccess: true,
            data: result.rows
        }
    }
    catch(err)
    {
        return {
            status: 500,
            isSuccess: false,
            error: err.message
        }
    }
}

export const queryHelper2 = async (data) => {
    try
    {
        let conn = await OrclConnection();
        let query = allQueries.Query2.replace("DBMS", data.Year);
        const cityArray = data.City.split(',').map(city => `'${city.trim()}'`);
        const citiesInQuotes = cityArray.join(', ');
        query = query.replace("DBMSCITY", citiesInQuotes);
        const stateArray = data.State.split(',').map(state => `'${state.trim()}'`);
        const stateInQuotes = stateArray.join(', ');
        query = query.replace("DBMSSTATE", stateInQuotes)
        let result = await conn.execute(query);
        conn.close();
        return {
            status: 200,
            isSuccess: true,
            data: result.rows
        }
    }
    catch(err)
    {
        return {
            status: 500,
            isSuccess: false,
            error: err.message
        }
    }
}

export const queryHelper3 = async (data) => {
    try
    {
        let conn = await OrclConnection();
        let query = allQueries.Query3.replace("DBMS", data.Year)
        const cityArray = data.City.split(',').map(city => `'${city.trim()}'`);
        const citiesInQuotes = cityArray.join(', ');
        query = query.replace("DBMSCITY", citiesInQuotes);
        const stateArray = data.State.split(',').map(state => `'${state.trim()}'`);
        const stateInQuotes = stateArray.join(', ');
        query = query.replace("DBMSSTATE", stateInQuotes)
        let result = await conn.execute(query);
        conn.close();
        return {
            status: 200,
            isSuccess: true,
            data: result.rows
        }
    }
    catch(err)
    {
        return {
            status: 500,
            isSuccess: false,
            error: err.message
        }
    }
}

export const queryHelper4 = async (data) => {
    try
    {
        let conn = await OrclConnection();
        let query = allQueries.Query4.replace("DBMS", data.Year);
        const cityArray = data.City.split(',').map(city => `'${city.trim()}'`);
        const citiesInQuotes = cityArray.join(', ');
        query = query.replace("DBMSCITYSTATE", citiesInQuotes);
        let result = await conn.execute(query);
        conn.close();
        return {
            status: 200,
            isSuccess: true,
            data: result.rows
        }
    }
    catch(err)
    {
        return {
            status: 500,
            isSuccess: false,
            error: err.message
        }
    }
}

export const queryHelper5 = async (data) => {
    try
    {
        let conn = await OrclConnection();
        let query = allQueries.Query5.replace(/DBMS/g, data.Year)
        const stateArray = data.State.split(',').map(state => `'${state.trim()}'`);
        const stateInQuotes = stateArray.join(', ');
        query = query.replace(/Q5STATE/g, stateInQuotes)
        let result = await conn.execute(query);
        conn.close();
        return {
            status: 200,
            isSuccess: true,
            data: result.rows
        }
    }
    catch(err)
    {
        return {
            status: 500,
            isSuccess: false,
            error: err.message
        }
    }
}

export const queryHelper6 = async (data) => {
    try
    {
        let conn = await OrclConnection();
        let query = allQueries.Query6.replace("DBMS", data.Year);
        const cityArray = data.City.split(',').map(city => `'${city.trim()}'`);
        const citiesInQuotes = cityArray.join(', ');
        query = query.replace("DBMSCITY", citiesInQuotes);
        const stateArray = data.State.split(',').map(state => `'${state.trim()}'`);
        const stateInQuotes = stateArray.join(', ');
        query = query.replace("DBMSSTATE", stateInQuotes);
        let result = await conn.execute(query);
        conn.close();
        return {
            status: 200,
            isSuccess: true,
            data: result.rows
        }
    }
    catch(err)
    {
        return {
            status: 500,
            isSuccess: false,
            error: err.message
        }
    }
}

export const queryHelper7 = async () => {
    try
    {
        let conn = await OrclConnection();
        let result = await conn.execute(allQueries.Query7);
        conn.close();
        return {
            status: 200,
            isSuccess: true,
            data: result.rows
        }
    }
    catch(err)
    {
        return {
            status: 500,
            isSuccess: false,
            error: err.message
        }
    }
}

export const queryHelper8 = async () => {
    try
    {
        let conn = await OrclConnection();
        let result = await conn.execute(allQueries.Query9);
        let data = result.rows;
        let sum = result.rows.reduce((acc, row) => acc + row.TABLE_COUNT, 0);
        data.push({TOTAL_COUNT:"TOTAL COUNT", SUM: sum});
        conn.close();
        return {
            status: 200,
            isSuccess: true,
            data: result.rows
        }
    }
    catch(err)
    {
        return {
            status: 500,
            isSuccess: false,
            error: err.message
        }
    }
}