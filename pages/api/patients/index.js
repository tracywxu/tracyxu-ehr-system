// API endpoint: /api/patients
import { AirtableBase } from '../../../airtable'

// get back an array of patient objects from Airtable
async function getAllPatientsRecord() {
  try {
    const response = await AirtableBase('Patients').select().all()
    const patientData = response.map((patient) => {
      patient.fields['id'] = patient.id
      return patient.fields
    })

    return patientData
  } catch (err) {
    throw new Error(err)
  }
}

export default async function allPatientHandler(req, res) {
  try {
    const patientData = await getAllPatientsRecord()
    res.status(200).json(patientData)
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
