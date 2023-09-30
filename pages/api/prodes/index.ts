import { API_BASE_PATH, API_PRODES_PATH } from "@/utils/api/constants";
import axios from "axios";

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      console.log("POST /prodes");
      res.status(200).json({ name: "John Doe" });
    default:
      throw new Error("Method not supported");
  }
};
