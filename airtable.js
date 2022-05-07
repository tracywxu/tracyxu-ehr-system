import Airtable from 'airtable'
import 'dotenv/config'

export const AirtableBase = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_DATABASE_ID)
