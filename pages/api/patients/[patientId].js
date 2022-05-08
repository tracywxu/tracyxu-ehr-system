// API endpoint: /api/patients/patientId
import { AirtableBase } from '../../../airtable'
import { convertDateToTimestamp } from '../../../helpers'

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

async function updatePatientRecord(
  patientId,
  { name, notes, residenceState, picture, birthdate },
) {
  try {
    AirtableBase('Patients').update([
      {
        id: patientId,
        fields: {
          name: name,
          state: residenceState,
          dob: convertDateToTimestamp(birthdate),
          picture: picture,
          notes: notes,
        },
      },
    ])
  } catch (err) {
    console.error(err)
  }
}

export default async function patientHandler(req, res) {
  if (req.method === 'PUT') {
    const { patientId } = req.query
    const updatedPatientInfo = req.body
    const response = await updatePatientRecord(patientId, updatedPatientInfo)
    res.status(201).json(response)
  }

  try {
    const { patientId } = req.query
    const patientData = await getPatientRecord(patientId)
    res.status(200).json(patientData)
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
