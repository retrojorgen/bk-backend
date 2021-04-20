# Web service to calculate travel deduction for travel between home and work

## Overview

Provides one single root endpoint to calculate how much you can claim in travel deduction between your home and workplace.

## How it is calculated

- Total kilometeres is calculated from all work and travel-records. 75.000 is the upper limit.
- All travel up to 50.000 kilometers is legible for 1,50 NOK deduction per kilometer. For travel above 50.000 up to 75.000 0.70 NOK will be deducted.
- If Expenses for toll, ferries etc.. exceed 3.400 NOK the entire expense will be deducted. If the amount does not exceed 3.4000, nothing will be deducted.
- A deductible of 22.000 will be withdrawn from the sum of travel deduction and toll expenses.

## API-request

This web service responds to a post request as raw JSON in the following format:

```JSON
{
 "arbeidsreiser": [{"km": number, "hours": number}],
 "besoeksreiser": [{"km": number, "hours": number}],
 "utgifterBomFergeEtc": number"
}
```

The calculated deduction will be returned as JSON in the following format:

```JSON
{ "reisefradrag": number }
```
