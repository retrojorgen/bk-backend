# Web service to calculate travel deduction for travel between home and work

## Overview

Provides one single root endpoint to calculate how much you can claim in travel deduction between your home and workplace.

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
