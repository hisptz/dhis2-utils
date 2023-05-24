### Introduction

This is a class that exposes all the necessary utilities you may need to access period features.

### Concepts

These are some concepts used in this utility library:

- **PeriodTypeCategory (or just Category)**: Represents either `FIXED`, `RELATIVE`, `RANGE`
- **PeriodType**: Represents type of period, normally differentiated by duration (e.g `Weekly`, `Yearly`, `Last Month`,
  e.t.c)
- **Period**: An interval of time, characterized by start and end dates and DHIS2 supported id,
- **Preferences**: Refers to different options that are configurable in generating periods

### Usage

#### Creating an instance

To use the utility, start by creating a `PeriodUtility` instance, this can be done through the constructor

```javascript
import {PeriodUtility, PeriodTypeCategory} from "@hisptz/dhis2-utils"

const periodUtility = new PeriodUtility();
```

Then set the necessary options:

```javascript
periodUtility.setCategory(PeriodTypeCategory.FIXED)
periodUtility.setPreference({
    allowFuturePeriods: true
})
periodUtility.setYear(2022);
```

You can also use the static method `PeriodUtility.fromObject` which is a shorthand for setting the required properties:

```javascript
 const periodUtility = PeriodUtility.fromObject({
    year: 2022,
    category: PeriodTypeCategory.FIXED,
    preferences: {
        allowFuturePeriods: false
    }
})
```

#### Getting period types

You can get the list of all period types within the specified category through:

```javascript
 const periodTypes = periodUtility.periodTypes;
```

If you want to get a specific period type use:

```javascript
 const periodType = periodUtility.getPeriodType('period-type-id')
```

Where the `period-type-id` is one of the valid period types id

To get all periods within a period type, use the accessor `periods` from the PeriodType object:

```javascript
  const periods = periodType.periods;
```

#### Getting period by id

You can get a specific period by its id by using the static method `getPeriodById`:

```javascript
 const period = PeriodUtility.getPeriodById('period-id')
```

Where `period-id` is a valid period id
