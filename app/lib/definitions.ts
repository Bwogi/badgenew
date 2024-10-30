import { ObjectId } from "mongodb";

export type Badge = {
  _id: ObjectId;
  empName: string;
  empId: string;
  badgeNumber: string;
  issueDate: Date;
  status: "not returned" | "returned";
};
