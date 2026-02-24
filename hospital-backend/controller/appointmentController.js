import { appointmentModel } from "../model/appointment.model.js";

// ---------- book appointment
export const appointmentBookController = async (req, res) => {
  try {
    const { doctorId, patientId, date } = req.body;

    if (!doctorId || !patientId || !date) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: doctorId, patientId, date",
      });
    }

    const appointmentData = { doctor: doctorId, patient: patientId, date };

    const appointment = await appointmentModel.create(appointmentData);
    if (!appointment) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to create appointment" });
    }
    return res
      .status(201)
      .json({ success: true, message: "Appointment Booked Successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// -------------- cancel appointment
export const appointmentCancelController = async (req, res) => {  
  try {
    const appointment = await appointmentModel.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true },
    );

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    res.json({
      success: true,
      message: "Appointment Cancelled Successfully",
      appointment,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// ----------get Appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find()
      .populate("doctor", "name")
      .populate("patient", "name");

    res.json({
      success: true,
      message: "Appointments fetched successfully",
      appointments,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

