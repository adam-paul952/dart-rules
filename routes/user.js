import { Router } from "express";
import { query, execute } from "../database";

const router = Router();

router
  .get("/", async (req, res) => {
    const users = await query(`
        SELECT
            *
        FROM
            players
    `);

    res.contentType("html");

    res.end(`
    ${users
      .map((user) => {
        return `<p>${user.user_name} AKA ${user.nick_name}</p>`;
      })
      .join("")}
    `);
  })

  .post("/", async (req, res) => {
    const body = req.body;

    await execute(
      `
        INSERT INTO players (
            user_name,
            nick_name,
            password,
            date_added
        ) VALUES (
            @firstName,
            @nickName,
            password,
            NOW()
        )
    `,
      {
        firstName: body.first,
        nickName: body.nickName,
      }
    );

    res.end("Added player");
  });

export default router;
