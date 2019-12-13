const {Pool} = require("pg");
const config = require("../config/database");

const db = {
    connectionString: config.connectionString,
    max: config.max,
    idleTimeoutMillis: config.idleTimeoutMillis,
    connectionTimeoutMillis: config.connectionTimeoutMillis
}
let pool;

module.exports = {
    initializeDatabase: () => {
        pool = new Pool(db);
    },

    /**
     * @params conditions - {condition1: 'boo', condition2: 'ans', intcondition: [">", 1]}
     */
    list: async(table, conditions = null) => {
        let params = null;
        let querytext = `SELECT * FROM ${table}`;
        if(conditions) {
            params = [];
            querytext += ` WHERE `;
            let i = 0;
            for (key in conditions) {
                params[i] = conditions[key];
                if(i>0) querytext += " AND ";
                i++;
                
                querytext += `${key} $${i}`;
            }
        }
        return await pool.query(`${querytext};`, params);
    },

    /**
     * @params paginateparams - is an object. {page, limit, sortby, sorttype - (asc, desc)}
     */
    paginate: async(table, paginateparams, conditions = null) => {
        let params = null;
        let querytext = `SELECT * FROM ${table}`;
        if(conditions) {
            params = [];
            querytext += ` WHERE `;
            let i = 0;
            for (key in conditions) {
                params[i] = conditions[key];
                if(i>0) querytext += " AND ";
                i++;
                
                querytext += `${key} $${i}`;
            }
        }
        if(paginateparams.sortby) querytext += ` ORDER BY ${paginateparams.sortby}`;
        if(paginateparams.sorttype) querytext += ` ${paginateparams.sorttype}`;
        if(paginateparams.limit) querytext += ` LIMIT ${paginateparams.limit}`;
        if(paginateparams.page) querytext += ` OFFSET ${(paginateparams.page-1) * paginateparams.limit}`;

        console.log('querytext===> ', querytext);
        return await pool.query(`${querytext};`, params);
    },

    findone: async(table, conditions = null) => {
        let params = null;
        let querytext = `SELECT * FROM ${table}`;
        if(conditions) {
            params = [];
            querytext += ` WHERE `;
            let i = 0;
            for (key in conditions) {
                params[i] = conditions[key];
                if(i>0) querytext += " AND ";
                i++;
                
                querytext += `${key} $${i}`;
            }
        }
        return await pool.query(`${querytext} LIMIT 1;`, params);
    },

    create: async(table, columns, values) => {
        console.log("Running create");
        try{
          let cols = columns.join(', ');
    
          let values_str = "";
          for(i=1; i<=values.length; i++) {
            if(i == values.length) values_str+= `$${i}`;
            else values_str += `$${i}, `;
          }
          console.log("cols", cols, "values", values);
    
          let querytext = `INSERT INTO ${table} (${cols}) VALUES(${values_str}) RETURNING *;`;
          console.log(querytext);
          let res = await pool.query(querytext, values);
          console.log("Res", res);
          return res;
        } catch(err) {
          console.log('ERROR', err);
          throw Error;
        }
    },

    one_to_many_create: async (table, columns, values) => {
        try {
            let querytext = `INSERT INTO ${table}(${columns[0]}, ${columns[1]}) 
            SELECT $1 id, x
            FROM    unnest(ARRAY[$2::int[]]) x;`;
            let res = await pool.query(querytext, values);
            return res;
        } catch(e) {
            console.log("ERROR", e);
            return ('DB ERROR');
        }
    },

    update: async(table, columns, values, conditions) => {
        console.log("Running update");
        try{
            let querytext = `UPDATE ${table} SET`
    
            for(i=1; i<=columns.length; i++) {
            
                if(i>1) querytext += ", ";
                querytext+= ` ${columns[i]} = $${i}`;
            }

            if(conditions) {
                params = [];
                querytext += ` WHERE `;
                let i = 0;
                for (key in conditions) {
                    params[i] = conditions[key];
                    if(i>0) querytext += " AND ";
                    i++;
                    
                    querytext += `${key} $${i}`;
                }
            } else throw Error("No condition specified. Exiting!");
    
            console.log(querytext);
            let res = await pool.query(`${querytext};`, values);
            console.log("Res", res);
            return res;
        } catch(err) {
            console.log('ERROR', err);
            return "ERROR";
        }
    },

    customquery: async(text, params) => {
        try{
            let res = await pool.query(text, params);
            return res;
        } catch(e) {
            console.log("EROROROR", e);
            return "Error";
        }
    },

    transaction: async(callback) => {
        const client = await pool.connect();
        let res = {};
        try {
            await client.query('BEGIN');
            try {
                res.data = await callback(client)
                client.query('COMMIT');
                res.status=true;
            } catch(e) {
                console.log(e);
                res = {status: e.name, detail: e.detail, constraint: e.constraint};
                client.query('ROLLBACK');
                throw e;
            }
        } finally {
            console.log("CLOSING CONNECTON");
            client.release();
        }
        return res;
    }    
}