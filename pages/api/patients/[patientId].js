// API endpoint: /api/patients/patientId
import { AirtableBase } from '../../../airtable'

async function getPatientRecord(patientId) {
  try {
    const response = await AirtableBase('Patients').find(patientId)
    const patientData = response.fields
    patientData['id'] = response.id
    return patientData
  } catch (err) {
    throw new Error(err)
  }
}

export default async function patientHandler(req, res) {
  try {
    const { patientId } = req.query
    const patientData = await getPatientRecord(patientId)
    res.status(200).json(patientData)
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
