const express = require("express");
const app = express();

const path = require("path");
const hbs = require("hbs");
const collection = require("../controller/mongodb");
const templatepath = path.join(__dirname, "../templates");
const { generateOTP, sendOTP, connectToDB } = require("../controller/verify");

const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const database = "datathon";

const chargesheets = require("../controller/chargesheetdb");
const ArrestPersonDetails = require("../controller/ArrestPersonDetailsdb");
const fir = require("../controller/firdb");

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatepath);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, resp) => {
  resp.render("login");
});

app.post("/", async (req, resp) => {
  try {
    const check = await collection.findOne({
      pid: req.body.pid,
    });

    if (check.password === req.body.password) {
      resp.render("home");
    } else {
      resp.send("wrong password");
    }
  } catch {
    resp.send("wrong details");
  }
});

app.get("/new", async (req, resp) => {
  resp.render("new");
});

app.get("/reopen", async (req, resp) => {
  resp.render("requestotp");
});
app.get("/draft", async (req, resp) => {
  resp.render("draft");
});

app.get("/view", (req, resp) => {
  resp.render("view");
});

app.post("/view", async (req, resp) => {
  try {
    const result = await client.connect();
    const db = result.db(database);
    const collection = db.collection("complaintDetails");
    const response = await collection
      .find({
        Fir_ID: req.body.Fir_ID,
        District_Name: req.body.District_Name,
        UnitName: req.body.UnitName,
      })
      .toArray();
    if (response.length > 0) {
      resp.send(response);
    } else {
      resp.send("not found");
    }
  } catch (error) {
    console.error(error);
    resp.send("An error occurred");
  } finally {
    await client.close();
  }
});

app.post("/chargesheet", async (req, resp) => {
  const {
    District_Name,
    UnitName,
    FirNO,
    year,
    month,
    Nmae,
    age,
    caste,
    Profession,
    Gender,
    PresentAddress,
    PresentCity,
    PresentState,
    PermanentAddress,
    PermanentState,
    PermanentCity,
    Nationality,
    DOB,
    Person_No,
    Crime_No,
    Arr_ID,
    Charge_Sheeted,
    Charge_Sheet_Number,
  } = req.body;

  try {
    const data = {
      District_Name,
      UnitName,
      FirNO,
      year,
      month,
      Nmae,
      age,
      caste,
      Profession,
      Gender,
      PresentAddress,
      PresentCity,
      PresentState,
      PermanentAddress,
      PermanentState,
      PermanentCity,
      Nationality,
      DOB,
      Person_No,
      Crime_No,
      Arr_ID,
      Charge_Sheeted,
      Charge_Sheet_Number,
    };

    await chargesheets.insertMany([data]);
    resp.json({ message: "chargesheets input  successful" });
  } catch (error) {
    resp.status(500).json({ error: "Internal server error" });
  }
});

app.post("/ArrestPersonDetails", async (req, resp) => {
  const {
    District_Name,
    UnitName,
    FirNO,
    year,
    month,
    Nmae,
    age,
    caste,
    Profession,
    Gender,
    PresentAddress,
    PresentCity,
    PresentState,
    PermanentAddress,
    PermanentState,
    PermanentCity,
    Nationality,
    DOB,
    Person_No,
    Crime_No,
    Arr_ID,
    Charge_Sheeted,
    Charge_Sheet_Number,
  } = req.body;

  try {
    const data = {
      District_Name,
      UnitName,
      FirNO,
      year,
      month,
      Nmae,
      age,
      caste,
      Profession,
      Gender,
      PresentAddress,
      PresentCity,
      PresentState,
      PermanentAddress,
      PermanentState,
      PermanentCity,
      Nationality,
      DOB,
      Person_No,
      Crime_No,
      Arr_ID,
      Charge_Sheeted,
      Charge_Sheet_Number,
    };

    await ArrestPersonDetails.insertMany([data]);
    resp.json({ message: "ArrestPersonDetails input  successful" });
  } catch (error) {
    resp.status(500).json({ error: "Internal server error" });
  }
});

