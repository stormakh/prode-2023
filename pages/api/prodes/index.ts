import { API_BASE_PATH, API_PRODES_PATH } from "@/utils/api/constants";
import { createProde } from "@/utils/api/prodes";
import axios from "axios";

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
	switch (req.method) {
		case "POST":
			const prode: CreateProdeRequestDto = req.body;
			console.log("POST /prodes");
			const prodeRes = await createProde(prode);
			console.log(prodeRes);
			res.status(200).json(prodeRes);
			break;
		default:
			throw new Error("Method not supported");
	}
};
