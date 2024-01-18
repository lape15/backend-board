import { Request, Response } from "express";
import User from "../../models/user/user.model";

interface ReqObj extends Request {
  user?: { id: string; email: string };
}

interface Profile {
  address: string;
  professionalInformation: {
    employmentHistory: Array<{
      name: string;
      duration: string;
      role: string;
      duties: Array<string>;
    }>;
    jobPreference: {
      preferredTitle: string;
      industry: Array<string>;
      location: Array<string>;
      employmentType: Array<string>;
      salary: string;
    };
    workAuthorizationStatus: {
      citzenship: Array<string>;
      visaType: string;
      status: string;
    };
    profilePhoto: string | null;
    socialMedia: Array<string>;
    coverLetter: string;
    privacySPreferrence?: {
      notification: string;
    };
    optionalInformation: {
      website: string;
      references: Array<string>;
      languages: Array<string>;
    };
  };
}

export const getUserProfile = async (req: ReqObj, res: Response) => {
  const user = req.user;
  try {
    const userRow = await User.findOne({
      where: {
        email: user?.email,
      },
    });
    return res.status(200).send({
      message: "Ok",
      profile: userRow,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error retrieving user");
  }
};
