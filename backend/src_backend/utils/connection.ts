const oracledb = require('oracledb')
const config = {
  user: 's.kokkiligadda',
  password: 'LYISdRhrzUYnRWM03hRNNPvb',
  connectString: 'oracle.cise.ufl.edu:1521/orcl'
}

export const OrclConnection = async () => {
    oracledb.outFormat = oracledb.OBJECT;
    const conn = await oracledb.getConnection(config);
    return conn;
}