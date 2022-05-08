### **How To Run**

```
npm run dev
```

### **System Overview**

This is a prototype program for the Peak EHR (Electronic Health Record) system. This program allows doctors to view all their patients’ detailed health information, create new patient, and edit existing patient’s detail page.

View client 👉🏻 [https://tracyxu-ehr-system.vercel.app/](https://tracyxu-ehr-system.vercel.app/)

### **Features**

1. **View All Patients**
   - path: base-url ( `/` )
   - The home page displays all the patients’ information in descending order by their creation date as a table. The patient table has four fields: patient name, patient dob, patient state, view detail button.
2. **View Single Patient’s Detailed Information**
   - path: `/patients/[patientId]`
   - Clicking the “view” button on the patients page will automatically route to the detailed information page for the corresponding patient. The detailed page displays the patient’s name, dob, state, picture, and notes.
3. **Create a New Patient and Update Existing Patients**
   - Clicking the “Create New Patient” button on the home page will open a new page and a form.
   - Clicking the “Edit” button inside patient’s detail page will allow users to edit the patient’s information.
   - When a user click the “Save Changes” button in the edit mode, the patient’s record in the database will be updated based on the values of the input fields.

### **Tech Stack**

- **Frontend**: React, Next.js, Styled-Components, Chakra UI
- **Backend**: Airtable Database
- **Deployment**: Vercel

### **Design Detail**

- **React Component Architecture**

```jsx
<MyApp>
  // default index page
	<App> <AllPatients> <PatientsTable /> </AllPatients> </App>

  // conditionally renders `/patients/[patientId]` route on button click
	<PatientPage >
		<SinglePatient>
			// toggles between the two components on button click
			<EditPatient />
			<PatientDetails />
		<SinglePatient>
	</PatientPage>

</MyApp>
```

- **Next.js API Endpoints**
- Custom API is built with Next.js to communicate between the client and the Airtable database.
- There are four api endpoints inside the folder `pages/api`:

```jsx
/api/patients
fetch all patients' information from the Airtable database and send a JSON response to the frontend

/api/patients/[patientId]
fetch a single patient's information from the Airtable databse with the patient's record Id and send a JSON response to the frontend

/api/patients/new-patient
create a new patient in Airtable database and returns the new patient's record ID

/api/patients/update
update the patient's record in Airtable database with patient ID
```

- **Airtable Database Schema**

  - Access the grid view [here](https://airtable.com/shr88tt8ThhqRLMiU)
  - The database named `Patients` hosts all the patient information. There are six fields in the database: `name`, `dob`, `state`, `picture`, `notes`, `created time`(automatically added when the record is created).
  - For the demo purpose of this app, I set up an Airtable database using the provided JSON file.
    - Pros and Cons
      - Pros: Airtable database is very robust and easy to configure. Compared with using a JSON file to store data, an Airtable database provides a more solid infrastructure to implement CRUD functionalities if we want to scale up our demo app. It also allows the user to easily get access to all the information stored in their database through the Airtable frontend app.
      - Cons: We might encounter some customization problem when trying to scale up the app. While Airtable is considered a lightweight and fast solution, load speed is an issue when we are working with larger amount of data and features.

  ### **Notes for Improvement and Code Refactoring**

  - **Client-side data fetching**
    The current app fetches data on the client side with React useEffect hook. This is approach is straight-forward to code up and useful when the content of our pages need to update frequently. However, the downside is that a network call is made whenever the component mounts and the load speed of pages is not instant. A possible solution to this problem is to implement caching.
  - **Page/Route Structure**
    Ideally, the patient table displaying all the patients’ information should be routed to specific parameter `/patients`. I chose to show this table on the home page for the purpose of simplicity for this particular demo app. We can later fill the home page with other features and add a button that routes to `/patients` to access all patients’ information.
  - **Testing, Analytics & Monitering**
    We still need to add unit test using libraries like Mocha & Chai or Cypress to test our key functionality on the frontend and custom API. In production, we may also want to track how the app is used. For example, we may want to fire an analytics event every time a user clicks or navigates to the patient detail page.
