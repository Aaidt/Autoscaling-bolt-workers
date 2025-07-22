import { AutoScalingClient, SetDesiredCapacityCommand, DescribeAutoScalingInstancesCommand } from "@aws-sdk/client-auto-scaling"
import dotenv from "dotenv"
import express, { Request, Response } from "express"
dotenv.config()

const app = express();
const client = new AutoScalingClient({ region: "ap-south-1", credentials: {
    accessKeyId: process.env.accessKeyId!,
    secretAccessKey: process.env.secretAccessKey!
} })

type Machine = {
    ip: string,
    isUsed: boolean,
    assignedProject?: string 
}

const ALL_MACHINES: Machine = []

setInterval(() => {
    const command = new DescribeAutoScalingInstancesCommand()
    const data = client.send(command)
    console.log(data)
}, 10 * 1000)


app.get("/:projectId", (req: Request, res: Response) => {
    
})

app.listen(3000);


// const command = new SetDesiredCapacityCommand({ 
//     AutoScalingGroupName: "code-server",
//     DesiredCapacity: 10
// })

// const response = await client.send(command)

// console.log(response)