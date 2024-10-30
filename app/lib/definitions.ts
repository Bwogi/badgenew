// import { ObjectId } from "mongodb";

export type Badge = {
  id: string;
  empName: string;
  empId: string;
  badgeNumber: string;
  issueDate: string;
  status: "not returned" | "returned";
};
