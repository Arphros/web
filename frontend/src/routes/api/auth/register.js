import db from "$lib/database/database"

export const post = async (req) => {
    const username = req.body.get("username")
    const email = req.body.get("email")
    const password = req.body.get("password")

  await db.execute("INSERT INTO user (username, email, password) VALUES (?, ?, ?)", [username, email, password]).catch((err) => {
    return { headers: { Location: `/errorHandler?status=300&msg=${err.sqlMessage}` }, status: 300 };
  })

  return {
    headers: { Location: "/auth/login"},
    status: 302
  }
};