import db from '$lib/database/database';

export const post = async (req) => {
    const { limit } = req.body;
    const rows = await db.query(`SELECT * FROM levels.levels WHERE levels.id <= ?`, [limit]);
    return {
        status: 200,
        body: {
            levels: rows[0]
        }
    };
};
