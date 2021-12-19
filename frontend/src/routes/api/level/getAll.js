import db from '$lib/database/database';
let levels = []

export const post = async (req) => {
    const {limit} = req.body;

    if(levels.length <= limit) {
        const rows = await db.query(`SELECT *
                                     FROM levels.levels
                                     WHERE levels.id <= ?`, [limit]);
        levels = rows[0];
        return {
            status: 200,
            body: {
                levels: rows[0]
            }
        };
    } else {
        return {
            status: 200,
            body: {
                levels: levels.slice(0, limit)
            }
        };
    }
};
