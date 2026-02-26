import { appointmentModel } from "../model/appointment.model.js";

// ---------- book appointment
export const appointmentBookController = async (req, res) => {
  try {
    const { doctorId, date } = req.body;

    if (!doctorId || !date) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: doctorId, date",
      });
    }

    // sirf patient hi book kare
    if (req.user.role !== "patient") {
      return res.status(403).json({
        success: false,
        message: "Only patient can book appointment",
      });
    }

    const appointmentData = { doctor: doctorId, patient: req.user._id, date };

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
    const appointment = await appointmentModel.findByIdAndUpdate(req.params.id);

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    // sirf owner patient cancel kare
    if (
      req.user.role === "patient" &&
      appointment.patient.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }
    appointment.status = "cancelled";
    await appointment.save();

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
