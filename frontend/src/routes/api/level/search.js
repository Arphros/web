import db from '$lib/database/database';

export const post = async (req) => {
    const query = req.body.query;
    const id = req.body.id;

    let sql = id ? 'SELECT * FROM levels.levels WHERE levels.id = ?' : 'SELECT * FROM levels.levels WHERE levels.name LIKE ?';
    const rows = await db.query(sql, [id ? id : `%${query}%`]);
    if (!rows[0]) {
        return {
            body: {
                message: 'No levels found.'
            },
            status: 200
        };
    }

    return {
        status: 200,
        body: {
            message: 'Found levels.',
            levels: rows[0]
        }
    };
};
