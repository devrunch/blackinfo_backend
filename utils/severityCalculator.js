exports.calculateSeverity=(typeOfCollision, noOfVehiclesInvolved, noOfFatalities)=> {
  let severity = 0;
  switch (typeOfCollision) {
    case "Rear End Collision":
      severity += 1;
      break;
    case "Head On Collision":
      severity += 2;
      break;
    case "Side Collision":
      severity += 1.5;
      break;
    default:
      severity += 1;
      break;
  }
  severity += noOfVehiclesInvolved * 0.5;
  severity += noOfFatalities * 2;
  
  // Ensure severity is within the range of 1 to 10
  severity = Math.max(1, Math.min(severity, 10));
  
  return severity;
}