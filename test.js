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
let start = "2020-01-01T08:00:00.000Z"
let end = "2020-01-01T12:00:00.000Z"

const blocks = []
const appointments = [
  {
      id: "1",
      vendorId: "1",
      start: "2020-01-01T09:00:00.000Z",
      end: "2020-01-01T09:30:00.000Z"
  },
]
let startDate = new Date(start).getTime()
console.log(startDate)
const endDate = new Date(end).getTime()
console.log(endDate)

const daysOfTheWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
while ((startDate <= endDate)) {
  let day = daysOfTheWeek[new Date(startDate).getDay()]
  let startTime = new Date(startDate).getTime()
  let endTime = new Date(startDate).getTime() + (vendorParams[day].gap * 60 * 1000)
  const appoitmentTime = vendorParams[day].appoitmentTime
  const appointment = appointments.find(appointment => {
      const appointmentStart = new Date(appointment.start)
      const appointmentEnd = new Date(appointment.end)
      return startDate >= appointmentStart && startDate <= appointmentEnd
  })

  if (appointment) {
      startDate = startTime + appoitmentTime
      continue
  }
  let block = {
    id: start,
    vendorId: "1",
    start: new Date(startTime).toISOString(),
    end: new Date(endTime).toISOString()
  }
  blocks.push(block)
  startDate = startTime + (vendorParams[day].gap * 60 * 1000)
  console.log(startDate)
  // console.log(startDate, endDate, startDate <= endDate)
  // i++
  // const day = new Date(startDate).getDay()
  // const startTime = vendorParams[daysOfTheWeek[day]].start
  // const endTime = vendorParams[daysOfTheWeek[day]].end
  // const gap = vendorParams[daysOfTheWeek[day]].gap
  // const appoitmentTime = vendorParams[daysOfTheWeek[day]].appoitmentTime
  // // if there is an appointement that happens during this time, skip this time
  
  // const appointment = appointments.find(appointment => {
  //     const appointmentStart = new Date(appointment.start)
  //     const appointmentEnd = new Date(appointment.end)
  //     return startDate >= appointmentStart && startDate <= appointmentEnd
  // })

  // if (appointment) {
  //     startDate.setHours(startTime + appoitmentTime)
  //     continue
  // }

  // blocks.push({
  //     start: new Date(startDate).getTime(),
  //     end: new Date(startDate).getTime() + (endTime - startTime) * 60 * 1000,
  // })

  // new Date(startDate).setTime(new Date(startDate).getTime() + gap * 60 * 1000)
}

console.log(blocks)