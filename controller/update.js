const fir = require("./firdb");
const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const database = "datathon";

async function updatedata(req, resp) {
  try {
    let data = await fir.updateOne(
      { Fir_ID: req.body.Fir_ID },
      {
        $set: {
          District_Name: req.body.District_Name,
          UnitName: req.body.UnitName,
          FirNO: req.body.FirNO,
          Rl: req.body.Rl,
          year: req.body.year,
          month: req.body.month,
          Offence_From_Date: req.body.Offence_From_Date,
          Offence_To_Date: req.body.Offence_To_Date,
          FIR_Reg_DateTime: req.body.FIR_Reg_DateTime,
          FIR_Date: req.body.FIR_Date,
          FIR_Type: req.body.FIR_Type,
          FIR_Stage: req.body.FIR_Stage,
          Complaint_Mode: req.body.Complaint_Mode,
          CrimeGroup_Name: req.body.CrimeGroup_Name,
          CrimeHead_Name: req.body.CrimeHead_Name,
          Latitude: req.body.Latitude,
          Longitude: req.body.Longitude,
          ActSection: req.body.ActSection,
          IOName: req.body.IOName,
          KGID: req.body.KGID,
          Place_of_Offence: req.body.Place_of_Offence,
          Distance_from_PS: req.body.Distance_from_PS,
          Beat_Name: req.body.Beat_Name,
          Village_Area_Name: req.body.Village_Area_Name,
          Male: req.body.Male,
          Female: req.body.Female,
          Boy: req.body.Boy,
          Girl: req.body.Girl,
          Age: req.body.Age,
          VICTIM_COUNT: req.body.VICTIM_COUNT,
          Accused_Count: req.body.Accused_Count,
          Arrested_Male: req.body.Arrested_Male,
          Arrested_Female: req.body.Arrested_Female,
          Arrested_Count_No: req.body.Arrested_Count_No,
          Accused_ChargeSheeted_Count: req.body.Accused_ChargeSheeted_Count,
          Conviction_Count: req.body.Conviction_Count,
          FIR_ID: req.body.FIR_ID,
          Unit_ID: req.body.Unit_ID,
          Crime_No: req.body.Crime_No,
          wsave: req.body.wsave,
        },
      }
    );
    data();
    console.log(data);
    resp.send("done");
  } catch (error) {
    console.error(error);
    resp.status(500).send("An error occurred");
  } finally {
    await client.close();
  }
}

async function updatedraft(req, resp) {
  try {
    let data = await fir.updateOne(
      { Fir_ID: req.body.Fir_ID },
      {
        $set: {
          FIR_Type: req.body.FIR_Type,
          FIR_Stage: req.body.FIR_Stage,
          Complaint_Mode: req.body.Complaint_Mode,
          CrimeGroup_Name: req.body.CrimeGroup_Name,
          CrimeHead_Name: req.body.CrimeHead_Name,
          Latitude: req.body.Latitude,
          Longitude: req.body.Longitude,
          ActSection: req.body.ActSection,
          IOName: req.body.IOName,
          KGID: req.body.KGID,
          Place_of_Offence: req.body.Place_of_Offence,
          Distance_from_PS: req.body.Distance_from_PS,
          Beat_Name: req.body.Beat_Name,
          Village_Area_Name: req.body.Village_Area_Name,
          Male: req.body.Male,
          Female: req.body.Female,
          Boy: req.body.Boy,
          Girl: req.body.Girl,
          Age: req.body.Age,
          VICTIM_COUNT: req.body.VICTIM_COUNT,
          Accused_Count: req.body.Accused_Count,
          Arrested_Male: req.body.Arrested_Male,
          Arrested_Female: req.body.Arrested_Female,
          Arrested_Count_No: req.body.Arrested_Count_No,
          Accused_ChargeSheeted_Count: req.body.Accused_ChargeSheeted_Count,
          Conviction_Count: req.body.Conviction_Count,
        },
      }
    );
    data();
    const result = await client.connect();
    const db = result.db(database);
    const collection = db.collection("drafts");
    const destinationCollection = client.db(database).collection("firs");
    const response = await collection.find({ Fir_ID: req.body.Fir_ID });
    if (response.wsave === "commit") {
      await destinationCollection.insertMany(response);
    } else {
      resp.send("saved as draft");
    }
  } catch (error) {
    console.error(error);
    resp.send("An error occurred");
  } finally {
    await client.close();
  }
}

module.exports = {
  updatedata,
  updatedraft,
};
