// API endpoint: /api/patients/update
import { AirtableBase } from '../../../airtable'
import { convertDateToTimestamp } from '../../../helpers'

async function updatePatientRecord({
  patientId,
  name,
  notes,
  state,
  picture,
  dob,
}) {
  const promise = new Promise((resolve, reject) => {
    AirtableBase('Patients').update(
      [
        {
          id: patientId,
          fields: {
            name: name,
            dob: convertDateToTimestamp(dob),
            state: state,
            picture: picture,
            notes: notes,
          },
        },
      ],
      function (err, records) {
        if (err) {
          throw new Error(err)
        }
        // return the id of the updated patient record in database
        resolve(records[0].getId())
      },
    )
  })
  return promise
}

export default async function patientHandler(req, res) {
  try {
    if (req.method === 'PUT') {
      const updatedPatientInfo = req.body
      const id = await updatePatientRecord(updatedPatientInfo)
      res.status(204).json({ id })
    }
  } catch (err) {
    res.status(500).json({ error: 'failed to update data' })
  }
}
