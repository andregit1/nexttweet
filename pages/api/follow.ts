import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash"
import prisma from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    // const { userId } = req.body
    const { userId } = req.method === 'POST' ? req.body : req.query;
    
    if (!userId || typeof userId !== 'string') {
      console.log("userId", userId)
      throw new Error('Invalid ID - userId from useFollow');
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new Error(`Invalid ID and user is : ${user}`);

    let updatedFollowingIds = [...(user.followingIds || [])];

    if (req.method === 'POST') {
      updatedFollowingIds.push(userId);

      try {
        await prisma.notification.create({
          data: { body: 'Someone followed you!', userId },
        });

        await prisma.user.update({
          where: { id: userId },
          data: { hasNotification: true }
        });
      } catch (error) {
        console.log(error);
      }
      
    }

    if (req.method === 'DELETE') {
      console.log("delete request or unfollow")
      updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== userId);
    }

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { followingIds: updatedFollowingIds }
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
