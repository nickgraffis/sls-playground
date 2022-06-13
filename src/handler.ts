import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda"

export const createVendorBlocks: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: "Go Serverless v1.0! Your function executed successfully!",
            input: event
        })
    }

    return response
}

export const getVendorBlocks: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const { start, end, vendorId } = event.body ? JSON.parse(event.body) : { start: null, end: null, vendorId: null }

    const vendorParams = {
        sunday: {
            start: 9,
            end: 17,
            gap: 15,
            appoitmentTime: 30
        },
        monday: {
            start: 9,
            end: 17,
            gap: 15,
            appoitmentTime: 30
        },
        tuesday: {
            start: 9,
            end: 17,
            gap: 15,
            appoitmentTime: 30
        },
        wednesday: {
            start: 9,
            end: 17,
            gap: 15,
            appoitmentTime: 30
        },
        thursday: {
            start: 9,
            end: 17,
            gap: 15,
            appoitmentTime: 30
        },
        friday: {
            start: 9,
            end: 17,
            gap: 15,
            appoitmentTime: 30
        },
        saturday: {
            start: 9,
            end: 17,
            gap: 15,
            appoitmentTime: 30
        }
    }

    if (!start || !end || !vendorId) return {
        statusCode: 400,
        body: JSON.stringify({
            message: "Missing required parameters"
        })
    }

    const blocks = []
    const appointments = [
        {
            id: "1",
            vendorId: "1",
            start: "2020-01-01T09:00:00.000Z",
            end: "2020-01-01T9:30:00.000Z"
        },
    ]
    const startDate = new Date(start)
    const endDate = new Date(end)

    while (startDate <= endDate) {
        const day = startDate.getDay()
        const startTime = vendorParams[day].start
        const endTime = vendorParams[day].end
        const gap = vendorParams[day].gap
        const appoitmentTime = vendorParams[day].appoitmentTime
        // if there is an appointement that happens during this time, skip this time
        
        const appointment = appointments.find(appointment => {
            const appointmentStart = new Date(appointment.start)
            const appointmentEnd = new Date(appointment.end)
            return startDate >= appointmentStart && startDate <= appointmentEnd
        })

        if (appointment) {
            startDate.setHours(startTime + appoitmentTime)
            continue
        }

        blocks.push({
            start: startDate.getTime(),
            end: startDate.getTime() + (endTime - startTime) * 60 * 1000,
        })

        startDate.setTime(startDate.getTime() + gap * 60 * 1000)
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: "Go Serverless v1.0! Your function executed successfully!",
            input: event
        })
    }

    return response
}

export const updateVendorBlocks: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: "Go Serverless v1.0! Your function executed successfully!",
            input: event
        })
    }

    return response
}

export const scheduleVendorBlock: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: "Go Serverless v1.0! Your function executed successfully!",
            input: event
        })
    }

    return response
}
