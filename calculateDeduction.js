/**
 * Asks for deduction data-object
 * {
 *  "arbeidsreiser": [{"km": number, "antall": number}],
 *  "besoeksreiser": [{"km": number, "antall": number}],
 *  "utgifterBomFergeEtc": number"
 * }
 * @param {deductionData} deducationData
 * @returns calculated deduction (int)
 */
module.exports = ({ arbeidsreiser, besoeksreiser, utgifterBomFergeEtc }) => {
  // this should probably not be hardcoded
  const maxKm = 75000;
  const maxPayKmDeductionLimit = { km: 50000, nok: 1.5 };
  const minPayKmDeduction = 0.7;
  const tollDeductionLimit = 3400;
  const deductible = 22000;

  // calculate total distance
  let travelDistanceInKm =
    arbeidsreiser
      .map((distance) => distance.antall * distance.km)
      .reduce((acc, value) => acc + value) +
    besoeksreiser
      .map((distance) => distance.antall * distance.km)
      .reduce((acc, value) => acc + value);

  // max 75.000 km
  travelDistanceInKm = travelDistanceInKm > maxKm ? maxKm : travelDistanceInKm;

  // 1.50NOK in return up to 50.000 km
  const distanceWithin50kInNOK =
    (travelDistanceInKm <= maxPayKmDeductionLimit.km
      ? travelDistanceInKm
      : maxPayKmDeductionLimit.km) * maxPayKmDeductionLimit.nok;

  //0.70NOK in return from 50.000 km to 75.000 km
  const distanceAbove50kInNok =
    (travelDistanceInKm > maxPayKmDeductionLimit.km
      ? travelDistanceInKm - maxPayKmDeductionLimit.km
      : 0) * minPayKmDeduction;

  // full deduction for toll above 3400, nothing belov
  const tollDeduction =
    utgifterBomFergeEtc >= tollDeductionLimit ? utgifterBomFergeEtc : 0;

  // calculated deduction
  const calculatedDeduction =
    distanceWithin50kInNOK + distanceAbove50kInNok + tollDeduction - deductible;

  // Don't return a negative number :)
  return calculatedDeduction > 0 ? calculatedDeduction : 0;
};
