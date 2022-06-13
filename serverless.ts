import type { Serverless } from "serverless/aws"

/**
 * Serverless support writing your configuration in js/ts out of the box.
 * Using Typescript, we get autocomplete as well. This is more
 * convenient that yaml if your deploy logic is not trivial,
 * and depends on things like environment variables.
 * Use ts-ignore because we know what we're doing.
 */
//@ts-ignore
const serverlessConfiguration: Serverless = {
    service: "serverless-esbuild-template",
    plugins: ["serverless-esbuild", "serverless-offline"],
    provider: { 
        name: "aws", 
        runtime: "nodejs14.x",
        region: "us-west-2",
        memorySize: 512,
        timeout: 10 
    },
    resources: {
        Resources: {
            schedulesTable: {
                Type: "AWS::DynamoDB::Table",
                Properties: {
                    TableName: "schedules",
                    AttributeDefinitions: [
                        { AttributeName: "pk", AttributeType: "S" },
                        { AttributeName: "sk", AttributeType: "S" }
                    ],
                    KeySchema: [
                        { AttributeName: "pk", KeyType: "HASH" },
                        { AttributeName: "sk", KeyType: "RANGE" }
                    ],
                    BillingMode: "PAY_PER_REQUEST",
                    StreamSpecification: {
                        StreamViewType: "NEW_AND_OLD_IMAGES"
                    }
                }
            }
        }
    },
    functions: {
        getVendorBlocks: {
            handler: "src/handler.getVendorBlocks",
            events: [{ http: { path: "getVendorBlocks", method: "get" } }]
        },
        createVendorBlocks: {
            handler: "src/handler.createVendorBlocks",
            events: [{ http: { path: "createVendorBlocks", method: "post" } }]
        },
        updateVendorBlocks: {
            handler: "src/handler.updateVendorBlocks",
            events: [{ http: { path: "updateVendorBlocks", method: "post" } }]
        },
        scheduleVendorBlock: {
            handler: "src/handler.scheduleVendorBlock",
            events: [{ http: { path: "scheduleVendorBlock", method: "post" } }]
        }
    }
}

module.exports = serverlessConfiguration
