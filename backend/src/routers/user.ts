import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();
const prismaClient = new PrismaClient();
const JWT_SECRET = "adi123";

//signin with a wallet
//signing a message

router.post("/signin", async(req,res)=>{
        // add signing logic here
        const hardcodedWalletAddress = "DgVq5GJ2sLgsRqYxVpApTHF5onUJUh5jLNkVbzd1eoeZ";

        const existingUser = await prismaClient.user.findFirst({
            where:{
                address: hardcodedWalletAddress
            }
            });

            if(existingUser)
            {
                const token = jwt.sign({
                    userId: existingUser.id
                },JWT_SECRET);

                res.json({
                    token
                });
                
            }
            else{
                const user = await prismaClient.user.create({
                    data:{
                        address: hardcodedWalletAddress,
                    }
                });

                const token = jwt.sign({
                    userId: user.id
                },JWT_SECRET);

                res.json({
                    token
                });

            }
    });

export default router;