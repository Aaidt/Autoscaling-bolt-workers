import { AutoScalingClient, SetDesiredCapacityCommand, DescribeAutoScalingInstancesCommand } from "@aws-sdk/client-auto-scaling"
import dotenv from "dotenv"
import express, { Request, Response } from "express"
import { DescribeInstancesCommand } from "@aws-sdk/client-ec2";
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

async function refreshInstances() {
    const command = new DescribeAutoScalingInstancesCommand()
    const data = await client.send(command)

    const ec2InstanceCommand = new DescribeInstancesCommand({
        InstanceIds: data.AutoScalingInstances?.map(x => x.InstanceId)
    })
    
    const ec2Response = await client.send(ec2InstanceCommand)
    console.log(JSON.stringify(ec2Response.Reservations[0].instances[0].PublicDnsName))
}

refreshInstances()

setInterval(() => {
    refreshInstances()
}, 10 * 1000)


app.get("/:projectId", (req: Request, res: Response) => {
    res.send("Hello world.")
})

app.listen(3000);


// const command = new SetDesiredCapacityCommand({ 
//     AutoScalingGroupName: "code-server",
//     DesiredCapacity: 10
// })

// const response = await client.send(command)

// console.log(response)