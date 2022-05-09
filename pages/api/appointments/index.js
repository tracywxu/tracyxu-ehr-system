// api endpoint: /api/appointments
import { AirtableBase } from '../../../airtable.js'

// get back an array of patient objects from Airtable
async function getAllAppointments() {
  try {
    const response = await AirtableBase('Appointments')
      .select({ view: 'Grid view' })
      .all()

    const patientData = response.map((appointment) => {
      appointment.fields['id'] = appointment.id
      return appointment.fields
    })

    return patientData
  } catch (err) {
    throw new Error(err)
  }
}

export default async function allAppointmentsHandler(req, res) {
  try {
    const allAppointments = await getAllAppointments()
    res.status(200).json(allAppointments)
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