app.post("/fir", async (req, resp) => {
  const {
    District_Name,
    UnitName,
    FirNO,
    Rl,
    year,
    month,
    Offence_From_Date,
    Offence_To_Date,
    FIR_Reg_DateTime,
    FIR_Date,
    FIR_Type,
    FIR_Stage,
    Complaint_Mode,
    CrimeGroup_Name,
    CrimeHead_Name,
    Latitude,
    Longitude,
    ActSection,
    IOName,
    KGID,
    IOAssigned_Date,
    Internal_IO,
    Place_of_Offence,
    Distance_from_PS,
    Beat_Name,
    Village_Area_Name,
    Male,
    Female,
    Boy,
    Girl,
    Age,
    VICTIM_COUNT,
    Accused_Count,
    Arrested_Male,
    Arrested_Female,
    Arrested_Count_No,
    Accused_ChargeSheeted_Count,
    Conviction_Count,
    FIR_ID,
    Unit_ID,
    Crime_No,
    wsave,
  } = req.body;

  try {
    const data = {
      District_Name,
      UnitName,
      FirNO,
      Rl,
      year,
      month,
      Offence_From_Date,
      Offence_To_Date,
      FIR_Reg_DateTime,
      FIR_Date,
      FIR_Type,
      FIR_Stage,
      Complaint_Mode,
      CrimeGroup_Name,
      CrimeHead_Name,
      Latitude,
      Longitude,
      ActSection,
      IOName,
      KGID,
      IOAssigned_Date,
      Internal_IO,
      Place_of_Offence,
      Distance_from_PS,
      Beat_Name,
      Village_Area_Name,
      Male,
      Female,
      Boy,
      Girl,
      Age,
      VICTIM_COUNT,
      Accused_Count,
      Arrested_Male,
      Arrested_Female,
      Arrested_Count_No,
      Accused_ChargeSheeted_Count,
      Conviction_Count,
      FIR_ID,
      Unit_ID,
      Crime_No,
      wsave,
    };

    await fir.insertMany([data]);
    resp.json({ message: "fir input  successful" });
  } catch (error) {
    resp.status(500).json({ error: "Internal server error" });
  }
});

app.post("/requestotp", async (req, res) => {
  const email = req.body.email;
  const otp = generateOTP();
  const timestamp = Date.now();
  const collection = await connectToDB();

  await collection.insertOne({ email, otp, timestamp });

  await sendOTP(email, otp);
  console.log({ message: "OTP sent successfully" });

  res.render("verifyotp");
});

app.post("/verifyotp", async (req, res) => {
  const { email, otp } = req.body;
  const collection = await connectToDB();

  const storedOTP = await collection.findOne({ email });

  if (!storedOTP) {
    return res.json({ verified: false, message: "OTP not found or expired" });
  }

  if (
    storedOTP.otp === otp &&
    Date.now() - storedOTP.timestamp <= 24 * 60 * 60 * 1000
  ) {
    await collection.deleteOne({ email });
    res.render("reopen");
  } else {
    res.json({ verified: false, message: "Invalid OTP or expired" });
  }
});

app.post("/reopen", async (req, resp) => {
  try {
    const result = await client.connect();
    const db = result.db(database);
    const collection = db.collection("firs");
    const response = await collection
      .find({ Fir_ID: req.body.Fir_ID })
      .toArray();
    if (response.length > 0) {
      resp.render("updatedata");
    } else {
      resp.send("not found");
    }
  } catch (error) {
    console.error(error);
    resp.send("An error occurred");
  } finally {
    await client.close();
  }
});

app.post("/updatedata", async (req, resp) => {
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
          FIR_ID:req.body.FIR_ID,
          Unit_ID:req.body.Unit_ID,
          Crime_No:req.body.Crime_No,
          wsave:req.body.wsave
        },
      }
    );
    data();
    console.log(data);
    resp.send("done");
  } catch (error) {
    console.error(error);
    resp.send("An error occurred");
  } finally {
    await client.close();
  }
});

app.post("/draft", async (req, resp) => {
  try {
    const result = await client.connect();
    const db = result.db(database);
    const collection = db.collection("drafts");
    const response = await collection
      .find({ Fir_ID: req.body.Fir_ID })
      .toArray();
    if (response.length > 0) {
      resp.render("updatedraft");
    } else {
      resp.send("not found");
    }
  } catch (error) {
    console.error(error);
    resp.send("An error occurred");
  } finally {
    await client.close();
  }
});

app.post("/updatedraft", async (req, resp) => {
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
});

app.listen(5000, () => {
  console.log("port connected");
});
