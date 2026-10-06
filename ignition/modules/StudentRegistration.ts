import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("StudentRegistrationModule", (m) => {
  const studentRegistration = m.contract("StudentRegistration");

  return { studentRegistration };
});