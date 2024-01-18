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

export const userProfile = async (req: ReqObj, res: Response) => {
  const user = req.user;
  try {
    const userRow = await User.findOne({
      where: {
        email: user?.email,
      },
    });
    const profile: Profile = req.body.profile;
    const result = await userRow.update(
      { profile },
      { where: { id: user?.id } }
    );
    console.log({ result });
    return res.status(200).send("ok");
  } catch (err) {
    return res.status(500);
  }
};
