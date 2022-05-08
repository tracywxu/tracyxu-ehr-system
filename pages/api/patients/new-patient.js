// API endpoint: /api/patients/new-patient
import { AirtableBase } from '../../../airtable'
import { convertDateToTimestamp } from '../../../helpers'

function createNewPatient({ name, birthdate, state, picture, notes }) {
  const promise = new Promise((resolve, reject) => {
    AirtableBase('Patients').create(
      [
        {
          fields: {
            name: name,
            state: state,
            dob: birthdate,
            picture: picture,
            notes: notes,
          },
        },
      ],
      function (err, records) {
        if (err) {
          throw new Error(err)
        }
        // return the id of the new patient record in database
        resolve(records[0].getId())
      },
    )
  })
  return promise
}

export default async function createNewPatientHandler(req, res) {
  if (req.method === 'POST') {
    try {
      const newPatientInfo = req.body
      const id = await createNewPatient(newPatientInfo)

      res.status(201).json({
        id,
        message: 'New patient added to the database!',
      })
    } catch (err) {
      res.status(500).json({ error: 'failed to create data' })
    }
  }
}
