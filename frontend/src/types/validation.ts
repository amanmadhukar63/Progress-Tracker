import { z } from "zod";
import { IGoalStatus } from "./goal";

export const goalSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(IGoalStatus, {
    error: () => ({
      message: "Invalid option"
    })
  }),
  start_date: z.coerce.date("Invalid Date"),
  end_date: z.preprocess(
    (data)=>{
      if(data==="") return undefined;
      return data;
    },
    z.coerce.date().optional()
  )
})
.refine(
  (data) => {
    if(!data.end_date) return true;

    return data.start_date<= data.end_date;
  },
  {
    message: "End date must be greater than start date",
    path: ["end_date"]
  }
)