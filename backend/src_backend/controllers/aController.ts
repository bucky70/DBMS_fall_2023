import * as aHelper from "../helpers/aHelper";


export const query1 = async (req, res) => {

    const reqBody = req.body as {
        Year?: string
    };

    try {
        const result = await aHelper.queryHelper1(reqBody);
        if(result.isSuccess)
        {
            res.status(result.status).send({isSuccess: result.isSuccess, data: result.data});
        }
        else
        {
            res.status(result.status).send({isSuccess: result.isSuccess, err: result.error});
        }
    }
    catch (error) {

        console.log(error.message)
        res.status(500).send({isSuccess: false, err: error.message});
    }
};

export const query2 = async (req, res) => {

    const reqBody = req.body as {
        Year?: string
    };

    try {
        const result = await aHelper.queryHelper2(reqBody);
        if(result.isSuccess)
        {
            res.status(result.status).send({isSuccess: result.isSuccess, data: result.data});
        }
        else
        {
            res.status(result.status).send({isSuccess: result.isSuccess, err: result.error});
        }
    }
    catch (error) {

        console.log(error.message)
        res.status(500).send({isSuccess: false, err: error.message});
    }
};

export const query3 = async (req, res) => {

    const reqBody = req.body as {
        Year?: string
    };

    try {
        const result = await aHelper.queryHelper3(reqBody);
        if(result.isSuccess)
        {
            res.status(result.status).send({isSuccess: result.isSuccess, data: result.data});
        }
        else
        {
            res.status(result.status).send({isSuccess: result.isSuccess, err: result.error});
        }
    }
    catch (error) {

        console.log(error.message)
        res.status(500).send({isSuccess: false, err: error.message});
    }
};

export const query4 = async (req, res) => {

    const reqBody = req.body as {
        Year?: string
    };

    try {
        const result = await aHelper.queryHelper4(reqBody);
        if(result.isSuccess)
        {
            res.status(result.status).send({isSuccess: result.isSuccess, data: result.data});
        }
        else
        {
            res.status(result.status).send({isSuccess: result.isSuccess, err: result.error});
        }
    }
    catch (error) {

        console.log(error.message)
        res.status(500).send({isSuccess: false, err: error.message});
    }
};

export const query5 = async (req, res) => {

    const reqBody = req.body as {
        Year?: string
    };

    try {
        const result = await aHelper.queryHelper5(reqBody);
        if(result.isSuccess)
        {
            res.status(result.status).send({isSuccess: result.isSuccess, data: result.data});
        }
        else
        {
            res.status(result.status).send({isSuccess: result.isSuccess, err: result.error});
        }
    }
    catch (error) {

        console.log(error.message)
        res.status(500).send({isSuccess: false, err: error.message});
    }
};

export const query6 = async (req, res) => {

    const reqBody = req.body as {
        Year?: string
    };

    try {
        const result = await aHelper.queryHelper6(reqBody);
        if(result.isSuccess)
        {
            res.status(result.status).send({isSuccess: result.isSuccess, data: result.data});
        }
        else
        {
            res.status(result.status).send({isSuccess: result.isSuccess, err: result.error});
        }
    }
    catch (error) {

        console.log(error.message)
        res.status(500).send({isSuccess: false, err: error.message});
    }
};

export const query7 = async (req, res) => {

    try {
        const result = await aHelper.queryHelper7();
        if(result.isSuccess)
        {
            res.status(result.status).send({isSuccess: result.isSuccess, data: result.data});
        }
        else
        {
            res.status(result.status).send({isSuccess: result.isSuccess, err: result.error});
        }
    }
    catch (error) {

        console.log(error.message)
        res.status(500).send({isSuccess: false, err: error.message});
    }
};

export const query8 = async (req, res) => {

    try {
        const result = await aHelper.queryHelper8();
        if(result.isSuccess)
        {
            res.status(result.status).send({isSuccess: result.isSuccess, data: result.data});
        }
        else
        {
            res.status(result.status).send({isSuccess: result.isSuccess, err: result.error});
        }
    }
    catch (error) {

        console.log(error.message)
        res.status(500).send({isSuccess: false, err: error.message});
    }
};