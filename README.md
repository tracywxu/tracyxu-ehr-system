**System Overview**

This is a prototype for an EHR (Electronic Health Record) system. This prototype program allows doctors to view all their patients and each patient’s detailed health information.

**Features**

1. View All Patients:
   - path: base-url ( `/` )
   - The home page displays all the patients’ information in descending order by their creation date as a table. The patient table has four fields: patient name, patient dob, patient state, view detail button.
2. View Single Patient’s Detailed Information:
   - path: `/patients/[patientId]`
   - Clicking the “view” button on the patients page will automatically route to the detailed information page for the corresponding patient. The detailed page displays the patient’s name, dob, state, picture, and notes.

**How To Run**

```
npm run dev
```
